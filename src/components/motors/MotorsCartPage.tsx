import React from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  ShoppingBag, 
  Key, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  ShieldCheck,
  CheckCircle2,
  Car
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';

export const MotorsCartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartRentalDays, clearCart, formatCurrency } = useMotors();
  const { navigate } = useApp();

  const totalCartAmount = cart.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab="CART" />

      {/* Header */}
      <div className="bg-[#0A101E] border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
              Order Basket
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              YusKar Motors Cart ({cart.length})
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Empty Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {cart.length === 0 ? (
          <div className="bg-[#0B1220] rounded-2xl border border-slate-800 p-12 text-center max-w-lg mx-auto my-12 shadow-xl">
            <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Your Motors Cart is Empty</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
              Explore our verified showroom stock for purchase or reserve an executive rental 4x4 or SUV.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('/motors/buy')}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Browse Vehicles For Sale</span>
              </button>
              <button
                onClick={() => navigate('/motors/rent')}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Browse Rentals</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map(item => {
                const isRent = item.action === 'RENT';
                const isBuy = item.action === 'BUY';

                return (
                  <div 
                    key={item.id}
                    className="bg-[#0B1220] rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl"
                  >
                    {/* Vehicle Thumbnail */}
                    <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-950 shrink-0 relative">
                      <img 
                        src={item.vehicle.mainImage} 
                        alt={item.vehicle.model}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        isBuy ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      }`}>
                        {isBuy ? 'For Sale' : 'Rental'}
                      </span>
                    </div>

                    {/* Vehicle Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span className="font-bold text-amber-400">{item.vehicle.make}</span>
                        <span>•</span>
                        <span>{item.vehicle.year}</span>
                        <span>•</span>
                        <span>{item.vehicle.vehicleType}</span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 truncate">
                        {item.vehicle.make} {item.vehicle.model}
                      </h3>

                      {/* Rental Date Adjuster if rental */}
                      {isRent && item.rentalDetails && (
                        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 mb-2 space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Rental: {item.rentalDetails.startDate} to {item.rentalDetails.endDate}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400">
                            <span>Pickup: {item.rentalDetails.pickupLocation}</span>
                            <span>{item.rentalDetails.days} Days @ {formatCurrency(item.rentalDetails.pricePerDay)}/day</span>
                          </div>
                        </div>
                      )}

                      {/* Pricing Tag */}
                      <div className="text-lg font-heading font-black text-amber-400">
                        {formatCurrency(item.totalAmount)}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors shrink-0 self-end sm:self-center"
                      title="Remove vehicle from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Continue Shopping Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/motors')}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Browsing Marketplace</span>
                </button>
              </div>
            </div>

            {/* Order Summary Box (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Vehicles in Cart:</span>
                    <strong className="text-white font-mono">{cart.length}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Registration & Transfer:</span>
                    <span className="text-emerald-400 font-semibold">Free Appraisal Included</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Estimated Total:</span>
                    <strong className="text-2xl font-heading font-black text-amber-400">
                      {formatCurrency(totalCartAmount)}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/motors/checkout')}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 transition-colors cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-slate-400 space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Physical inspection available at Kigali showroom</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct MoMo & Bank transfer support</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
