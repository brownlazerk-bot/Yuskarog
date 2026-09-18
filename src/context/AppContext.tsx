import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Department,
  DepartmentStatus,
  Product,
  Service,
  Post,
  Project,
  TeamMember,
  User,
  UserRole,
  MediaItem,
  ContactMessage,
  InquiryStatus,
  AuditLog,
  WebsiteSettings,
  SocialShareEvent,
  ClientSavedItem
} from '../types';
import {
  initialSettings,
  initialDepartments,
  initialProducts,
  initialServices,
  initialPosts,
  initialProjects,
  initialTeam,
  initialUsers,
  initialMedia,
  initialMessages,
  initialAuditLogs
} from '../data/initialData';

interface ShareModalState {
  isOpen: boolean;
  item?: {
    type: 'post' | 'product' | 'service' | 'department';
    id: string;
    title: string;
    excerpt?: string;
    url?: string;
    image?: string;
  };
}

interface InquiryModalState {
  isOpen: boolean;
  departmentId?: string;
  type?: 'GENERAL_INQUIRY' | 'SERVICE_REQUEST' | 'PRODUCT_ORDER' | 'VEHICLE_SOURCING' | 'PARTNERSHIP';
  relatedItemId?: string;
  itemTitle?: string;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & routing
  currentRoute: string;
  navigate: (route: string) => void;
  
  // Data
  departments: Department[];
  products: Product[];
  services: Service[];
  posts: Post[];
  projects: Project[];
  team: TeamMember[];
  users: User[];
  media: MediaItem[];
  messages: ContactMessage[];
  auditLogs: AuditLog[];
  settings: WebsiteSettings;
  socialShares: SocialShareEvent[];
  clientSaved: ClientSavedItem[];

  // Authentication & Session
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole | 'VISITOR') => void;
  
  // Modals & UI
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  shareModal: ShareModalState;
  openShareModal: (item: ShareModalState['item']) => void;
  closeShareModal: () => void;
  inquiryModal: InquiryModalState;
  openInquiryModal: (opts?: Partial<InquiryModalState>) => void;
  closeInquiryModal: () => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Permissions
  canManageAll: boolean;
  canManageDepartment: (deptId: string) => boolean;
  canManageContent: boolean;
  canEditSettings: boolean;

  // Actions
  addDepartment: (dept: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  toggleDepartmentStatus: (id: string, status: DepartmentStatus) => void;
  deleteDepartment: (id: string) => void;

  addProduct: (prod: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addService: (serv: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'sharesCount' | 'likesCount'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;

  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedDate'>) => void;
  deleteMediaItem: (id: string) => void;

  submitInquiry: (inquiry: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus, notes?: string) => void;

  toggleSaveItem: (itemType: 'product' | 'service' | 'post', itemId: string) => void;
  isItemSaved: (itemType: 'product' | 'service' | 'post', itemId: string) => boolean;
  recordSocialShare: (share: Omit<SocialShareEvent, 'id' | 'timestamp'>) => void;

  updateSettings: (updates: Partial<WebsiteSettings>) => void;
  updateUserProfile: (userId: string, updates: Partial<User>) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'yuskar_empire_';

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}:`, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage for ${key}:`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routes & navigation
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Main Datasets
  const [departments, setDepartments] = useState<Department[]>(() => getStored('departments', initialDepartments));
  const [products, setProducts] = useState<Product[]>(() => getStored('products', initialProducts));
  const [services, setServices] = useState<Service[]>(() => getStored('services', initialServices));
  const [posts, setPosts] = useState<Post[]>(() => getStored('posts', initialPosts));
  const [projects, setProjects] = useState<Project[]>(() => getStored('projects', initialProjects));
  const [team, setTeam] = useState<TeamMember[]>(() => getStored('team', initialTeam));
  const [users, setUsers] = useState<User[]>(() => getStored('users', initialUsers));
  const [media, setMedia] = useState<MediaItem[]>(() => getStored('media', initialMedia));
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStored('messages', initialMessages));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStored('auditLogs', initialAuditLogs));
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const stored = getStored('settings', initialSettings);
    // If stored settings have old placeholder phone numbers, migrate them cleanly
    const isOldHotline = !stored?.hotlinePhone || stored.hotlinePhone.includes('788 123 456');
    const isOldWhatsApp = !stored?.whatsappPhone || stored.whatsappPhone.includes('784943957') || stored.whatsappPhone.includes('788 123 456');

    return {
      ...initialSettings,
      ...stored,
      hotlinePhone: isOldHotline ? initialSettings.hotlinePhone : stored.hotlinePhone,
      hotlinePrimaryPhone: initialSettings.hotlinePrimaryPhone,
      hotlineSecondaryPhone: initialSettings.hotlineSecondaryPhone,
      whatsappPhone: isOldWhatsApp ? initialSettings.whatsappPhone : stored.whatsappPhone,
      whatsappPrimaryPhone: initialSettings.whatsappPrimaryPhone,
      whatsappSecondaryPhone: initialSettings.whatsappSecondaryPhone,
      whatsappWidget: {
        ...initialSettings.whatsappWidget!,
        ...(stored?.whatsappWidget || {}),
        phoneNumber: (!stored?.whatsappWidget?.phoneNumber || stored.whatsappWidget.phoneNumber.includes('784943957'))
          ? initialSettings.whatsappWidget!.phoneNumber
          : stored.whatsappWidget.phoneNumber,
        displayPhoneNumber: (!stored?.whatsappWidget?.displayPhoneNumber || stored.whatsappWidget.displayPhoneNumber.includes('0784943957'))
          ? initialSettings.whatsappWidget!.displayPhoneNumber
          : stored.whatsappWidget.displayPhoneNumber,
        secondaryPhoneNumber: initialSettings.whatsappWidget!.secondaryPhoneNumber,
        secondaryDisplayPhoneNumber: initialSettings.whatsappWidget!.secondaryDisplayPhoneNumber,
      },
      sectionVisibility: {
        ...initialSettings.sectionVisibility!,
        ...(stored?.sectionVisibility || {})
      },
      pageContent: {
        ...initialSettings.pageContent!,
        ...(stored?.pageContent || {}),
        contactPrimaryPhone: (!stored?.pageContent?.contactPrimaryPhone || stored.pageContent.contactPrimaryPhone.includes('0784943957'))
          ? initialSettings.pageContent!.contactPrimaryPhone
          : stored.pageContent.contactPrimaryPhone,
        contactSecondaryPhone: (!stored?.pageContent?.contactSecondaryPhone || stored.pageContent.contactSecondaryPhone.includes('788 123 456'))
          ? initialSettings.pageContent!.contactSecondaryPhone
          : stored.pageContent.contactSecondaryPhone,
        contactWhatsAppPrimary: initialSettings.pageContent!.contactWhatsAppPrimary,
        contactWhatsAppSecondary: initialSettings.pageContent!.contactWhatsAppSecondary,
      }
    };
  });
  const [socialShares, setSocialShares] = useState<SocialShareEvent[]>(() => getStored('socialShares', []));
  const [clientSaved, setClientSaved] = useState<ClientSavedItem[]>(() => getStored('clientSaved', []));

  // Current session: default to Public Visitor, or remember login
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStored('currentUser', null));

  // Modals
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareModal, setShareModal] = useState<ShareModalState>({ isOpen: false });
  const [inquiryModal, setInquiryModal] = useState<InquiryModalState>({ isOpen: false });
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const openShareModal = (item: ShareModalState['item']) => {
    setShareModal({ isOpen: true, item });
  };
  const closeShareModal = () => {
    setShareModal({ isOpen: false });
  };

  const openInquiryModal = (opts?: Partial<InquiryModalState>) => {
    setInquiryModal({
      isOpen: true,
      departmentId: opts?.departmentId || 'dept-motors',
      type: opts?.type || 'GENERAL_INQUIRY',
      relatedItemId: opts?.relatedItemId,
      itemTitle: opts?.itemTitle
    });
  };
  const closeInquiryModal = () => {
    setInquiryModal({ isOpen: false });
  };

  // Sync to localStorage
  useEffect(() => { setStored('departments', departments); }, [departments]);
  useEffect(() => { setStored('products', products); }, [products]);
  useEffect(() => { setStored('services', services); }, [services]);
  useEffect(() => { setStored('posts', posts); }, [posts]);
  useEffect(() => { setStored('projects', projects); }, [projects]);
  useEffect(() => { setStored('team', team); }, [team]);
  useEffect(() => { setStored('users', users); }, [users]);
  useEffect(() => { setStored('media', media); }, [media]);
  useEffect(() => { setStored('messages', messages); }, [messages]);
  useEffect(() => { setStored('auditLogs', auditLogs); }, [auditLogs]);
  useEffect(() => { setStored('settings', settings); }, [settings]);
  useEffect(() => { setStored('socialShares', socialShares); }, [socialShares]);
  useEffect(() => { setStored('clientSaved', clientSaved); }, [clientSaved]);
  useEffect(() => { setStored('currentUser', currentUser); }, [currentUser]);

  // Log Audit Action Helper
  const logAudit = (action: string, entityType: string, entityId: string, oldValue?: string, newValue?: string, deptId?: string) => {
    const dept = departments.find(d => d.id === deptId);
    const newLog: AuditLog = {
      id: 'audit-' + Date.now(),
      userId: currentUser?.id || 'visitor-anon',
      userName: currentUser?.name || 'Public Visitor',
      userRole: currentUser?.role || 'CLIENT',
      action,
      entityType,
      entityId,
      departmentId: deptId,
      departmentName: dept?.name,
      oldValue,
      newValue,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Role switching utility for testing and demonstration
  const switchRole = (role: UserRole | 'VISITOR') => {
    if (role === 'VISITOR') {
      setCurrentUser(null);
      showToast('Switched to Public Visitor view', 'info');
      return;
    }
    const found = users.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
      showToast(`Logged in as ${found.name} (${found.role.replace('_', ' ')})`, 'success');
    } else {
      // Create on the fly
      const newUser: User = {
        id: 'user-' + role.toLowerCase(),
        name: `${role.replace('_', ' ')} Demo User`,
        email: `${role.toLowerCase()}@yuskarempire.rw`,
        role,
        departmentId: role === 'DEPARTMENT_MANAGER' ? 'dept-motors' : undefined,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      showToast(`Logged in as ${newUser.name}`, 'success');
    }
  };

  // Role permissions
  const canManageAll = currentUser?.role === 'SUPER_ADMIN';
  const canManageDepartment = (deptId: string) => {
    if (!currentUser) return false;
    if (currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN') return true;
    if (currentUser.role === 'DEPARTMENT_MANAGER' && currentUser.departmentId === deptId) return true;
    return false;
  };
  const canManageContent = !!currentUser && ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'EDITOR'].includes(currentUser.role);
  const canEditSettings = currentUser?.role === 'SUPER_ADMIN';

  // Department CRUD
  const addDepartment = (deptData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDept: Department = {
      ...deptData,
      id: 'dept-' + deptData.slug + '-' + Date.now().toString().slice(-4),
      createdAt: now,
      updatedAt: now
    };
    setDepartments(prev => [...prev, newDept]);
    logAudit('DEPARTMENT_CREATED', 'Department', newDept.id, undefined, newDept.name, newDept.id);
    showToast(`Department "${newDept.name}" created successfully`);
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    const existing = departments.find(d => d.id === id);
    if (!existing) return;
    const now = new Date().toISOString();
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, ...updates, updatedAt: now } : d));
    logAudit(
      'DEPARTMENT_UPDATED',
      'Department',
      id,
      existing.status !== updates.status ? `Status: ${existing.status}` : existing.name,
      updates.status ? `Status: ${updates.status}` : updates.name,
      id
    );
    showToast(`Department "${existing.name}" updated successfully`);
  };

  const toggleDepartmentStatus = (id: string, status: DepartmentStatus) => {
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    const oldStatus = dept.status;
    updateDepartment(id, { status });
    showToast(`Department status changed from ${oldStatus} to ${status}`);
  };

  const deleteDepartment = (id: string) => {
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    setDepartments(prev => prev.filter(d => d.id !== id));
    logAudit('DEPARTMENT_DELETED', 'Department', id, dept.name, undefined, id);
    showToast(`Department "${dept.name}" removed`, 'warning');
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProd: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      createdAt: now,
      updatedAt: now
    };
    setProducts(prev => [newProd, ...prev]);
    logAudit('PRODUCT_CREATED', 'Product', newProd.id, undefined, `${newProd.name} (${newProd.price} ${newProd.currency})`, newProd.departmentId);
    showToast(`Product "${newProd.name}" added successfully`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    const now = new Date().toISOString();
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: now } : p));
    logAudit('PRODUCT_UPDATED', 'Product', id, existing.name, updates.name || existing.name, existing.departmentId);
    showToast(`Product "${existing.name}" updated`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    logAudit('PRODUCT_DELETED', 'Product', id, prod.name, undefined, prod.departmentId);
    showToast(`Product "${prod.name}" removed`, 'warning');
  };

  // Service CRUD
  const addService = (servData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newServ: Service = {
      ...servData,
      id: 'serv-' + Date.now(),
      createdAt: now,
      updatedAt: now
    };
    setServices(prev => [newServ, ...prev]);
    logAudit('SERVICE_CREATED', 'Service', newServ.id, undefined, newServ.name, newServ.departmentId);
    showToast(`Service "${newServ.name}" added`);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    const existing = services.find(s => s.id === id);
    if (!existing) return;
    const now = new Date().toISOString();
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: now } : s));
    logAudit('SERVICE_UPDATED', 'Service', id, existing.name, updates.name || existing.name, existing.departmentId);
    showToast(`Service updated`);
  };

  const deleteService = (id: string) => {
    const serv = services.find(s => s.id === id);
    if (!serv) return;
    setServices(prev => prev.filter(s => s.id !== id));
    logAudit('SERVICE_DELETED', 'Service', id, serv.name, undefined, serv.departmentId);
    showToast(`Service removed`, 'warning');
  };

  // Post CRUD
  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'sharesCount' | 'likesCount'>) => {
    const now = new Date().toISOString();
    const newPost: Post = {
      ...postData,
      id: 'post-' + Date.now(),
      sharesCount: 0,
      likesCount: 0,
      createdAt: now,
      updatedAt: now
    };
    setPosts(prev => [newPost, ...prev]);
    logAudit('POST_PUBLISHED', 'Post', newPost.id, undefined, newPost.title, newPost.departmentId);
    showToast(`Post "${newPost.title}" created`);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    const existing = posts.find(p => p.id === id);
    if (!existing) return;
    const now = new Date().toISOString();
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: now } : p));
    logAudit('POST_UPDATED', 'Post', id, existing.title, updates.title || existing.title, existing.departmentId);
    showToast(`Post updated`);
  };

  const deletePost = (id: string) => {
    const p = posts.find(item => item.id === id);
    if (!p) return;
    setPosts(prev => prev.filter(item => item.id !== id));
    logAudit('POST_DELETED', 'Post', id, p.title, undefined, p.departmentId);
    showToast(`Post removed`, 'warning');
  };

  // Team Member CRUD
  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: 'team-' + Date.now()
    };
    setTeam(prev => [...prev, newMember]);
    logAudit('TEAM_MEMBER_ADDED', 'TeamMember', newMember.id, undefined, newMember.fullName, newMember.departmentId);
    showToast(`Team member ${newMember.fullName} added`);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    showToast(`Team member updated`);
  };

  const deleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    showToast(`Team member removed`, 'warning');
  };

  // Media Library
  const addMediaItem = (itemData: Omit<MediaItem, 'id' | 'uploadedDate'>) => {
    const newItem: MediaItem = {
      ...itemData,
      id: 'media-' + Date.now(),
      uploadedDate: new Date().toISOString().split('T')[0]
    };
    setMedia(prev => [newItem, ...prev]);
    logAudit('MEDIA_UPLOADED', 'Media', newItem.id, undefined, newItem.fileName, newItem.departmentId);
    showToast(`File "${newItem.fileName}" uploaded to media storage`);
  };

  const deleteMediaItem = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    showToast(`Media file removed`, 'info');
  };

  // Inquiry / Messages
  const submitInquiry = (inquiryData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...inquiryData,
      id: 'msg-' + Date.now(),
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast(`Thank you, ${newMsg.name}! Your request has been dispatched to ${newMsg.departmentId ? 'the department' : 'YusKar Empire'} advisors.`, 'success');
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, notes?: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status, notes: notes !== undefined ? notes : m.notes } : m));
    showToast(`Inquiry status updated to ${status}`);
  };

  // Client Saved Items
  const toggleSaveItem = (itemType: 'product' | 'service' | 'post', itemId: string) => {
    const userId = currentUser?.id || 'visitor-saved';
    const exists = clientSaved.some(s => s.userId === userId && s.itemType === itemType && s.itemId === itemId);
    if (exists) {
      setClientSaved(prev => prev.filter(s => !(s.userId === userId && s.itemType === itemType && s.itemId === itemId)));
      showToast(`Removed from your saved items`, 'info');
    } else {
      const newItem: ClientSavedItem = {
        id: 'save-' + Date.now(),
        userId,
        itemType,
        itemId,
        savedAt: new Date().toISOString()
      };
      setClientSaved(prev => [newItem, ...prev]);
      showToast(`Saved to your favorites!`, 'success');
    }
  };

  const isItemSaved = (itemType: 'product' | 'service' | 'post', itemId: string) => {
    const userId = currentUser?.id || 'visitor-saved';
    return clientSaved.some(s => s.userId === userId && s.itemType === itemType && s.itemId === itemId);
  };

  // Social Sharing & Repost tracking
  const recordSocialShare = (shareData: Omit<SocialShareEvent, 'id' | 'timestamp'>) => {
    const newShare: SocialShareEvent = {
      ...shareData,
      id: 'share-' + Date.now(),
      clientId: currentUser?.id,
      clientName: currentUser?.name || 'Visitor',
      timestamp: new Date().toISOString()
    };
    setSocialShares(prev => [newShare, ...prev]);

    // increment share count if it is a post
    if (shareData.contentType === 'post') {
      setPosts(prev => prev.map(p => p.id === shareData.contentId ? { ...p, sharesCount: (p.sharesCount || 0) + 1 } : p));
    }
  };

  // Settings
  const updateSettings = (updates: Partial<WebsiteSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updates,
      whatsappWidget: updates.whatsappWidget 
        ? { ...prev.whatsappWidget!, ...updates.whatsappWidget } 
        : prev.whatsappWidget,
      sectionVisibility: updates.sectionVisibility
        ? { ...prev.sectionVisibility!, ...updates.sectionVisibility }
        : prev.sectionVisibility,
      pageContent: updates.pageContent
        ? { ...prev.pageContent!, ...updates.pageContent }
        : prev.pageContent
    }));
    logAudit('SETTINGS_UPDATED', 'WebsiteSettings', 'global', undefined, 'Configuration updated');
    showToast('Platform settings saved');
  };

  // User Profile
  const updateUserProfile = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }
    logAudit('PROFILE_UPDATED', 'User', userId, undefined, 'Profile details updated');
    showToast('Profile updated successfully', 'success');
  };

  // Reset demo data
  const resetToDefaultData = () => {
    setDepartments(initialDepartments);
    setProducts(initialProducts);
    setServices(initialServices);
    setPosts(initialPosts);
    setProjects(initialProjects);
    setTeam(initialTeam);
    setUsers(initialUsers);
    setMedia(initialMedia);
    setMessages(initialMessages);
    setAuditLogs(initialAuditLogs);
    setSettings(initialSettings);
    setSocialShares([]);
    setClientSaved([]);
    showToast('Platform database reset to initial demonstration state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        departments,
        products,
        services,
        posts,
        projects,
        team,
        users,
        media,
        messages,
        auditLogs,
        settings,
        socialShares,
        clientSaved,
        currentUser,
        setCurrentUser,
        switchRole,
        searchOpen,
        setSearchOpen,
        shareModal,
        openShareModal,
        closeShareModal,
        inquiryModal,
        openInquiryModal,
        closeInquiryModal,
        toast,
        showToast,
        canManageAll,
        canManageDepartment,
        canManageContent,
        canEditSettings,
        addDepartment,
        updateDepartment,
        toggleDepartmentStatus,
        deleteDepartment,
        addProduct,
        updateProduct,
        deleteProduct,
        addService,
        updateService,
        deleteService,
        addPost,
        updatePost,
        deletePost,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addMediaItem,
        deleteMediaItem,
        submitInquiry,
        updateInquiryStatus,
        toggleSaveItem,
        isItemSaved,
        recordSocialShare,
        updateSettings,
        updateUserProfile,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
