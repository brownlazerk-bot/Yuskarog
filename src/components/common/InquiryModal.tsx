import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Paperclip, 
  MessageSquare, 
  CheckCircle2, 
  Building2, 
  FileCheck,
  Sparkles
} from 'lucide-react';
import { InquiryType } from '../../types';

export const InquiryModal: React.FC = () => {
  const { inquiryModal, closeInquiryModal, departments, submitInquiry, settings, currentUser } = useApp();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+250 ');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [departmentId, setDepartmentId] = useState(inquiryModal.departmentId || 'dept-motors');
  const [type, setType] = useState<InquiryType>(inquiryModal.type || 'GENERAL_INQUIRY');
  const [subject, setSubject] = useState(inquiryModal.itemTitle ? `Inquiry regarding: ${inquiryModal.itemTitle}` : '');
  const [message, setMessage] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [attachmentUrl, setAttachmentUrl] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  if (!inquiryModal.isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      // Read data URL
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
      email: email || 'not-provided@client.rw',
      departmentId,
      subject: subject || `Inquiry from ${name}`,
      message,
      type,
      relatedItemId: inquiryModal.relatedItemId,
      attachmentName,
      attachmentUrl
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeInquiryModal();
    }, 2400);
  };

  const handleWhatsAppDirect = () => {
    const selectedDept = departments.find(d => d.id === departmentId);
    const targetPhone = selectedDept?.contactInfo.whatsapp || settings.whatsappPhone;
    const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${selectedDept ? selectedDept.name : 'YusKar Empire'} team,\nMy name is ${name || 'a client'}.\nSubject: ${subject || 'Inquiry'}\nDetails: ${message || 'I would like to inquire about your services/products.'}\n(Sent via YusKar Empire Platform)`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div 
        className="w-full max-w-lg bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#070B14]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Submit Request / Inquiry
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct dispatch to YusKar department advisors in Kigali
              </p>
            </div>
          </div>
          <button
            onClick={closeInquiryModal}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">
              Request Dispatched Successfully!
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our department officers have logged your request under reference ticket. We will respond promptly via Phone / WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
            {inquiryModal.itemTitle && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex items-center justify-between text-amber-300">
                <span className="font-medium truncate">Item: {inquiryModal.itemTitle}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold uppercase">
                  Selected
                </span>
              </div>
            )}

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Department:
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
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
                Request Category:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InquiryType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="GENERAL_INQUIRY">General Inquiry</option>
                <option value="SERVICE_REQUEST">Service Booking / Quote</option>
                <option value="PRODUCT_ORDER">Product Order / Showroom Purchase</option>
                <option value="VEHICLE_SOURCING">Custom Vehicle Sourcing (YusKar Motors)</option>
                <option value="PARTNERSHIP">Corporate Tender / Partnership</option>
              </select>
            </div>

            {/* Client Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.rw"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
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
                  placeholder="Brief summary of request"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detailed Message / Specifications <span className="text-amber-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State your exact requirements, preferred inspection dates, delivery location in Kigali, or budget..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              />
            </div>

            {/* File Attachment Support */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Attach Document / Spec Sheet / ID (PDF, PNG, JPG):
              </label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-200 flex items-center gap-2 transition-colors">
                  <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                  <span>{attachmentName ? 'Change File' : 'Upload File'}</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
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

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                Submit Direct Request
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                title="Send inquiry directly via WhatsApp chat"
              >
                <MessageSquare className="w-4 h-4" />
                Chat WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
