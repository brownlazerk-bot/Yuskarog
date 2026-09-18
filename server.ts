import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { 
  initialVehicles, 
  initialMotorsSettings, 
  initialMotorsOrders, 
  initialSellRequests, 
  initialHistoricalRecords 
} from "./src/data/initialMotorsData";
import { Vehicle, MotorsSettings, MotorsOrder, SellRequest, MotorsHistoricalRecord } from "./src/types/motors";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Persistent Storage File Path
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "motors-db.json");

interface MotorsDatabase {
  vehicles: Vehicle[];
  orders: MotorsOrder[];
  sellRequests: SellRequest[];
  settings: MotorsSettings;
  historicalRecords: MotorsHistoricalRecord[];
}

function loadDatabase(): MotorsDatabase {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        vehicles: parsed.vehicles || initialVehicles,
        orders: parsed.orders || initialMotorsOrders,
        sellRequests: parsed.sellRequests || initialSellRequests,
        settings: parsed.settings || initialMotorsSettings,
        historicalRecords: parsed.historicalRecords || initialHistoricalRecords,
      };
    }
  } catch (err) {
    console.error("Error reading database file, using initial data:", err);
  }

  const defaultDb: MotorsDatabase = {
    vehicles: initialVehicles,
    orders: initialMotorsOrders,
    sellRequests: initialSellRequests,
    settings: initialMotorsSettings,
    historicalRecords: initialHistoricalRecords,
  };

  saveDatabase(defaultDb);
  return defaultDb;
}

function saveDatabase(db: MotorsDatabase): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// In-Memory Database Cache backed by disk
let db: MotorsDatabase = loadDatabase();

// -------------------------------------------------------------
// API ROUTES: YUSKAR MOTORS
// -------------------------------------------------------------

// 1. Get complete motors dataset
app.get("/api/motors/data", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: db,
  });
});

// 2. Vehicles CRUD
app.get("/api/motors/vehicles", (req: Request, res: Response) => {
  const { listingType, status, make, vehicleType, search } = req.query;
  let filtered = [...db.vehicles];

  if (listingType) {
    filtered = filtered.filter(v => v.listingType === listingType);
  }
  if (status) {
    filtered = filtered.filter(v => v.status === status);
  }
  if (make) {
    filtered = filtered.filter(v => v.make.toLowerCase() === String(make).toLowerCase());
  }
  if (vehicleType) {
    filtered = filtered.filter(v => v.vehicleType.toLowerCase() === String(vehicleType).toLowerCase());
  }
  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(v => 
      v.make.toLowerCase().includes(q) || 
      v.model.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.color.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get("/api/motors/vehicles/:id", (req: Request, res: Response) => {
  const vehicle = db.vehicles.find(v => v.id === req.params.id);
  if (!vehicle) {
    res.status(404).json({ success: false, message: "Vehicle not found" });
    return;
  }
  res.json({ success: true, data: vehicle });
});

app.post("/api/motors/vehicles", (req: Request, res: Response) => {
  const newVehicle: Vehicle = {
    ...req.body,
    id: req.body.id || `veh-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: req.body.status || "AVAILABLE",
    active: req.body.active !== undefined ? req.body.active : true,
  };

  db.vehicles.unshift(newVehicle);
  saveDatabase(db);

  res.status(201).json({ success: true, data: newVehicle });
});

app.put("/api/motors/vehicles/:id", (req: Request, res: Response) => {
  const index = db.vehicles.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Vehicle not found" });
    return;
  }

  const updated: Vehicle = {
    ...db.vehicles[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  db.vehicles[index] = updated;
  saveDatabase(db);

  res.json({ success: true, data: updated });
});

app.delete("/api/motors/vehicles/:id", (req: Request, res: Response) => {
  const initialLen = db.vehicles.length;
  db.vehicles = db.vehicles.filter(v => v.id !== req.params.id);

  if (db.vehicles.length === initialLen) {
    res.status(404).json({ success: false, message: "Vehicle not found" });
    return;
  }

  saveDatabase(db);
  res.json({ success: true, message: "Vehicle deleted successfully" });
});

// 3. Orders & Rentals
app.get("/api/motors/orders", (_req: Request, res: Response) => {
  res.json({ success: true, count: db.orders.length, data: db.orders });
});

app.post("/api/motors/orders", (req: Request, res: Response) => {
  const orderId = `YM-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: MotorsOrder = {
    ...req.body,
    id: req.body.id || orderId,
    orderReference: req.body.orderReference || orderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderStatus: req.body.orderStatus || "NEW",
    paymentStatus: req.body.paymentStatus || "PAYMENT_SUBMITTED",
  };

  db.orders.unshift(newOrder);

  // If order was created, keep vehicle reserved or available as configured
  const vIndex = db.vehicles.findIndex(v => v.id === newOrder.vehicleId);
  if (vIndex !== -1 && req.body.reserveVehicle) {
    db.vehicles[vIndex].status = "RESERVED";
    db.vehicles[vIndex].updatedAt = new Date().toISOString();
  }

  saveDatabase(db);
  res.status(201).json({ success: true, data: newOrder });
});

app.put("/api/motors/orders/:id", (req: Request, res: Response) => {
  const index = db.orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Order not found" });
    return;
  }

  const prevOrder = db.orders[index];
  const updatedOrder: MotorsOrder = {
    ...prevOrder,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  db.orders[index] = updatedOrder;

  // Requirement: For completed BUY orders: vehicle status automatically becomes SOLD.
  // For completed RENT orders: vehicle availability updates according to rental period (RENTED).
  if (updatedOrder.orderStatus === "COMPLETED" && prevOrder.orderStatus !== "COMPLETED") {
    const vIndex = db.vehicles.findIndex(v => v.id === updatedOrder.vehicleId);
    if (vIndex !== -1) {
      if (updatedOrder.orderType === "BUY") {
        db.vehicles[vIndex].status = "SOLD";
      } else if (updatedOrder.orderType === "RENT") {
        db.vehicles[vIndex].status = "RENTED";
      }
      db.vehicles[vIndex].updatedAt = new Date().toISOString();
    }

    // Add to historical record archive
    const histRecord: MotorsHistoricalRecord = {
      id: `HIST-${Date.now().toString(36)}`,
      orderId: updatedOrder.id,
      vehicleId: updatedOrder.vehicleId,
      vehicleTitle: `${updatedOrder.vehicle.make} ${updatedOrder.vehicle.model} (${updatedOrder.vehicle.year})`,
      vehicleImage: updatedOrder.vehicle.mainImage,
      type: updatedOrder.orderType === "BUY" ? "SALE" : "RENTAL",
      customerName: updatedOrder.customer.name,
      customerPhone: updatedOrder.customer.phone,
      customerWhatsApp: updatedOrder.customer.whatsapp,
      amount: updatedOrder.totalAmount,
      rentalPeriod: updatedOrder.rentalDetails ? `${updatedOrder.rentalDetails.startDate} to ${updatedOrder.rentalDetails.endDate} (${updatedOrder.rentalDetails.days} Days)` : undefined,
      paymentReference: updatedOrder.paymentReference,
      date: new Date().toISOString(),
    };
    db.historicalRecords.unshift(histRecord);
  }

  saveDatabase(db);
  res.json({ success: true, data: updatedOrder });
});

// 4. Sell Requests
app.get("/api/motors/sell-requests", (_req: Request, res: Response) => {
  res.json({ success: true, count: db.sellRequests.length, data: db.sellRequests });
});

app.post("/api/motors/sell-requests", (req: Request, res: Response) => {
  const reqId = `YM-SELL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const askingPrice = Number(req.body.askingPrice) || 0;
  const commissionPercentage = Number(req.body.commissionPercentage) || db.settings.business.sellingCommissionPercentage || 10;
  const commissionAmount = Math.round((askingPrice * commissionPercentage) / 100);
  const sellerNetAmount = askingPrice - commissionAmount;

  const newRequest: SellRequest = {
    ...req.body,
    id: req.body.id || reqId,
    askingPrice,
    commissionPercentage,
    commissionAmount,
    sellerNetAmount,
    status: req.body.status || "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.sellRequests.unshift(newRequest);
  saveDatabase(db);

  res.status(201).json({ success: true, data: newRequest });
});

app.put("/api/motors/sell-requests/:id", (req: Request, res: Response) => {
  const index = db.sellRequests.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Sell request not found" });
    return;
  }

  const updated: SellRequest = {
    ...db.sellRequests[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  // Recalculate commission if asking price or commission % was updated
  if (req.body.askingPrice !== undefined || req.body.commissionPercentage !== undefined) {
    const askingPrice = Number(updated.askingPrice) || 0;
    const commissionPercentage = Number(updated.commissionPercentage) || 10;
    updated.commissionAmount = Math.round((askingPrice * commissionPercentage) / 100);
    updated.sellerNetAmount = askingPrice - updated.commissionAmount;
  }

  db.sellRequests[index] = updated;
  saveDatabase(db);

  res.json({ success: true, data: updated });
});

// Convert approved sell request to inventory vehicle
app.post("/api/motors/sell-requests/:id/convert-to-inventory", (req: Request, res: Response) => {
  const index = db.sellRequests.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Sell request not found" });
    return;
  }

  const request = db.sellRequests[index];
  const salePrice = Number(req.body.salePrice) || request.askingPrice;

  const newVehicle: Vehicle = {
    id: `veh-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
    make: request.vehicle.brand || "Toyota",
    model: request.vehicle.model || "Sedan",
    year: Number(request.vehicle.year) || new Date().getFullYear(),
    vehicleType: request.vehicle.vehicleType || "SUV",
    color: request.vehicle.color || "Black",
    mileage: typeof request.vehicle.mileage === "number" ? request.vehicle.mileage : parseInt(String(request.vehicle.mileage).replace(/[^0-9]/g, "") || "50000"),
    fuelType: (request.vehicle.fuelType as any) || "Petrol",
    transmission: (request.vehicle.transmission as any) || "Automatic",
    engine: request.vehicle.engine || "2.0L",
    seats: request.vehicle.seats || 5,
    condition: (request.vehicle.condition as any) || "Foreign Used / Certified Import",
    location: req.body.location || request.vehicle.location || "Kigali Showroom (Gikondo)",
    description: req.body.description || `Certified pre-owned vehicle submitted by client. Clean title, thoroughly verified at YusKar Motors Gikondo center. ${request.vehicle.additionalDetails || ""}`,
    mainImage: request.vehicle.images[0] || "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    images: request.vehicle.images.length > 0 ? request.vehicle.images : ["https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"],
    listingType: "FOR_SALE",
    salePrice: salePrice,
    status: "AVAILABLE",
    featured: req.body.featured || false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.vehicles.unshift(newVehicle);
  
  // Mark request as LISTED
  db.sellRequests[index].status = "LISTED";
  db.sellRequests[index].convertedVehicleId = newVehicle.id;
  db.sellRequests[index].updatedAt = new Date().toISOString();

  saveDatabase(db);

  res.status(201).json({
    success: true,
    message: "Sell request converted into inventory vehicle successfully",
    vehicle: newVehicle,
    sellRequest: db.sellRequests[index],
  });
});

// 5. Settings
app.get("/api/motors/settings", (_req: Request, res: Response) => {
  res.json({ success: true, data: db.settings });
});

app.put("/api/motors/settings", (req: Request, res: Response) => {
  db.settings = {
    ...db.settings,
    ...req.body,
    business: {
      ...db.settings.business,
      ...(req.body.business || {}),
    },
    whatsapp: {
      ...db.settings.whatsapp,
      ...(req.body.whatsapp || {}),
    },
    payment: {
      ...db.settings.payment,
      ...(req.body.payment || {}),
    },
    contact: {
      ...db.settings.contact,
      ...(req.body.contact || {}),
    },
  };

  saveDatabase(db);
  res.json({ success: true, data: db.settings });
});

// 6. Historical Records
app.get("/api/motors/records", (_req: Request, res: Response) => {
  res.json({ success: true, count: db.historicalRecords.length, data: db.historicalRecords });
});

// 7. Reset to default data
app.post("/api/motors/reset", (_req: Request, res: Response) => {
  db = {
    vehicles: initialVehicles,
    orders: initialMotorsOrders,
    sellRequests: initialSellRequests,
    settings: initialMotorsSettings,
    historicalRecords: initialHistoricalRecords,
  };
  saveDatabase(db);
  res.json({ success: true, message: "YusKar Motors database reset to initial seed data", data: db });
});

// -------------------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVING
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`YusKar Empire server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
