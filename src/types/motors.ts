export type VehicleListingType = 'FOR_SALE' | 'FOR_RENT';

export type VehicleStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'RENTED';

export type VehicleCondition = 
  | 'Brand New' 
  | 'Foreign Used / Certified Import' 
  | 'Local Used' 
  | 'Auction Grade 4.5+';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';

export type TransmissionType = 'Automatic' | 'Manual';

export type RentalPeriod = 'DAY' | 'WEEK' | 'MONTH';

export interface Vehicle {
  id: string; // UUID
  make: string; // e.g. Toyota
  model: string; // e.g. Land Cruiser Prado TX-L
  year: number; // e.g. 2023
  vehicleType: string; // SUV, Sedan, Luxury 4x4, Pickup 4x4, Coupe, Van, Electric
  color: string;
  mileage: number; // in kilometers
  fuelType: FuelType;
  transmission: TransmissionType;
  engine: string; // e.g. 2.8L D-4D Turbo Diesel
  seats: number;
  condition: VehicleCondition;
  location: string;
  description: string;
  mainImage: string;
  images: string[];
  listingType: VehicleListingType; // FOR_SALE or FOR_RENT
  salePrice?: number; // RWF (required if FOR_SALE)
  rentalPrice?: number; // RWF (required if FOR_RENT)
  rentalPeriod?: RentalPeriod; // default DAY
  status: VehicleStatus; // AVAILABLE, RESERVED, SOLD, RENTED
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  location: string;
  notes?: string;
}

export type MotorsOrderType = 'BUY' | 'RENT';

export type MotorsOrderStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_SUBMITTED'
  | 'PAYMENT_VERIFIED'
  | 'RESERVED'
  | 'COMPLETED'
  | 'CANCELLED';

export type MotorsPaymentStatus = 
  | 'PENDING'
  | 'PAYMENT_SUBMITTED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'REFUNDED';

export interface RentalBookingDetails {
  startDate: string;
  endDate: string;
  days: number;
  pricePerDay: number;
  pickupLocation: string;
}

export interface MotorsCartItem {
  id: string; // UUID
  vehicleId: string;
  vehicle: Vehicle;
  action: MotorsOrderType;
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  customerEmail?: string;
  customerLocation: string;
  notes?: string;
  salePrice?: number;
  rentalDetails?: RentalBookingDetails;
  totalAmount: number;
  dateAdded: string;
}

export interface MotorsOrder {
  id: string; // e.g. YM-ORD-2026-XXXX
  orderReference: string;
  customer: CustomerInfo;
  vehicleId: string;
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    mainImage: string;
    listingType: VehicleListingType;
  };
  orderType: MotorsOrderType;
  price: number;
  rentalDetails?: RentalBookingDetails;
  totalAmount: number;
  paymentStatus: MotorsPaymentStatus;
  orderStatus: MotorsOrderStatus;
  paymentMethod: string;
  paymentReference?: string;
  paymentSenderName?: string;
  amountPaid?: number;
  customerNotes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SellRequestStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'LISTED' 
  | 'SOLD' 
  | 'REJECTED' 
  | 'CLOSED';

export interface SellRequest {
  id: string; // e.g. YM-SELL-2026-XXXX
  customer: {
    name: string;
    phone: string;
    whatsapp: string;
    email?: string;
    location: string;
    preferredContactMethod: 'WHATSAPP' | 'PHONE' | 'EMAIL';
  };
  vehicle: {
    brand: string;
    model: string;
    year: number;
    color: string;
    mileage: string | number;
    fuelType: string;
    transmission: string;
    engine: string;
    condition: string;
    registrationInfo: string;
    additionalDetails: string;
    images: string[];
    vehicleType?: string;
    seats?: number;
    location?: string;
  };
  askingPrice: number;
  commissionPercentage: number; // e.g. 10
  commissionAmount: number;
  sellerNetAmount: number;
  preferredConditions?: string;
  status: SellRequestStatus;
  convertedVehicleId?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MotorsSettings {
  business: {
    name: string;
    currency: string;
    sellingCommissionPercentage: number; // default 10%
  };
  whatsapp: {
    adminWhatsAppNumber: string; // e.g. "250795153994"
    welcomeOrderMessage: string;
  };
  payment: {
    methodName: string; // e.g. "MTN Mobile Money / MoMo Pay"
    momoNumber: string; // e.g. "+250 795 153 994"
    merchantCode: string; // e.g. "*182*8*1*99401#"
    accountName: string; // "YUSKAR EMPIRE LTD - MOTORS"
    paymentInstructions: string;
    active: boolean;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    location: string;
  };
}

export interface MotorsHistoricalRecord {
  id: string;
  orderId: string;
  vehicleId: string;
  vehicleTitle: string;
  vehicleImage: string;
  type: 'SALE' | 'RENTAL';
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  amount: number;
  rentalPeriod?: string;
  paymentReference?: string;
  date: string;
}
