import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { DepartmentStatus } from '../../types';

export const DepartmentsPage: React.FC = () => {
  const { departments, navigate, openInquiryModal, showToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | DepartmentStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepartments = departments.filter(d => {
    const matchesStatus = filterStatus === 'ALL' || d.status === filterStatus;
    const matchesSearch = !searchQuery.trim() || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const activeCount = departments.filter(d => d.status === 'ACTIVE').length;
  const comingSoonCount = departments.filter(d => d.status === 'COMING_SOON').length;
  const inactiveCount = departments.filter(d => d.status === 'INACTIVE').length;

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>YusKar Multi-Department Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Departments & Operating Divisions
          </h1>

          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            YusKar Empire Ltd operates through specialized, autonomous business units. Each division has dedicated management, localized facilities in Kigali, and full accountability under the YusKar Empire umbrella.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by department name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>

          {/* Filter Status Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                filterStatus === 'ALL' 
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Divisions ({departments.length})
            </button>

            <button
              onClick={() => setFilterStatus('ACTIVE')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                filterStatus === 'ACTIVE' 
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Active ({activeCount})
            </button>

            <button
              onClick={() => setFilterStatus('COMING_SOON')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                filterStatus === 'COMING_SOON' 
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/10' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Coming Soon ({comingSoonCount})
            </button>

            <button
              onClick={() => setFilterStatus('INACTIVE')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                filterStatus === 'INACTIVE' 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Ecosystem Archive ({inactiveCount})
            </button>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepartments.map((dept) => {
            const isActive = dept.status === 'ACTIVE';
            const isComingSoon = dept.status === 'COMING_SOON';
            const isInactive = dept.status === 'INACTIVE';

            return (
              <div
                key={dept.id}
                className={`bg-[#0B1220] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 group ${
                  isActive 
                    ? 'border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5' 
                    : isComingSoon 
                    ? 'border-amber-500/30 bg-slate-900/40' 
                    : 'border-slate-800/80 opacity-75'
                }`}
              >
                {/* Cover Image & Header Tag */}
                <div className="h-52 relative overflow-hidden bg-slate-900">
                  <img
                    src={dept.coverImage}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-black/50" />

                  {/* Top Status */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 text-amber-300 backdrop-blur-md border border-amber-500/30">
                      YUSKAR DIVISION
                    </span>

                    {isActive && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
                        ACTIVE
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
                        Unavailable
                      </span>
                    )}
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-slate-200 font-medium drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{dept.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white group-hover:text-amber-400 transition-colors">
                      {dept.name}
                    </h2>

                    <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
                      {dept.shortDescription}
                    </p>

                    {/* Features checklist */}
                    {dept.features && dept.features.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                        {dept.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Coming Soon Notice */}
                    {isComingSoon && dept.comingSoonDate && (
                      <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Expected Launch: <strong>{dept.comingSoonDate}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    {isActive ? (
                      <button
                        onClick={() => navigate(`/departments/${dept.slug}`)}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10"
                      >
                        <span>{dept.ctaText || 'Explore Department'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : isComingSoon ? (
                      <button
                        onClick={() => showToast(`You will receive early access notification for ${dept.name}!`, 'success')}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-all"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Notify Me on Launch</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => openInquiryModal({ departmentId: dept.id, type: 'PARTNERSHIP', itemTitle: dept.name })}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-medium border border-slate-800 flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Inquire Division Details</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
