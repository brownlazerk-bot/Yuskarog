import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, departments, navigate } = useApp();
  const activeDepartments = departments.filter(d => d.status === 'ACTIVE');
  const comingSoonDepartments = departments.filter(d => d.status === 'COMING_SOON');

  return (
    <footer className="bg-[#05080F] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1220] to-slate-900 border border-slate-800 rounded-2xl p-8 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Enterprise Partnerships & Sourcing
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                Connect With YusKar Empire Headquarters
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Whether you need certified vehicle imports, rapid courier distribution, executive real estate, or corporate business setup in Kigali, our multi-department team is ready.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${(settings.whatsappPrimaryPhone || '250795153994').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                title="Chat directly on WhatsApp line 1"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct (+250 795 153 994)
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                Inquire With Desk
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center font-heading font-black text-amber-400 text-lg">
                  YK
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white block leading-tight group-hover:text-amber-400 transition-colors">
                  YUSKAR <span className="text-amber-400">EMPIRE</span>
                </span>
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                  LTD • KIGALI, RWANDA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {settings.aboutText}
            </p>

            <div className="pt-2 text-xs space-y-2.5 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Hotline Calling</span>
                  <div className="flex flex-wrap items-center gap-1.5 font-medium text-slate-300">
                    <a href="tel:+250726134041" className="hover:text-amber-400 transition-colors">+250 726 134 041</a>
                    <span className="text-slate-600">/</span>
                    <a href="tel:+250795153994" className="hover:text-amber-400 transition-colors">+250 795 153 994</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">WhatsApp Business</span>
                  <div className="flex flex-wrap items-center gap-1.5 font-medium text-emerald-400">
                    <a href="https://wa.me/250795153994" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">+250 795 153 994</a>
                    <span className="text-slate-600">/</span>
                    <a href="https://wa.me/250781652135" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">+250 781 652 135</a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.primaryEmail}</span>
              </div>
            </div>
          </div>

          {/* Active Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Active Divisions
            </h4>
            <ul className="space-y-2.5 text-xs">
              {activeDepartments.slice(0, 6).map(dept => (
                <li key={dept.id}>
                  <button
                    onClick={() => navigate(`/departments/${dept.slug}`)}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-between w-full group text-left"
                  >
                    <span>{dept.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/departments')}
                  className="text-amber-400 hover:underline font-medium text-[11px] pt-1 block"
                >
                  View All Active ({activeDepartments.length}) →
                </button>
              </li>
            </ul>
          </div>

          {/* Upcoming Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              YusKar Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {comingSoonDepartments.slice(0, 4).map(dept => (
                <li key={dept.id} className="flex items-center justify-between">
                  <span>{dept.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Coming Soon
                  </span>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/departments')}
                  className="text-amber-400 hover:underline font-medium text-[11px] pt-1 block"
                >
                  Explore Full Ecosystem ({departments.length}) →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Media
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-amber-400">About YusKar Empire</button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-amber-400">Products & Inventory</button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-amber-400">Enterprise Services</button>
              </li>
              <li>
                <button onClick={() => navigate('/posts')} className="hover:text-amber-400">News & Press Releases</button>
              </li>
              <li>
                <button onClick={() => navigate('/team')} className="hover:text-amber-400">Executive Leadership</button>
              </li>
              <li>
                <button onClick={() => navigate('/client')} className="hover:text-amber-400">Client Portal</button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-amber-400">Admin Login</button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Trust */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Registered in Kigali, Rwanda • RDB Business Certificate Compliant</span>
          </div>

          <div>
            © {new Date().getFullYear()} YusKar Empire Ltd. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
