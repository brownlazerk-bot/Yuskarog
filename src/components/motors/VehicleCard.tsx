import React from 'react';
import { 
  Car, 
  Fuel, 
  Gauge, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '../../types/motors';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
  onAction?: (vehicle: Vehicle, action: 'BUY' | 'RENT') => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onSelect,
  onAction 
}) => {
  const { formatCurrency, settings } = useMotors();
  const { navigate } = useApp();

  const isSale = vehicle.listingType === 'FOR_SALE';
  const isRent = vehicle.listingType === 'FOR_RENT';

  const isAvailable = vehicle.status === 'AVAILABLE';
  const isReserved = vehicle.status === 'RESERVED';
  const isSold = vehicle.status === 'SOLD';
  const isRented = vehicle.status === 'RENTED';

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(vehicle);
    } else {
      navigate(`/motors/vehicle/${vehicle.id}`);
    }
  };

  const handleActionClick = (e: React.MouseEvent, action: 'BUY' | 'RENT') => {
    e.stopPropagation();
    if (onAction) {
      onAction(vehicle, action);
    } else {
      navigate(`/motors/vehicle/${vehicle.id}?action=${action}`);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const adminPhone = settings.whatsapp.adminWhatsAppNumber || '250795153994';
    const cleanNumber = adminPhone.replace(/[^0-9]/g, '');
    const priceText = isSale 
      ? formatCurrency(vehicle.salePrice || 0) 
      : `${formatCurrency(vehicle.rentalPrice || 0)} / ${vehicle.rentalPeriod || 'DAY'}`;

    const text = encodeURIComponent(
      `Muraho! Nshaka kumenya byinshi kuri ${vehicle.make} ${vehicle.model} (${vehicle.year}) - Igiciro: ${priceText}. Link: ${window.location.origin}/#/motors/vehicle/${vehicle.id}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-[#0B1220] rounded-2xl border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1"
    >
      {/* 1. Vehicle Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={vehicle.mainImage}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {/* Listing Type Badge */}
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider shadow-md ${
            isSale 
              ? 'bg-amber-500 text-slate-950' 
              : 'bg-emerald-500 text-slate-950'
          }`}>
            {isSale ? 'For Sale' : 'For Rent'}
          </span>

          {/* Condition or Featured Badge */}
          {vehicle.featured && (
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Featured
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md flex items-center gap-1 shadow-md ${
            isAvailable 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
              : isReserved
              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
              : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              isAvailable ? 'bg-emerald-400 animate-pulse' : isReserved ? 'bg-amber-400' : 'bg-rose-400'
            }`} />
            {vehicle.status}
          </span>
        </div>

        {/* Location chip at bottom-left of image */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1 text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate max-w-[200px]">{vehicle.location}</span>
        </div>
      </div>

      {/* 2. Vehicle Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Year Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              {vehicle.make}
            </span>
            <span className="font-mono bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 text-[11px]">
              {vehicle.year}
            </span>
          </div>

          {/* Model Title */}
          <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            {vehicle.make} {vehicle.model}
          </h3>

          {/* Price Tag */}
          <div className="mb-4">
            {isSale ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-heading">
                  {formatCurrency(vehicle.salePrice || 0)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Cash / Transfer</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-heading">
                  {formatCurrency(vehicle.rentalPrice || 0)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">/ {vehicle.rentalPeriod || 'DAY'}</span>
              </div>
            )}
          </div>

          {/* Key Automotive Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-[11px] text-slate-300 mb-4">
            <div className="flex items-center gap-1.5" title="Mileage">
              <Gauge className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span className="truncate font-mono">
                {typeof vehicle.mileage === 'number' ? `${(vehicle.mileage / 1000).toFixed(0)}k km` : vehicle.mileage}
              </span>
            </div>

            <div className="flex items-center gap-1.5" title="Fuel Type">
              <Fuel className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>

            <div className="flex items-center gap-1.5" title="Transmission">
              <Car className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* 3. Actions Button Row */}
        <div className="pt-1 flex items-center gap-2">
          {/* Primary Action Button: Buy or Rent */}
          {isSale ? (
            <button
              onClick={(e) => handleActionClick(e, 'BUY')}
              disabled={!isAvailable}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isAvailable
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{isAvailable ? 'BUY VEHICLE' : vehicle.status}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={(e) => handleActionClick(e, 'RENT')}
              disabled={!isAvailable}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isAvailable
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{isAvailable ? 'RENT VEHICLE' : vehicle.status}</span>
              <Calendar className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick WhatsApp Inquiry */}
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors shrink-0"
            title="Chat on WhatsApp about this car"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
