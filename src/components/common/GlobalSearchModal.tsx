import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Car, 
  Briefcase, 
  Package, 
  FileText, 
  Building2, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, departments, products, services, posts, projects, team, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  if (!searchOpen) return null;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedDepartments = (filterType === 'ALL' || filterType === 'DEPARTMENTS')
      ? departments
          .filter(d => d.name.toLowerCase().includes(q) || d.shortDescription.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)))
          .map(d => ({
            type: 'Department',
            id: d.id,
            title: d.name,
            subtitle: `${d.status} • ${d.shortDescription}`,
            route: `/departments/${d.slug}`,
            icon: Building2,
            badge: d.status
          }))
      : [];

    const matchedProducts = (filterType === 'ALL' || filterType === 'PRODUCTS')
      ? products
          .filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
          .map(p => ({
            type: 'Product',
            id: p.id,
            title: p.name,
            subtitle: `${p.price.toLocaleString()} ${p.currency} • ${p.category}`,
            route: `/products?id=${p.id}`,
            icon: Package,
            badge: p.stockStatus
          }))
      : [];

    const matchedServices = (filterType === 'ALL' || filterType === 'SERVICES')
      ? services
          .filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
          .map(s => ({
            type: 'Service',
            id: s.id,
            title: s.name,
            subtitle: s.price ? `${s.price.toLocaleString()} ${s.currency}` : 'Request Quote',
            route: `/services?id=${s.id}`,
            icon: Briefcase,
            badge: s.priceType
          }))
      : [];

    const matchedPosts = (filterType === 'ALL' || filterType === 'POSTS')
      ? posts
          .filter(p => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))
          .map(p => ({
            type: 'Post',
            id: p.id,
            title: p.title,
            subtitle: `${p.category} • By ${p.author}`,
            route: `/posts/${p.slug}`,
            icon: FileText,
            badge: p.category
          }))
      : [];

    const matchedTeam = (filterType === 'ALL' || filterType === 'TEAM')
      ? team
          .filter(t => t.fullName.toLowerCase().includes(q) || t.position.toLowerCase().includes(q) || t.responsibilities.toLowerCase().includes(q))
          .map(t => ({
            type: 'Team Member',
            id: t.id,
            title: t.fullName,
            subtitle: t.position,
            route: `/team`,
            icon: Users,
            badge: 'Team'
          }))
      : [];

    return [...matchedDepartments, ...matchedProducts, ...matchedServices, ...matchedPosts, ...matchedTeam];
  }, [query, filterType, departments, products, services, posts, projects, team]);

  const handleSelect = (route: string) => {
    navigate(route);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div 
        className="w-full max-w-2xl bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#070B14]">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search departments, vehicles, delivery, services, articles, team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-900/50 overflow-x-auto text-xs">
          {['ALL', 'DEPARTMENTS', 'PRODUCTS', 'SERVICES', 'POSTS', 'TEAM'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                filterType === f 
                  ? 'bg-amber-500 text-black font-semibold' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-800/40">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              <Sparkles className="w-8 h-8 mx-auto text-amber-400/50 mb-2" />
              <p className="font-medium text-slate-300">Search Across The YusKar Empire Ecosystem</p>
              <p className="text-slate-500 text-xs mt-1">
                Try searching for &quot;RAV4&quot;, &quot;Prado&quot;, &quot;Delivery&quot;, &quot;RDB Business&quot;, or &quot;Motors&quot;
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              <p className="text-slate-300 font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-slate-500 text-xs mt-1">Try broadening your search term or selecting &quot;ALL&quot; filters</p>
            </div>
          ) : (
            results.map((res) => {
              const Icon = res.icon;
              return (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelect(res.route)}
                  className="p-3 rounded-xl hover:bg-slate-800/70 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-100 group-hover:text-amber-400 transition-colors">
                          {res.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#070B14] border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Total matches: {results.length}</span>
          <span>YusKar Global Search • Kigali, Rwanda</span>
        </div>
      </div>
    </div>
  );
};
