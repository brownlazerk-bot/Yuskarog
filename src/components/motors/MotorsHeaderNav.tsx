import React from 'react';
import { 
  Car, 
  ShoppingBag, 
  Key, 
  Tag, 
  Phone, 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Search,
  ShoppingCart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useMotors } from '../../context/MotorsContext';

interface MotorsHeaderNavProps {
  currentTab?: 'HOME' | 'BUY' | 'RENT' | 'SELL' | 'CART' | 'CHECKOUT';
}

export const MotorsHeaderNav: React.FC<MotorsHeaderNavProps> = ({ currentTab = 'HOME' }) => {
  const { navigate } = useApp();
  const { cart, settings } = useMotors();

  return (
    <div className="bg-[#070D18] border-b border-slate-800/80 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Hotline Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
              Official Hub
            </span>
            <span className="hidden sm:inline text-slate-950 font-bold">
              YusKar Motors Rwanda • Verified Showroom & Direct Japanese / German Imports
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <a 
              href={`tel:${settings.contact.phone || '+250726134041'}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {settings.contact.phone || '+250 726 134 041'}</span>
            </a>
            <span className="text-slate-900/40">|</span>
            <a 
              href={`https://wa.me/${settings.whatsapp.adminWhatsAppNumber || '250795153994'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
              <span>WhatsApp: +{settings.whatsapp.adminWhatsAppNumber || '250 795 153 994'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Motors Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand & Empire Return */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden md:flex items-center gap-1 text-xs font-semibold"
              title="Return to YusKar Empire Portal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Empire Home</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden md:block" />

            <div 
              onClick={() => navigate('/motors')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
                    YusKar <span className="text-amber-400">Motors</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                  Automotive Marketplace Rwanda
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => navigate('/motors')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'HOME'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </button>

            <button
              onClick={() => navigate('/motors/buy')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'BUY'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy a Vehicle</span>
            </button>

            <button
              onClick={() => navigate('/motors/rent')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'RENT'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Rent a Vehicle</span>
            </button>

            <button
              onClick={() => navigate('/motors/sell')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'SELL'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Sell Your Vehicle</span>
              <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-black">
                {settings.business.sellingCommissionPercentage || 10}% Commission
              </span>
            </button>
          </div>

          {/* Right Actions: Cart & Quick Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button with Counter */}
            <button
              onClick={() => navigate('/motors/cart')}
              className={`relative px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                currentTab === 'CART' || currentTab === 'CHECKOUT'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900/90 text-white border-slate-700/80 hover:border-amber-500/50'
              }`}
              title="View Motors Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center -mr-1">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Quick Sell CTA for mobile / tablet */}
            <button
              onClick={() => navigate('/motors/sell')}
              className="lg:hidden px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Sell Car</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="lg:hidden flex items-center justify-between border-t border-slate-800/80 py-2.5 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
          <button
            onClick={() => navigate('/motors')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              currentTab === 'HOME' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            All Marketplace
          </button>
          <button
            onClick={() => navigate('/motors/buy')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              currentTab === 'BUY' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Buy Vehicles
          </button>
          <button
            onClick={() => navigate('/motors/rent')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              currentTab === 'RENT' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Rent Vehicles
          </button>
          <button
            onClick={() => navigate('/motors/sell')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              currentTab === 'SELL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-400'
            }`}
          >
            Sell (10% Comm)
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap text-slate-500"
          >
            ← Empire Hub
          </button>
        </div>
      </div>
    </div>
  );
};
