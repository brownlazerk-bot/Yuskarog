import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Award, 
  Users, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, departments, team, navigate } = useApp();

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            ORGANIZATIONAL PROFILE
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            The Story Behind YusKar Empire Ltd
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Headquartered in Kigali, YusKar Empire Ltd was established as a dynamic multi-department enterprise to provide institutional-grade reliability across East Africa&apos;s fastest growing sectors.
          </p>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Origins & Evolution
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Redefining Multi-Sector Excellence in Rwanda
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Founded under the vision of Karangwa Yussuf, YusKar Empire began with a singular focus on eliminating grey-market uncertainty in automotive imports. By introducing certified pre-shipment inspections and verified title audits, YusKar Motors quickly set a new standard in Kigali.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Recognizing that modern enterprises require integrated logistics, advisory, and infrastructure support, YusKar expanded into a multi-department ecosystem. Today, each division operates with specialized autonomy while benefiting from centralized corporate governance and capital strength.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-slate-800">
                <div className="text-2xl font-heading font-extrabold text-amber-400">RDB</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">Certified Corporate Entity</div>
                <div className="text-[11px] text-slate-500">Full tax & regulatory compliance</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220] border border-slate-800">
                <div className="text-2xl font-heading font-extrabold text-amber-400">50+</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">Full-Time Professionals</div>
                <div className="text-[11px] text-slate-500">Empowering Rwandan talent</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                alt="YusKar Empire Leadership & Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1220]/90 backdrop-blur-md border border-slate-700">
                <div className="text-xs font-bold text-white">YusKar Empire Headquarters</div>
                <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  Kigali, Rwanda • Downtown CHIC & Gikondo Showroom
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Our Mission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To deliver world-class products, verified provenance, and agile services that empower individuals and organizations to build, move, and thrive across Rwanda and East Africa.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Our Vision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To become the benchmark multi-service corporate group in the Great Lakes region—celebrated for operational transparency, technological integration, and societal value creation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-white">Core Values</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span><strong>Integrity:</strong> Zero tolerance for counterfeit or encumbered titles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span><strong>Speed:</strong> Agile execution across logistics & delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span><strong>Rwandan Pride:</strong> Local capital investment & job creation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating Divisions Directory */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Multi-Department Architecture
            </span>
            <h2 className="text-3xl font-heading font-bold text-white">
              The YusKar Empire Group Structure
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Each unit operates as an autonomous division under unified leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div 
                key={dept.id}
                onClick={() => navigate(`/departments/${dept.slug}`)}
                className="p-4 rounded-xl bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition-colors">
                    {dept.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {dept.status === 'ACTIVE' ? 'Active Division' : dept.status === 'COMING_SOON' ? 'In Development' : 'Corporate Roadmap'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership Spotlight */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Corporate Governance
          </span>
          <h2 className="text-3xl font-heading font-bold text-white">
            Leadership & Division Directors
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Meet the executives driving YusKar Empire forward in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {team.map((m) => (
            <div key={m.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden text-center p-6 space-y-3">
              <img
                src={m.profilePhoto}
                alt={m.fullName}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-500/30"
              />
              <div>
                <h3 className="font-heading font-bold text-base text-white">{m.fullName}</h3>
                <p className="text-xs text-amber-400 font-medium">{m.position}</p>
                <p className="text-[11px] text-slate-400 mt-1">{m.responsibilities}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-slate-900 via-[#0B1220] to-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Partner With YusKar Empire Ltd
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Our corporate advisory desk is eager to explore tenders, fleet supplies, and joint venture expansions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Contact Corporate Desk
            </button>
            <button
              onClick={() => navigate('/departments')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700"
            >
              Browse All Divisions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
