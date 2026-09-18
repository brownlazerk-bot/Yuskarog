import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  User as UserIcon, 
  Lock, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    navigate, 
    departments, 
    settings, 
    setSearchOpen, 
    currentUser, 
    switchRole,
    clientSaved
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const activeDepartments = departments.filter(d => d.status === 'ACTIVE');

  const navLinks = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Departments', route: '/departments', hasDropdown: true },
    { name: 'Products', route: '/products' },
    { name: 'Services', route: '/services' },
    { name: 'News & Posts', route: '/posts' },
    { name: 'Projects', route: '/projects' },
    { name: 'Team', route: '/team' },
    { name: 'Contact', route: '/contact' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    setDepartmentsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner Matching Screenshot */}
      <div className="bg-[#05080F] border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              YusKar Empire Conglomerate
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              {settings.address.split(',')[1] || 'Kigali'}, Rwanda
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            {/* Dual Hotline Call Links */}
            <div className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="text-slate-400">Hotline:</span>
              <a 
                href={`tel:${(settings.hotlinePrimaryPhone || '+250726134041').replace(/[^0-9+]/g, '')}`} 
                className="font-semibold text-slate-200 hover:text-amber-400 transition-colors"
                title="Call 24/7 Hotline 1"
              >
                +250 726 134 041
              </a>
              <span className="text-slate-600">/</span>
              <a 
                href={`tel:${(settings.hotlineSecondaryPhone || '+250795153994').replace(/[^0-9+]/g, '')}`} 
                className="font-semibold text-slate-200 hover:text-amber-400 transition-colors"
                title="Call 24/7 Hotline 2"
              >
                +250 795 153 994
              </a>
            </div>

            {/* Dual WhatsApp Chat Links */}
            <div className="inline-flex items-center gap-1.5 font-medium">
              <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-slate-400 hidden xs:inline">WhatsApp:</span>
              <a 
                href={`https://wa.me/${(settings.whatsappPrimaryPhone || '250795153994').replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                title="Open WhatsApp line 1"
              >
                +250 795 153 994
              </a>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <a 
                href={`https://wa.me/${(settings.whatsappSecondaryPhone || '250781652135').replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold hidden sm:inline"
                title="Open WhatsApp line 2"
              >
                +250 781 652 135
              </a>
            </div>

            {/* Role Demo Switcher */}
            <div className="relative">
              <button 
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700"
                title="Switch active role demo"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Role: <span className="text-amber-300 font-semibold">{currentUser ? currentUser.role.replace('_', ' ') : 'VISITOR'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-1.5 w-64 bg-[#0B1220] border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                    Simulate Role & Permissions
                  </div>
                  <button 
                    onClick={() => { switchRole('VISITOR'); setRoleSwitcherOpen(false); }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <span>Public Visitor (Guest)</span>
                    {!currentUser && <span className="text-amber-400 text-[10px]">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('CLIENT'); setRoleSwitcherOpen(false); }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <span>Client Account (Patrick R.)</span>
                    {currentUser?.role === 'CLIENT' && <span className="text-amber-400 text-[10px]">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('DEPARTMENT_MANAGER'); setRoleSwitcherOpen(false); }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <span>Dept Manager (Motors)</span>
                    {currentUser?.role === 'DEPARTMENT_MANAGER' && <span className="text-amber-400 text-[10px]">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('CONTENT_MANAGER'); setRoleSwitcherOpen(false); }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-slate-200"
                  >
                    <span>Content Manager (Keza S.)</span>
                    {currentUser?.role === 'CONTENT_MANAGER' && <span className="text-amber-400 text-[10px]">Active</span>}
                  </button>
                  <button 
                    onClick={() => { switchRole('SUPER_ADMIN'); setRoleSwitcherOpen(false); }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-amber-950/40 text-amber-300 font-medium flex items-center justify-between"
                  >
                    <span>Super Admin (Karangwa Y.)</span>
                    {currentUser?.role === 'SUPER_ADMIN' && <span className="text-amber-400 text-[10px]">Active</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center font-heading font-black text-amber-400 text-xl tracking-tighter">
                YK
              </div>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-wide text-white block leading-none group-hover:text-amber-400 transition-colors">
                YUSKAR <span className="text-amber-400">EMPIRE</span>
              </span>
              <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase block mt-1">
                LTD • KIGALI, RWANDA
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.route !== '/' && currentRoute.startsWith(link.route));
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name} 
                    className="relative"
                    onMouseEnter={() => setDepartmentsDropdownOpen(true)}
                    onMouseLeave={() => setDepartmentsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/departments')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        isActive 
                          ? 'text-amber-400 bg-amber-500/10 font-semibold' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {departmentsDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-72 bg-[#0B1220] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in-50 duration-150">
                        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                          Active Divisions ({activeDepartments.length})
                        </div>
                        <div className="max-h-80 overflow-y-auto py-1">
                          {activeDepartments.map(dept => (
                            <button
                              key={dept.id}
                              onClick={() => handleNavClick(`/departments/${dept.slug}`)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center justify-between group text-sm text-slate-200 transition-colors"
                            >
                              <div>
                                <div className="font-medium group-hover:text-amber-400 transition-colors">
                                  {dept.name}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">
                                  {dept.shortDescription}
                                </div>
                              </div>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-2 shrink-0"></span>
                            </button>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-slate-800 px-2">
                          <button
                            onClick={() => handleNavClick('/departments')}
                            className="w-full py-1.5 text-center text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20"
                          >
                            Explore Full Ecosystem ({departments.length})
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-amber-400 bg-amber-500/10 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2 text-xs"
              title="Global Search"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400 hidden 2xl:inline">Search YusKar...</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Saved Items Counter */}
            {clientSaved.length > 0 && (
              <button
                onClick={() => handleNavClick('/client')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors relative"
                title={`${clientSaved.length} Saved items`}
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black font-bold text-[10px] rounded-full flex items-center justify-center">
                  {clientSaved.length}
                </span>
              </button>
            )}

            {/* Client Account */}
            <button
              onClick={() => handleNavClick('/client')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                currentRoute === '/client'
                  ? 'bg-amber-500 text-black border-amber-400'
                  : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              {currentUser?.role === 'CLIENT' ? 'My Account' : 'Client Login'}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => handleNavClick('/admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                currentRoute.startsWith('/admin')
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              {currentUser && currentUser.role !== 'CLIENT' ? 'Admin CMS' : 'Admin'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070B14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('/client')}
              className="py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
              Client Portal
            </button>
            <button
              onClick={() => handleNavClick('/admin')}
              className="py-2.5 px-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.route)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentRoute === link.route 
                    ? 'text-amber-400 bg-amber-500/10 font-bold' 
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.name}</span>
                <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Featured Departments
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {activeDepartments.slice(0, 6).map(dept => (
                <button
                  key={dept.id}
                  onClick={() => handleNavClick(`/departments/${dept.slug}`)}
                  className="px-2.5 py-2 rounded-lg bg-slate-900/70 border border-slate-800/80 text-left hover:border-amber-500/40"
                >
                  <div className="text-xs font-medium text-slate-200">{dept.name}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
