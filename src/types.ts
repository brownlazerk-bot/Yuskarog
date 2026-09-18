export type DepartmentStatus = 'ACTIVE' | 'INACTIVE' | 'COMING_SOON';

export type ProductStockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER';
export type ProductStatus = 'ACTIVE' | 'OUT_OF_STOCK' | 'HIDDEN' | 'COMING_SOON';

export type ServicePriceType = 'FIXED' | 'STARTING_AT' | 'REQUEST_QUOTE';
export type ServiceStatus = 'ACTIVE' | 'INACTIVE';

export type PostStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'DEPARTMENT_MANAGER' 
  | 'CONTENT_MANAGER' 
  | 'EDITOR' 
  | 'CLIENT';

export interface SocialLinks {
  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  telegram?: string;
}

export interface DepartmentContact {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours?: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  logoUrl?: string;
  coverImage: string;
  gallery: string[];
  contactInfo: DepartmentContact;
  socialMedia: SocialLinks;
  location: string;
  ctaText: string;
  ctaLink: string;
  status: DepartmentStatus;
  displayOrder: number;
  comingSoonDate?: string;
  comingSoonNotice?: string;
  features: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  departmentId: string; // references Department.id or 'yuskar-empire'
  description: string;
  price: number;
  currency: string; // e.g. "RWF", "USD"
  discount?: number;
  stockStatus: ProductStockStatus;
  mainImage: string;
  additionalImages: string[];
  videoUrl?: string;
  specifications: Record<string, string>;
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  departmentId: string;
  description: string;
  priceType: ServicePriceType;
  price?: number;
  currency?: string;
  images: string[];
  videoUrl?: string;
  features: string[];
  requirements?: string[];
  location: string;
  contact: string;
  ctaText: string;
  status: ServiceStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  author: string;
  authorRole?: string;
  departmentId: string;
  category: string;
  tags: string[];
  publishDate: string;
  status: PostStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sharesCount: number;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  departmentId: string;
  client: string;
  category: string;
  completionDate: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  description: string;
  coverImage: string;
  gallery: string[];
  results?: string[];
}

export interface TeamMember {
  id: string;
  fullName: string;
  position: string;
  departmentId: string; // or 'executive'
  responsibilities: string;
  profilePhoto: string;
  phone: string;
  email: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  shortBio: string;
  professionalDetails: string;
  displayOrder: number;
  active: boolean;
}

export interface UserSocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  departmentId?: string; // If DEPARTMENT_MANAGER, constrained to this department
  profilePhoto?: string;
  country?: string;
  location?: string;
  bio?: string;
  socialLinks?: UserSocialLinks;
  socialMedia?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  departmentId?: string;
  uploadedBy: string;
  uploadedDate: string;
  altText: string;
  caption: string;
}

export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
export type InquiryType = 'GENERAL_INQUIRY' | 'SERVICE_REQUEST' | 'PRODUCT_ORDER' | 'VEHICLE_SOURCING' | 'PARTNERSHIP';

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  departmentId: string;
  subject: string;
  message: string;
  type: InquiryType;
  relatedItemId?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  departmentId?: string;
  departmentName?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

export interface SocialShareEvent {
  id: string;
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'telegram' | 'linkedin' | 'email' | 'copied_link' | 'native';
  contentType: 'post' | 'product' | 'service' | 'department';
  contentId: string;
  contentTitle: string;
  clientId?: string;
  clientName?: string;
  captionUsed?: string;
  timestamp: string;
}

export interface WhatsAppWidgetSettings {
  enabled: boolean;
  phoneNumber: string; // Rwanda format without leading zeros or symbols: "250795153994"
  displayPhoneNumber: string; // "+250 795 153 994"
  secondaryPhoneNumber?: string; // "250781652135"
  secondaryDisplayPhoneNumber?: string; // "+250 781 652 135"
  businessName: string; // "YusKar Empire"
  welcomeMessage: string; // "Muraho 👋 Twagufasha iki?"
  statusText: string; // "Usually replies instantly"
  quickMessages: string[];
  position: 'bottom-right' | 'bottom-left';
  pulseAnimation: boolean;
}

export interface SectionVisibilitySettings {
  heroSection: boolean;
  advertSlideShowcase: boolean;
  statsTrustBadges: boolean;
  departmentsDirectory: boolean;
  showroomProducts: boolean;
  servicesDirectory: boolean;
  projectsCaseStudies: boolean;
  leadershipTeam: boolean;
  newsInsights: boolean;
  contactSection: boolean;
  footerSocials: boolean;
}

export interface PageContentSettings {
  heroTitle: string;
  heroSubtitle: string;
  aboutHeroTitle: string;
  aboutMissionText: string;
  aboutVisionText: string;
  contactHeroTitle: string;
  contactSubtitle: string;
  contactPrimaryPhone: string;
  contactSecondaryPhone: string;
  contactWhatsAppPrimary?: string;
  contactWhatsAppSecondary?: string;
  contactEmail: string;
  contactSupportEmail: string;
  contactAddress: string;
  contactBusinessHours: string;
  customAnnouncementBanner?: string;
  showAnnouncementBanner?: boolean;
}

export interface WebsiteSettings {
  companyName: string;
  slogan: string;
  logo: string;
  favicon: string;
  aboutText: string;
  primaryEmail: string;
  supportEmail: string;
  hotlinePhone: string;
  hotlinePrimaryPhone?: string;
  hotlineSecondaryPhone?: string;
  whatsappPhone: string;
  whatsappPrimaryPhone?: string;
  whatsappSecondaryPhone?: string;
  address: string;
  businessHours: string;
  socialLinks: SocialLinks;
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
  };
  maintenanceMode: boolean;
  featuredDepartmentSlug: string;
  whatsappWidget?: Partial<WhatsAppWidgetSettings>;
  sectionVisibility?: Partial<SectionVisibilitySettings>;
  pageContent?: Partial<PageContentSettings>;
}

export interface ClientSavedItem {
  id: string;
  userId: string;
  itemType: 'product' | 'service' | 'post';
  itemId: string;
  savedAt: string;
}
