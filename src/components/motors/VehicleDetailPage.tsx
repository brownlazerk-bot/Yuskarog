import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Car, 
  Fuel, 
  Gauge, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingBag, 
  Key, 
  CheckCircle2, 
  Phone, 
  Share2, 
  Clock, 
  Award,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';
import { Vehicle } from '../../types/motors';

interface VehicleDetailPageProps {
  vehicleId: string;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({ vehicleId }) => {
  const { vehicles, addToCart, formatCurrency, settings } = useMotors();
  const { navigate, showToast } = useApp();

  const vehicle = useMemo(() => {
    return vehicles.find(v => v.id === vehicleId);
  }, [vehicles, vehicleId]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Buy & Rent Modal State
  const [modalMode, setModalMode] = useState<'BUY' | 'RENT' | null>(null);

  // Form inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Kigali');
  const [customerNotes, setCustomerNotes] = useState('');

  // Rental specific dates
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [pickupLocation, setPickupLocation] = useState('Kigali Showroom (Gikondo)');

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
        <MotorsHeaderNav />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <Car className="w-16 h-16 text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
          <p className="text-slate-400 text-sm mb-6">
            The vehicle you are looking for may have been removed or sold.
          </p>
          <button
            onClick={() => navigate('/motors')}
            className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isSale = vehicle.listingType === 'FOR_SALE';
  const isRent = vehicle.listingType === 'FOR_RENT';
  const isAvailable = vehicle.status === 'AVAILABLE';

  // Calculate rental days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  const rentalTotalAmount = (vehicle.rentalPrice || 0) * rentalDays;

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.mainImage];

  // Direct WhatsApp Inquiry
  const handleDirectWhatsApp = () => {
    const adminPhone = settings.whatsapp.adminWhatsAppNumber || '250795153994';
    const cleanNumber = adminPhone.replace(/[^0-9]/g, '');
    const priceText = isSale 
      ? formatCurrency(vehicle.salePrice || 0) 
      : `${formatCurrency(vehicle.rentalPrice || 0)} / ${vehicle.rentalPeriod || 'DAY'}`;

    const text = encodeURIComponent(
      `Muraho! Nshaka kumenya amakuru arambuye kuri ${vehicle.make} ${vehicle.model} (${vehicle.year}).
Listing: ${isSale ? 'KUGURA (BUY)' : 'GUKODESHA (RENT)'}
Igiciro: ${priceText}
Status: ${vehicle.status}
Link: ${window.location.origin}/#/motors/vehicle/${vehicle.id}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    if (isSale) {
      addToCart({
        vehicleId: vehicle.id,
        vehicle,
        action: 'BUY',
        customerName: customerName || 'Prospective Buyer',
        customerPhone: customerPhone || '+250 780 000 000',
        customerWhatsApp: customerWhatsApp || customerPhone || '+250 780 000 000',
        customerEmail,
        customerLocation,
        notes: customerNotes,
        salePrice: vehicle.salePrice || 0,
        totalAmount: vehicle.salePrice || 0,
      });
      showToast?.(`${vehicle.make} ${vehicle.model} added to YusKar Motors cart!`, 'success');
      navigate('/motors/cart');
    } else {
      setModalMode('RENT');
    }
  };

  // Handle Modal Form Submit
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast?.('Please provide your name and phone number', 'error');
      return;
    }

    if (modalMode === 'BUY') {
      addToCart({
        vehicleId: vehicle.id,
        vehicle,
        action: 'BUY',
        customerName,
        customerPhone,
        customerWhatsApp: customerWhatsApp || customerPhone,
        customerEmail,
        customerLocation,
        notes: customerNotes,
        salePrice: vehicle.salePrice || 0,
        totalAmount: vehicle.salePrice || 0,
      });
      showToast?.('Vehicle added to cart! Proceeding to checkout.', 'success');
      setModalMode(null);
      navigate('/motors/checkout');
    } else if (modalMode === 'RENT') {
      addToCart({
        vehicleId: vehicle.id,
        vehicle,
        action: 'RENT',
        customerName,
        customerPhone,
        customerWhatsApp: customerWhatsApp || customerPhone,
        customerEmail,
        customerLocation,
        notes: customerNotes,
        rentalDetails: {
          startDate,
          endDate,
          days: rentalDays,
          pricePerDay: vehicle.rentalPrice || 0,
          pickupLocation,
        },
        totalAmount: rentalTotalAmount,
      });
      showToast?.('Rental booking added to cart! Proceeding to checkout.', 'success');
      setModalMode(null);
      navigate('/motors/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab={isSale ? 'BUY' : 'RENT'} />

      {/* Breadcrumbs */}
      <div className="bg-[#090F1C] border-b border-slate-800/80 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button onClick={() => navigate('/motors')} className="hover:text-white transition-colors">
            Motors Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate(isSale ? '/motors/buy' : '/motors/rent')} 
            className="hover:text-white transition-colors"
          >
            {isSale ? 'Buy Vehicles' : 'Rent Vehicles'}
          </button>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-xs sm:max-w-md">
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </span>
        </div>
      </div>

      {/* Main Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Display Image */}
            <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={images[activeImageIndex] || vehicle.mainImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Status & Type Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow ${
                  isSale ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}>
                  {isSale ? 'For Sale' : 'For Rent'}
                </span>

                <span className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow ${
                  isAvailable 
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950/90 text-rose-300 border border-rose-500/40'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  {vehicle.status}
                </span>
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-slate-200 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{vehicle.location}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description Card */}
            <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Vehicle Overview & Description</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Specifications & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Price Header */}
            <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider">{vehicle.make}</span>
                <span className="font-mono bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">{vehicle.year}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4">
                {vehicle.make} {vehicle.model}
              </h1>

              {/* Price Callout */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 mb-6">
                <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">
                  {isSale ? 'Showroom Purchase Price (RWF)' : 'Rental Tariff / Day (RWF)'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-amber-400">
                    {isSale ? formatCurrency(vehicle.salePrice || 0) : formatCurrency(vehicle.rentalPrice || 0)}
                  </span>
                  {!isSale && (
                    <span className="text-xs text-slate-400">/ {vehicle.rentalPeriod || 'DAY'}</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Includes all Rwanda taxes & clean title warranty</span>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="space-y-2.5">
                {isSale ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setModalMode('BUY')}
                      disabled={!isAvailable}
                      className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                        isAvailable
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>BUY VEHICLE</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      disabled={!isAvailable}
                      className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
                        isAvailable
                          ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-800 text-slate-500 border-transparent cursor-not-allowed'
                      }`}
                    >
                      <span>ADD TO CART</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setModalMode('RENT')}
                      disabled={!isAvailable}
                      className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                        isAvailable
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>RENT VEHICLE</span>
                    </button>

                    <button
                      onClick={() => setModalMode('RENT')}
                      disabled={!isAvailable}
                      className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
                        isAvailable
                          ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-800 text-slate-500 border-transparent cursor-not-allowed'
                      }`}
                    >
                      <span>BOOK DATES</span>
                    </button>
                  </div>
                )}

                {/* Direct WhatsApp Action */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Chat with YusKar Motors on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Complete Specifications Grid */}
            <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Vehicle Specifications</span>
                <span className="text-[11px] text-amber-400 font-mono">100% Inspected</span>
              </h3>

              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Brand / Make:</span>
                  <strong className="text-white">{vehicle.make}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Model:</span>
                  <strong className="text-white">{vehicle.model}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Year:</span>
                  <strong className="text-white">{vehicle.year}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Vehicle Body:</span>
                  <strong className="text-white">{vehicle.vehicleType}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Mileage:</span>
                  <strong className="text-white font-mono">
                    {typeof vehicle.mileage === 'number' ? `${vehicle.mileage.toLocaleString()} km` : vehicle.mileage}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Fuel Type:</span>
                  <strong className="text-white">{vehicle.fuelType}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Transmission:</span>
                  <strong className="text-white">{vehicle.transmission}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Engine:</span>
                  <strong className="text-white">{vehicle.engine}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Seating Capacity:</span>
                  <strong className="text-white">{vehicle.seats} Passengers</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Color:</span>
                  <strong className="text-white">{vehicle.color}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Condition:</span>
                  <strong className="text-amber-400">{vehicle.condition}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Location:</span>
                  <strong className="text-white">{vehicle.location}</strong>
                </div>
              </div>
            </div>

            {/* Showroom Visit Box */}
            <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Physical Inspection & Test Drives</h4>
                  <p className="text-slate-400 leading-relaxed mb-2">
                    Visit YusKar Motors showroom in Gikondo Industrial Zone, Kigali. Our automotive technicians will walk you through all diagnostics.
                  </p>
                  <a
                    href={`tel:${settings.contact.phone || '+250726134041'}`}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Hotline: {settings.contact.phone || '+250 726 134 041'}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* BUY / RENT MODAL */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B1220] rounded-2xl border border-slate-700 w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-lg ${modalMode === 'BUY' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {modalMode === 'BUY' ? <ShoppingBag className="w-5 h-5" /> : <Key className="w-5 h-5" />}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {modalMode === 'BUY' ? 'Purchase Inquiry & Reservation' : 'Vehicle Rental Booking'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Rental Dates if RENT */}
              {modalMode === 'RENT' && (
                <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 space-y-3">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Rental Period & Pricing</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Start Date</label>
                      <input
                        type="date"
                        min={todayStr}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">End Date</label>
                      <input
                        type="date"
                        min={startDate || todayStr}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Pickup / Drop-off Location</label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="e.g. Kigali Airport, Gikondo Showroom, Hotel"
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-300">
                      Duration: <strong>{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</strong> ({formatCurrency(vehicle.rentalPrice || 0)}/day)
                    </span>
                    <strong className="text-emerald-400 text-sm font-heading">
                      Total: {formatCurrency(rentalTotalAmount)}
                    </strong>
                  </div>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-white">Your Contact Details</h4>

                <div>
                  <label className="text-slate-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patrick Mugabo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 788 123 456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="+250 795 153 994"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="client@example.rw"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Your Location / City</label>
                    <input
                      type="text"
                      placeholder="e.g. Kigali, Musanze, Rubavu"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Additional Notes or Request</label>
                  <textarea
                    rows={2}
                    placeholder="Specific requests, test drive schedule, driver option, etc."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl font-bold text-slate-950 transition-colors flex items-center gap-1.5 shadow-lg ${
                    modalMode === 'BUY'
                      ? 'bg-amber-500 hover:bg-amber-400'
                      : 'bg-emerald-500 hover:bg-emerald-400'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
