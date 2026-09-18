import React, { useState } from 'react';
import { 
  Tag, 
  Calculator, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  MessageSquare, 
  Phone, 
  DollarSign, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  Send,
  Camera,
  FileCheck2,
  Clock
} from 'lucide-react';
import { useMotors } from '../../context/MotorsContext';
import { useApp } from '../../context/AppContext';
import { MotorsHeaderNav } from './MotorsHeaderNav';
import { FuelType, TransmissionType, VehicleCondition } from '../../types/motors';

export const SellVehiclePage: React.FC = () => {
  const { submitSellRequest, settings, formatCurrency } = useMotors();
  const { navigate, showToast } = useApp();

  const commissionPercent = settings.business.sellingCommissionPercentage || 10;

  // Form State: Customer
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Kigali, Rwanda');
  const [preferredContact, setPreferredContact] = useState<'WHATSAPP' | 'PHONE' | 'EMAIL'>('WHATSAPP');

  // Form State: Vehicle Details
  const [brand, setBrand] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2020);
  const [vehicleType, setVehicleType] = useState('SUV');
  const [color, setColor] = useState('Black');
  const [mileage, setMileage] = useState<string>('50,000 km');
  const [fuelType, setFuelType] = useState<FuelType>('Petrol');
  const [transmission, setTransmission] = useState<TransmissionType>('Automatic');
  const [engine, setEngine] = useState('2.0L Petrol');
  const [seats, setSeats] = useState<number>(5);
  const [condition, setCondition] = useState<VehicleCondition>('Foreign Used / Certified Import');
  const [registrationInfo, setRegistrationInfo] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [photoUrlsInput, setPhotoUrlsInput] = useState('');

  // Form State: Financials
  const [askingPrice, setAskingPrice] = useState<number>(20000000);
  const [preferredConditions, setPreferredConditions] = useState('');

  // Submission result state
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    requestId: string;
    whatsappUrl: string;
    askingPrice: number;
    commissionAmount: number;
    sellerNetAmount: number;
  } | null>(null);

  // Dynamic Commission Calculations
  const calculatedCommission = Math.round((askingPrice * commissionPercent) / 100);
  const sellerNetAmount = askingPrice - calculatedCommission;

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !brand || !model || !askingPrice) {
      showToast?.('Please fill out all required fields marked with *', 'error');
      return;
    }

    setSubmitting(true);

    const images = photoUrlsInput
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 5);

    if (images.length === 0) {
      // Default placeholder car image if none entered
      images.push('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80');
    }

    try {
      const { request, whatsappUrl } = await submitSellRequest({
        customer: {
          name: customerName,
          phone: customerPhone,
          whatsapp: customerWhatsApp || customerPhone,
          email: customerEmail,
          location: customerLocation,
          preferredContactMethod: preferredContact,
        },
        vehicle: {
          brand,
          model,
          year,
          vehicleType,
          color,
          mileage,
          fuelType,
          transmission,
          engine,
          seats,
          condition,
          registrationInfo: registrationInfo || 'Clean Title - Inspected',
          additionalDetails,
          images,
          location: customerLocation,
        },
        askingPrice,
        commissionPercentage: commissionPercent,
        preferredConditions,
      });

      setSubmittedResult({
        requestId: request.id,
        whatsappUrl,
        askingPrice: request.askingPrice,
        commissionAmount: request.commissionAmount,
        sellerNetAmount: request.sellerNetAmount,
      });

      showToast?.(`Sell request submitted! Request ID: ${request.id}`, 'success');

      // Auto open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    } catch (err: any) {
      showToast?.('Error submitting vehicle for sale. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-100 flex flex-col">
      <MotorsHeaderNav currentTab="SELL" />

      {/* Hero Header */}
      <div className="bg-[#0A101E] border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>YusKar Motors Brokerage & Sales Service</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white mb-3">
            Sell Your Vehicle Through <span className="text-amber-400">YusKar Motors</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
            Submit your car details below. We handle professional physical appraisal, high-definition photography, marketing to qualified Rwandan & regional buyers, and escrow paperwork. You receive {100 - commissionPercent}% net payout upon completed transaction.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* SUCCESS CONFIRMATION VIEW */}
        {submittedResult ? (
          <div className="bg-[#0B1220] rounded-3xl border border-emerald-500/40 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Submission Successful
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
              Your Vehicle Submission is Received!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Our appraisal desk is reviewing your vehicle. A YusKar Motors broker will reach out on WhatsApp to coordinate vehicle inspection.
            </p>

            {/* Request ID Box */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-8 max-w-md mx-auto">
              <span className="text-[11px] text-slate-400 block mb-1">Your Submission Reference ID</span>
              <strong className="text-xl sm:text-2xl font-mono font-bold text-amber-400 tracking-wider">
                {submittedResult.requestId}
              </strong>
            </div>

            {/* Financial Summary */}
            <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800 text-xs space-y-2 mb-8 max-w-md mx-auto text-left">
              <div className="flex justify-between text-slate-300">
                <span>Customer Asking Price:</span>
                <strong className="text-white font-mono">{formatCurrency(submittedResult.askingPrice)}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>YusKar Commission ({commissionPercent}%):</span>
                <span className="text-amber-400 font-mono">-{formatCurrency(submittedResult.commissionAmount)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400 text-sm">
                <span>Seller Net Amount:</span>
                <span className="font-mono">{formatCurrency(submittedResult.sellerNetAmount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={submittedResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat with YusKar Motors</span>
              </a>

              <button
                onClick={() => {
                  setSubmittedResult(null);
                  navigate('/motors');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                Return to Marketplace
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Column (8 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
              
              {/* 1. Customer Details */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px] text-amber-400">1</span>
                  <span>Owner Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Damascene Bizimana"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Primary Phone Number *</label>
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
                      placeholder="owner@example.rw"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Current Vehicle Location in Rwanda</label>
                    <input
                      type="text"
                      placeholder="e.g. Nyarutarama, Kigali"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Preferred Contact Channel</label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value as any)}
                      aria-label="Preferred contact channel"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="WHATSAPP">WhatsApp (Fastest)</option>
                      <option value="PHONE">Direct Phone Call</option>
                      <option value="EMAIL">Email</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Vehicle Details */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px] text-amber-400">2</span>
                  <span>Vehicle Specifications</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Brand / Make *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota, Mercedes, BMW"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RAV4, Prado TX-L, C200"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Manufacture Year *</label>
                    <input
                      type="number"
                      min={1995}
                      max={2027}
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Vehicle Body Type</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      aria-label="Vehicle body type"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="SUV">SUV</option>
                      <option value="Luxury 4x4">Luxury 4x4</option>
                      <option value="Pickup 4x4">Pickup 4x4 / Double Cab</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Van">Van / Minibus</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Exterior Color</label>
                    <input
                      type="text"
                      placeholder="e.g. White, Black, Silver"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Current Mileage</label>
                    <input
                      type="text"
                      placeholder="e.g. 45,000 km"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value as any)}
                      aria-label="Vehicle fuel type"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Transmission</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as any)}
                      aria-label="Vehicle transmission"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Engine Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 2.0L, 2.8L Turbo"
                      value={engine}
                      onChange={(e) => setEngine(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-300 block mb-1">Condition</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as any)}
                      aria-label="Vehicle condition"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Foreign Used / Certified Import">Foreign Used / Certified Import</option>
                      <option value="Brand New">Brand New</option>
                      <option value="Auction Grade 4.5+">Auction Grade 4.5+</option>
                      <option value="Local Used">Local Used (Rwanda registered)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Plate / Registration Info</label>
                    <input
                      type="text"
                      placeholder="e.g. RAC 123 X / Yellow Card ready"
                      value={registrationInfo}
                      onChange={(e) => setRegistrationInfo(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="text-xs pt-2">
                  <label className="text-slate-300 block mb-1">Key Features, Upgrades & Service History</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Sunroof, leather interior, new tires, reverse camera, recent oil change at authorized dealer."
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Photo URLs */}
                <div className="text-xs pt-2">
                  <label className="text-slate-300 block mb-1 flex items-center justify-between">
                    <span>Vehicle Image URLs (One link per line)</span>
                    <span className="text-slate-500 text-[11px]">Optional • Or send photos directly via WhatsApp</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="https://example.com/photo1.jpg"
                    value={photoUrlsInput}
                    onChange={(e) => setPhotoUrlsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* 3. Pricing & Terms */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-800">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px] text-amber-400">3</span>
                  <span>Financial & Asking Price</span>
                </div>

                <div className="text-xs space-y-4">
                  <div>
                    <label className="text-slate-300 block mb-1 font-bold">
                      Your Target Asking Price (RWF) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1000000}
                        step={100000}
                        required
                        value={askingPrice}
                        onChange={(e) => setAskingPrice(Number(e.target.value))}
                        className="w-full pl-4 pr-16 py-3 bg-slate-950 border-2 border-amber-500/60 rounded-xl text-white font-mono text-lg font-bold focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                        RWF
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Preferred Selling Conditions / Urgency</label>
                    <input
                      type="text"
                      placeholder="e.g. Immediate cash sale preferred, or flexible on timeline."
                      value={preferredConditions}
                      onChange={(e) => setPreferredConditions(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-2xl font-heading font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
              >
                {submitting ? (
                  <span>Processing Submission...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT VEHICLE FOR SALE • {commissionPercent}% COMMISSION</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Live Commission Calculator & Benefits (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Interactive Commission Calculator Widget */}
              <div className="bg-gradient-to-b from-[#14120C] to-[#0A0D18] rounded-2xl p-6 border-2 border-amber-500/50 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Commission Breakdown</span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Asking price */}
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px] mb-1">Customer Asking Price</span>
                    <strong className="text-xl font-heading font-bold text-white block">
                      {formatCurrency(askingPrice)}
                    </strong>
                  </div>

                  {/* YusKar Commission */}
                  <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-amber-300 text-[11px]">YusKar Brokerage Commission</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
                        {commissionPercent}%
                      </span>
                    </div>
                    <strong className="text-lg font-heading font-bold text-amber-400 block">
                      {formatCurrency(calculatedCommission)}
                    </strong>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Zero upfront cost. Commission is deducted only upon verified sale closing.
                    </p>
                  </div>

                  {/* Net Payout */}
                  <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40">
                    <span className="text-emerald-300 block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                      Your Guaranteed Net Payout
                    </span>
                    <strong className="text-2xl font-heading font-black text-emerald-400 block">
                      {formatCurrency(sellerNetAmount)}
                    </strong>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Transferred directly to your bank account or MoMo upon handover.
                    </span>
                  </div>
                </div>
              </div>

              {/* What We Provide */}
              <div className="bg-[#0B1220] rounded-2xl p-6 border border-slate-800 shadow-xl text-xs space-y-3">
                <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>What YusKar Motors Handles For You</span>
                </h4>

                <ul className="space-y-2.5 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Free vehicle appraisal at Gikondo showroom or at your location.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>High-resolution professional photography and video showcasing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Listing across YusKar Motors marketplace and verified VIP buyer networks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Legally binding sales agreements and RRA tax/ownership transfer paperwork.</span>
                  </li>
                </ul>
              </div>

              {/* Need help callout */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-center">
                <p className="text-slate-400 mb-2">Prefer to talk directly to an automotive broker?</p>
                <a
                  href={`tel:${settings.contact.phone || '+250726134041'}`}
                  className="font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{settings.contact.phone || '+250 726 134 041'}</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
