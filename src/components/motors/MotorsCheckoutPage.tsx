import React, { useState } from 'react';
import { 
  CreditCard, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Lock, 
  ArrowLeft,
  Calendar,
  Car,
  ShoppingBag,
  Key,
  Copy,
  Check
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';
import { MotorsOrder } from '../../types/motors';

export const MotorsCheckoutPage: React.FC = () => {
  const { cart, createOrder, settings, formatCurrency } = useMotors();
  const { navigate, showToast } = useApp();

  const primaryItem = cart[0];

  // Customer Contact State (pre-filled from cart item if available)
  const [customerName, setCustomerName] = useState(primaryItem?.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(primaryItem?.customerPhone || '');
  const [customerWhatsApp, setCustomerWhatsApp] = useState(primaryItem?.customerWhatsApp || primaryItem?.customerPhone || '');
  const [customerEmail, setCustomerEmail] = useState(primaryItem?.customerEmail || '');
  const [customerLocation, setCustomerLocation] = useState(primaryItem?.customerLocation || 'Kigali, Rwanda');
  const [customerNotes, setCustomerNotes] = useState(primaryItem?.notes || '');

  // Payment inputs
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentSenderName, setPaymentSenderName] = useState('');
  const [amountPaid, setAmountPaid] = useState<number>(primaryItem?.totalAmount || 0);

  // Copied helper
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    order: MotorsOrder;
    whatsappUrl: string;
  } | null>(null);

  if (!primaryItem && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
        <MotorsHeaderNav currentTab="CHECKOUT" />
        <div className="max-w-xl mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <Car className="w-16 h-16 text-slate-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Vehicle Selected for Checkout</h2>
          <p className="text-slate-400 text-xs mb-6">
            Please browse our inventory to choose a vehicle for purchase or rental.
          </p>
          <button
            onClick={() => navigate('/motors')}
            className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const isRent = primaryItem?.action === 'RENT';
  const isBuy = primaryItem?.action === 'BUY';
  const totalAmount = primaryItem?.totalAmount || 0;

  const copyToClipboard = (text: string, isCode: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    showToast?.('Copied to clipboard!', 'info');
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast?.('Please fill out your contact name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createOrder({
        customer: {
          name: customerName,
          phone: customerPhone,
          whatsapp: customerWhatsApp || customerPhone,
          email: customerEmail,
          location: customerLocation,
        },
        vehicleId: primaryItem.vehicleId,
        vehicle: {
          id: primaryItem.vehicle.id,
          make: primaryItem.vehicle.make,
          model: primaryItem.vehicle.model,
          year: primaryItem.vehicle.year,
          mainImage: primaryItem.vehicle.mainImage,
          listingType: primaryItem.vehicle.listingType,
        },
        orderType: primaryItem.action,
        price: isBuy ? (primaryItem.vehicle.salePrice || 0) : (primaryItem.vehicle.rentalPrice || 0),
        rentalDetails: primaryItem.rentalDetails,
        totalAmount,
        paymentStatus: paymentReference.trim() ? 'PAYMENT_SUBMITTED' : 'PENDING',
        orderStatus: 'NEW',
        paymentMethod: settings.payment.methodName || 'MTN Mobile Money',
        paymentReference: paymentReference.trim() || undefined,
        paymentSenderName: paymentSenderName.trim() || customerName,
        amountPaid: amountPaid || totalAmount,
        customerNotes,
      });

      setCompletedOrder(result);
      showToast?.(`Order ${result.order.id} generated successfully!`, 'success');

      // Auto-open WhatsApp with formatted order message
      window.open(result.whatsappUrl, '_blank');
    } catch (err) {
      showToast?.('Error creating order. Please retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab="CHECKOUT" />

      {/* Header */}
      <div className="bg-[#0A101E] border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
              Secure Checkout & Booking
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Complete Your YusKar Motors Order
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted & Verified Escrow</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* COMPLETED ORDER SCREEN */}
        {completedOrder ? (
          <div className="bg-[#0B1220] rounded-3xl border border-emerald-500/40 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Order Registered Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
              Thank You, {completedOrder.order.customer.name}!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Your order has been recorded in the YusKar Motors dispatch system. Please finalize your confirmation via WhatsApp with our sales coordinator.
            </p>

            {/* Order Reference Box */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 mb-8 max-w-md mx-auto space-y-2">
              <span className="text-[11px] text-slate-400 block">Your Official Order Reference ID</span>
              <strong className="text-2xl font-mono font-bold text-amber-400 tracking-wider block">
                {completedOrder.order.id}
              </strong>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment Verification Pending (Admin Inspection)</span>
              </div>
            </div>

            {/* Order Recap */}
            <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 text-xs space-y-2.5 mb-8 max-w-md mx-auto text-left">
              <div className="flex justify-between text-slate-300">
                <span>Vehicle:</span>
                <strong className="text-white">
                  {completedOrder.order.vehicle.make} {completedOrder.order.vehicle.model} ({completedOrder.order.vehicle.year})
                </strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Action:</span>
                <strong className="text-amber-400 uppercase">
                  {completedOrder.order.orderType === 'BUY' ? 'Vehicle Purchase' : 'Vehicle Rental'}
                </strong>
              </div>
              {completedOrder.order.rentalDetails && (
                <div className="flex justify-between text-slate-300">
                  <span>Rental Period:</span>
                  <span>{completedOrder.order.rentalDetails.startDate} to {completedOrder.order.rentalDetails.endDate} ({completedOrder.order.rentalDetails.days} days)</span>
                </div>
              )}
              {completedOrder.order.paymentReference && (
                <div className="flex justify-between text-slate-300">
                  <span>Payment Ref / MoMo:</span>
                  <span className="font-mono text-white">{completedOrder.order.paymentReference}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-heading">{formatCurrency(completedOrder.order.totalAmount)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={completedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Order in WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setCompletedOrder(null);
                  navigate('/motors');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                Back to Motors Marketplace
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Details & MoMo Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section 1: Customer Contact */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px] text-amber-400">1</span>
                  <span>Customer Contact Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eric Manzi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 788 123 456"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="+250 795 153 994"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="client@example.rw"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-300 block mb-1">Your Delivery / Inspection Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Kiyovu, Kigali or Musanze"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-300 block mb-1">Order Notes / Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="Any specific delivery requirements, preferred handover hour, etc."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Mobile Money Payment Section */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px] text-amber-400">2</span>
                    <span>Payment Verification & MoMo Details</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{settings.payment.methodName || 'MTN Mobile Money'}</span>
                  </span>
                </div>

                {/* Configured Payment Account Display (Editable via admin settings) */}
                <div className="bg-gradient-to-br from-slate-900 to-[#0A101C] p-4 rounded-xl border border-amber-500/30 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Account Name:</span>
                    <strong className="text-white">{settings.payment.accountName || 'YUSKAR EMPIRE LTD - MOTORS'}</strong>
                  </div>

                  {settings.payment.merchantCode && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Merchant / MoMo Code:</span>
                        <strong className="text-amber-400 font-mono text-sm">{settings.payment.merchantCode}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(settings.payment.merchantCode, true)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {settings.payment.momoNumber && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Direct MoMo Number:</span>
                        <strong className="text-white font-mono text-sm">{settings.payment.momoNumber}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(settings.payment.momoNumber, false)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1"
                      >
                        {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                    {settings.payment.paymentInstructions || 'Send payment to the MoMo code or number above. Enter your transaction confirmation code below.'}
                  </p>
                </div>

                {/* Customer Payment Proof Inputs */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">
                      MoMo Transaction / Reference ID (Optional for fast verification)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TX-99482103 or BK-TRANSFER"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1">Sender Mobile Money Account Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Eric Manzi"
                        value={paymentSenderName}
                        onChange={(e) => setPaymentSenderName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1">Amount Transferred (RWF)</label>
                      <input
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Verification Notice */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-amber-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Manual Escrow Verification:</strong> Payments are verified by YusKar Motors accounting prior to vehicle key handover and registration sign-off.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Place Order (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5 sticky top-28">
                <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                  Order Breakdown
                </h3>

                {/* Vehicle Card Preview */}
                <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <img
                    src={primaryItem.vehicle.mainImage}
                    alt={primaryItem.vehicle.model}
                    className="w-20 h-16 rounded-lg object-cover bg-slate-950 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                      isBuy ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                    }`}>
                      {isBuy ? 'Purchase Order' : 'Rental Booking'}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate mt-1">
                      {primaryItem.vehicle.make} {primaryItem.vehicle.model}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">
                      Year {primaryItem.vehicle.year} • {primaryItem.vehicle.fuelType}
                    </span>
                  </div>
                </div>

                {/* Rental Details if RENT */}
                {isRent && primaryItem.rentalDetails && (
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <strong>{primaryItem.rentalDetails.days} Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dates:</span>
                      <span>{primaryItem.rentalDetails.startDate} → {primaryItem.rentalDetails.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rate / Day:</span>
                      <span className="font-mono">{formatCurrency(primaryItem.rentalDetails.pricePerDay)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pickup Location:</span>
                      <span className="truncate max-w-[180px]">{primaryItem.rentalDetails.pickupLocation}</span>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Base Vehicle Rate:</span>
                    <span className="font-mono text-white">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Appraisal & Title Guarantee:</span>
                    <span className="text-emerald-400 font-semibold">Included (Free)</span>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Grand Total (RWF):</span>
                    <strong className="text-2xl font-heading font-black text-amber-400">
                      {formatCurrency(totalAmount)}
                    </strong>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-heading font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Order & Generating WhatsApp...</span>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>PLACE ORDER & NOTIFY ON WHATSAPP</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/motors/cart')}
                    className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Motors Cart</span>
                  </button>
                </div>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
