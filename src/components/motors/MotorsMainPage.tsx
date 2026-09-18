import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Key, 
  Tag, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Truck, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal,
  Car,
  ChevronRight
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';
import { VehicleCard } from './VehicleCard';

export const MotorsMainPage: React.FC = () => {
  const { vehicles, settings } = useMotors();
  const { navigate } = useApp();

  // Search & Filter state on homepage
  const [searchTerm, setSearchTerm] = useState('');
  const [listingTypeFilter, setListingTypeFilter] = useState<'ALL' | 'FOR_SALE' | 'FOR_RENT'>('ALL');
  const [brandFilter, setBrandFilter] = useState<string>('ALL');
  const [bodyTypeFilter, setBodyTypeFilter] = useState<string>('ALL');

  // Extract available brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    vehicles.forEach(v => { if (v.make) set.add(v.make); });
    return Array.from(set).sort();
  }, [vehicles]);

  // Extract available body types
  const bodyTypes = useMemo(() => {
    const set = new Set<string>();
    vehicles.forEach(v => { if (v.vehicleType) set.add(v.vehicleType); });
    return Array.from(set).sort();
  }, [vehicles]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Must be active
      if (!v.active) return false;

      // In accordance with requirements:
      // "A vehicle marked SOLD must automatically disappear from active sale listings.
      // A vehicle marked RENTED must automatically disappear from available rental listings."
      if (v.listingType === 'FOR_SALE' && v.status === 'SOLD') return false;
      if (v.listingType === 'FOR_RENT' && v.status === 'RENTED') return false;

      // Listing Type filter
      if (listingTypeFilter !== 'ALL' && v.listingType !== listingTypeFilter) {
        return false;
      }

      // Brand filter
      if (brandFilter !== 'ALL' && v.make.toLowerCase() !== brandFilter.toLowerCase()) {
        return false;
      }

      // Body Type filter
      if (bodyTypeFilter !== 'ALL' && v.vehicleType.toLowerCase() !== bodyTypeFilter.toLowerCase()) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchMake = v.make.toLowerCase().includes(q);
        const matchModel = v.model.toLowerCase().includes(q);
        const matchLocation = v.location.toLowerCase().includes(q);
        const matchYear = String(v.year).includes(q);
        const matchFuel = v.fuelType.toLowerCase().includes(q);
        if (!matchMake && !matchModel && !matchLocation && !matchYear && !matchFuel) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, listingTypeFilter, brandFilter, bodyTypeFilter, searchTerm]);

  // Featured vehicles
  const featuredVehicles = useMemo(() => {
    return filteredVehicles.filter(v => v.featured);
  }, [filteredVehicles]);

  const commissionPercent = settings.business.sellingCommissionPercentage || 10;

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab="HOME" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-900/40 to-[#050A14] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Rwanda's Trusted Automotive Marketplace
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-heading font-black tracking-tight text-white mb-4">
              Drive Your Vision with <span className="text-amber-400">YusKar Motors</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              Premium vehicle acquisitions, corporate & safari executive rentals, and a transparent {commissionPercent}% commission vehicle sales portal in Kigali, Rwanda.
            </p>
          </div>

          {/* 3 Main Action Cards (BUY / RENT / SELL) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
            {/* ACTION 1: BUY A VEHICLE */}
            <div 
              onClick={() => navigate('/motors/buy')}
              className="group bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-amber-500/60 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Certified Stock
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  BUY A VEHICLE
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Find and purchase verified showroom cars, SUVs, and direct imports with clean titles and certified mechanical inspections.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 gap-1.5 pt-4 border-t border-slate-800/80">
                <span>Browse Inventory for Sale</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* ACTION 2: RENT A VEHICLE */}
            <div 
              onClick={() => navigate('/motors/rent')}
              className="group bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Key className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Executive Fleet
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  RENT A VEHICLE
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Short & long-term rentals: Executive SUVs, diplomatic 4x4s, safari ready Land Cruisers, and luxury wedding fleets in Rwanda.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:text-emerald-300 gap-1.5 pt-4 border-t border-slate-800/80">
                <span>Explore Rental Fleet</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* ACTION 3: SELL YOUR VEHICLE */}
            <div 
              onClick={() => navigate('/motors/sell')}
              className="group bg-gradient-to-b from-[#18130B] to-[#0F0D17] p-6 sm:p-7 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow">
                {commissionPercent}% Commission
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Tag className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                    Sell Through YusKar
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  SELL YOUR VEHICLE
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Submit your vehicle details. We inspect, market, and match with qualified cash buyers. You keep 90% and YusKar handles the rest.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 gap-1.5 pt-4 border-t border-amber-500/20">
                <span>Submit Vehicle for Listing</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Interactive Search & Filter Bar */}
          <div className="bg-[#0B1220] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {/* Search Keywords */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search make, model, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Listing Type Selector */}
              <div>
                <select
                  value={listingTypeFilter}
                  onChange={(e) => setListingTypeFilter(e.target.value as any)}
                  aria-label="Filter by listing type"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="ALL">All Categories (Buy & Rent)</option>
                  <option value="FOR_SALE">Vehicles For Sale</option>
                  <option value="FOR_RENT">Vehicles For Rent</option>
                </select>
              </div>

              {/* Brand Selector */}
              <div>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  aria-label="Filter by vehicle brand"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="ALL">All Brands (Toyota, Mercedes, etc.)</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Body Type Selector */}
              <div>
                <select
                  value={bodyTypeFilter}
                  onChange={(e) => setBodyTypeFilter(e.target.value)}
                  aria-label="Filter by vehicle body type"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="ALL">All Vehicle Types (SUV, 4x4, Sedan)</option>
                  {bodyTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter tags & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Showing <strong className="text-white">{filteredVehicles.length}</strong> vehicles matching criteria</span>
              </div>

              {(searchTerm || listingTypeFilter !== 'ALL' || brandFilter !== 'ALL' || bodyTypeFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setListingTypeFilter('ALL');
                    setBrandFilter('ALL');
                    setBodyTypeFilter('ALL');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Inventory Catalog */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Car className="w-4 h-4" />
              Automotive Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {listingTypeFilter === 'FOR_SALE' 
                ? 'Vehicles For Sale' 
                : listingTypeFilter === 'FOR_RENT' 
                ? 'Vehicles For Rent' 
                : 'Available Marketplace Vehicles'}
            </h2>
          </div>

          {/* Listing Type Quick Switch Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setListingTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listingTypeFilter === 'ALL'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({vehicles.filter(v => v.active && v.status !== 'SOLD' && v.status !== 'RENTED').length})
            </button>
            <button
              onClick={() => setListingTypeFilter('FOR_SALE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listingTypeFilter === 'FOR_SALE'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Sale ({vehicles.filter(v => v.listingType === 'FOR_SALE' && v.status !== 'SOLD' && v.active).length})
            </button>
            <button
              onClick={() => setListingTypeFilter('FOR_RENT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listingTypeFilter === 'FOR_RENT'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Rent ({vehicles.filter(v => v.listingType === 'FOR_RENT' && v.status !== 'RENTED' && v.active).length})
            </button>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0B1220] rounded-2xl border border-slate-800 p-12 text-center max-w-xl mx-auto">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No vehicles found</h3>
            <p className="text-slate-400 text-xs mb-4">
              Try adjusting your search keywords, brand filters, or view all listing categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setListingTypeFilter('ALL');
                setBrandFilter('ALL');
                setBodyTypeFilter('ALL');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Trust & Guarantee Section */}
      <section className="bg-[#080E1C] border-t border-slate-800/80 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white mb-2">
              Why Transact Through YusKar Motors Rwanda?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Standardized inspection, secure escrow-style payment verification, and seamless ownership transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B1220] p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">120-Point Inspection</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Engine compression, transmission health, chassis alignment, and diagnostics verified by certified mechanics.
              </p>
            </div>

            <div className="bg-[#0B1220] p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Clean Title & Tax Cleared</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Guaranteed RRA customs tax clearance, Rwanda registration plate authentication, and no lien guarantee.
              </p>
            </div>

            <div className="bg-[#0B1220] p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{commissionPercent}% Fair Commission</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Transparent seller portal. Zero hidden broker markups. We only take {commissionPercent}% upon successful closing.
              </p>
            </div>

            <div className="bg-[#0B1220] p-5 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Nationwide Delivery</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Direct vehicle delivery to your residence, office, or airport pickup point anywhere in Rwanda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Contact Callout */}
      <section className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-black mb-1">
              Visit Our Kigali Showroom or Book a Private Test Drive
            </h3>
            <p className="text-slate-950/80 text-xs sm:text-sm font-medium">
              Located in Gikondo Industrial Zone, Kigali. Open Monday to Saturday: 8:00 AM – 6:30 PM.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${settings.contact.phone || '+250726134041'}`}
              className="px-5 py-3 bg-slate-950 text-white hover:bg-slate-900 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: {settings.contact.phone || '+250 726 134 041'}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp.adminWhatsAppNumber || '250795153994'}?text=${encodeURIComponent("Muraho! Nshaka gusura Kigali Showroom ya YusKar Motors.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-700 text-white hover:bg-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
