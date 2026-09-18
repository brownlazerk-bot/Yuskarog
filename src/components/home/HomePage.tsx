import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Car, 
  Truck, 
  Briefcase, 
  Building2, 
  Compass, 
  Hammer, 
  Sparkles, 
  Bike, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Fuel, 
  Gauge, 
  SlidersHorizontal, 
  Phone, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Bell,
  Clock,
  Eye
} from 'lucide-react';
import { DepartmentStatus } from '../../types';

export const HomePage: React.FC = () => {
  const { 
    departments, 
    products, 
    services, 
    posts, 
    projects, 
    team, 
    settings,
    navigate, 
    openInquiryModal, 
    openShareModal, 
    toggleSaveItem, 
    isItemSaved,
    showToast
  } = useApp();

  // Search widget state (matching screenshot)
  const [searchBrand, setSearchBrand] = useState('All Brands');
  const [searchBodyType, setSearchBodyType] = useState('All Body Types');
  const [searchBudget, setSearchBudget] = useState('Any Budget');

  // Ecosystem filter
  const [ecosystemFilter, setEcosystemFilter] = useState<'ALL' | 'ACTIVE' | 'COMING_SOON' | 'INACTIVE'>('ALL');

  const activeDepartments = departments.filter(d => d.status === 'ACTIVE');
  const filteredEcosystem = departments.filter(d => {
    if (ecosystemFilter === 'ALL') return true;
    return d.status === ecosystemFilter;
  });

  const featuredVehicles = products.filter(p => p.departmentId === 'dept-motors' && p.status === 'ACTIVE');
  const featuredServices = services.filter(s => s.status === 'ACTIVE');
  const publishedPosts = posts.filter(p => p.status === 'PUBLISHED').slice(0, 3);

  // Hero Section Slide/Advert state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  // Departments for slide showcase
  const slideDepartments = departments.length > 0 ? departments : [];
  const currentDept = slideDepartments[currentSlideIndex] || slideDepartments[0];

  // Auto-slide effect (rotates every 5.5 seconds, pauses on hover)
  useEffect(() => {
    if (isSlidePaused || slideDepartments.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideDepartments.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isSlidePaused, slideDepartments.length]);

  const visibility = settings.sectionVisibility || {
    heroSection: true,
    advertSlideShowcase: true,
    statsTrustBadges: true,
    departmentsDirectory: true,
    showroomProducts: true,
    servicesDirectory: true,
    projectsCaseStudies: true,
    leadershipTeam: true,
    newsInsights: true,
    contactSection: true,
    footerSocials: true
  };

  const pageContent = settings.pageContent || {
    heroTitle: 'ONE COMPANY. MULTIPLE SOLUTIONS.',
    heroSubtitle: "YusKar Empire is Rwanda's multi-sector corporate enterprise headquartered in Kigali. We operate autonomous, specialized divisions delivering verified vehicle sourcing, express logistics, luxury fashion retail, high-performance cycling, corporate advisory, and prime real estate.",
    showAnnouncementBanner: false,
    customAnnouncementBanner: 'Welcome to YusKar Empire Ltd — Kigali Headquarters'
  };

  const nextSlide = () => {
    if (slideDepartments.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % slideDepartments.length);
  };

  const prevSlide = () => {
    if (slideDepartments.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + slideDepartments.length) % slideDepartments.length);
  };

  const getDeptIcon = (slug: string) => {
    if (slug.includes('motor')) return <Car className="w-4 h-4" />;
    if (slug.includes('delivery') || slug.includes('logistics')) return <Truck className="w-4 h-4" />;
    if (slug.includes('celine') || slug.includes('store')) return <ShoppingBag className="w-4 h-4" />;
    if (slug.includes('bike')) return <Bike className="w-4 h-4" />;
    if (slug.includes('advisory') || slug.includes('business')) return <Briefcase className="w-4 h-4" />;
    if (slug.includes('estate')) return <Building2 className="w-4 h-4" />;
    if (slug.includes('travel') || slug.includes('concierge')) return <Compass className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const handleVehicleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/departments/motors');
  };

  const handleNotifyMe = (deptName: string) => {
    showToast(`You will be notified as soon as ${deptName} officially launches in Kigali!`, 'success');
  };

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen">
      
      {/* Sitewide Announcement Banner if enabled */}
      {pageContent.showAnnouncementBanner && pageContent.customAnnouncementBanner && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-bold text-center tracking-wide flex items-center justify-center gap-2 shadow-inner border-b border-amber-400/30">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{pageContent.customAnnouncementBanner}</span>
        </div>
      )}

      {/* 1. HERO SECTION: SEPARATED TEXT & INTERACTIVE ADVERT SLIDER */}
      {visibility.heroSection !== false && (
        <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-800/80">
          {/* Ambient background glow */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* LEFT COLUMN: BRAND TEXT & EXECUTIVE NARRATIVE */}
              <div className={`${visibility.advertSlideShowcase !== false ? 'lg:col-span-5' : 'lg:col-span-12 max-w-3xl mx-auto text-center'} space-y-6 text-left`}>
                
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>YUSKAR EMPIRE LTD • KIGALI, RWANDA</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
                  {pageContent.heroTitle || (
                    <>
                      ONE COMPANY. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                        MULTIPLE SOLUTIONS.
                      </span>
                    </>
                  )}
                </h1>

                {/* Subtitle / Narrative */}
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                  {pageContent.heroSubtitle || "YusKar Empire is Rwanda's multi-sector corporate enterprise headquartered in Kigali. We operate autonomous, specialized divisions delivering verified vehicle sourcing, express logistics, luxury fashion retail, high-performance cycling, corporate advisory, and prime real estate."}
                </p>

                {/* Primary Dual CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => navigate('/departments')}
                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2 transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.02]"
                  >
                    <span>Explore All Divisions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openInquiryModal({ type: 'PARTNERSHIP' })}
                    className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base border border-slate-700 flex items-center gap-2 transition-all hover:border-slate-500"
                  >
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>Work With Us</span>
                  </button>
                </div>

                {/* Trust Badges Bar */}
                {visibility.statsTrustBadges !== false && (
                  <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                      <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">RDB Registered</div>
                        <div className="text-[11px] text-slate-400">#109283719 Kigali</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                      <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Showrooms & Hubs</div>
                        <div className="text-[11px] text-slate-400">Gikondo, Masoro, CHIC</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: ADVERT / SLIDE IMAGE SHOWCASE OF WHAT WE DO */}
              {visibility.advertSlideShowcase !== false && (
                <div className="lg:col-span-7">
                  {currentDept && (
                    <div 
                      className="relative rounded-3xl bg-[#0B1220] border border-slate-700/70 hover:border-amber-500/40 transition-all shadow-2xl overflow-hidden group"
                      onMouseEnter={() => setIsSlidePaused(true)}
                      onMouseLeave={() => setIsSlidePaused(false)}
                    >
                  {/* Top Bar of the Advert Card */}
                  <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        WHAT WE DO • DIVISION ADVERT
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 font-mono">
                        {String(currentSlideIndex + 1).padStart(2, '0')} / {String(slideDepartments.length).padStart(2, '0')}
                      </span>

                      {/* Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={prevSlide}
                          aria-label="Previous slide"
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextSlide}
                          aria-label="Next slide"
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Slide Body */}
                  <div className="relative">
                    {/* Visual Advert Image */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <img
                        key={currentDept.id}
                        src={currentDept.coverImage}
                        alt={currentDept.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/40 to-transparent" />

                      {/* Badges on the image */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-400 text-xs font-bold shadow-lg">
                          {getDeptIcon(currentDept.slug)}
                          <span>{currentDept.name}</span>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                          currentDept.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {currentDept.status === 'ACTIVE' ? 'OPERATIONAL DIVISION' : 'COMING SOON'}
                        </span>
                      </div>

                      {/* Location Badge on Image */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{currentDept.location}</span>
                      </div>
                    </div>

                    {/* Explanatory Content Panel */}
                    <div className="p-5 sm:p-6 space-y-4 bg-[#0B1220]">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                          DEPARTMENT PROFILE & WHAT WE DO
                        </div>
                        <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                          {currentDept.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                          {currentDept.shortDescription}
                        </p>
                      </div>

                      {/* Features / Capabilities Chips */}
                      {currentDept.features && currentDept.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {currentDept.features.slice(0, 3).map((feat, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
                            >
                              <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Advert Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => navigate(`/departments/${currentDept.slug}`)}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                        >
                          <span>Explore {currentDept.name.replace('YusKar ', '')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openInquiryModal({ 
                            departmentId: currentDept.id,
                            type: 'SERVICE_REQUEST',
                            itemTitle: currentDept.name
                          })}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                          <span>Work With Us</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Interactive Quick-Department Selector Tabs Bar */}
                  <div className="p-3 bg-slate-950/90 border-t border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                      <span>SELECT DIVISION TO PREVIEW:</span>
                      <span className="text-[10px] text-amber-400/80">Click any tab</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {slideDepartments.map((dept, index) => {
                        const isCurrent = index === currentSlideIndex;
                        return (
                          <button
                            key={dept.id}
                            onClick={() => setCurrentSlideIndex(index)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            {getDeptIcon(dept.slug)}
                            <span>{dept.name.replace('YusKar ', '')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Auto-Slide Progress Bar */}
                  <div className="w-full h-1 bg-slate-900 overflow-hidden">
                    <div 
                      key={currentSlideIndex}
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                      style={{
                        animation: isSlidePaused ? 'none' : 'heroProgressBar 5.5s linear forwards'
                      }}
                    />
                  </div>

                </div>
              )}
            </div>
            )}

          </div>
        </div>
      </section>
      )}

      {/* QUICK SEARCH WIDGET (Matching Screenshot Reference) */}
      {visibility.statsTrustBadges !== false && (
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1220] border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span>QUICK VEHICLE SEARCH & SOURCING</span>
            </div>
            <span className="text-xs text-slate-400">
              Filter by verified Kigali stock or international lots
            </span>
          </div>

          <form onSubmit={handleVehicleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <div>
              <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">
                BRAND / MAKE
              </label>
              <select
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="All Brands">All Brands</option>
                <option value="Toyota">Toyota</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Nissan">Nissan</option>
                <option value="Hyundai">Hyundai</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">
                BODY TYPE
              </label>
              <select
                value={searchBodyType}
                onChange={(e) => setSearchBodyType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="All Body Types">All Body Types</option>
                <option value="SUV">SUV</option>
                <option value="Luxury 4x4">Luxury 4x4</option>
                <option value="Pickup">Pickup 4x4</option>
                <option value="Sedan">Executive Sedan</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">
                MAX BUDGET (RWF)
              </label>
              <select
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="Any Budget">Any Budget</option>
                <option value="30000000">Under 30,000,000 RWF</option>
                <option value="50000000">Under 50,000,000 RWF</option>
                <option value="80000000">Under 80,000,000 RWF</option>
                <option value="120000000">Under 120,000,000 RWF</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Car className="w-4 h-4" />
                <span>SEARCH CARS</span>
              </button>
            </div>
          </form>
        </div>
      </section>
      )}

      {/* 2. WHAT YUSKAR DOES (CORPORATE IDENTITY) & 3. YUSKAR ECOSYSTEM SECTION */}
      {visibility.departmentsDirectory !== false && (
      <>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Corporate Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              One Unified Standard. <br />
              Multiple Specialized Divisions.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              YusKar Empire Ltd was created to address the friction of operating across fragmented service vendors in Rwanda. Rather than compromising quality, we established dedicated autonomous departments each managed by seasoned domain professionals.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  <strong className="text-white">Department Independence:</strong> Each division (Motors, Delivery, Business Hub, Estate, Tourism) maintains its own operations, catalog, and support desk while sharing YusKar Empire&apos;s institutional credibility.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  <strong className="text-white">Radical Transparency:</strong> From certified 120-point vehicle auction sheets to bonded RRA customs clearances and verified land titles in Kigali.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  <strong className="text-white">Dynamic Ecosystem Scalability:</strong> Our platform architecture supports continuous department additions—from active divisions to coming soon concepts.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => navigate('/about')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-amber-400 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <span>Read Full Company Story</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Graphic / Visual Box */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="YusKar Empire Kigali Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
              
              {/* Floating metrics badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1220]/90 backdrop-blur-md border border-slate-700">
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-800">
                  <div>
                    <div className="text-base sm:text-xl font-heading font-extrabold text-amber-400">{departments.length}+</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Departments</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-heading font-extrabold text-amber-400">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Rwandan Title Audit</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-heading font-extrabold text-amber-400">24/7</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Dispatch Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. YUSKAR ECOSYSTEM SECTION (Section #20: All departments, ACTIVE, COMING SOON, CURRENTLY UNAVAILABLE) */}
      <section className="py-20 bg-[#05080F] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Multi-Department Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                The YusKar Ecosystem
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mt-1">
                Explore our comprehensive matrix of active operating divisions, upcoming ventures, and strategic corporate initiatives.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setEcosystemFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  ecosystemFilter === 'ALL' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({departments.length})
              </button>
              <button
                onClick={() => setEcosystemFilter('ACTIVE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  ecosystemFilter === 'ACTIVE' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Active ({departments.filter(d => d.status === 'ACTIVE').length})
              </button>
              <button
                onClick={() => setEcosystemFilter('COMING_SOON')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  ecosystemFilter === 'COMING_SOON' ? 'bg-amber-400 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Coming Soon ({departments.filter(d => d.status === 'COMING_SOON').length})
              </button>
              <button
                onClick={() => setEcosystemFilter('INACTIVE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  ecosystemFilter === 'INACTIVE' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Ecosystem Archive ({departments.filter(d => d.status === 'INACTIVE').length})
              </button>
            </div>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEcosystem.map((dept) => {
              const isActive = dept.status === 'ACTIVE';
              const isComingSoon = dept.status === 'COMING_SOON';
              const isInactive = dept.status === 'INACTIVE';

              return (
                <div
                  key={dept.id}
                  className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group ${
                    isActive 
                      ? 'bg-[#0B1220] border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5' 
                      : isComingSoon 
                      ? 'bg-slate-900/60 border-amber-500/30' 
                      : 'bg-slate-950/80 border-slate-800/80 opacity-80'
                  }`}
                >
                  {/* Department Image & Top Tag */}
                  <div className="h-44 relative overflow-hidden bg-slate-900">
                    <img
                      src={dept.coverImage}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-black/40" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {isActive && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/90 text-slate-950 flex items-center gap-1 shadow-md">
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
                          Currently Unavailable
                        </span>
                      )}
                    </div>

                    {/* Location preview tag */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-slate-300 font-medium drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{dept.location}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {dept.shortDescription}
                      </p>

                      {isComingSoon && dept.comingSoonDate && (
                        <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Expected Launch: <strong>{dept.comingSoonDate}</strong></span>
                        </div>
                      )}

                      {isInactive && dept.comingSoonNotice && (
                        <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                          {dept.comingSoonNotice}
                        </div>
                      )}

                      {/* Features preview */}
                      {dept.features && dept.features.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1">
                          {dept.features.slice(0, 2).map((f, i) => (
                            <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-5 mt-4 border-t border-slate-800/60">
                      {isActive && (
                        <button
                          onClick={() => navigate(`/departments/${dept.slug}`)}
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10"
                        >
                          <span>{dept.ctaText || 'Enter Department'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {isComingSoon && (
                        <button
                          onClick={() => handleNotifyMe(dept.name)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-all"
                        >
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                          <span>Notify Me on Launch</span>
                        </button>
                      )}

                      {isInactive && (
                        <button
                          onClick={() => openInquiryModal({ departmentId: dept.id, type: 'PARTNERSHIP', itemTitle: dept.name })}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-medium border border-slate-800 flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Inquire Strategic Relaunch</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
      </>
      )}

      {/* 4. FEATURED VEHICLES SECTION (Matching Screenshot Reference) */}
      {visibility.showroomProducts !== false && (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              DIRECT SHOWROOM & VERIFIED STOCK
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
              Hand-picked, clean title luxury SUVs, executive sedans, and durable 4x4 pickups available for immediate inspection and ownership in Kigali.
            </p>
          </div>

          <button
            onClick={() => navigate('/departments/motors')}
            className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>BROWSE ALL VEHICLES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicle Cards Grid (Exact look & feel as screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => {
            const isSaved = isItemSaved('product', vehicle.id);
            return (
              <div
                key={vehicle.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.mainImage}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-[10px] tracking-wide flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                      IN STOCK (KIGALI)
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSaveItem('product', vehicle.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-amber-500 text-black' : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                      title={isSaved ? 'Saved' : 'Save vehicle'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openShareModal({
                        type: 'product',
                        id: vehicle.id,
                        title: vehicle.name,
                        excerpt: `${vehicle.price.toLocaleString()} RWF • ${vehicle.specifications['Brand / Make'] || 'YusKar Motors'}`,
                        image: vehicle.mainImage
                      })}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                      title="Share / Repost"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Showroom location */}
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-300 font-medium flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{vehicle.location || 'Kigali Showroom (Gikondo)'}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{vehicle.specifications['Brand / Make'] || 'TOYOTA'}</span>
                      <span className="text-amber-400">{vehicle.specifications['Model Year'] || '2022'}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-amber-400 transition-colors">
                      {vehicle.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {vehicle.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{vehicle.specifications['Model Year'] || '2022'} Model</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-amber-400" />
                        <span>{vehicle.specifications['Mileage'] || 'Verified KM'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-amber-400" />
                        <span>{vehicle.specifications['Fuel Type'] || 'Petrol'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                        <span>{vehicle.specifications['Transmission'] || 'Automatic'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        PRICE (RWANDA)
                      </div>
                      <div className="text-lg sm:text-xl font-heading font-extrabold text-amber-400">
                        {vehicle.price.toLocaleString()} {vehicle.currency}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/products?id=${vehicle.id}`)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
                    >
                      <span>VIEW VEHICLE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 5. ENTERPRISE SERVICES SHOWCASE */}
      {visibility.servicesDirectory !== false && (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Cross-Department Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Featured Enterprise Services
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
              From RDB corporate incorporation to express logistics and luxury travel safari arrangements.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>ALL SERVICES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.slice(0, 4).map((serv) => {
            const dept = departments.find(d => d.id === serv.departmentId);
            return (
              <div
                key={serv.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {dept?.name || 'YusKar Empire'}
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mt-1 group-hover:text-amber-400 transition-colors">
                    {serv.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {serv.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    {serv.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-400">
                    {serv.priceType === 'REQUEST_QUOTE' ? 'Request Quote' : `${serv.price?.toLocaleString()} ${serv.currency || 'RWF'}`}
                  </div>

                  <button
                    onClick={() => openInquiryModal({
                      departmentId: serv.departmentId,
                      type: 'SERVICE_REQUEST',
                      itemTitle: serv.name,
                      relatedItemId: serv.id
                    })}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black text-xs font-semibold transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 6. LATEST NEWS & POSTS (WITH CLIENT REPOST/SHARE) */}
      {visibility.newsInsights !== false && (
      <section className="py-20 bg-[#05080F] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Insights & Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                Latest from YusKar Empire
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
                Articles, department announcements, and East African business insights. Share and repost directly to your social platforms.
              </p>
            </div>

            <button
              onClick={() => navigate('/posts')}
              className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>VIEW ALL POSTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mb-2">
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>By {post.author}</span>
                    </div>

                    <h3 
                      onClick={() => navigate(`/posts/${post.slug}`)}
                      className="font-heading font-bold text-base text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/posts/${post.slug}`)}
                      className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Read Article <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => openShareModal({
                        type: 'post',
                        id: post.slug,
                        title: post.title,
                        excerpt: post.shortDescription,
                        image: post.coverImage
                      })}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs"
                      title="Repost / Share to WhatsApp, X, Facebook"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Repost</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
      )}

      {/* 7. WHY PARTNER WITH YUSKAR & 8. CALL TO ACTION BANNER */}
      {visibility.contactSection !== false && (
      <>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Institutional Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mt-1">
            Why East Africa Chooses YusKar Empire
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Built on Rwandan precision, technological infrastructure, and verified provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Zero Grey-Market Uncertainty
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every car, estate plot, and business contract is audited against official Rwanda Revenue Authority (RRA) registries, UPI land databases, and RDB incorporation books.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Integrated Logistics Muscle
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our in-house fleet of dispatch couriers, Masoro bonded logistics hub, and cross-border customs agents ensure your assets move without intermediary delays.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">
              Physical Presence in Kigali
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visit our active physical showroom in the Gikondo Industrial Zone, downtown CHIC advisory suites, or Kigali Heights boutique. We are permanently rooted in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#0B1220] to-[#070B14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Start Working With YusKar Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Ready to Source, Ship, or Expand in Rwanda?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our corporate advisors and department managers are available Monday through Saturday to handle your inquiries, appointments, and requests.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => openInquiryModal({ departmentId: 'dept-motors', type: 'VEHICLE_SOURCING' })}
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-xl shadow-amber-500/20"
            >
              <Car className="w-4 h-4" />
              <span>Source A Vehicle</span>
            </button>

            <button
              onClick={() => openInquiryModal({ departmentId: 'dept-delivery', type: 'SERVICE_REQUEST' })}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Book Express Delivery</span>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 transition-all"
            >
              <span>Contact Headquarters</span>
            </button>
          </div>
        </div>
      </section>
      </>
      )}

    </div>
  );
};
