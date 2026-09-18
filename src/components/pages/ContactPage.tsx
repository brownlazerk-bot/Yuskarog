import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCheck,
  Building2
} from 'lucide-react';
import { InquiryType } from '../../types';

export const ContactPage: React.FC = () => {
  const { settings, departments, submitInquiry, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+250 ');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('dept-motors');
  const [type, setType] = useState<InquiryType>('GENERAL_INQUIRY');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [attachmentUrl, setAttachmentUrl] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setAttachmentUrl(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    submitInquiry({
      name,
      phone,
      email: email || 'contact@client.rw',
      departmentId,
      subject: subject || `Inquiry from ${name}`,
      message,
      type,
      attachmentName,
      attachmentUrl
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('+250 ');
      setEmail('');
      setMessage('');
      setSubject('');
      setAttachmentName(undefined);
      setAttachmentUrl(undefined);
    }, 3000);
  };

  const primaryPhone = settings.pageContent?.contactPrimaryPhone || settings.hotlinePrimaryPhone || '+250 726 134 041';
  const secondaryPhone = settings.pageContent?.contactSecondaryPhone || settings.hotlineSecondaryPhone || '+250 795 153 994';
  const waPrimaryPhone = settings.pageContent?.contactWhatsAppPrimary || settings.whatsappWidget?.displayPhoneNumber || '+250 795 153 994';
  const waPrimaryNumber = (settings.whatsappWidget?.phoneNumber || '250795153994').replace(/[^0-9]/g, '');
  const waSecondaryPhone = settings.pageContent?.contactWhatsAppSecondary || settings.whatsappWidget?.secondaryDisplayPhoneNumber || '+250 781 652 135';
  const waSecondaryNumber = (settings.whatsappWidget?.secondaryPhoneNumber || '250781652135').replace(/[^0-9]/g, '');

  const primaryEmail = settings.pageContent?.contactEmail || settings.primaryEmail;
  const supportEmail = settings.pageContent?.contactSupportEmail || settings.supportEmail || 'support@yuskarempire.rw';
  const address = settings.pageContent?.contactAddress || settings.address;
  const businessHours = settings.pageContent?.contactBusinessHours || settings.businessHours || 'Monday - Saturday: 8:00 AM - 7:00 PM CAT';
  const heroTitle = settings.pageContent?.contactHeroTitle || 'Connect With YusKar Empire';
  const heroSubtitle = settings.pageContent?.contactSubtitle || 'Visit our physical showrooms, logistics hubs, or corporate suites across Kigali, or dispatch a direct inquiry through our multi-department desk.';

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Building2 className="w-4 h-4" />
            Headquarters & Department Desks
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>

        {/* 2-Column: Info & Locations on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="font-heading font-bold text-lg text-white">
                Direct Channels
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                {/* Primary Hotline */}
                <a 
                  href={`tel:${primaryPhone.replace(/[^0-9+]/g, '')}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-amber-400 transition-colors block group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">24/7 Primary Hotline Calling</div>
                    <div className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">{primaryPhone}</div>
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">Call Line 1</span>
                </a>

                {/* Secondary Hotline */}
                {secondaryPhone && (
                  <a 
                    href={`tel:${secondaryPhone.replace(/[^0-9+]/g, '')}`}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-amber-400 transition-colors block group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Secondary Calling Line</div>
                      <div className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">{secondaryPhone}</div>
                    </div>
                    <span className="text-[10px] text-amber-400/80 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">Call Line 2</span>
                  </a>
                )}

                {/* Primary WhatsApp */}
                <a 
                  href={`https://wa.me/${waPrimaryNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-emerald-400 transition-colors block group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Official WhatsApp Gateway (Primary)</div>
                    <div className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">{waPrimaryPhone}</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Chat Line 1</span>
                </a>

                {/* Secondary WhatsApp */}
                <a 
                  href={`https://wa.me/${waSecondaryNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-emerald-400 transition-colors block group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Support WhatsApp Gateway (Secondary)</div>
                    <div className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">{waSecondaryPhone}</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Chat Line 2</span>
                </a>

                <a 
                  href={`mailto:${primaryEmail}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-amber-400 transition-colors block"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Corporate Inquiries</div>
                    <div className="font-semibold text-slate-100">{primaryEmail}</div>
                  </div>
                </a>

                {supportEmail && supportEmail !== primaryEmail && (
                  <a 
                    href={`mailto:${supportEmail}`}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-amber-400 transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold">Customer Support Email</div>
                      <div className="font-semibold text-slate-100">{supportEmail}</div>
                    </div>
                  </a>
                )}

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Operating Hours</div>
                    <div className="font-semibold text-slate-200">{businessHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kigali Physical Facilities */}
            <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="font-heading font-bold text-lg text-white">
                Physical Locations in Kigali
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>YusKar Motors Showroom</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Gikondo Industrial Zone, Avenue des Poids Lourds, Kigali
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>YusKar Delivery Central Dispatch</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    Masoro Special Economic Zone, Kigali Logistics Hub
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Corporate Advisory & Business Hub</span>
                  </div>
                  <p className="text-slate-400 mt-1">
                    CHIC Complex, 4th Floor, Downtown Nyarugenge, Kigali
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Working Hours</div>
                <div>{businessHours}</div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="font-heading font-bold text-2xl text-white mb-2">
                Send A Formal Request
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Your message is routed directly to the designated department manager and registered in the YusKar internal inquiry system.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Request Received & Logged
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    A representative from the selected department will reach out via Phone or WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Department select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Target Department <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                    >
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Request Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as InquiryType)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                    >
                      <option value="GENERAL_INQUIRY">General Inquiry</option>
                      <option value="SERVICE_REQUEST">Service Booking / Quote</option>
                      <option value="PRODUCT_ORDER">Product Order / Showroom Purchase</option>
                      <option value="VEHICLE_SOURCING">Vehicle Sourcing & Custom Clearance</option>
                      <option value="PARTNERSHIP">Corporate Tender & Strategic Partnership</option>
                    </select>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Patrick Rukundo"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+250 788 000 000"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Email and Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.rw"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Sourcing Toyota RAV4 2022"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message Details <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify requirements, timing, delivery destination, or technical preferences..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Attach Tender / Spec Sheet / ID (PDF, JPG, PNG):
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-200 flex items-center gap-2 transition-colors">
                        <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                        <span>{attachmentName ? 'Change File' : 'Choose File'}</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {attachmentName && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 truncate">
                          <FileCheck className="w-3.5 h-3.5" />
                          {attachmentName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Official Request</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
