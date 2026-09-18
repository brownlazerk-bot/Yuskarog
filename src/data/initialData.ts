import { 
  Department, 
  Product, 
  Service, 
  Post, 
  Project, 
  TeamMember, 
  User, 
  MediaItem, 
  ContactMessage, 
  AuditLog, 
  WebsiteSettings 
} from '../types';

export const initialSettings: WebsiteSettings = {
  companyName: "YusKar Empire Ltd",
  slogan: "One Company, Multiple Solutions",
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  favicon: "/favicon.ico",
  aboutText: "YusKar Empire Ltd is a premier multi-service corporate conglomerate headquartered in Kigali, Rwanda. Operating an expansive ecosystem spanning automotive sourcing, express logistics, enterprise consultancy, real estate, tourism, and lifestyle retail, YusKar Empire combines Rwandan excellence with global standards.",
  primaryEmail: "info@yuskarempire.rw",
  supportEmail: "support@yuskarempire.rw",
  hotlinePhone: "+250 726 134 041 / +250 795 153 994",
  hotlinePrimaryPhone: "+250 726 134 041",
  hotlineSecondaryPhone: "+250 795 153 994",
  whatsappPhone: "+250 795 153 994 / +250 781 652 135",
  whatsappPrimaryPhone: "250795153994",
  whatsappSecondaryPhone: "250781652135",
  address: "KG 11 Ave, Gikondo Business District, Kigali, Rwanda",
  businessHours: "Monday - Saturday: 8:00 AM - 7:00 PM CAT",
  socialLinks: {
    whatsapp: "https://wa.me/250795153994",
    twitter: "https://twitter.com/YusKarEmpire",
    facebook: "https://facebook.com/YusKarEmpire",
    instagram: "https://instagram.com/YusKarEmpire",
    linkedin: "https://linkedin.com/company/yuskar-empire",
    telegram: "https://t.me/YusKarEmpire"
  },
  seoDefaults: {
    title: "YusKar Empire Ltd | One Company, Multiple Solutions – Kigali, Rwanda",
    description: "Discover verified automotive solutions, express delivery, prime real estate, and enterprise services from YusKar Empire Ltd in Kigali, Rwanda.",
    keywords: ["YusKar Empire", "YusKar Motors Kigali", "Rwanda car imports", "Kigali logistics", "Rwanda business hub", "Rwanda real estate", "Kigali investments"]
  },
  maintenanceMode: false,
  featuredDepartmentSlug: "motors",
  whatsappWidget: {
    enabled: true,
    phoneNumber: "250795153994",
    displayPhoneNumber: "+250 795 153 994",
    secondaryPhoneNumber: "250781652135",
    secondaryDisplayPhoneNumber: "+250 781 652 135",
    businessName: "YusKar Empire",
    welcomeMessage: "Muraho 👋 Twagufasha iki?",
    statusText: "Usually replies instantly",
    quickMessages: [
      "Nshaka service",
      "Nshaka kumenya ibiciro",
      "Nshaka kuvugana namwe",
      "Mfite ikibazo"
    ],
    position: 'bottom-right',
    pulseAnimation: true
  },
  sectionVisibility: {
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
  },
  pageContent: {
    heroTitle: "ONE COMPANY. MULTIPLE SOLUTIONS.",
    heroSubtitle: "YusKar Empire is Rwanda's multi-sector corporate enterprise headquartered in Kigali. We operate autonomous, specialized divisions delivering verified vehicle sourcing, express logistics, luxury fashion retail, high-performance cycling, corporate advisory, and prime real estate.",
    aboutHeroTitle: "Building Africa's Next-Generation Multi-Sector Conglomerate",
    aboutMissionText: "To build sustainable, technology-empowered businesses in Rwanda and East Africa that solve critical commerce, transport, infrastructure, and enterprise bottlenecks.",
    aboutVisionText: "To be the most trusted and diversified Rwandan corporate conglomerate by 2030, empowering communities and fostering regional economic integration.",
    contactHeroTitle: "Get in Touch With YusKar Empire",
    contactSubtitle: "Whether inquiring about vehicle imports, express logistics, business consultation, or corporate partnerships, our department directors in Kigali are ready to assist.",
    contactPrimaryPhone: "+250 726 134 041",
    contactSecondaryPhone: "+250 795 153 994",
    contactWhatsAppPrimary: "+250 795 153 994",
    contactWhatsAppSecondary: "+250 781 652 135",
    contactEmail: "info@yuskarempire.rw",
    contactSupportEmail: "support@yuskarempire.rw",
    contactAddress: "KG 11 Ave, Gikondo Industrial & Business District, Kigali, Rwanda",
    contactBusinessHours: "Monday - Saturday: 8:00 AM - 7:00 PM CAT",
    customAnnouncementBanner: "Welcome to YusKar Empire Ltd • Verified Kigali Showroom & Logistics Hub",
    showAnnouncementBanner: false
  }
};

export const initialDepartments: Department[] = [
  {
    id: "dept-motors",
    name: "YusKar Motors",
    slug: "motors",
    shortDescription: "Direct vehicle imports, 100% verified titles, Kigali showroom stock, and worldwide sourcing.",
    fullDescription: "YusKar Motors is the automotive powerhouse of YusKar Empire Ltd. Based in our state-of-the-art Gikondo showroom, we provide verified Japanese and European vehicle sourcing, port-to-Kigali bonded clearance, 120-point mechanical certifications, and comprehensive after-sales warranty support throughout East Africa.",
    iconName: "Car",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "motors@yuskarempire.rw",
      address: "Kigali Showroom (Gikondo Industrial Zone), Kigali, Rwanda",
      hours: "Mon - Sat: 8:00 AM - 6:30 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/yuskarmotors",
      twitter: "https://twitter.com/yuskarmotors",
      facebook: "https://facebook.com/yuskarmotors"
    },
    location: "Kigali Showroom (Gikondo), Rwanda",
    ctaText: "Explore Showroom Vehicles",
    ctaLink: "/departments/motors",
    status: "ACTIVE",
    displayOrder: 1,
    features: [
      "100% Verified Clean Titles",
      "120-Point Multi-Stage Inspection",
      "Port-to-Kigali Bonded Shipping",
      "In-House Registration & RRA Support"
    ],
    tags: ["Automotive", "SUVs", "Executive Sedans", "Direct Imports", "Kigali Stock"],
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-delivery",
    name: "YusKar Delivery",
    slug: "delivery",
    shortDescription: "Ultra-fast intra-Kigali dispatch, e-commerce fulfillment, and regional cargo distribution.",
    fullDescription: "YusKar Delivery operates an advanced dispatch network featuring motorbike couriers, vans, and freight haulers. We serve retail merchants, corporate offices, and individuals across all 3 districts of Kigali and cross-border corridors to Goma, Bukavu, and Bujumbura with real-time GPS tracking.",
    iconName: "Truck",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 457",
      whatsapp: "+250 788 123 457",
      email: "delivery@yuskarempire.rw",
      address: "Masoro Free Trade Zone Hub, Gasabo, Kigali",
      hours: "24/7 Operations"
    },
    socialMedia: {
      twitter: "https://twitter.com/yuskardelivery"
    },
    location: "Kigali Dispatch Hub (Masoro), Rwanda",
    ctaText: "Book Express Delivery",
    ctaLink: "/departments/delivery",
    status: "ACTIVE",
    displayOrder: 2,
    features: [
      "Sub-45 Minute Intra-Kigali Express",
      "Live Real-Time GPS Tracking",
      "Cash & MoMo On Delivery Integration",
      "Secured Cold-Chain Capabilities"
    ],
    tags: ["Logistics", "Courier", "Fleet", "E-Commerce", "Kigali Delivery"],
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-business-hub",
    name: "YusKar Business Hub",
    slug: "business-hub",
    shortDescription: "Company registration, RDB facilitation, accounting, legal advisory, and executive workspace.",
    fullDescription: "Empowering foreign investors and local entrepreneurs with end-to-end corporate services in Rwanda. From RDB business registration and tax compliance to high-speed executive co-working facilities in central Kigali.",
    iconName: "Briefcase",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 458",
      whatsapp: "+250 788 123 458",
      email: "hub@yuskarempire.rw",
      address: "CHIC Building, 3rd Floor, Downtown Kigali",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/company/yuskar-business-hub"
    },
    location: "CHIC Complex, Downtown Kigali",
    ctaText: "Consult Business Advisors",
    ctaLink: "/departments/business-hub",
    status: "ACTIVE",
    displayOrder: 3,
    features: [
      "Fast 6-Hour RDB Incorporation",
      "Tax Advisory & Monthly RRA Filing",
      "Furnished Boardrooms & Fiber Internet",
      "Investment Certificate Assistance"
    ],
    tags: ["Consulting", "RDB", "Legal", "Tax", "Office Suites"],
    createdAt: "2025-02-15T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-estate",
    name: "YusKar Estate",
    slug: "estate",
    shortDescription: "Luxury villas, modern apartments, land acquisitions, and property management in Kigali.",
    fullDescription: "Connecting discerning homeowners and institutional investors to verified real estate in Kigali's most prestigious neighbourhoods: Nyarutarama, Kimihurura, Kiyovu, Gacuriro, and Vision City.",
    iconName: "Building2",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 459",
      whatsapp: "+250 788 123 459",
      email: "estate@yuskarempire.rw",
      address: "KG 9 Ave, Nyarutarama, Kigali",
      hours: "Mon - Sat: 8:30 AM - 6:00 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/yuskarestate"
    },
    location: "Nyarutarama & Kimihurura, Kigali",
    ctaText: "View Luxury Properties",
    ctaLink: "/departments/estate",
    status: "ACTIVE",
    displayOrder: 4,
    features: [
      "Verified Land Registry Titles (UPI)",
      "High-Yield Rental Management",
      "Turnkey Diplomatic Leases",
      "Architectural Due Diligence"
    ],
    tags: ["Real Estate", "Villas", "Apartments", "Commercial", "Nyarutarama"],
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-tour-travel",
    name: "YusKar Tour & Travel",
    slug: "tour-travel",
    shortDescription: "Bespoke Rwanda gorilla treks, Akagera wildlife safaris, and luxury concierge travel.",
    fullDescription: "Experience Rwanda's unmatched beauty with YusKar Tour & Travel. We handle licensed gorilla trekking permits in Volcanoes National Park, Big Five safaris in Akagera, helicopter charters, and luxury Lake Kivu expeditions.",
    iconName: "Compass",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 460",
      whatsapp: "+250 788 123 460",
      email: "travel@yuskarempire.rw",
      address: "Kigali Heights, 2nd Floor, Kimihurura",
      hours: "Daily: 7:00 AM - 8:00 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/yuskartravel"
    },
    location: "Kigali Heights & Musanze Hub",
    ctaText: "Book Safari Itinerary",
    ctaLink: "/departments/tour-travel",
    status: "ACTIVE",
    displayOrder: 5,
    features: [
      "Official RDB Gorilla Trekking Permits",
      "Custom 4x4 Safari Land Cruisers",
      "Five-Star Lodge Partnerships",
      "Bilingual Tour Leaders"
    ],
    tags: ["Tourism", "Gorillas", "Akagera", "Safari", "Rwanda Expeditions"],
    createdAt: "2025-03-10T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-construction",
    name: "YusKar Construction",
    slug: "construction",
    shortDescription: "Architectural design, structural engineering, commercial buildouts, and project management.",
    fullDescription: "Delivering modern, climate-conscious infrastructure across Rwanda. Our engineering team oversees green building standards, high-density residences, and commercial facilities with rigorous quality benchmarks.",
    iconName: "Hammer",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 461",
      whatsapp: "+250 788 123 461",
      email: "construction@yuskarempire.rw",
      address: "Gikondo Heavy Industrial Area, Kigali",
      hours: "Mon - Sat: 7:30 AM - 5:30 PM"
    },
    socialMedia: {
      linkedin: "https://linkedin.com/company/yuskar-construction"
    },
    location: "Kigali & Western Province Projects",
    ctaText: "Request Construction Tender",
    ctaLink: "/departments/construction",
    status: "ACTIVE",
    displayOrder: 6,
    features: [
      "Structural Engineering Certifications",
      "Green Architecture & Solar Integration",
      "Procurement & Heavy Machinery",
      "Full Project Warranty"
    ],
    tags: ["Construction", "Architecture", "Engineering", "Commercial", "Residential"],
    createdAt: "2025-03-20T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-events",
    name: "YusKar Events",
    slug: "events",
    shortDescription: "Corporate summits, summit production, VIP gala dinners, and stage engineering in Kigali.",
    fullDescription: "Positioning Kigali as the premier MICE hub of Africa. YusKar Events designs flawless corporate gatherings, diplomatic receptions, product launches, and audio-visual stage productions.",
    iconName: "Sparkles",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 462",
      whatsapp: "+250 788 123 462",
      email: "events@yuskarempire.rw",
      address: "Kigali Convention Centre District",
      hours: "Daily: 8:00 AM - 9:00 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/yuskarevents"
    },
    location: "Kigali Convention District",
    ctaText: "Plan Your Event",
    ctaLink: "/departments/events",
    status: "ACTIVE",
    displayOrder: 7,
    features: [
      "State-of-the-Art Sound & LED Rigging",
      "Protocol & VIP Hospitality Services",
      "Multi-Language Simultaneous Translation",
      "Turnkey Production Management"
    ],
    tags: ["Events", "MICE", "Conferences", "VIP Production", "Kigali"],
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-rafiki-bike",
    name: "RAFIKI BIKE",
    slug: "rafiki-bike",
    shortDescription: "Urban electric bicycles, eco-commuter mobility, and scenic Kigali cycling rentals.",
    fullDescription: "Championing Kigali's green and car-free zone movement. RAFIKI BIKE offers high-torque electric commuter bikes, guided city tours, and subscription-based green logistics for smart urban transport.",
    iconName: "Bike",
    coverImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 463",
      whatsapp: "+250 788 123 463",
      email: "rafikibike@yuskarempire.rw",
      address: "KN 4 Ave, Car-Free Zone, Kigali",
      hours: "Mon - Sun: 7:00 AM - 7:00 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/rafikibike_rw"
    },
    location: "Kigali Car-Free Zone, Rwanda",
    ctaText: "Rent or Buy an E-Bike",
    ctaLink: "/departments/rafiki-bike",
    status: "ACTIVE",
    displayOrder: 8,
    features: [
      "65km Range Lithium Batteries",
      "Kigali Hills High-Torque Motors",
      "Smart Mobile App GPS Unlock",
      "Zero-Emission Green Certified"
    ],
    tags: ["Eco-Mobility", "E-Bikes", "Green Kigali", "Commuting"],
    createdAt: "2025-04-15T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-celine-store",
    name: "Celine Store",
    slug: "celine-store",
    shortDescription: "Curated luxury fashion, authentic designer fragrances, and refined lifestyle accessories.",
    fullDescription: "A boutique destination inside the YusKar Empire ecosystem, bringing genuine haute couture garments, premium footwear, and luxury scents to Kigali's style leaders.",
    iconName: "ShoppingBag",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
    ],
    contactInfo: {
      phone: "+250 788 123 464",
      whatsapp: "+250 788 123 464",
      email: "celinestore@yuskarempire.rw",
      address: "Kigali Heights, Ground Floor, Kimihurura",
      hours: "Daily: 9:00 AM - 8:30 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/celinestore_kigali"
    },
    location: "Kigali Heights, Kimihurura",
    ctaText: "Shop Luxury Collection",
    ctaLink: "/departments/celine-store",
    status: "ACTIVE",
    displayOrder: 9,
    features: [
      "100% Genuine Designer Imports",
      "Personal Styling Concierge",
      "Private VIP Fitting Salons",
      "Same-Day Kigali Delivery"
    ],
    tags: ["Fashion", "Luxury", "Boutique", "Accessories", "Kigali Heights"],
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  // COMING SOON DEPARTMENTS
  {
    id: "dept-furniture",
    name: "YusKar Furniture",
    slug: "furniture",
    shortDescription: "Handcrafted Rwandan hardwood, ergonomic executive desks, and luxury living room suites.",
    fullDescription: "Blending artisanal Rwandan craftsmanship with contemporary Scandinavian minimalism. YusKar Furniture will produce bespoke residential and executive office collections built from sustainably harvested regional timber.",
    iconName: "Armchair",
    coverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "furniture@yuskarempire.rw",
      address: "Gikondo Woodcraft Workshop, Kigali",
      hours: "Coming Soon"
    },
    socialMedia: {},
    location: "Gikondo Creative Workshop, Kigali",
    ctaText: "Join Waitlist",
    ctaLink: "#",
    status: "COMING_SOON",
    displayOrder: 10,
    comingSoonDate: "November 2026",
    comingSoonNotice: "Factory setup and showroom buildout underway in Gikondo. Pre-orders opening soon.",
    features: [
      "100% Solid Kiln-Dried Hardwood",
      "Custom Interior Joinery",
      "10-Year Craftsmanship Guarantee"
    ],
    tags: ["Furniture", "Interior", "Hardwood", "Office Suites"],
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-restaurant",
    name: "YusKar Restaurant & Lounge",
    slug: "restaurant",
    shortDescription: "Panoramic Kigali rooftop dining, African fusion culinary creations, and artisanal cocktail mixology.",
    fullDescription: "Perched over Kigali's sparkling skyline, YusKar Restaurant will offer an elevated gastronomic experience featuring farm-to-table Rwandan produce, dry-aged cuts, and sommelier-selected wines.",
    iconName: "UtensilsCrossed",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "restaurant@yuskarempire.rw",
      address: "Kiyovu Heights Skyline, Kigali",
      hours: "Opening Soon"
    },
    socialMedia: {},
    location: "Kiyovu Skyline, Kigali",
    ctaText: "Notify on Grand Opening",
    ctaLink: "#",
    status: "COMING_SOON",
    displayOrder: 11,
    comingSoonDate: "December 2026",
    comingSoonNotice: "Curating our executive culinary team and rooftop glass pavilion in Kiyovu.",
    features: [
      "360-Degree Panoramic Kigali Views",
      "East African Fine Dining Fusion",
      "Private VIP Dining Rooms"
    ],
    tags: ["Dining", "Rooftop", "Fine Dining", "Lounge", "Kiyovu"],
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-cinema",
    name: "YusKar Cinema / Entertainment",
    slug: "cinema-entertainment",
    shortDescription: "Ultra HD laser projection, Dolby Atmos sound auditoriums, and African cinema premieres.",
    fullDescription: "Reimagining theatrical entertainment in Rwanda. YusKar Cinema will feature reclining leather seating, immersive sound, and a production incubator for emerging Rwandan filmmakers.",
    iconName: "Film",
    coverImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "cinema@yuskarempire.rw",
      address: "Kigali Entertainment Complex",
      hours: "Coming Soon"
    },
    socialMedia: {},
    location: "Kigali Cultural Village Zone",
    ctaText: "Explore Project",
    ctaLink: "#",
    status: "COMING_SOON",
    displayOrder: 12,
    comingSoonDate: "Q1 2027",
    comingSoonNotice: "Acoustic engineering and projection hardware procurement in progress.",
    features: [
      "4K RGB Laser Cinema Screens",
      "Dolby Atmos 3D Audio",
      "Gourmet Concessions & VIP Lounge"
    ],
    tags: ["Cinema", "Entertainment", "Film", "Media"],
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-talk-show",
    name: "YusKar Talk Show",
    slug: "talk-show",
    shortDescription: "High-impact broadcast covering East African entrepreneurship, tech, and investment.",
    fullDescription: "A weekly broadcast and digital video podcast platform dissecting African economic acceleration, youth leadership, and corporate innovation with prominent continental figures.",
    iconName: "Mic",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "talkshow@yuskarempire.rw",
      address: "YusKar Media Studio, Kigali",
      hours: "Pre-Production"
    },
    socialMedia: {},
    location: "YusKar Studios, Kigali",
    ctaText: "Follow Updates",
    ctaLink: "#",
    status: "COMING_SOON",
    displayOrder: 13,
    comingSoonDate: "Early 2027",
    comingSoonNotice: "Studio acoustics and broadcast lighting installation finishing up.",
    features: [
      "4K Multicam Live Broadcast",
      "Executive Founder Interviews",
      "Syndicated Across Digital Channels"
    ],
    tags: ["Media", "Podcast", "Business Talk", "Broadcasting"],
    createdAt: "2025-07-15T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  // INACTIVE DEPARTMENTS (Displayed in Ecosystem as Currently Unavailable)
  {
    id: "dept-art-crochet",
    name: "YusKar Art & Crochet",
    slug: "art-crochet",
    shortDescription: "Traditional Rwandan fiber crafts, contemporary fiber art, and bespoke woven fashion.",
    fullDescription: "Bridging historic Imigongo motifs and delicate crochet artistry. This department is undergoing strategic restructuring to expand export capability to European and North American galleries.",
    iconName: "Palette",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "art@yuskarempire.rw",
      address: "Kigali Creative Arts Zone",
      hours: "Currently Closed"
    },
    socialMedia: {},
    location: "Kigali Crafts Center",
    ctaText: "Inquire Future Collections",
    ctaLink: "#",
    status: "INACTIVE",
    displayOrder: 14,
    comingSoonNotice: "Undergoing strategic restructuring and artisan upskilling. Currently unavailable.",
    features: [
      "100% Hand-Dyed Organic Yarns",
      "Fair-Trade Artisan Guilds",
      "Museum-Grade Wall Hangings"
    ],
    tags: ["Art", "Crafts", "Crochet", "Culture", "Rwanda"],
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "dept-market",
    name: "YusKar Market",
    slug: "market",
    shortDescription: "Digital wholesale commodity exchange and agricultural produce aggregation.",
    fullDescription: "Connecting cooperative farming unions across Rwanda with commercial buyers in Kigali and regional markets. Temporarily paused for platform architecture upgrade.",
    iconName: "Store",
    coverImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    contactInfo: {
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      email: "market@yuskarempire.rw",
      address: "Kigali Agritech Centre",
      hours: "Currently Unavailable"
    },
    socialMedia: {},
    location: "Kigali Wholesale Hub",
    ctaText: "Contact Corporate Desk",
    ctaLink: "#",
    status: "INACTIVE",
    displayOrder: 15,
    comingSoonNotice: "Undergoing platform technology revision. Re-launch will be announced publicly.",
    features: [
      "Farm-Gate Direct Pricing",
      "Quality Grading Standards",
      "Bulk Warehousing Support"
    ],
    tags: ["Commodities", "Wholesale", "Agriculture"],
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  }
];

export const initialProducts: Product[] = [
  // YusKar Motors Vehicles (Matching screenshot perfectly)
  {
    id: "prod-rav4-2022",
    name: "RAV4 Limited AWD",
    sku: "YM-TOY-RAV4-22",
    category: "SUV",
    departmentId: "dept-motors",
    description: "Immaculate Toyota RAV4 Limited AWD imported directly with certified Japanese auction sheet grade 4.5. Features premium leather interior, JBL surround acoustic audio, digital rear-view mirror, panoramic glass roof, and adaptive cruise radar.",
    price: 25500000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
    ],
    specifications: {
      "Brand / Make": "Toyota",
      "Model Year": "2022",
      "Mileage": "78,000 KM",
      "Fuel Type": "Petrol",
      "Transmission": "Automatic",
      "Drivetrain": "All-Wheel Drive (AWD)",
      "Engine Size": "2.0L Dynamic Force 4-Cylinder",
      "Color": "Pearl White Crystal",
      "Condition": "Auction Grade 4.5 Clean Title",
      "Showroom Location": "Kigali Showroom (Gikondo)"
    },
    tags: ["Toyota", "SUV", "AWD", "In Stock Kigali", "Verified Title"],
    status: "ACTIVE",
    featured: true,
    location: "Kigali Showroom (Gikondo)",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "prod-prado-2021",
    name: "Land Cruiser Prado TX-L",
    sku: "YM-TOY-PRADO-21",
    category: "Luxury 4x4",
    departmentId: "dept-motors",
    description: "The definitive executive and terrain SUV for Rwanda and East Africa. 7-passenger seating configuration with full beige leather, kinetic dynamic suspension system, refrigerated coolbox console, and 360-degree bird-eye parking cameras.",
    price: 68000000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=900&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
    ],
    specifications: {
      "Brand / Make": "Toyota",
      "Model Year": "2021",
      "Mileage": "54,000 KM",
      "Fuel Type": "Diesel",
      "Transmission": "Automatic",
      "Drivetrain": "Full-Time 4WD with Low-Range",
      "Engine Size": "2.8L D-4D Turbo Diesel",
      "Color": "Midnight Black Metallic",
      "Condition": "Verified Clean Title",
      "Showroom Location": "Kigali Showroom (Gikondo)"
    },
    tags: ["Toyota", "Prado", "Diesel", "4x4", "Executive"],
    status: "ACTIVE",
    featured: true,
    location: "Kigali Showroom (Gikondo)",
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "prod-gle-2023",
    name: "Mercedes-Benz GLE 450 AMG Line",
    sku: "YM-MB-GLE-23",
    category: "Luxury SUV",
    departmentId: "dept-motors",
    description: "Supreme German luxury engineering equipped with EQ Boost mild hybrid powertrain, dual 12.3-inch widescreen cockpits, Burmester high-end audio, panoramic sliding sunroof, and AIRMATIC air suspension tuned for Kigali roads.",
    price: 115000000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80"
    ],
    specifications: {
      "Brand / Make": "Mercedes-Benz",
      "Model Year": "2023",
      "Mileage": "24,000 KM",
      "Fuel Type": "Petrol Mild-Hybrid",
      "Transmission": "9G-TRONIC Automatic",
      "Drivetrain": "4MATIC Permanent All-Wheel",
      "Engine Size": "3.0L Turbocharged Inline-6",
      "Color": "Selenite Grey Metallic",
      "Showroom Location": "Kigali Showroom (Gikondo)"
    },
    tags: ["Mercedes-Benz", "Luxury", "AMG Line", "4MATIC"],
    status: "ACTIVE",
    featured: true,
    location: "Kigali Showroom (Gikondo)",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "prod-hilux-2023",
    name: "Toyota Hilux Revo Rocco 4x4",
    sku: "YM-TOY-HILUX-23",
    category: "Pickup 4x4",
    departmentId: "dept-motors",
    description: "Rugged double-cab utility vehicle with Rocco exterior styling pack, durable bed-liner, reinforced leaf suspension, diff lock, and robust heavy-duty off-road capability for Rwanda cross-country terrains.",
    price: 48500000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=900&q=80",
    additionalImages: [],
    specifications: {
      "Brand / Make": "Toyota",
      "Model Year": "2023",
      "Mileage": "32,000 KM",
      "Fuel Type": "Diesel",
      "Transmission": "6-Speed Automatic",
      "Drivetrain": "4WD with Rear Diff Lock",
      "Engine Size": "2.8L Turbo Diesel",
      "Color": "Crimson Red"
    },
    tags: ["Toyota", "Pickup", "Hilux", "Commercial 4x4"],
    status: "ACTIVE",
    featured: false,
    location: "Kigali Showroom (Gikondo)",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  // RAFIKI BIKE Products
  {
    id: "prod-rafiki-commuter",
    name: "RAFIKI City Glide E-Bike Gen 2",
    sku: "RB-EBIKE-G2",
    category: "Electric Bicycles",
    departmentId: "dept-rafiki-bike",
    description: "Engineered specifically for Kigali's rolling hills. Features a 500W brushless rear hub motor, removable 48V Samsung battery with 70km pedal-assist range, hydraulic disc brakes, and integrated smartphone handlebar mount.",
    price: 1850000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=900&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80"
    ],
    specifications: {
      "Motor": "500W High Torque Hill-Climb",
      "Battery": "48V 14Ah Lithium-Ion (Removable)",
      "Range": "65 - 75 KM per charge",
      "Charge Time": "3.5 Hours",
      "Brakes": "Dual Shimano Hydraulic Disc",
      "Warranty": "2 Years Frame & Motor"
    },
    tags: ["E-Bike", "Green Mobility", "Commuting", "Eco Rwanda"],
    status: "ACTIVE",
    featured: true,
    location: "Kigali Car-Free Zone Shop",
    createdAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  // Celine Store Products
  {
    id: "prod-celine-bag",
    name: "Classic Italian Calfskin Tote",
    sku: "CS-BAG-IT01",
    category: "Luxury Bags",
    departmentId: "dept-celine-store",
    description: "Imported full-grain Italian calfskin tote with polished gold-tone hardware, suede interior lining, and detachable shoulder strap. Hand-selected for Celine Store Kigali Heights.",
    price: 850000,
    currency: "RWF",
    stockStatus: "IN_STOCK",
    mainImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    additionalImages: [],
    specifications: {
      "Material": "100% Genuine Full-Grain Calfskin",
      "Hardware": "18K Gold Plated Brass",
      "Origin": "Florence, Italy",
      "Dimensions": "36cm x 28cm x 14cm"
    },
    tags: ["Fashion", "Italian Leather", "Luxury", "Boutique"],
    status: "ACTIVE",
    featured: true,
    location: "Kigali Heights, Kimihurura",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  }
];

export const initialServices: Service[] = [
  {
    id: "serv-custom-sourcing",
    name: "Worldwide Vehicle Sourcing & RRA Clearance",
    departmentId: "dept-motors",
    description: "Tell us the exact vehicle make, trim, model year, and budget you require. YusKar Motors inspects vehicles at source auctions in Japan, UAE, and Europe, manages container booking, sea freight to Dar Es Salaam or Mombasa, bonded transit to Kigali, and completes all Rwanda Revenue Authority (RRA) tax declarations.",
    priceType: "REQUEST_QUOTE",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Auction Bidding Access in Japan & Europe",
      "Pre-Shipment Digital Video Inspection",
      "Bonded Escrow Payment Protection",
      "Full RRA Import Duty & Yellow Slip Handling"
    ],
    requirements: [
      "Valid Rwandan ID or Passport",
      "TIN Number (for RRA registration)",
      "Initial 30% Sourcing Deposit"
    ],
    location: "Kigali Showroom (Gikondo)",
    contact: "+250 788 123 456",
    ctaText: "Source A Custom Vehicle",
    status: "ACTIVE",
    featured: true,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "serv-express-kigali",
    name: "Same-Day Kigali Express Fleet Delivery",
    departmentId: "dept-delivery",
    description: "Dedicated motorbike and van dispatch for business parcels, corporate documents, e-commerce orders, and pharmacy supplies anywhere within Kigali under 60 minutes.",
    priceType: "STARTING_AT",
    price: 3500,
    currency: "RWF",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Under 60 Minutes Delivery Promise",
      "Real-Time Live Driver Tracking Link",
      "Digital Proof of Delivery with Signature",
      "API Integration for Online Merchants"
    ],
    location: "Kigali-Wide Coverage",
    contact: "+250 788 123 457",
    ctaText: "Order Delivery",
    status: "ACTIVE",
    featured: true,
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "serv-rdb-incorporation",
    name: "RDB Business Incorporation & Investment Advisory",
    departmentId: "dept-business-hub",
    description: "Fast-track company setup with the Rwanda Development Board (RDB). Our corporate consultants handle business registration, article of association drafting, corporate bank account openings, and Rwanda investment certificates.",
    priceType: "FIXED",
    price: 250000,
    currency: "RWF",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Same-Day RDB Certificate Generation",
      "Tax Identification Number (TIN) Setup",
      "Corporate Seal & Bank Letter Facilitation",
      "1-Month Complimentary Executive Desk"
    ],
    location: "CHIC Building, Downtown Kigali",
    contact: "+250 788 123 458",
    ctaText: "Register Your Business",
    status: "ACTIVE",
    featured: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "serv-gorilla-safari",
    name: "VIP Volcanoes Gorilla Trekking & Luxury Safari",
    departmentId: "dept-tour-travel",
    description: "Unforgettable 3-Day or 5-Day private safari itinerary across Volcanoes National Park for mountain gorilla habituation, five-star wilderness lodges, and private 4x4 Land Cruiser transit with professional guides.",
    priceType: "REQUEST_QUOTE",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Official RDB Gorilla Tracking Permits Secured",
      "Luxury Accommodations (Bisate / Singita / One&Only)",
      "Dedicated 4x4 Chauffeur & Naturalist",
      "Kigali International Airport VIP Meet & Greet"
    ],
    location: "Volcanoes National Park & Kigali",
    contact: "+250 788 123 460",
    ctaText: "Request Safari Itinerary",
    status: "ACTIVE",
    featured: true,
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "serv-property-mgmt",
    name: "Executive Property & Tenancy Management",
    departmentId: "dept-estate",
    description: "Complete asset management for property owners and foreign diaspora. We manage tenant vetting, diplomatic lease contracts, monthly rent collections, maintenance repairs, and municipal compliance in Kigali.",
    priceType: "REQUEST_QUOTE",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Guaranteed Monthly Rent Disbursement",
      "Regular Digital Photographic Inspection Audits",
      "24/7 Emergency Plumber & Electrician Network",
      "Legal Eviction & Lease Dispute Protection"
    ],
    location: "Nyarutarama & Kimihurura, Kigali",
    contact: "+250 788 123 459",
    ctaText: "Manage My Property",
    status: "ACTIVE",
    featured: false,
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z"
  }
];

export const initialPosts: Post[] = [
  {
    id: "post-how-yuskar-motors-works",
    title: "How YusKar Motors Operates: From Tokyo & Dubai Auctions to Kigali Showroom Delivery",
    slug: "how-yuskar-motors-works",
    shortDescription: "Discover how YusKar Motors eliminated grey-market risks by establishing certified direct sourcing pipelines into Rwanda with 120-point verified inspections.",
    fullContent: `Buying a motor vehicle in East Africa has historically carried uncertainty: altered odometers, hidden flood damage, and convoluted customs clearing procedures. 

YusKar Motors—the automotive division of YusKar Empire Ltd—was founded in Kigali to establish an institutional standard of automotive transparency and reliability.

### 1. Direct Auction Sourcing
Unlike traditional roadside brokers who purchase through multiple middlemen, YusKar Motors maintains direct licensed bidding credentials at premier Japanese (USS, TAA, CAA) and Gulf auction centers. Every vehicle is selected according to strict Grade 4 and Grade 4.5 parameters.

### 2. Comprehensive 120-Point Inspection
Before a vehicle leaves its origin port, independent inspectors verify the engine compression, transmission shifting, electronic ECUs, chassis alignment, and confirm genuine mileage against official export certificates.

### 3. Bonded Port Transit to Gikondo Showroom
Vehicles travel in sealed sea containers to Dar Es Salaam or Mombasa, followed by bonded road transit directly to our bonded customs terminal in Kigali. Our in-house clearance specialists calculate accurate Rwanda Revenue Authority (RRA) tariffs with zero hidden surcharges.

### 4. Warranty & After-Sales Confidence
Every vehicle sold through YusKar Motors includes a comprehensive 6-month mechanical powertrain warranty and 2 complimentary service intervals at our certified Kigali partner workshop.

Visit our showroom in the Gikondo Industrial Zone or schedule a consultation with our sourcing advisors to inspect live stock today.`,
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
    ],
    author: "Karangwa Yussuf",
    authorRole: "Managing Director, YusKar Empire Ltd",
    departmentId: "dept-motors",
    category: "Automotive Insights",
    tags: ["YusKar Motors", "Car Buying Rwanda", "Verified Titles", "Kigali Showroom"],
    publishDate: "2026-02-28",
    status: "PUBLISHED",
    featured: true,
    seoTitle: "How YusKar Motors Works: Certified Vehicle Imports in Kigali, Rwanda",
    seoDescription: "Step-by-step insight into how YusKar Motors delivers verified, clean-title vehicles to Kigali with complete transparency.",
    sharesCount: 142,
    likesCount: 389,
    createdAt: "2026-02-28T09:00:00Z",
    updatedAt: "2026-03-01T11:00:00Z"
  },
  {
    id: "post-yuskar-ecosystem-vision",
    title: "One Company, Multiple Solutions: Why YusKar Empire Built a Multi-Department Conglomerate",
    slug: "yuskar-ecosystem-vision",
    shortDescription: "How integrated cross-department synergy enables YusKar Empire to serve individuals, corporations, and international partners seamlessly in Rwanda.",
    fullContent: `Modern commerce demands agility. When an international executive or investor arrives in Kigali, their requirements are rarely single-faceted: they need reliable logistics, verified executive mobility, legal corporate registration, and prime real estate leases.

Instead of navigating fragmented vendors, YusKar Empire Ltd operates as an integrated multi-department platform:

- **YusKar Motors** provides executive transportation.
- **YusKar Delivery** handles immediate document and cargo fulfillment.
- **YusKar Business Hub** facilitates RDB registration and banking.
- **YusKar Estate** sources luxury residential villas.

By uniting these core services under unified governance, shared quality benchmarks, and centralized customer care, YusKar Empire delivers unprecedented reliability. Each department operates with operational autonomy while leveraging the collective strength of the Empire.`,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    author: "Executive Desk",
    authorRole: "Strategy & Operations",
    departmentId: "dept-business-hub",
    category: "Corporate Strategy",
    tags: ["Ecosystem", "Rwanda Business", "YusKar Empire", "Conglomerate"],
    publishDate: "2026-02-15",
    status: "PUBLISHED",
    featured: true,
    seoTitle: "YusKar Empire Multi-Department Corporate Strategy – Kigali, Rwanda",
    seoDescription: "Exploring the multi-service ecosystem model of YusKar Empire Ltd in Rwanda.",
    sharesCount: 98,
    likesCount: 260,
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-03-01T11:00:00Z"
  },
  {
    id: "post-green-kigali-rafiki",
    title: "RAFIKI BIKE Expands Electric Commuter Fleet Across Kigali Car-Free Corridors",
    slug: "green-kigali-rafiki-fleet",
    shortDescription: "Zero-emission e-mobility takes a leap forward with new lithium-powered bikes designed specifically for Kigali's terrain.",
    fullContent: `Kigali continues to cement its position as the cleanest and most forward-thinking urban capital on the African continent. In alignment with Rwanda's Vision 2050 and the Kigali Master Plan, RAFIKI BIKE—a division of YusKar Empire Ltd—has deployed 150 next-generation electric bicycles across downtown and business corridors.

With pedal-assist technology capable of easily climbing Kigali's steepest gradients, RAFIKI BIKE makes sustainable daily commuting accessible, exhilarating, and affordable.`,
    coverImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    author: "Aline Uwase",
    authorRole: "Head of Sustainable Mobility, RAFIKI BIKE",
    departmentId: "dept-rafiki-bike",
    category: "Innovation & Mobility",
    tags: ["RAFIKI BIKE", "Electric Bikes", "Green Kigali", "Sustainability"],
    publishDate: "2026-02-10",
    status: "PUBLISHED",
    featured: false,
    sharesCount: 67,
    likesCount: 184,
    createdAt: "2026-02-10T09:00:00Z",
    updatedAt: "2026-03-01T11:00:00Z"
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-fleet-diplomatic",
    title: "Diplomatic Mission Executive Fleet Sourcing",
    departmentId: "dept-motors",
    client: "European Diplomatic Delegation to Rwanda",
    category: "Automotive Procurement",
    completionDate: "January 2026",
    status: "COMPLETED",
    description: "Sourced, imported, inspected, and registered 6 custom armored and executive Land Cruiser Prado SUVs with complete diplomatic clearance within 45 days.",
    coverImage: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    results: [
      "100% On-Time Delivery to Kigali",
      "Zero Customs Discrepancies",
      "Comprehensive 3-Year Maintenance Contract"
    ]
  },
  {
    id: "proj-free-zone-logistics",
    title: "Masoro Special Economic Zone Cold-Chain Logistics",
    departmentId: "dept-delivery",
    client: "PharmaMed East Africa",
    category: "Medical Logistics",
    completionDate: "February 2026",
    status: "COMPLETED",
    description: "Deployed temperature-controlled dispatch routing for vital pharmaceuticals reaching 40+ clinics across Gasabo, Kicukiro, and Nyarugenge districts daily.",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    results: [
      "99.8% On-Time Delivery Rate",
      "Zero Cold-Chain Breaches Recorded",
      "Full Digital Temperature Logging"
    ]
  },
  {
    id: "proj-nyarutarama-villas",
    title: "Nyarutarama Luxury Residential Turnkey Leases",
    departmentId: "dept-estate",
    client: "Multinational Tech Executives",
    category: "Prime Leases",
    completionDate: "December 2025",
    status: "COMPLETED",
    description: "Curated 8 private executive residences overlooking the Nyarutarama golf greens with furnished interiors, biometric security, and dedicated facilities staff.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    results: [
      "100% Occupancy Achieved",
      "Multi-Year Leases Secured",
      "Full Turnkey Tenant Handover"
    ]
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: "team-1",
    fullName: "Karangwa Yussuf",
    position: "Founder & Chief Executive Officer",
    departmentId: "executive",
    responsibilities: "Strategic enterprise vision, investment governance, and continental expansion partnerships.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    phone: "+250 788 123 456",
    email: "yussuf@yuskarempire.rw",
    socialMedia: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    shortBio: "Visionary entrepreneur with over a decade of enterprise leadership across automotive logistics, trade, and commercial ventures in Rwanda.",
    professionalDetails: "Former senior trade advisor; champion of Rwandan private sector dynamism and youth job creation.",
    displayOrder: 1,
    active: true
  },
  {
    id: "team-2",
    fullName: "Eric Mugisha",
    position: "General Manager, YusKar Motors",
    departmentId: "dept-motors",
    responsibilities: "Oversees global auction acquisitions, 120-point mechanical audits, and Kigali showroom client operations.",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    phone: "+250 788 123 457",
    email: "eric.m@yuskarempire.rw",
    socialMedia: {
      linkedin: "https://linkedin.com"
    },
    shortBio: "Certified automotive engineer with 12 years of specialized experience in Japanese and European luxury vehicle telemetry.",
    professionalDetails: "Automotive diagnostics specialist; licensed Japan auction bidding manager.",
    displayOrder: 2,
    active: true
  },
  {
    id: "team-3",
    fullName: "Diane Ingabire",
    position: "Director of Operations & Delivery",
    departmentId: "dept-delivery",
    responsibilities: "Directs fleet management, smart logistics routing, and courier dispatch across Kigali and cross-border lanes.",
    profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    phone: "+250 788 123 458",
    email: "diane.i@yuskarempire.rw",
    socialMedia: {
      linkedin: "https://linkedin.com"
    },
    shortBio: "Logistics strategist who previously spearheaded last-mile supply chains across East Africa.",
    professionalDetails: "Supply chain management graduate from University of Rwanda; certified in GPS telematics.",
    displayOrder: 3,
    active: true
  },
  {
    id: "team-4",
    fullName: "Jean-Paul Habimana",
    position: "Head of Real Estate & Investments",
    departmentId: "dept-estate",
    responsibilities: "Oversees land acquisitions, high-yield commercial leases, and investor property management in Kigali.",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    phone: "+250 788 123 459",
    email: "jeanpaul@yuskarempire.rw",
    socialMedia: {
      linkedin: "https://linkedin.com"
    },
    shortBio: "Experienced Kigali property consultant with extensive knowledge of the Master Plan 2050 zoning framework.",
    professionalDetails: "Licensed property valuer and architectural consultant.",
    displayOrder: 4,
    active: true
  }
];

export const initialUsers: User[] = [
  {
    id: "user-superadmin",
    name: "Karangwa Yussuf (CEO)",
    email: "admin@yuskarempire.rw",
    phone: "+250 788 123 456",
    role: "SUPER_ADMIN",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    country: "Rwanda",
    location: "Kigali, Rwanda",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "user-motors-mgr",
    name: "Eric Mugisha (Motors Manager)",
    email: "motors.mgr@yuskarempire.rw",
    phone: "+250 788 123 457",
    role: "DEPARTMENT_MANAGER",
    departmentId: "dept-motors",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    country: "Rwanda",
    location: "Kigali, Rwanda",
    createdAt: "2025-01-10T00:00:00Z"
  },
  {
    id: "user-content-mgr",
    name: "Keza Sonia (Content & Media)",
    email: "content@yuskarempire.rw",
    phone: "+250 788 999 888",
    role: "CONTENT_MANAGER",
    profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    country: "Rwanda",
    location: "Kigali, Rwanda",
    createdAt: "2025-01-15T00:00:00Z"
  },
  {
    id: "user-demo-client",
    name: "Patrick Rukundo (Client)",
    email: "patrick.r@gmail.com",
    phone: "+250 788 333 444",
    role: "CLIENT",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    country: "Rwanda",
    location: "Nyarutarama, Kigali",
    socialMedia: "@patrick_rw",
    createdAt: "2026-02-01T12:00:00Z"
  }
];

export const initialMedia: MediaItem[] = [
  {
    id: "media-1",
    fileName: "yuskar-motors-showroom.jpg",
    fileType: "image/jpeg",
    fileSize: 1845000,
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    departmentId: "dept-motors",
    uploadedBy: "Eric Mugisha",
    uploadedDate: "2026-02-20",
    altText: "YusKar Motors Gikondo Showroom Exterior",
    caption: "Official Gikondo vehicle showroom and inspection bay"
  },
  {
    id: "media-2",
    fileName: "toyota-rav4-white.jpg",
    fileType: "image/jpeg",
    fileSize: 2100000,
    url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80",
    departmentId: "dept-motors",
    uploadedBy: "Eric Mugisha",
    uploadedDate: "2026-02-21",
    altText: "Toyota RAV4 Limited AWD 2022",
    caption: "Clean Japanese import available in Kigali stock"
  },
  {
    id: "media-3",
    fileName: "yuskar-delivery-fleet.jpg",
    fileType: "image/jpeg",
    fileSize: 1450000,
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    departmentId: "dept-delivery",
    uploadedBy: "Diane Ingabire",
    uploadedDate: "2026-02-22",
    altText: "YusKar Delivery Express Motorbikes & Vans",
    caption: "Dispatch fleet ready at Masoro hub"
  },
  {
    id: "media-4",
    fileName: "yuskar-profile-doc.pdf",
    fileType: "application/pdf",
    fileSize: 3400000,
    url: "#",
    departmentId: "dept-business-hub",
    uploadedBy: "Karangwa Yussuf",
    uploadedDate: "2026-02-25",
    altText: "YusKar Empire Corporate Capabilities Deck 2026",
    caption: "Official corporate presentation and department guide (PDF)"
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-101",
    name: "Emmanuel Gasana",
    phone: "+250 788 555 777",
    email: "e.gasana@gmail.com",
    departmentId: "dept-motors",
    subject: "Inspection appointment for Toyota RAV4 2022",
    message: "Hello YusKar Motors team. I would like to schedule a physical vehicle inspection this Friday at 3 PM at the Gikondo showroom. Can you also confirm the remaining warranty on the hybrid battery?",
    type: "PRODUCT_ORDER",
    relatedItemId: "prod-rav4-2022",
    status: "IN_PROGRESS",
    notes: "Followed up on WhatsApp. Client confirmed inspection for Friday 3 PM.",
    createdAt: "2026-03-01T14:20:00Z"
  },
  {
    id: "msg-102",
    name: "Sarah Lindqvist",
    phone: "+250 789 111 222",
    email: "sarah.lind@nordic-invest.se",
    departmentId: "dept-business-hub",
    subject: "RDB Incorporation for Tech Subsidiary in Kigali",
    message: "Our European tech firm is opening an East African engineering office in Kigali. We need full RDB registration assistance and advice on local tax compliance.",
    type: "SERVICE_REQUEST",
    relatedItemId: "serv-rdb-incorporation",
    status: "NEW",
    createdAt: "2026-03-02T08:45:00Z"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    userId: "user-superadmin",
    userName: "Karangwa Yussuf",
    userRole: "SUPER_ADMIN",
    action: "DEPARTMENT_ACTIVATED",
    entityType: "Department",
    entityId: "dept-rafiki-bike",
    departmentId: "dept-rafiki-bike",
    departmentName: "RAFIKI BIKE",
    oldValue: "COMING_SOON",
    newValue: "ACTIVE",
    timestamp: "2026-02-20T11:30:00Z"
  },
  {
    id: "audit-2",
    userId: "user-motors-mgr",
    userName: "Eric Mugisha",
    userRole: "DEPARTMENT_MANAGER",
    action: "PRODUCT_PRICE_UPDATED",
    entityType: "Product",
    entityId: "prod-rav4-2022",
    departmentId: "dept-motors",
    departmentName: "YusKar Motors",
    oldValue: "26,000,000 RWF",
    newValue: "25,500,000 RWF",
    timestamp: "2026-02-25T14:15:00Z"
  },
  {
    id: "audit-3",
    userId: "user-superadmin",
    userName: "Karangwa Yussuf",
    userRole: "SUPER_ADMIN",
    action: "SETTINGS_UPDATED",
    entityType: "WebsiteSettings",
    entityId: "global-settings",
    oldValue: "Hotline: +250 788 000 000",
    newValue: "Hotline: +250 788 123 456",
    timestamp: "2026-02-28T16:00:00Z"
  }
];
