import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Vehicle, 
  MotorsSettings, 
  MotorsOrder, 
  SellRequest, 
  MotorsHistoricalRecord, 
  MotorsCartItem,
  VehicleStatus,
  VehicleListingType
} from '../types/motors';
import { 
  initialVehicles, 
  initialMotorsSettings, 
  initialMotorsOrders, 
  initialSellRequests, 
  initialHistoricalRecords 
} from '../data/initialMotorsData';

interface MotorsContextType {
  vehicles: Vehicle[];
  orders: MotorsOrder[];
  sellRequests: SellRequest[];
  settings: MotorsSettings;
  historicalRecords: MotorsHistoricalRecord[];
  cart: MotorsCartItem[];
  loading: boolean;
  error: string | null;

  // Cart operations
  addToCart: (item: Omit<MotorsCartItem, 'id' | 'dateAdded'>) => void;
  removeFromCart: (itemId: string) => void;
  updateCartRentalDays: (itemId: string, startDate: string, endDate: string, days: number) => void;
  clearCart: () => void;

  // Vehicle operations
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Vehicle>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<Vehicle>;
  deleteVehicle: (id: string) => Promise<boolean>;
  setVehicleStatus: (id: string, status: VehicleStatus) => Promise<void>;
  toggleVehicleFeatured: (id: string) => Promise<void>;

  // Order operations
  createOrder: (order: Omit<MotorsOrder, 'id' | 'orderReference' | 'createdAt' | 'updatedAt' | 'orderStatus'> & { orderStatus?: MotorsOrder['orderStatus'] }) => Promise<{ order: MotorsOrder; whatsappUrl: string }>;
  updateOrder: (id: string, updates: Partial<MotorsOrder>) => Promise<MotorsOrder>;

  // Sell request operations
  submitSellRequest: (request: Omit<SellRequest, 'id' | 'createdAt' | 'updatedAt' | 'commissionAmount' | 'sellerNetAmount' | 'status'>) => Promise<{ request: SellRequest; whatsappUrl: string }>;
  updateSellRequest: (id: string, updates: Partial<SellRequest>) => Promise<SellRequest>;
  convertSellRequestToInventory: (requestId: string, overrides?: { salePrice?: number; description?: string; location?: string; featured?: boolean }) => Promise<{ vehicle: Vehicle; sellRequest: SellRequest }>;

  // Settings operations
  updateSettings: (updates: Partial<MotorsSettings>) => Promise<MotorsSettings>;

  // Refresh
  refreshData: () => Promise<void>;
  resetDefaultData: () => Promise<void>;

  // Format helpers
  formatCurrency: (amount: number) => string;
  generateWhatsAppOrderUrl: (order: MotorsOrder) => string;
  generateWhatsAppSellUrl: (sellRequest: SellRequest) => string;
}

const MotorsContext = createContext<MotorsContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'yuskar_motors_cart';

export const MotorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [orders, setOrders] = useState<MotorsOrder[]>(initialMotorsOrders);
  const [sellRequests, setSellRequests] = useState<SellRequest[]>(initialSellRequests);
  const [settings, setSettings] = useState<MotorsSettings>(initialMotorsSettings);
  const [historicalRecords, setHistoricalRecords] = useState<MotorsHistoricalRecord[]>(initialHistoricalRecords);
  
  const [cart, setCart] = useState<MotorsCartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart]);

  // Fetch initial data from persistent backend API
  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/motors/data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (Array.isArray(json.data.vehicles)) setVehicles(json.data.vehicles);
          if (Array.isArray(json.data.orders)) setOrders(json.data.orders);
          if (Array.isArray(json.data.sellRequests)) setSellRequests(json.data.sellRequests);
          if (json.data.settings) setSettings(json.data.settings);
          if (Array.isArray(json.data.historicalRecords)) setHistoricalRecords(json.data.historicalRecords);
        }
      }
    } catch (err: any) {
      console.warn("Backend API not reachable or offline, utilizing persistent local dataset:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Format RWF currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-RW', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(amount) + ' RWF';
  };

  // Cart operations
  const addToCart = (item: Omit<MotorsCartItem, 'id' | 'dateAdded'>) => {
    const newItem: MotorsCartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      dateAdded: new Date().toISOString(),
    };
    // If buying, one vehicle at a time or replace vehicle
    setCart(prev => {
      const filtered = prev.filter(c => c.vehicleId !== item.vehicleId);
      return [newItem, ...filtered];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartRentalDays = (itemId: string, startDate: string, endDate: string, days: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId && item.action === 'RENT' && item.rentalDetails) {
        const total = days * item.rentalDetails.pricePerDay;
        return {
          ...item,
          rentalDetails: {
            ...item.rentalDetails,
            startDate,
            endDate,
            days,
          },
          totalAmount: total,
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // WhatsApp Helpers
  const cleanPhone = (phone: string): string => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '250' + clean.slice(1);
    }
    if (!clean.startsWith('250') && clean.length === 9) {
      clean = '250' + clean;
    }
    return clean || '250795153994';
  };

  const generateWhatsAppOrderUrl = (order: MotorsOrder): string => {
    const adminPhone = cleanPhone(settings.whatsapp.adminWhatsAppNumber || '250795153994');
    
    let rentalInfo = '';
    if (order.orderType === 'RENT' && order.rentalDetails) {
      rentalInfo = `Rental Dates: ${order.rentalDetails.startDate} to ${order.rentalDetails.endDate} (${order.rentalDetails.days} days)\nPickup: ${order.rentalDetails.pickupLocation}\n`;
    }

    const message = `*YUSKAR MOTORS ORDER*

*Order ID:* ${order.orderReference}
*Customer Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*WhatsApp:* ${order.customer.whatsapp}
*Customer Location:* ${order.customer.location}

*Vehicle:* ${order.vehicle.make} ${order.vehicle.model} (${order.vehicle.year})
*Vehicle ID:* ${order.vehicleId}
*Action:* ${order.orderType === 'BUY' ? 'BUY VEHICLE' : 'RENT VEHICLE'}
*Price:* ${formatCurrency(order.price)}
${rentalInfo}*Total Amount:* ${formatCurrency(order.totalAmount)}
*Payment Status:* ${order.paymentStatus}
*Payment Reference:* ${order.paymentReference || 'N/A'}
*Payment Sender:* ${order.paymentSenderName || order.customer.name}

${order.customerNotes ? `*Additional Message:*\n${order.customerNotes}\n` : ''}
Sent via YusKar Motors Online Marketplace`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  const generateWhatsAppSellUrl = (sellRequest: SellRequest): string => {
    const adminPhone = cleanPhone(settings.whatsapp.adminWhatsAppNumber || '250795153994');

    const message = `*YUSKAR MOTORS - VEHICLE SELL REQUEST*

*Request ID:* ${sellRequest.id}
*Customer:* ${sellRequest.customer.name}
*Phone:* ${sellRequest.customer.phone}
*WhatsApp:* ${sellRequest.customer.whatsapp}
*Location:* ${sellRequest.customer.location}
*Preferred Contact:* ${sellRequest.customer.preferredContactMethod}

*VEHICLE INFORMATION:*
*Brand:* ${sellRequest.vehicle.brand}
*Model:* ${sellRequest.vehicle.model}
*Year:* ${sellRequest.vehicle.year}
*Mileage:* ${typeof sellRequest.vehicle.mileage === 'number' ? sellRequest.vehicle.mileage.toLocaleString() + ' km' : sellRequest.vehicle.mileage}
*Fuel:* ${sellRequest.vehicle.fuelType}
*Transmission:* ${sellRequest.vehicle.transmission}
*Color:* ${sellRequest.vehicle.color}
*Condition:* ${sellRequest.vehicle.condition}
*Registration:* ${sellRequest.vehicle.registrationInfo || 'Clean Title'}

*FINANCIAL BREAKDOWN:*
*Customer Asking Price:* ${formatCurrency(sellRequest.askingPrice)}
*YusKar Commission (${sellRequest.commissionPercentage}%):* ${formatCurrency(sellRequest.commissionAmount)}
*Seller Net Amount:* ${formatCurrency(sellRequest.sellerNetAmount)}

${sellRequest.vehicle.additionalDetails ? `*Details:* ${sellRequest.vehicle.additionalDetails}\n` : ''}${sellRequest.preferredConditions ? `*Selling Notes:* ${sellRequest.preferredConditions}\n` : ''}
Sent via YusKar Motors Marketplace Portal`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  // Vehicle operations
  const addVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> => {
    const tempId = `veh-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setVehicles(prev => [newVehicle, ...prev]);

    try {
      const res = await fetch('/api/motors/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setVehicles(prev => prev.map(v => v.id === tempId ? json.data : v));
          return json.data;
        }
      }
    } catch (e) {
      console.warn("Could not sync added vehicle to server, saved locally:", e);
    }
    return newVehicle;
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    let updatedVehicle: Vehicle | undefined;
    setVehicles(prev => prev.map(v => {
      if (v.id === id) {
        updatedVehicle = { ...v, ...updates, updatedAt: new Date().toISOString() };
        return updatedVehicle;
      }
      return v;
    }));

    try {
      const res = await fetch(`/api/motors/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn("Could not sync updated vehicle to server:", e);
    }
    return updatedVehicle || (updates as Vehicle);
  };

  const deleteVehicle = async (id: string): Promise<boolean> => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    try {
      const res = await fetch(`/api/motors/vehicles/${id}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      console.warn("Could not delete vehicle from server:", e);
      return true;
    }
  };

  const setVehicleStatus = async (id: string, status: VehicleStatus) => {
    await updateVehicle(id, { status });
  };

  const toggleVehicleFeatured = async (id: string) => {
    const v = vehicles.find(item => item.id === id);
    if (v) {
      await updateVehicle(id, { featured: !v.featured });
    }
  };

  // Order operations
  const createOrder = async (orderData: Omit<MotorsOrder, 'id' | 'orderReference' | 'createdAt' | 'updatedAt' | 'orderStatus'> & { orderStatus?: MotorsOrder['orderStatus'] }): Promise<{ order: MotorsOrder; whatsappUrl: string }> => {
    const orderId = `YM-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: MotorsOrder = {
      ...orderData,
      id: orderId,
      orderReference: orderId,
      orderStatus: orderData.orderStatus || 'NEW',
      paymentStatus: orderData.paymentStatus || 'PAYMENT_SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);

    // Clear cart if ordered
    clearCart();

    const whatsappUrl = generateWhatsAppOrderUrl(newOrder);

    try {
      const res = await fetch('/api/motors/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setOrders(prev => prev.map(o => o.id === orderId ? json.data : o));
          return { order: json.data, whatsappUrl };
        }
      }
    } catch (e) {
      console.warn("Could not save order to server, stored locally:", e);
    }

    return { order: newOrder, whatsappUrl };
  };

  const updateOrder = async (id: string, updates: Partial<MotorsOrder>): Promise<MotorsOrder> => {
    let updated: MotorsOrder | undefined;
    
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        updated = { ...o, ...updates, updatedAt: new Date().toISOString() };
        
        // Auto mark vehicle SOLD / RENTED on COMPLETED order
        if (updates.orderStatus === 'COMPLETED' && o.orderStatus !== 'COMPLETED') {
          if (o.orderType === 'BUY') {
            setVehicleStatus(o.vehicleId, 'SOLD');
          } else if (o.orderType === 'RENT') {
            setVehicleStatus(o.vehicleId, 'RENTED');
          }

          // Add to historical archive
          const histRecord: MotorsHistoricalRecord = {
            id: `HIST-${Date.now().toString(36)}`,
            orderId: o.id,
            vehicleId: o.vehicleId,
            vehicleTitle: `${o.vehicle.make} ${o.vehicle.model} (${o.vehicle.year})`,
            vehicleImage: o.vehicle.mainImage,
            type: o.orderType === 'BUY' ? 'SALE' : 'RENTAL',
            customerName: o.customer.name,
            customerPhone: o.customer.phone,
            customerWhatsApp: o.customer.whatsapp,
            amount: o.totalAmount,
            rentalPeriod: o.rentalDetails ? `${o.rentalDetails.startDate} to ${o.rentalDetails.endDate} (${o.rentalDetails.days} Days)` : undefined,
            paymentReference: o.paymentReference,
            date: new Date().toISOString(),
          };
          setHistoricalRecords(hPrev => [histRecord, ...hPrev]);
        }

        return updated;
      }
      return o;
    }));

    try {
      const res = await fetch(`/api/motors/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn("Could not sync order updates to server:", e);
    }

    return updated || (updates as MotorsOrder);
  };

  // Sell request operations
  const submitSellRequest = async (requestData: Omit<SellRequest, 'id' | 'createdAt' | 'updatedAt' | 'commissionAmount' | 'sellerNetAmount' | 'status'>): Promise<{ request: SellRequest; whatsappUrl: string }> => {
    const reqId = `YM-SELL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const askingPrice = Number(requestData.askingPrice) || 0;
    const commissionPercentage = Number(requestData.commissionPercentage) || settings.business.sellingCommissionPercentage || 10;
    const commissionAmount = Math.round((askingPrice * commissionPercentage) / 100);
    const sellerNetAmount = askingPrice - commissionAmount;

    const newRequest: SellRequest = {
      ...requestData,
      id: reqId,
      askingPrice,
      commissionPercentage,
      commissionAmount,
      sellerNetAmount,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSellRequests(prev => [newRequest, ...prev]);
    const whatsappUrl = generateWhatsAppSellUrl(newRequest);

    try {
      const res = await fetch('/api/motors/sell-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setSellRequests(prev => prev.map(r => r.id === reqId ? json.data : r));
          return { request: json.data, whatsappUrl };
        }
      }
    } catch (e) {
      console.warn("Could not save sell request to server, stored locally:", e);
    }

    return { request: newRequest, whatsappUrl };
  };

  const updateSellRequest = async (id: string, updates: Partial<SellRequest>): Promise<SellRequest> => {
    let updated: SellRequest | undefined;

    setSellRequests(prev => prev.map(r => {
      if (r.id === id) {
        let askingPrice = updates.askingPrice !== undefined ? Number(updates.askingPrice) : r.askingPrice;
        let commissionPercentage = updates.commissionPercentage !== undefined ? Number(updates.commissionPercentage) : r.commissionPercentage;
        let commissionAmount = Math.round((askingPrice * commissionPercentage) / 100);
        let sellerNetAmount = askingPrice - commissionAmount;

        updated = {
          ...r,
          ...updates,
          askingPrice,
          commissionPercentage,
          commissionAmount,
          sellerNetAmount,
          updatedAt: new Date().toISOString(),
        };
        return updated;
      }
      return r;
    }));

    try {
      const res = await fetch(`/api/motors/sell-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn("Could not sync sell request updates to server:", e);
    }

    return updated || (updates as SellRequest);
  };

  const convertSellRequestToInventory = async (requestId: string, overrides?: { salePrice?: number; description?: string; location?: string; featured?: boolean }): Promise<{ vehicle: Vehicle; sellRequest: SellRequest }> => {
    const request = sellRequests.find(r => r.id === requestId);
    if (!request) {
      throw new Error("Sell request not found");
    }

    const salePrice = overrides?.salePrice || request.askingPrice;

    const newVehicle: Vehicle = {
      id: `veh-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      make: request.vehicle.brand || "Toyota",
      model: request.vehicle.model || "Sedan",
      year: Number(request.vehicle.year) || new Date().getFullYear(),
      vehicleType: request.vehicle.vehicleType || "SUV",
      color: request.vehicle.color || "Black",
      mileage: typeof request.vehicle.mileage === 'number' ? request.vehicle.mileage : parseInt(String(request.vehicle.mileage).replace(/[^0-9]/g, '') || "50000"),
      fuelType: (request.vehicle.fuelType as any) || "Petrol",
      transmission: (request.vehicle.transmission as any) || "Automatic",
      engine: request.vehicle.engine || "2.0L",
      seats: request.vehicle.seats || 5,
      condition: (request.vehicle.condition as any) || "Foreign Used / Certified Import",
      location: overrides?.location || request.vehicle.location || "Kigali Showroom (Gikondo)",
      description: overrides?.description || `Certified pre-owned vehicle submitted by client. Clean title, inspected at YusKar Motors. ${request.vehicle.additionalDetails || ''}`,
      mainImage: request.vehicle.images[0] || "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      images: request.vehicle.images.length > 0 ? request.vehicle.images : ["https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"],
      listingType: "FOR_SALE",
      salePrice: salePrice,
      status: "AVAILABLE",
      featured: overrides?.featured || false,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setVehicles(prev => [newVehicle, ...prev]);
    
    // Update request status to LISTED
    let updatedRequest: SellRequest = {
      ...request,
      status: 'LISTED',
      convertedVehicleId: newVehicle.id,
      updatedAt: new Date().toISOString(),
    };
    setSellRequests(prev => prev.map(r => r.id === requestId ? updatedRequest : r));

    try {
      const res = await fetch(`/api/motors/sell-requests/${requestId}/convert-to-inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salePrice, ...overrides }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.vehicle) {
          setVehicles(prev => prev.map(v => v.id === newVehicle.id ? json.vehicle : v));
          if (json.sellRequest) {
            setSellRequests(prev => prev.map(r => r.id === requestId ? json.sellRequest : r));
            updatedRequest = json.sellRequest;
          }
          return { vehicle: json.vehicle, sellRequest: updatedRequest };
        }
      }
    } catch (e) {
      console.warn("Could not sync conversion to server, saved locally:", e);
    }

    return { vehicle: newVehicle, sellRequest: updatedRequest };
  };

  // Settings operations
  const updateSettings = async (updates: Partial<MotorsSettings>): Promise<MotorsSettings> => {
    const merged: MotorsSettings = {
      ...settings,
      ...updates,
      business: { ...settings.business, ...(updates.business || {}) },
      whatsapp: { ...settings.whatsapp, ...(updates.whatsapp || {}) },
      payment: { ...settings.payment, ...(updates.payment || {}) },
      contact: { ...settings.contact, ...(updates.contact || {}) },
    };

    setSettings(merged);

    try {
      const res = await fetch('/api/motors/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn("Could not sync settings to server:", e);
    }

    return merged;
  };

  const resetDefaultData = async () => {
    try {
      await fetch('/api/motors/reset', { method: 'POST' });
    } catch (e) {
      console.warn("Could not call reset endpoint:", e);
    }
    setVehicles(initialVehicles);
    setOrders(initialMotorsOrders);
    setSellRequests(initialSellRequests);
    setSettings(initialMotorsSettings);
    setHistoricalRecords(initialHistoricalRecords);
  };

  return (
    <MotorsContext.Provider
      value={{
        vehicles,
        orders,
        sellRequests,
        settings,
        historicalRecords,
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartRentalDays,
        clearCart,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        setVehicleStatus,
        toggleVehicleFeatured,
        createOrder,
        updateOrder,
        submitSellRequest,
        updateSellRequest,
        convertSellRequestToInventory,
        updateSettings,
        refreshData,
        resetDefaultData,
        formatCurrency,
        generateWhatsAppOrderUrl,
        generateWhatsAppSellUrl,
      }}
    >
      {children}
    </MotorsContext.Provider>
  );
};

export const useMotors = () => {
  const context = useContext(MotorsContext);
  if (!context) {
    throw new Error('useMotors must be used within a MotorsProvider');
  }
  return context;
};
