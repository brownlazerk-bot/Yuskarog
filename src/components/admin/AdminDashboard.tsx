import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  ShieldCheck, 
  Building2, 
  Package, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  Activity, 
  Settings as SettingsIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Search, 
  Upload, 
  UserCheck, 
  Users, 
  Eye, 
  Filter,
  Sparkles,
  Paperclip,
  CheckCircle2,
  Globe,
  Phone,
  Save
} from 'lucide-react';
import { DepartmentStatus, Product, Service, Post, Department, UserRole, InquiryStatus, User } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    departments, 
    products, 
    services, 
    posts, 
    messages, 
    media, 
    auditLogs, 
    settings, 
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
    updateInquiryStatus,
    addMediaItem,
    deleteMediaItem,
    updateSettings,
    updateUserProfile,
    resetToDefaultData,
    showToast,
    navigate
  } = useApp();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'DEPARTMENTS' | 'PRODUCTS' | 'SERVICES' | 'POSTS' | 'INQUIRIES' | 'MEDIA' | 'AUDIT' | 'SETTINGS'
  >('DEPARTMENTS');

  // Settings sub-tab state
  const [settingsSubTab, setSettingsSubTab] = useState<
    'PROFILE' | 'CONTACT_HOTLINES' | 'WHATSAPP_WIDGET' | 'PUBLIC_SECTIONS' | 'PAGES_CONTENT'
  >('PROFILE');

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    role: currentUser?.role || 'EXECUTIVE_ADMIN',
    departmentId: currentUser?.departmentId || '',
    profilePhoto: currentUser?.profilePhoto || '',
    location: currentUser?.location || 'Kigali, Rwanda',
    bio: currentUser?.bio || '',
    whatsapp: currentUser?.socialLinks?.whatsapp || '',
    twitter: currentUser?.socialLinks?.twitter || '',
    linkedin: currentUser?.socialLinks?.linkedin || '',
    instagram: currentUser?.socialLinks?.instagram || '',
    facebook: currentUser?.socialLinks?.facebook || ''
  });

  // Keep profile form synced with active currentUser
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        role: currentUser.role || 'EXECUTIVE_ADMIN',
        departmentId: currentUser.departmentId || '',
        profilePhoto: currentUser.profilePhoto || '',
        location: currentUser.location || 'Kigali, Rwanda',
        bio: currentUser.bio || '',
        whatsapp: currentUser.socialLinks?.whatsapp || '',
        twitter: currentUser.socialLinks?.twitter || '',
        linkedin: currentUser.socialLinks?.linkedin || '',
        instagram: currentUser.socialLinks?.instagram || '',
        facebook: currentUser.socialLinks?.facebook || ''
      });
    }
  }, [currentUser]);

  // Department Modals
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deptForm, setDeptForm] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    status: 'ACTIVE' as DepartmentStatus,
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    location: 'Kigali, Rwanda',
    phone: '+250 788 123 456',
    whatsapp: '+250 788 123 456',
    email: 'info@yuskarempire.rw',
    features: 'Verified provenance\nDedicated inspection team\n100% Legal title audit',
    comingSoonDate: ''
  });

  // Product Modals
  const [prodModalOpen, setProdModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    departmentId: 'dept-motors',
    category: 'SUV',
    description: '',
    price: 35000000,
    currency: 'RWF',
    stockStatus: 'IN_STOCK' as Product['stockStatus'],
    mainImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
    location: 'Kigali Showroom (Gikondo)',
    specs: 'Brand: Toyota\nModel Year: 2022\nMileage: 18,500 km\nFuel Type: Petrol\nTransmission: Automatic'
  });

  // Post Modals
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category: 'Automotive Insights',
    departmentId: 'dept-motors',
    shortDescription: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    author: 'YusKar Editorial Desk',
    tags: 'Rwanda, Business, Kigali'
  });

  // Direct Media Upload State
  const [mediaUploadName, setMediaUploadName] = useState('');
  const [mediaUploadDept, setMediaUploadDept] = useState('dept-motors');

  // Inquiry Staff Notes editing
  const [activeInquiryNote, setActiveInquiryNote] = useState<{ id: string; note: string } | null>(null);

  // Filter inquiries
  const [inquiryDeptFilter, setInquiryDeptFilter] = useState('ALL');

  // If user is guest or client, show Admin Login Gate
  if (!currentUser || currentUser.role === 'CLIENT') {
    return (
      <div className="bg-[#070B14] text-slate-100 min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#0B1220] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">
              YusKar Empire Admin CMS
            </h1>
            <p className="text-xs text-slate-400">
              Role-Based Access Control (RBAC) Administration
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Role to Authenticate:
            </div>

            <button
              onClick={() => switchRole('SUPER_ADMIN')}
              className="w-full p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <div className="text-left">
                <div className="font-bold text-amber-300">Karangwa Yussuf (Super Admin)</div>
                <div className="text-[10px] text-slate-400">Full platform permissions & department control</div>
              </div>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </button>

            <button
              onClick={() => switchRole('DEPARTMENT_MANAGER')}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <div className="text-left">
                <div className="font-bold text-white">Eric Mugisha (Dept Manager - Motors)</div>
                <div className="text-[10px] text-slate-400">Restricted strictly to YusKar Motors operations</div>
              </div>
              <Building2 className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => switchRole('CONTENT_MANAGER')}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <div className="text-left">
                <div className="font-bold text-white">Keza Sonia (Content Manager)</div>
                <div className="text-[10px] text-slate-400">Publish articles, press releases, and media</div>
              </div>
              <FileText className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // Handle department form submit
  const handleSaveDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = deptForm.features.split('\n').map(s => s.trim()).filter(Boolean);
    
    if (editingDept) {
      updateDepartment(editingDept.id, {
        name: deptForm.name,
        slug: deptForm.slug,
        shortDescription: deptForm.shortDescription,
        fullDescription: deptForm.fullDescription,
        status: deptForm.status,
        coverImage: deptForm.coverImage,
        location: deptForm.location,
        contactInfo: {
          phone: deptForm.phone,
          whatsapp: deptForm.whatsapp,
          email: deptForm.email,
          address: deptForm.location
        },
        features: featArray,
        comingSoonDate: deptForm.status === 'COMING_SOON' ? deptForm.comingSoonDate : undefined
      });
    } else {
      addDepartment({
        name: deptForm.name,
        slug: deptForm.slug,
        shortDescription: deptForm.shortDescription,
        fullDescription: deptForm.fullDescription,
        status: deptForm.status,
        coverImage: deptForm.coverImage,
        gallery: [deptForm.coverImage],
        iconName: 'Building2',
        location: deptForm.location,
        contactInfo: {
          phone: deptForm.phone,
          whatsapp: deptForm.whatsapp,
          email: deptForm.email,
          address: deptForm.location
        },
        socialMedia: {},
        features: featArray,
        comingSoonDate: deptForm.status === 'COMING_SOON' ? deptForm.comingSoonDate : undefined,
        tags: ['YusKar', deptForm.name.toLowerCase()],
        ctaText: 'Enter Department',
        ctaLink: `/departments/${deptForm.slug}`,
        displayOrder: departments.length + 1
      });
    }

    setDeptModalOpen(false);
    setEditingDept(null);
  };

  // Open edit department modal
  const openEditDept = (dept: Department) => {
    setEditingDept(dept);
    setDeptForm({
      name: dept.name,
      slug: dept.slug,
      shortDescription: dept.shortDescription,
      fullDescription: dept.fullDescription,
      status: dept.status,
      coverImage: dept.coverImage,
      location: dept.location,
      phone: dept.contactInfo.phone,
      whatsapp: dept.contactInfo.whatsapp,
      email: dept.contactInfo.email,
      features: dept.features.join('\n'),
      comingSoonDate: dept.comingSoonDate || ''
    });
    setDeptModalOpen(true);
  };

  // Handle product form submit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const specsObj: Record<string, string> = {};
    prodForm.specs.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        specsObj[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    if (editingProd) {
      updateProduct(editingProd.id, {
        name: prodForm.name,
        departmentId: prodForm.departmentId,
        category: prodForm.category,
        description: prodForm.description,
        price: Number(prodForm.price),
        currency: prodForm.currency,
        stockStatus: prodForm.stockStatus,
        mainImage: prodForm.mainImage,
        location: prodForm.location,
        specifications: specsObj
      });
    } else {
      addProduct({
        name: prodForm.name,
        sku: 'YK-' + Date.now().toString().slice(-6),
        departmentId: prodForm.departmentId,
        category: prodForm.category,
        description: prodForm.description,
        price: Number(prodForm.price),
        currency: prodForm.currency,
        stockStatus: prodForm.stockStatus,
        mainImage: prodForm.mainImage,
        additionalImages: [prodForm.mainImage],
        location: prodForm.location,
        specifications: specsObj,
        status: 'ACTIVE',
        tags: [prodForm.category.toLowerCase(), 'yuskar'],
        featured: false
      });
    }

    setProdModalOpen(false);
    setEditingProd(null);
  };

  // Open edit product
  const openEditProd = (p: Product) => {
    setEditingProd(p);
    const specsStr = Object.entries(p.specifications || {}).map(([k, v]) => `${k}: ${v}`).join('\n');
    setProdForm({
      name: p.name,
      departmentId: p.departmentId,
      category: p.category,
      description: p.description,
      price: p.price,
      currency: p.currency,
      stockStatus: p.stockStatus,
      mainImage: p.mainImage,
      location: p.location || 'Kigali Showroom',
      specs: specsStr
    });
    setProdModalOpen(true);
  };

  // Handle post form submit
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = postForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingPost) {
      updatePost(editingPost.id, {
        title: postForm.title,
        slug: postForm.slug,
        category: postForm.category,
        departmentId: postForm.departmentId,
        shortDescription: postForm.shortDescription,
        fullContent: postForm.content,
        coverImage: postForm.coverImage,
        author: postForm.author,
        tags: tagsArray
      });
    } else {
      addPost({
        title: postForm.title,
        slug: postForm.slug,
        category: postForm.category,
        departmentId: postForm.departmentId,
        shortDescription: postForm.shortDescription,
        fullContent: postForm.content,
        coverImage: postForm.coverImage,
        gallery: [postForm.coverImage],
        author: postForm.author,
        publishDate: new Date().toISOString().split('T')[0],
        tags: tagsArray,
        status: 'PUBLISHED',
        featured: false
      });
    }

    setPostModalOpen(false);
    setEditingPost(null);
  };

  // Direct File Upload simulation
  const handleDirectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const fileUrl = loadEvent.target?.result as string;
        addMediaItem({
          fileName: file.name,
          fileType: file.type.startsWith('image/') ? 'image' : 'document',
          fileSize: file.size,
          url: fileUrl,
          departmentId: mediaUploadDept,
          uploadedBy: currentUser.name,
          altText: file.name,
          caption: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Restrict entities if user is Department Manager
  const allowedDepartments = departments.filter(d => canManageDepartment(d.id));
  const allowedProducts = products.filter(p => canManageDepartment(p.departmentId));
  const allowedServices = services.filter(s => canManageDepartment(s.departmentId));
  const allowedMessages = messages.filter(m => canManageDepartment(m.departmentId || ''));

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen pb-20">
      
      {/* Top Admin Bar */}
      <div className="bg-[#0B1220] border-b border-slate-800 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-heading font-black text-lg">
              YK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base text-white">
                  YUSKAR EMPIRE CMS
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs text-slate-400 block">
                Logged in as <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
          </div>

          {/* Role switcher & quick actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
              <span className="text-slate-500 px-2 font-semibold">Switch Role:</span>
              <button
                onClick={() => switchRole('SUPER_ADMIN')}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  currentUser.role === 'SUPER_ADMIN' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Super Admin
              </button>
              <button
                onClick={() => switchRole('DEPARTMENT_MANAGER')}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  currentUser.role === 'DEPARTMENT_MANAGER' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dept Manager
              </button>
              <button
                onClick={() => switchRole('CONTENT_MANAGER')}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  currentUser.role === 'CONTENT_MANAGER' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Content Mgr
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs border border-slate-700"
            >
              Public Site
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('DEPARTMENTS')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'DEPARTMENTS' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Departments ({allowedDepartments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('PRODUCTS')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'PRODUCTS' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products & Vehicles ({allowedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SERVICES')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'SERVICES' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Services ({allowedServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('POSTS')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'POSTS' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>News & Posts ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('INQUIRIES')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'INQUIRIES' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquiries CRM ({allowedMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('MEDIA')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'MEDIA' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Storage ({media.length})</span>
          </button>

          {canManageAll && (
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'AUDIT' 
                  ? 'bg-amber-500 text-black font-bold' 
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Audit Logs ({auditLogs.length})</span>
            </button>
          )}

          {canEditSettings && (
            <button
              onClick={() => setActiveTab('SETTINGS')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'SETTINGS' 
                  ? 'bg-amber-500 text-black font-bold' 
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Platform Settings</span>
            </button>
          )}
        </div>

        {/* 1. DEPARTMENTS TAB */}
        {activeTab === 'DEPARTMENTS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Department Management
                </h2>
                <p className="text-xs text-slate-400">
                  Control activation, deactivation, and &quot;Coming Soon&quot; states across the YusKar ecosystem.
                </p>
              </div>

              {canManageAll && (
                <button
                  onClick={() => {
                    setEditingDept(null);
                    setDeptForm({
                      name: '',
                      slug: '',
                      shortDescription: '',
                      fullDescription: '',
                      status: 'ACTIVE',
                      coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                      location: 'Kigali, Rwanda',
                      phone: '+250 788 123 456',
                      whatsapp: '+250 788 123 456',
                      email: 'info@yuskarempire.rw',
                      features: 'Certified quality\nDedicated Kigali desk',
                      comingSoonDate: ''
                    });
                    setDeptModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Department</span>
                </button>
              )}
            </div>

            {/* Department Table / Cards */}
            <div className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#070B14] text-slate-400 uppercase font-semibold border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="p-4">Department</th>
                      <th className="p-4">Slug / Path</th>
                      <th className="p-4">Status & Switch</th>
                      <th className="p-4">Location</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {allowedDepartments.map((dept) => (
                      <tr key={dept.id} className="hover:bg-slate-900/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={dept.coverImage} alt={dept.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                            <div>
                              <div className="font-bold text-white text-sm">{dept.name}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">{dept.shortDescription}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-slate-400">/departments/{dept.slug}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              dept.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              dept.status === 'COMING_SOON' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                              'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}>
                              {dept.status}
                            </span>

                            {canManageAll && (
                              <select
                                value={dept.status}
                                onChange={(e) => toggleDepartmentStatus(dept.id, e.target.value as DepartmentStatus)}
                                className="bg-slate-900 border border-slate-700 rounded-lg text-[10px] p-1 text-slate-200"
                              >
                                <option value="ACTIVE">Set ACTIVE</option>
                                <option value="COMING_SOON">Set COMING SOON</option>
                                <option value="INACTIVE">Set INACTIVE</option>
                              </select>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-slate-400">{dept.location}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditDept(dept)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700"
                            title="Edit Department"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {canManageAll && (
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove ${dept.name}?`)) {
                                  deleteDepartment(dept.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700"
                              title="Delete Department"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === 'PRODUCTS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Products & Inventory
                </h2>
                <p className="text-xs text-slate-400">
                  Manage showroom inventory, vehicles, and parts.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProd(null);
                  setProdForm({
                    name: '',
                    departmentId: allowedDepartments[0]?.id || 'dept-motors',
                    category: 'SUV',
                    description: '',
                    price: 25000000,
                    currency: 'RWF',
                    stockStatus: 'IN_STOCK',
                    mainImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
                    location: 'Kigali Showroom (Gikondo)',
                    specs: 'Brand: Toyota\nModel Year: 2022'
                  });
                  setProdModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product / Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allowedProducts.map((p) => {
                const dept = departments.find(d => d.id === p.departmentId);
                return (
                  <div key={p.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/90 text-amber-400 text-[10px] font-bold">
                          {p.stockStatus}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase">{dept?.name}</div>
                        <h4 className="font-heading font-bold text-base text-white">{p.name}</h4>
                        <div className="text-sm font-bold text-amber-400 mt-1">{p.price.toLocaleString()} {p.currency}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => openEditProd(p)}
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. SERVICES TAB */}
        {activeTab === 'SERVICES' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Services Management</h2>
                <p className="text-xs text-slate-400">Manage service offerings per department.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allowedServices.map(s => {
                const dept = departments.find(d => d.id === s.departmentId);
                return (
                  <div key={s.id} className="p-5 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
                    <span className="text-[10px] font-bold uppercase text-amber-400">{dept?.name}</span>
                    <h3 className="font-heading font-bold text-base text-white">{s.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{s.description}</p>
                    <div className="text-xs font-bold text-amber-400 pt-2 border-t border-slate-800">
                      {s.priceType === 'REQUEST_QUOTE' ? 'Custom Quote' : `${s.price?.toLocaleString()} ${s.currency}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. POSTS TAB */}
        {activeTab === 'POSTS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">News & Publications</h2>
                <p className="text-xs text-slate-400">Articles published under YusKar divisions.</p>
              </div>

              {canManageContent && (
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setPostForm({
                      title: '',
                      slug: 'article-' + Date.now(),
                      category: 'Corporate News',
                      departmentId: allowedDepartments[0]?.id || 'dept-motors',
                      shortDescription: '',
                      content: '',
                      coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
                      author: currentUser.name,
                      tags: 'Rwanda, Business'
                    });
                    setPostModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => (
                <div key={p.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold">{p.category}</span>
                    <h3 className="font-heading font-bold text-base text-white mt-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.shortDescription}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">{p.publishDate}</span>
                    <div className="space-x-2">
                      <button onClick={() => {
                        setEditingPost(p);
                        setPostForm({
                          title: p.title,
                          slug: p.slug,
                          category: p.category,
                          departmentId: p.departmentId,
                          shortDescription: p.shortDescription,
                          content: p.fullContent,
                          coverImage: p.coverImage,
                          author: p.author,
                          tags: p.tags.join(', ')
                        });
                        setPostModalOpen(true);
                      }} className="text-amber-400 hover:underline">Edit</button>
                      <button onClick={() => deletePost(p.id)} className="text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. INQUIRIES CRM */}
        {activeTab === 'INQUIRIES' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Customer Inquiries CRM</h2>
                <p className="text-xs text-slate-400">Incoming service quotes, orders, and vehicle sourcing requests.</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Filter Dept:</span>
                <select
                  value={inquiryDeptFilter}
                  onChange={(e) => setInquiryDeptFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 outline-none"
                >
                  <option value="ALL">All Departments</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {allowedMessages
                .filter(m => inquiryDeptFilter === 'ALL' || m.departmentId === inquiryDeptFilter)
                .map((msg) => {
                  const dept = departments.find(d => d.id === msg.departmentId);
                  return (
                    <div key={msg.id} className="p-5 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-white text-sm">{msg.subject}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 font-semibold">
                              {dept?.name || 'YusKar Empire'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            From: <strong className="text-slate-200">{msg.name}</strong> • Phone: <span className="text-emerald-400 font-semibold">{msg.phone}</span> • Email: {msg.email}
                          </div>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <select
                            value={msg.status}
                            onChange={(e) => updateInquiryStatus(msg.id, e.target.value as InquiryStatus)}
                            className="bg-slate-900 border border-slate-700 rounded-lg text-xs p-1.5 text-slate-200 font-semibold"
                          >
                            <option value="NEW">Status: NEW</option>
                            <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                            <option value="RESOLVED">Status: RESOLVED</option>
                            <option value="ARCHIVED">Status: ARCHIVED</option>
                          </select>

                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-xs text-slate-300">
                        {msg.message}
                      </div>

                      {msg.attachmentName && (
                        <div className="flex items-center gap-2 text-xs text-amber-400">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Attachment: {msg.attachmentName}</span>
                        </div>
                      )}

                      {/* Staff note editing */}
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs">
                        <span className="text-slate-500 font-semibold">Internal Staff Note:</span>
                        <input
                          type="text"
                          defaultValue={msg.notes || ''}
                          onBlur={(e) => updateInquiryStatus(msg.id, msg.status, e.target.value)}
                          placeholder="Add internal note (e.g. Quoted 45M RWF, meeting at CHIC on Friday)"
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 6. MEDIA STORAGE */}
        {activeTab === 'MEDIA' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Direct Media Storage</h2>
                <p className="text-xs text-slate-400">Upload photos, vehicle inspection reports, and brochures directly.</p>
              </div>

              {/* Direct file upload button */}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md">
                  <Upload className="w-4 h-4" />
                  <span>Upload Media Directly</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleDirectFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-2 flex flex-col justify-between">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                    <img src={item.url} alt={item.fileName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white truncate">{item.fileName}</div>
                    <div className="text-[10px] text-slate-400">{(item.fileSize / 1024).toFixed(1)} KB • By {item.uploadedBy}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        showToast('Media URL copied to clipboard!');
                      }}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => deleteMediaItem(item.id)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. AUDIT LOGS */}
        {activeTab === 'AUDIT' && canManageAll && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-white">System Audit Trail</h2>
              <p className="text-xs text-slate-400">Full tamper-evident record of administrative changes.</p>
            </div>

            <div className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#070B14] text-slate-400 uppercase font-semibold border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Action</th>
                      <th className="p-3.5">Entity</th>
                      <th className="p-3.5">Previous Value</th>
                      <th className="p-3.5">New Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-900/50">
                        <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-white">{log.userName}</span>
                          <span className="text-[10px] text-slate-400 block">{log.userRole}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-[10px] border border-slate-800">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300">{log.entityType} ({log.departmentName || log.departmentId || 'Global'})</td>
                        <td className="p-3.5 text-slate-500">{log.oldValue || '—'}</td>
                        <td className="p-3.5 text-slate-200 font-medium">{log.newValue || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 8. SETTINGS TAB */}
        {activeTab === 'SETTINGS' && canEditSettings && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Platform Settings & Control Center</h2>
                <p className="text-xs text-slate-400">
                  Manage administrator profile, dual hotlines & WhatsApp lines, floating widget, public section visibility, and full page content.
                </p>
              </div>

              <button
                onClick={resetToDefaultData}
                className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900 text-xs font-semibold self-start sm:self-auto"
                title="Reset all settings and database to factory state"
              >
                Reset Database to Factory Defaults
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setSettingsSubTab('PROFILE')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  settingsSubTab === 'PROFILE'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>My Profile & Contacts</span>
              </button>

              <button
                type="button"
                onClick={() => setSettingsSubTab('CONTACT_HOTLINES')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  settingsSubTab === 'CONTACT_HOTLINES'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hotlines & Contact Details</span>
              </button>

              <button
                type="button"
                onClick={() => setSettingsSubTab('WHATSAPP_WIDGET')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  settingsSubTab === 'WHATSAPP_WIDGET'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Floating WhatsApp Widget</span>
              </button>

              <button
                type="button"
                onClick={() => setSettingsSubTab('PUBLIC_SECTIONS')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  settingsSubTab === 'PUBLIC_SECTIONS'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Public Sections Visibility</span>
              </button>

              <button
                type="button"
                onClick={() => setSettingsSubTab('PAGES_CONTENT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  settingsSubTab === 'PAGES_CONTENT'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Whole Website & Pages Content</span>
              </button>
            </div>

            {/* 8.1 PROFILE SUB-TAB */}
            {settingsSubTab === 'PROFILE' && (
              <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-amber-400" />
                    <span>Administrator Profile & Personal Information</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Update your staff role, personal information, profile photo, direct contacts, and social media handles.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!currentUser) return;
                    updateUserProfile(currentUser.id, {
                      name: profileForm.name,
                      email: profileForm.email,
                      phone: profileForm.phone,
                      role: profileForm.role as UserRole,
                      departmentId: profileForm.departmentId || undefined,
                      profilePhoto: profileForm.profilePhoto,
                      location: profileForm.location,
                      bio: profileForm.bio,
                      socialLinks: {
                        whatsapp: profileForm.whatsapp,
                        twitter: profileForm.twitter,
                        linkedin: profileForm.linkedin,
                        instagram: profileForm.instagram
                      }
                    });
                  }}
                  className="space-y-4 text-xs"
                >
                  {/* Avatar Preview & URL */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <img
                      src={profileForm.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={profileForm.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md shrink-0"
                    />
                    <div className="flex-1 w-full space-y-2">
                      <label className="block text-slate-300 font-semibold">Profile Photo URL</label>
                      <input
                        type="url"
                        value={profileForm.profilePhoto}
                        onChange={(e) => setProfileForm({ ...profileForm, profilePhoto: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[10px]"
                        >
                          Executive Male Avatar
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[10px]"
                        >
                          Executive Female Avatar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Role / Authority</label>
                      <select
                        value={profileForm.role}
                        onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value as UserRole })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      >
                        <option value="EXECUTIVE_ADMIN">Executive Admin (Full Access)</option>
                        <option value="DEPARTMENT_MANAGER">Department Manager</option>
                        <option value="CONTENT_EDITOR">Content Editor</option>
                        <option value="CLIENT">Client / Visitor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Assigned Department</label>
                      <select
                        value={profileForm.departmentId}
                        onChange={(e) => setProfileForm({ ...profileForm, departmentId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      >
                        <option value="">All Departments (Executive Global)</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Contact Phone Number</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+250 726 134 041"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Direct WhatsApp Number</label>
                      <input
                        type="text"
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                        placeholder="+250 795 153 994"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Physical Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="Kigali, Rwanda"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Professional Bio / Title</label>
                      <input
                        type="text"
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        placeholder="Chief Executive & Managing Director"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-2 border-t border-slate-800">
                    <h4 className="font-semibold text-slate-200 mb-2">Personal Social Media Links</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Twitter / X URL</label>
                        <input
                          type="url"
                          value={profileForm.twitter}
                          onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                          placeholder="https://twitter.com/..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Instagram URL</label>
                        <input
                          type="url"
                          value={profileForm.instagram}
                          onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                          placeholder="https://instagram.com/..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[11px] mb-1">Facebook URL</label>
                        <input
                          type="url"
                          value={profileForm.facebook}
                          onChange={(e) => setProfileForm({ ...profileForm, facebook: e.target.value })}
                          placeholder="https://facebook.com/..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 8.2 CONTACT HOTLINES SUB-TAB */}
            {settingsSubTab === 'CONTACT_HOTLINES' && (
              <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-amber-400" />
                    <span>Company Contact Numbers & Calling Hotlines</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure your dual calling hotlines (+250 726 134 041 / +250 795 153 994) and dual WhatsApp gateways (+250 795 153 994 / +250 781 652 135).
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* HOTLINES */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px] block">
                      Calling Hotlines (Phone Calls)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">24/7 Primary Calling Hotline</label>
                        <input
                          type="text"
                          value={settings.hotlinePrimaryPhone || '+250 726 134 041'}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSettings({
                              hotlinePrimaryPhone: val,
                              hotlinePhone: `${val} / ${settings.hotlineSecondaryPhone || '+250 795 153 994'}`,
                              pageContent: {
                                ...(settings.pageContent || {}),
                                contactPrimaryPhone: val
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Secondary Calling Hotline</label>
                        <input
                          type="text"
                          value={settings.hotlineSecondaryPhone || '+250 795 153 994'}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSettings({
                              hotlineSecondaryPhone: val,
                              hotlinePhone: `${settings.hotlinePrimaryPhone || '+250 726 134 041'} / ${val}`,
                              pageContent: {
                                ...(settings.pageContent || {}),
                                contactSecondaryPhone: val
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WHATSAPP NUMBERS */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-800/40 space-y-3">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px] block">
                      WhatsApp Gateway Numbers
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Primary WhatsApp Line (+250 795 153 994)</label>
                        <input
                          type="text"
                          value={settings.whatsappPrimaryPhone || '250795153994'}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSettings({
                              whatsappPrimaryPhone: val,
                              whatsappPhone: `+250 795 153 994 / +250 781 652 135`,
                              whatsappWidget: {
                                ...(settings.whatsappWidget || {}),
                                phoneNumber: val.replace(/[^0-9]/g, '')
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Secondary WhatsApp Line (+250 781 652 135)</label>
                        <input
                          type="text"
                          value={settings.whatsappSecondaryPhone || '250781652135'}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSettings({
                              whatsappSecondaryPhone: val,
                              whatsappPhone: `+250 795 153 994 / +250 781 652 135`,
                              whatsappWidget: {
                                ...(settings.whatsappWidget || {}),
                                secondaryPhoneNumber: val.replace(/[^0-9]/g, '')
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* EMAILS & ADDRESS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Primary Corporate Email</label>
                      <input
                        type="email"
                        value={settings.primaryEmail}
                        onChange={(e) => updateSettings({ primaryEmail: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Customer Support Email</label>
                      <input
                        type="email"
                        value={settings.supportEmail || 'support@yuskarempire.rw'}
                        onChange={(e) => updateSettings({ supportEmail: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Physical Corporate Headquarters</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => updateSettings({ address: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Business Hours</label>
                      <input
                        type="text"
                        value={settings.businessHours}
                        onChange={(e) => updateSettings({ businessHours: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">About Company Summary</label>
                    <textarea
                      rows={3}
                      value={settings.aboutText}
                      onChange={(e) => updateSettings({ aboutText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 8.3 WHATSAPP FLOATING WIDGET SUB-TAB */}
            {settingsSubTab === 'WHATSAPP_WIDGET' && (
              <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>Floating WhatsApp Chat Widget Settings</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Control widget activation, active numbers (+250 795 153 994 & +250 781 652 135), greeting message, and quick prompts.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Enable Switch */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div>
                      <div className="font-bold text-white">Enable Floating WhatsApp Widget</div>
                      <div className="text-[11px] text-slate-400">Renders the circular WhatsApp button fixed at the bottom of all public pages.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.whatsappWidget?.enabled ?? true}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              enabled: e.target.checked
                            }
                          });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Dual WhatsApp Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Primary WhatsApp Clean API Number</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.phoneNumber || '250795153994'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              phoneNumber: e.target.value
                            }
                          });
                        }}
                        placeholder="250795153994"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Primary WhatsApp Display Label</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.displayPhoneNumber || '+250 795 153 994'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              displayPhoneNumber: e.target.value
                            }
                          });
                        }}
                        placeholder="+250 795 153 994"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Secondary WhatsApp Clean API Number</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.secondaryPhoneNumber || '250781652135'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              secondaryPhoneNumber: e.target.value
                            }
                          });
                        }}
                        placeholder="250781652135"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Secondary WhatsApp Display Label</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.secondaryDisplayPhoneNumber || '+250 781 652 135'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              secondaryDisplayPhoneNumber: e.target.value
                            }
                          });
                        }}
                        placeholder="+250 781 652 135"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  {/* Greetings and branding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Business Brand Header</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.businessName || 'YusKar Empire'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              businessName: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Agent Response Status</label>
                      <input
                        type="text"
                        value={settings.whatsappWidget?.statusText || 'Usually replies instantly'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              statusText: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Welcome Message in Kinyarwanda / English</label>
                    <input
                      type="text"
                      value={settings.whatsappWidget?.welcomeMessage || 'Muraho 👋 Twagufasha iki?'}
                      onChange={(e) => {
                        updateSettings({
                          whatsappWidget: {
                            ...(settings.whatsappWidget || {}),
                            welcomeMessage: e.target.value
                          }
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Widget Position</label>
                      <select
                        value={settings.whatsappWidget?.position || 'bottom-right'}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              position: e.target.value as 'bottom-right' | 'bottom-left'
                            }
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      >
                        <option value="bottom-right">Bottom-Right (Standard)</option>
                        <option value="bottom-left">Bottom-Left</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <div className="font-semibold text-white">Attention Pulse Ring</div>
                        <div className="text-[10px] text-slate-400">Green pulse wave when closed</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.whatsappWidget?.pulseAnimation ?? true}
                        onChange={(e) => {
                          updateSettings({
                            whatsappWidget: {
                              ...(settings.whatsappWidget || {}),
                              pulseAnimation: e.target.checked
                            }
                          });
                        }}
                        className="w-4 h-4 rounded text-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8.4 PUBLIC SECTIONS VISIBILITY SUB-TAB */}
            {settingsSubTab === 'PUBLIC_SECTIONS' && (
              <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-amber-400" />
                    <span>Public Website Section Visibility Toggles</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Switch any section ON or OFF on the live public website. Useful for seasonal campaigns, maintenance, or selective launches.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { key: 'heroSection', label: '1. Hero Section & Brand Video', desc: 'Main headline, multi-solution badge, and direct call-to-actions' },
                    { key: 'advertSlideShowcase', label: '2. Advert & Media Slideshow Showcase', desc: 'Sliding promotional showcase of featured division highlights' },
                    { key: 'statsTrustBadges', label: '3. Trust Badges & Verified Stats Counter', desc: 'Live statistics: 8 divisions, 100% verified titles, $12M+ throughput' },
                    { key: 'departmentsDirectory', label: '4. Autonomous Departments Directory', desc: 'Interactive grid of active, coming soon, and inactive divisions' },
                    { key: 'showroomProducts', label: '5. Showroom Products & Vehicle Stock', desc: 'Kigali physical inventory, vehicles, and direct inquiry buttons' },
                    { key: 'servicesDirectory', label: '6. Enterprise Services Directory', desc: 'Corporate logistics, RDB facilitation, and prime estate advisory' },
                    { key: 'projectsCaseStudies', label: '7. Projects & Portfolio Case Studies', desc: 'Corporate infrastructure and multi-sector delivery milestones' },
                    { key: 'leadershipTeam', label: '8. Executive Leadership & Governance', desc: 'Board directors, department managers, and staff leadership' },
                    { key: 'newsInsights', label: '9. Corporate News & Market Insights', desc: 'Press releases, trade commentary, and automotive newsletters' },
                    { key: 'contactSection', label: '10. Direct Desk Inquiry Section', desc: 'Quick contact form and direct Kigali showroom address block' },
                    { key: 'footerSocials', label: '11. Footer & Social Media Network', desc: 'Corporate links, footer hotline links, and verified social icons' },
                  ].map(({ key, label, desc }) => {
                    const isVisible = settings.sectionVisibility?.[key as keyof typeof settings.sectionVisibility] ?? true;
                    return (
                      <div 
                        key={key} 
                        className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                          isVisible 
                            ? 'bg-slate-900/90 border-slate-700' 
                            : 'bg-slate-950/60 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-white text-xs">{label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => {
                              updateSettings({
                                sectionVisibility: {
                                  ...(settings.sectionVisibility || {}),
                                  [key]: e.target.checked
                                }
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 8.5 WHOLE WEBSITE & PAGES CONTENT SUB-TAB */}
            {settingsSubTab === 'PAGES_CONTENT' && (
              <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-400" />
                    <span>Whole Website & Pages Content Editor</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Edit public headings, about mission & vision statements, contact page copy, and top announcement banner.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Announcement Banner */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-amber-400">Global Announcement Banner</span>
                        <span className="text-[10px] text-slate-400 block">Displays at the very top of all pages above the header</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.pageContent?.showAnnouncementBanner ?? false}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              showAnnouncementBanner: e.target.checked
                            }
                          });
                        }}
                        className="w-4 h-4 rounded text-amber-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={settings.pageContent?.customAnnouncementBanner || ''}
                      onChange={(e) => {
                        updateSettings({
                          pageContent: {
                            ...(settings.pageContent || {}),
                            customAnnouncementBanner: e.target.value
                          }
                        });
                      }}
                      placeholder="e.g. Special Offer: 50% discount on Kigali bonded logistics this month!"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    />
                  </div>

                  {/* Home Page Content */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="font-semibold text-white block">Homepage Content</span>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Hero Main Heading</label>
                      <input
                        type="text"
                        value={settings.pageContent?.heroTitle || 'ONE COMPANY. MULTIPLE SOLUTIONS.'}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              heroTitle: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Hero Subtitle Paragraph</label>
                      <textarea
                        rows={3}
                        value={settings.pageContent?.heroSubtitle || ''}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              heroSubtitle: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                  </div>

                  {/* About Page Content */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="font-semibold text-white block">About Us Page Content</span>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">About Page Headline</label>
                      <input
                        type="text"
                        value={settings.pageContent?.aboutHeroTitle || 'Building Africa\'s Next-Generation Multi-Sector Conglomerate'}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              aboutHeroTitle: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Corporate Mission Statement</label>
                        <textarea
                          rows={3}
                          value={settings.pageContent?.aboutMissionText || ''}
                          onChange={(e) => {
                            updateSettings({
                              pageContent: {
                                ...(settings.pageContent || {}),
                                aboutMissionText: e.target.value
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Corporate 2030 Vision Statement</label>
                        <textarea
                          rows={3}
                          value={settings.pageContent?.aboutVisionText || ''}
                          onChange={(e) => {
                            updateSettings({
                              pageContent: {
                                ...(settings.pageContent || {}),
                                aboutVisionText: e.target.value
                              }
                            });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Page Content */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="font-semibold text-white block">Contact Us Page Content</span>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Contact Page Hero Title</label>
                      <input
                        type="text"
                        value={settings.pageContent?.contactHeroTitle || 'Get in Touch With YusKar Empire'}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              contactHeroTitle: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Contact Page Subtitle</label>
                      <textarea
                        rows={2}
                        value={settings.pageContent?.contactSubtitle || ''}
                        onChange={(e) => {
                          updateSettings({
                            pageContent: {
                              ...(settings.pageContent || {}),
                              contactSubtitle: e.target.value
                            }
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* DEPARTMENT MODAL */}
      {deptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingDept ? 'Edit Department' : 'Create New Department'}
              </h3>
              <button onClick={() => setDeptModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDepartment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  value={deptForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setDeptForm({ ...deptForm, name, slug: editingDept ? deptForm.slug : slug });
                  }}
                  placeholder="e.g. YusKar Agro & Exports"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={deptForm.slug}
                    onChange={(e) => setDeptForm({ ...deptForm, slug: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={deptForm.status}
                    onChange={(e) => setDeptForm({ ...deptForm, status: e.target.value as DepartmentStatus })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="COMING_SOON">COMING SOON</option>
                    <option value="INACTIVE">INACTIVE / ARCHIVE</option>
                  </select>
                </div>
              </div>

              {deptForm.status === 'COMING_SOON' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Expected Launch Date</label>
                  <input
                    type="text"
                    value={deptForm.comingSoonDate}
                    onChange={(e) => setDeptForm({ ...deptForm, comingSoonDate: e.target.value })}
                    placeholder="e.g. Q3 2025"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description (Cards)</label>
                <input
                  type="text"
                  required
                  value={deptForm.shortDescription}
                  onChange={(e) => setDeptForm({ ...deptForm, shortDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Description (Detail View)</label>
                <textarea
                  rows={3}
                  required
                  value={deptForm.fullDescription}
                  onChange={(e) => setDeptForm({ ...deptForm, fullDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={deptForm.coverImage}
                  onChange={(e) => setDeptForm({ ...deptForm, coverImage: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department Calling Phone</label>
                  <input
                    type="text"
                    value={deptForm.phone}
                    onChange={(e) => setDeptForm({ ...deptForm, phone: e.target.value })}
                    placeholder="+250 788 123 456"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department WhatsApp</label>
                  <input
                    type="text"
                    value={deptForm.whatsapp}
                    onChange={(e) => setDeptForm({ ...deptForm, whatsapp: e.target.value })}
                    placeholder="+250 795 153 994"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department Direct Email</label>
                  <input
                    type="email"
                    value={deptForm.email}
                    onChange={(e) => setDeptForm({ ...deptForm, email: e.target.value })}
                    placeholder="dept@yuskarempire.rw"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department Location / Desk</label>
                  <input
                    type="text"
                    value={deptForm.location}
                    onChange={(e) => setDeptForm({ ...deptForm, location: e.target.value })}
                    placeholder="Kigali Showroom / Gikondo HQ"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={deptForm.features}
                  onChange={(e) => setDeptForm({ ...deptForm, features: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeptModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {prodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingProd ? 'Edit Product / Vehicle' : 'Add New Product / Vehicle'}
              </h3>
              <button onClick={() => setProdModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product / Vehicle Name</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="e.g. Land Cruiser Prado 2023"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <select
                    value={prodForm.departmentId}
                    onChange={(e) => setProdForm({ ...prodForm, departmentId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  >
                    {allowedDepartments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock Status</label>
                  <select
                    value={prodForm.stockStatus}
                    onChange={(e) => setProdForm({ ...prodForm, stockStatus: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  >
                    <option value="IN_STOCK">IN STOCK (KIGALI)</option>
                    <option value="AVAILABLE_FOR_IMPORT">AVAILABLE FOR IMPORT</option>
                    <option value="PRE_ORDER">PRE-ORDER</option>
                    <option value="SOLD">SOLD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Main Image URL</label>
                <input
                  type="text"
                  required
                  value={prodForm.mainImage}
                  onChange={(e) => setProdForm({ ...prodForm, mainImage: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Specifications (Key: Value per line)</label>
                <textarea
                  rows={4}
                  value={prodForm.specs}
                  onChange={(e) => setProdForm({ ...prodForm, specs: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProdModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST MODAL */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingPost ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setPostModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <select
                    value={postForm.departmentId}
                    onChange={(e) => setPostForm({ ...postForm, departmentId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  >
                    {allowedDepartments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Excerpt (Cards)</label>
                <input
                  type="text"
                  required
                  value={postForm.shortDescription}
                  onChange={(e) => setPostForm({ ...postForm, shortDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Content</label>
                <textarea
                  rows={6}
                  required
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={postForm.coverImage}
                  onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  placeholder="Kigali, Automotive, Logistics"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
