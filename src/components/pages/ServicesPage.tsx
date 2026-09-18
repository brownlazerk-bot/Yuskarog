import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Clock, 
  Search,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, departments, openInquiryModal, navigate } = useApp();
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(s => {
    const matchesDept = selectedDeptId === 'ALL' || s.departmentId === selectedDeptId;
    const matchesSearch = !searchQuery.trim() || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Briefcase className="w-4 h-4" />
            Cross-Division Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Corporate & Retail Solutions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            From vehicle sourcing and express intra-Kigali dispatch to official RDB company incorporation and executive travel coordination.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            <button
              onClick={() => setSelectedDeptId('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedDeptId === 'ALL' ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Divisions
            </button>
            {departments.slice(0, 5).map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedDeptId === dept.id ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((serv) => {
            const dept = departments.find(d => d.id === serv.departmentId);
            return (
              <div
                key={serv.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {dept?.name || 'YusKar Empire'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {serv.priceType.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                    {serv.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {serv.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    {serv.features.map((feat, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">PRICING</span>
                    <span className="text-sm font-bold text-amber-400">
                      {serv.priceType === 'REQUEST_QUOTE' ? 'Custom Quote' : `${serv.price?.toLocaleString()} ${serv.currency || 'RWF'}`}
                    </span>
                  </div>

                  <button
                    onClick={() => openInquiryModal({
                      departmentId: serv.departmentId,
                      type: 'SERVICE_REQUEST',
                      itemTitle: serv.name,
                      relatedItemId: serv.id
                    })}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inquire / Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
