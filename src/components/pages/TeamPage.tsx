import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Mail, 
  Linkedin, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { team, departments, navigate, openInquiryModal } = useApp();

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Users className="w-4 h-4" />
            Governance & Domain Specialists
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Leadership & Division Directors
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            The experienced professionals heading YusKar Empire Ltd and its autonomous operating departments in Kigali, Rwanda.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => {
            const dept = departments.find(d => d.id === member.departmentId);
            return (
              <div
                key={member.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden p-6 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-4 text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={member.profilePhoto}
                      alt={member.fullName}
                      className="w-full h-full rounded-full object-cover border-2 border-amber-500/40 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {dept?.name || 'Executive Directorate'}
                    </span>
                    <h2 className="text-xl font-heading font-bold text-white mt-0.5">
                      {member.fullName}
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {member.position}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed text-left pt-2 border-t border-slate-800">
                    {member.responsibilities}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">Kigali Operations</span>
                  <button
                    onClick={() => openInquiryModal({
                      departmentId: member.departmentId,
                      type: 'GENERAL_INQUIRY',
                      itemTitle: `Contact request for ${member.fullName}`
                    })}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Direct Connect →
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
