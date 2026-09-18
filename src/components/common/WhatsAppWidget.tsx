import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Smile, 
  CheckCheck,
  Sparkles
} from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedLine, setSelectedLine] = useState<'primary' | 'secondary'>('primary');
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const config = settings.whatsappWidget || {
    enabled: true,
    phoneNumber: '250795153994',
    displayPhoneNumber: '+250 795 153 994',
    secondaryPhoneNumber: '250781652135',
    secondaryDisplayPhoneNumber: '+250 781 652 135',
    businessName: 'YusKar Empire',
    welcomeMessage: 'Muraho 👋 Twagufasha iki?',
    statusText: 'Usually replies instantly',
    quickMessages: [
      'Nshaka service',
      'Nshaka kumenya ibiciro',
      'Nshaka kuvugana namwe',
      'Mfite ikibazo'
    ],
    position: 'bottom-right',
    pulseAnimation: true
  };

  // Format realistic timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Clean phone number for WhatsApp link
  const getCleanNumber = (rawNumber: string): string => {
    let cleaned = rawNumber.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      cleaned = '25' + cleaned;
    }
    if (cleaned.length === 9) {
      cleaned = '250' + cleaned;
    }
    return cleaned || '250795153994';
  };

  const activeNumber = selectedLine === 'secondary'
    ? (config.secondaryPhoneNumber || '250781652135')
    : (config.phoneNumber || '250795153994');

  const activeDisplayNumber = selectedLine === 'secondary'
    ? (config.secondaryDisplayPhoneNumber || '+250 781 652 135')
    : (config.displayPhoneNumber || '+250 795 153 994');

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : message).trim();
    const cleanNumber = getCleanNumber(activeNumber);
    
    let waUrl = `https://wa.me/${cleanNumber}`;
    if (text) {
      waUrl += `?text=${encodeURIComponent(text)}`;
    }

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  const handleQuickMessageClick = (quickText: string) => {
    setMessage(quickText);
    inputRef.current?.focus();
  };

  const handleInsertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  if (!config.enabled) {
    return null;
  }

  const isLeft = config.position === 'bottom-left';

  return (
    <div 
      ref={widgetRef}
      className={`fixed z-50 flex flex-col ${
        isLeft ? 'left-4 sm:left-6 items-start' : 'right-4 sm:right-6 items-end'
      } bottom-5 sm:bottom-6`}
      id="yuskar-whatsapp-floating-widget"
    >
      {/* CHAT POPUP WINDOW */}
      {isOpen && (
        <div 
          className={`mb-3 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[400px] bg-[#0c131d] rounded-2xl shadow-2xl border border-emerald-500/20 overflow-hidden transition-all duration-200 origin-bottom ${
            isLeft ? 'origin-bottom-left' : 'origin-bottom-right'
          }`}
          style={{
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(37, 211, 102, 0.15)'
          }}
        >
          {/* 1. WHATSAPP HEADER */}
          <div className="bg-[#075E54] text-white p-4 pb-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* WhatsApp Icon with Avatar & Online Dot */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center border-2 border-white/20 shadow-inner">
                  {/* Official WhatsApp Logo SVG */}
                  <svg 
                    className="w-6 h-6 fill-white" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                  <span>{config.businessName || 'YusKar Empire'}</span>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-semibold px-1.5 py-0.2 rounded border border-emerald-400/30">
                    Verified
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-100/90 font-medium">
                  {config.statusText || 'Usually replies instantly'}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-emerald-100 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DUAL WHATSAPP LINE SWITCHER BAR */}
          <div className="bg-[#054941] px-3.5 py-1.5 flex items-center justify-between border-t border-emerald-700/40 text-[11px]">
            <span className="text-emerald-200/90 font-medium text-[10px] uppercase tracking-wider">Choose Line:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedLine('primary')}
                className={`px-2 py-0.5 rounded-full font-semibold transition-all text-[11px] ${
                  selectedLine === 'primary'
                    ? 'bg-emerald-400 text-slate-950 shadow-xs'
                    : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                }`}
              >
                Line 1: 0795 153 994
              </button>
              <button
                type="button"
                onClick={() => setSelectedLine('secondary')}
                className={`px-2 py-0.5 rounded-full font-semibold transition-all text-[11px] ${
                  selectedLine === 'secondary'
                    ? 'bg-emerald-400 text-slate-950 shadow-xs'
                    : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                }`}
              >
                Line 2: 0781 652 135
              </button>
            </div>
          </div>

          {/* 2. CHAT CONVERSATION AREA */}
          <div 
            className="p-4 space-y-3 min-h-[220px] max-h-[280px] overflow-y-auto"
            style={{
              backgroundColor: '#ECE5DD',
              backgroundImage: 'radial-gradient(#d3c9bf 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          >
            {/* Timestamp pill */}
            <div className="text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/80 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-slate-600 shadow-xs">
                TODAY • {currentTime || 'KIGALI'}
              </span>
            </div>

            {/* Incoming Welcome Message Bubble */}
            <div className="flex items-end gap-2 max-w-[88%]">
              <div className="bg-white text-slate-800 p-3 rounded-2xl rounded-bl-xs shadow-sm border border-slate-200/60 relative">
                <p className="text-xs sm:text-[13px] font-medium leading-relaxed">
                  {config.welcomeMessage || 'Muraho 👋 Twagufasha iki?'}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                  <span>{currentTime || 'Just now'}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>
            </div>

            {/* Predefined Quick Message Suggestions */}
            {config.quickMessages && config.quickMessages.length > 0 && (
              <div className="pt-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Hitamo icyo ushaka:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {config.quickMessages.map((qm, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickMessageClick(qm)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300/80 hover:border-emerald-400 text-[11px] font-semibold transition-all shadow-xs active:scale-95 text-left"
                    >
                      {qm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. MESSAGE INPUT AREA */}
          <div className="p-3 bg-white border-t border-slate-200">
            {/* Quick emoji helper row */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="text-[10px] text-slate-400 font-semibold">Quick Emoji:</span>
              <div className="flex items-center gap-1.5">
                {['👋', '🚗', '📦', '🏢', '✨'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleInsertEmoji(emoji)}
                    className="text-sm hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }} 
              className="flex items-center gap-2"
            >
              <div className="relative flex-grow">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Andika ubutumwa bwawe..."
                  className="w-full bg-[#F0F2F5] text-slate-900 placeholder:text-slate-500 rounded-full px-4 py-2.5 text-xs font-normal border border-transparent focus:border-[#25D366] focus:bg-white outline-hidden transition-all pr-8"
                />
                <button
                  type="button"
                  onClick={() => handleInsertEmoji('👋')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                  title="Insert emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp Send Button */}
              <button
                type="submit"
                aria-label="Send via WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 text-center text-[10px] text-slate-500 space-y-0.5">
              <div>
                Connected to: <span className="font-mono font-semibold text-emerald-600">{activeDisplayNumber}</span>
              </div>
              <div className="text-[9px] text-slate-400">
                Official Lines: +250 795 153 994 • +250 781 652 135
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CIRCULAR TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close WhatsApp Chat' : 'Open WhatsApp Chat'}
        aria-expanded={isOpen}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-emerald-400/30"
      >
        {/* Pulse ring animation if enabled */}
        {config.pulseAnimation && !isOpen && (
          <>
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-bold rounded-full text-[10px] flex items-center justify-center border-2 border-[#070B14] shadow-sm animate-bounce">
              1
            </span>
          </>
        )}

        {/* WhatsApp Icon SVG */}
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-200" />
        ) : (
          <svg 
            className="w-7 h-7 fill-white transition-transform duration-200 group-hover:scale-105" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        )}
      </button>
    </div>
  );
};
