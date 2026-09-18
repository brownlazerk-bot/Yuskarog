import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Key, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Car, 
  X, 
  ArrowUpDown,
  Calendar,
  Fuel,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';
import { VehicleCard } from './VehicleCard';
import { FuelType, TransmissionType, VehicleListingType } from '../../types/motors';

interface MotorsCatalogPageProps {
  mode: 'BUY' | 'RENT';
}

export const MotorsCatalogPage: React.FC<MotorsCatalogPageProps> = ({ mode }) => {
  const { vehicles, formatCurrency } = useMotors();
  const { navigate } = useApp();

  const isBuy = mode === 'BUY';
  const targetListingType: VehicleListingType = isBuy ? 'FOR_SALE' : 'FOR_RENT';

  // Filters
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('ALL');
  const [vehicleType, setVehicleType] = useState('ALL');
  const [fuelType, setFuelType] = useState<string>('ALL');
  const [transmission, setTransmission] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_LOW' | 'PRICE_HIGH' | 'YEAR_DESC'>('NEWEST');
  const [maxPrice, setMaxPrice] = useState<number>(0);

  // Available brands for this listing type
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    vehicles
      .filter(v => v.listingType === targetListingType)
      .forEach(v => { if (v.make) set.add(v.make); });
    return Array.from(set).sort();
  }, [vehicles, targetListingType]);

  // Available vehicle types
  const availableVehicleTypes = useMemo(() => {
    const set = new Set<string>();
    vehicles
      .filter(v => v.listingType === targetListingType)
      .forEach(v => { if (v.vehicleType) set.add(v.vehicleType); });
    return Array.from(set).sort();
  }, [vehicles, targetListingType]);

  // Determine highest price in dataset for slider max
  const highestPrice = useMemo(() => {
    let max = 0;
    vehicles
      .filter(v => v.listingType === targetListingType)
      .forEach(v => {
        const p = isBuy ? (v.salePrice || 0) : (v.rentalPrice || 0);
        if (p > max) max = p;
      });
    return max || (isBuy ? 150000000 : 300000);
  }, [vehicles, targetListingType, isBuy]);

  // Active filtered vehicles
  const catalogVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Must be matching listing type
      if (v.listingType !== targetListingType) return false;

      // Must be active
      if (!v.active) return false;

      // In accordance with requirements:
      // "A vehicle marked SOLD must automatically disappear from active sale listings.
      // A vehicle marked RENTED must automatically disappear from available rental listings."
      if (isBuy && v.status === 'SOLD') return false;
      if (!isBuy && v.status === 'RENTED') return false;

      // Search keyword
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches = 
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.color.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Brand filter
      if (brand !== 'ALL' && v.make.toLowerCase() !== brand.toLowerCase()) {
        return false;
      }

      // Vehicle type filter
      if (vehicleType !== 'ALL' && v.vehicleType.toLowerCase() !== vehicleType.toLowerCase()) {
        return false;
      }

      // Fuel type filter
      if (fuelType !== 'ALL' && v.fuelType !== fuelType) {
        return false;
      }

      // Transmission filter
      if (transmission !== 'ALL' && v.transmission !== transmission) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'ALL' && !v.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      // Max Price
      if (maxPrice > 0) {
        const price = isBuy ? (v.salePrice || 0) : (v.rentalPrice || 0);
        if (price > maxPrice) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') {
        const pa = isBuy ? (a.salePrice || 0) : (a.rentalPrice || 0);
        const pb = isBuy ? (b.salePrice || 0) : (b.rentalPrice || 0);
        return pa - pb;
      }
      if (sortBy === 'PRICE_HIGH') {
        const pa = isBuy ? (a.salePrice || 0) : (a.rentalPrice || 0);
        const pb = isBuy ? (b.salePrice || 0) : (b.rentalPrice || 0);
        return pb - pa;
      }
      if (sortBy === 'YEAR_DESC') {
        return b.year - a.year;
      }
      // NEWEST
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [vehicles, targetListingType, isBuy, search, brand, vehicleType, fuelType, transmission, locationFilter, maxPrice, sortBy]);

  const hasActiveFilters = search || brand !== 'ALL' || vehicleType !== 'ALL' || fuelType !== 'ALL' || transmission !== 'ALL' || maxPrice > 0;

  const resetFilters = () => {
    setSearch('');
    setBrand('ALL');
    setVehicleType('ALL');
    setFuelType('ALL');
    setTransmission('ALL');
    setMaxPrice(0);
    setSortBy('NEWEST');
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab={isBuy ? 'BUY' : 'RENT'} />

      {/* Header Banner */}
      <div className="bg-[#0A101E] border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
                isBuy ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
              }`}>
                {isBuy ? 'Purchase Showroom Stock' : 'Executive Rental Fleet'}
              </span>
              <span className="text-xs text-slate-400">
                • {catalogVehicles.length} vehicles available
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white">
              {isBuy ? 'Vehicles For Sale in Rwanda' : 'Rent a Vehicle in Kigali & Rwanda'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {isBuy
                ? 'Thoroughly tested Japanese direct imports and verified Rwandan title vehicles with full RRA tax documentation.'
                : 'Self-drive or chauffeured VIP luxury SUVs, 4x4 safari Land Cruisers, and executive business sedans.'}
            </p>
          </div>

          {/* Quick toggle to other mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(isBuy ? '/motors/rent' : '/motors/buy')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-white flex items-center gap-2 transition-all"
            >
              {isBuy ? <Key className="w-4 h-4 text-emerald-400" /> : <ShoppingBag className="w-4 h-4 text-amber-400" />}
              <span>Switch to {isBuy ? 'Rentals' : 'Buy Inventory'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Listing Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Filter Bar */}
        <div className="bg-[#0B1220] p-4 sm:p-5 rounded-2xl border border-slate-800 mb-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search make, model, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                aria-label="Filter by brand"
                className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Brands</option>
                {availableBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type Filter */}
            <div>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                aria-label="Filter by vehicle type"
                className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="ALL">All Body Types</option>
                {availableVehicleTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort vehicles"
                className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="NEWEST">Newest Added</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="YEAR_DESC">Year: Newest First</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters: Fuel & Transmission */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-slate-300">Quick Filters:</span>
              
              {/* Fuel */}
              <div className="flex items-center gap-1">
                <span>Fuel:</span>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  aria-label="Filter by fuel type"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-[11px]"
                >
                  <option value="ALL">Any Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Transmission */}
              <div className="flex items-center gap-1">
                <span>Gearbox:</span>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  aria-label="Filter by transmission type"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-[11px]"
                >
                  <option value="ALL">Any Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        {catalogVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0B1220] rounded-2xl border border-slate-800 p-12 text-center max-w-xl mx-auto my-12">
            <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching vehicles found</h3>
            <p className="text-slate-400 text-xs mb-4">
              We couldn't find vehicles matching all selected filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
