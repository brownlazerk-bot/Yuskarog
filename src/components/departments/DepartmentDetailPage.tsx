import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Share2, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Car, 
  Package, 
  Briefcase, 
  Bookmark, 
  Calendar, 
  Gauge, 
  Fuel, 
  SlidersHorizontal,
  Bell,
  Users
} from 'lucide-react';

interface DepartmentDetailPageProps {
  slug: string;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({ slug }) => {
  const { 
    departments, 
    products, 
    services, 
    team, 
    navigate, 
    openInquiryModal, 
    openShareModal, 
    toggleSaveItem, 
    isItemSaved,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'SERVICES' | 'TEAM'>('OVERVIEW');

  const department = departments.find(d => d.slug.toLowerCase() === slug.toLowerCase());

  if (!department) {
    return (
      <div className="bg-[#070B14] min-h-screen text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4 bg-[#0B1220] p-8 rounded-2xl border border-slate-800">
          <Building2 className="w-12 h-12 mx-auto text-amber-400 opacity-60" />
          <h2 className="text-2xl font-heading font-bold text-white">Department Not Found</h2>
          <p className="text-xs text-slate-400">
            The requested division does not exist or has been modified. Return to the full YusKar Empire ecosystem directory.
          </p>
          <button
            onClick={() => navigate('/departments')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Departments</span>
          </button>
        </div>
      </div>
    );
  }

  const deptProducts = products.filter(p => p.departmentId === department.id);
  const deptServices = services.filter(s => s.departmentId === department.id);
  const deptTeam = team.filter(t => t.departmentId === department.id);

  const isActive = department.status === 'ACTIVE';
  const isComingSoon = department.status === 'COMING_SOON';
  const isInactive = department.status === 'INACTIVE';

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="relative min-h-[360px] sm:min-h-[420px] bg-slate-950 border-b border-slate-800 overflow-hidden flex flex-col justify-end">
        {/* Cover image */}
        <img
          src={department.coverImage}
          alt={department.name}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          
          {/* Breadcrumb back */}
          <button
            onClick={() => navigate('/departments')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 mb-6 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Divisions</span>
          </button>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  A YusKar Empire Company
                </span>

                {isActive && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
                    ACTIVE OPERATING DIVISION
                  </span>
                )}
                {isComingSoon && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-400 text-slate-950 flex items-center gap-1 shadow-md">
                    <Clock className="w-3 h-3" />
                    COMING SOON
                  </span>
                )}
                {isInactive && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-slate-800 text-slate-400 border border-slate-700">
                    Currently Unavailable
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                {department.name}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {department.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{department.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{department.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{department.contactInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openShareModal({
                  type: 'department',
                  id: department.slug,
                  title: department.name,
                  excerpt: department.shortDescription,
                  image: department.coverImage
                })}
                className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Share Department"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {isActive ? (
                <>
                  <a
                    href={`https://wa.me/${department.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Desk</span>
                  </a>

                  <button
                    onClick={() => openInquiryModal({ departmentId: department.id, type: 'SERVICE_REQUEST', itemTitle: department.name })}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <span>Request Service / Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : isComingSoon ? (
                <button
                  onClick={() => showToast(`You will be the first to know when ${department.name} opens in Kigali!`, 'success')}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-400/20"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Me on Launch</span>
                </button>
              ) : (
                <button
                  onClick={() => openInquiryModal({ departmentId: department.id, type: 'PARTNERSHIP', itemTitle: department.name })}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <span>Inquire Division Status</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 2. COMING SOON BANNER (IF COMING SOON) */}
      {isComingSoon && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                <strong>{department.name}</strong> is currently in pre-launch development. Expected Launch Date:{' '}
                <span className="font-bold underline">{department.comingSoonDate || 'Q2 2025'}</span>
              </span>
            </div>
            <button
              onClick={() => showToast(`Early bird VIP notification registered for ${department.name}!`, 'success')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
            >
              Sign Up For Priority Access
            </button>
          </div>
        </div>
      )}

      {/* 3. INACTIVE NOTICE (IF INACTIVE) */}
      {isInactive && (
        <div className="bg-slate-900 border-b border-slate-800 py-4 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              This division is part of the YusKar Empire corporate roadmap and is currently unavailable for active consumer bookings.
              For active services, browse our other operating divisions like <strong className="text-white">YusKar Motors</strong> or <strong className="text-white">YusKar Delivery</strong>.
            </span>
          </div>
        </div>
      )}

      {/* 4. MAIN CONTENT TABS & BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'OVERVIEW' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            Overview & Specifications
          </button>

          {deptProducts.length > 0 && (
            <button
              onClick={() => setActiveTab('PRODUCTS')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'PRODUCTS' 
                  ? 'bg-amber-500 text-black font-bold' 
                  : 'text-slate-400 hover:text-white bg-slate-900/50'
              }`}
            >
              Inventory / Products ({deptProducts.length})
            </button>
          )}

          {deptServices.length > 0 && (
            <button
              onClick={() => setActiveTab('SERVICES')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'SERVICES' 
                  ? 'bg-amber-500 text-black font-bold' 
                  : 'text-slate-400 hover:text-white bg-slate-900/50'
              }`}
            >
              Services & Solutions ({deptServices.length})
            </button>
          )}

          {deptTeam.length > 0 && (
            <button
              onClick={() => setActiveTab('TEAM')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'TEAM' 
                  ? 'bg-amber-500 text-black font-bold' 
                  : 'text-slate-400 hover:text-white bg-slate-900/50'
              }`}
            >
              Division Team ({deptTeam.length})
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-12">
            
            {/* Description & Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-heading font-bold text-white">
                    About {department.name}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {department.fullDescription}
                  </p>
                </div>

                {/* Key Features & Guarantees */}
                <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-heading font-bold text-white">
                    Division Capabilities & Operational Standards
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {department.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info & Contact */}
              <div className="space-y-6">
                <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                    Kigali Department Desk
                  </h3>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Location</div>
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{department.location}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Direct Phone</div>
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{department.contactInfo.phone}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Direct WhatsApp</div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{department.contactInfo.whatsapp}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-slate-500 font-semibold uppercase text-[10px]">Official Email</div>
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>{department.contactInfo.email}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openInquiryModal({ departmentId: department.id, type: 'GENERAL_INQUIRY', itemTitle: department.name })}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>Contact This Department</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Preview of Products if any */}
            {deptProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-white">
                    Featured Inventory & Items
                  </h3>
                  <button
                    onClick={() => setActiveTab('PRODUCTS')}
                    className="text-xs font-semibold text-amber-400 hover:underline"
                  >
                    View All ({deptProducts.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deptProducts.slice(0, 3).map(prod => (
                    <div
                      key={prod.id}
                      className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={prod.mainImage}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 text-[10px] font-bold">
                            {prod.stockStatus}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                          {prod.name}
                        </h4>
                        <div className="text-xs font-bold text-amber-400">
                          {prod.price.toLocaleString()} {prod.currency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'PRODUCTS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Available Catalog & Inventory
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Inspected and certified stock under {department.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptProducts.map((prod) => {
                const isSaved = isItemSaved('product', prod.id);
                return (
                  <div
                    key={prod.id}
                    className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={prod.mainImage}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                          {prod.stockStatus}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          onClick={() => toggleSaveItem('product', prod.id)}
                          className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                            isSaved ? 'bg-amber-500 text-black' : 'bg-black/50 text-white hover:bg-black/80'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openShareModal({
                            type: 'product',
                            id: prod.id,
                            title: prod.name,
                            excerpt: `${prod.price.toLocaleString()} ${prod.currency}`,
                            image: prod.mainImage
                          })}
                          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-amber-400">
                          {prod.category}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-amber-400 transition-colors">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {prod.description}
                        </p>

                        {/* Specs */}
                        {prod.specifications && Object.keys(prod.specifications).length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                            {Object.entries(prod.specifications).slice(0, 4).map(([key, val]) => (
                              <div key={key} className="truncate">
                                <span className="text-slate-500">{key}:</span> <span className="font-medium text-slate-200">{val}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">PRICE</div>
                          <div className="text-lg font-heading font-bold text-amber-400">
                            {prod.price.toLocaleString()} {prod.currency}
                          </div>
                        </div>

                        <button
                          onClick={() => openInquiryModal({
                            departmentId: department.id,
                            type: 'PRODUCT_ORDER',
                            itemTitle: prod.name,
                            relatedItemId: prod.id
                          })}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                        >
                          Inquire Order
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'SERVICES' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">
              Enterprise & Retail Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptServices.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between group transition-all"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {department.name}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {serv.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {serv.description}
                    </p>

                    <div className="pt-3 border-t border-slate-800 space-y-1.5">
                      {serv.features.map((f, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-amber-400">
                      {serv.priceType === 'REQUEST_QUOTE' ? 'Custom Quote' : `${serv.price?.toLocaleString()} ${serv.currency || 'RWF'}`}
                    </div>

                    <button
                      onClick={() => openInquiryModal({
                        departmentId: department.id,
                        type: 'SERVICE_REQUEST',
                        itemTitle: serv.name,
                        relatedItemId: serv.id
                      })}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEAM */}
        {activeTab === 'TEAM' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">
              Division Management & Advisors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptTeam.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#0B1220] border border-slate-800 rounded-2xl p-5 flex items-center gap-4"
                >
                  <img
                    src={m.profilePhoto}
                    alt={m.fullName}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      {m.fullName}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium">
                      {m.position}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {m.responsibilities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
