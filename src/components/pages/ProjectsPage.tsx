import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, departments, openInquiryModal } = useApp();

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Building2 className="w-4 h-4" />
            Track Record & Major Undertakings
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Flagship Projects & Deployments
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Delivering high-stakes automotive sourcing, logistics infrastructure, commercial spaces, and corporate setups across Rwanda.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((proj, idx) => {
            const dept = departments.find(d => d.id === proj.departmentId);
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                className={`bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`aspect-[16/10] overflow-hidden relative ${isReversed ? 'lg:col-start-2' : ''}`}>
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {proj.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-10 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      {dept?.name || 'YusKar Empire'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      {proj.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {proj.completionDate}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    {proj.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Client / Beneficiary
                    </span>
                    <div className="font-semibold text-slate-200">{proj.client}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => openInquiryModal({
                        departmentId: proj.departmentId,
                        type: 'PARTNERSHIP',
                        itemTitle: `Project reference: ${proj.title}`
                      })}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <span>Inquire Similar Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
