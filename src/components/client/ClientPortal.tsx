import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User as UserIcon, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Package, 
  Briefcase, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    switchRole, 
    clientSaved, 
    socialShares, 
    messages, 
    products, 
    services, 
    posts, 
    departments, 
    navigate, 
    openInquiryModal,
    openShareModal,
    toggleSaveItem,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'SAVED' | 'INQUIRIES' | 'SHARES' | 'PROFILE'>('SAVED');

  // If not logged in as client, show login simulation
  if (!currentUser || currentUser.role !== 'CLIENT') {
    return (
      <div className="bg-[#070B14] text-slate-100 min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#0B1220] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <UserIcon className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-white">
              YusKar Client Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access your saved vehicles, track department inquiries, and view your sharing activity.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => switchRole('CLIENT')}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>Continue as Patrick Rukundo (Client Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Return to Website
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Secure client authentication • YusKar Empire Ltd, Kigali, Rwanda
          </div>
        </div>
      </div>
    );
  }

  // Get user's saved items
  const savedProductItems = products.filter(p => clientSaved.some(s => s.itemType === 'product' && s.itemId === p.id));
  const savedServiceItems = services.filter(s => clientSaved.some(s => s.itemType === 'service' && s.itemId === s.id));
  const savedPostItems = posts.filter(p => clientSaved.some(s => s.itemType === 'post' && s.itemId === p.id));

  // User's inquiries (matched by email or name or demo)
  const clientInquiries = messages.filter(m => m.email === currentUser.email || m.name.toLowerCase().includes('patrick') || m.phone.includes(currentUser.phone || ''));
  const userShares = socialShares.filter(s => s.clientId === currentUser.id);

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-heading font-extrabold text-2xl">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser.email} • {currentUser.phone || '+250 788 123 456'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openInquiryModal()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Department Inquiry</span>
            </button>

            <button
              onClick={() => switchRole('VISITOR')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-8 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('SAVED')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'SAVED' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Items ({clientSaved.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('INQUIRIES')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'INQUIRIES' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>My Inquiries ({clientInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SHARES')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'SHARES' 
                ? 'bg-amber-500 text-black font-bold' 
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>My Social Reposts ({userShares.length})</span>
          </button>
        </div>

        {/* TAB 1: SAVED ITEMS */}
        {activeTab === 'SAVED' && (
          <div className="space-y-6">
            {clientSaved.length === 0 ? (
              <div className="py-16 text-center bg-[#0B1220] border border-slate-800 rounded-2xl p-8">
                <Bookmark className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                <h3 className="font-heading font-bold text-base text-white">No Saved Items Yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Click the bookmark icon on any vehicle, product, or news post to save it for quick reference here.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2"
                >
                  <span>Browse Showroom Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProductItems.map(p => (
                  <div key={p.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleSaveItem('product', p.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-amber-500 text-black shadow-md"
                        title="Remove"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-heading font-bold text-sm text-white">{p.name}</h4>
                      <div className="text-xs font-bold text-amber-400">{p.price.toLocaleString()} {p.currency}</div>
                      <button
                        onClick={() => openInquiryModal({ departmentId: p.departmentId, type: 'PRODUCT_ORDER', itemTitle: p.name, relatedItemId: p.id })}
                        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        Inquire This Item
                      </button>
                    </div>
                  </div>
                ))}

                {savedPostItems.map(post => (
                  <div key={post.id} className="bg-[#0B1220] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-bold">{post.category}</span>
                      <h4 className="font-heading font-bold text-sm text-white mt-1">{post.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{post.shortDescription}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <button onClick={() => navigate(`/posts/${post.slug}`)} className="text-xs text-amber-400 font-semibold hover:underline">
                        Read Story →
                      </button>
                      <button onClick={() => toggleSaveItem('post', post.id)} className="text-xs text-slate-400 hover:text-red-400">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INQUIRIES TRACKER */}
        {activeTab === 'INQUIRIES' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold text-white">
                Ticketed Department Inquiries & Orders
              </h2>
              <button
                onClick={() => openInquiryModal()}
                className="text-xs font-semibold text-amber-400 hover:underline"
              >
                + New Inquiry
              </button>
            </div>

            {clientInquiries.length === 0 ? (
              <div className="py-12 text-center bg-[#0B1220] border border-slate-800 rounded-2xl p-8">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">No active tickets registered under this account.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clientInquiries.map((inq) => {
                  const dept = departments.find(d => d.id === inq.departmentId);
                  return (
                    <div key={inq.id} className="p-5 rounded-2xl bg-[#0B1220] border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{inq.subject}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {dept?.name || 'General Desk'}
                          </span>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          inq.status === 'NEW' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                          inq.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          inq.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {inq.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                        {inq.message}
                      </p>

                      {inq.notes && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                          <strong>YusKar Staff Response:</strong> {inq.notes}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Submitted on {new Date(inq.createdAt).toLocaleDateString()}</span>
                        <span>Ticket ID: #{inq.id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REPOST & SHARE TRACKING */}
        {activeTab === 'SHARES' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-bold text-white">
                  Social Repost Activity
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Content you shared to WhatsApp, Twitter/X, and social networks.
                </p>
              </div>
            </div>

            {userShares.length === 0 ? (
              <div className="py-12 text-center bg-[#0B1220] border border-slate-800 rounded-2xl p-8">
                <Share2 className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">
                  You haven&apos;t reposted any content yet. Try sharing a vehicle or news article to WhatsApp!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {userShares.map((sh) => (
                  <div key={sh.id} className="p-4 rounded-xl bg-[#0B1220] border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{sh.contentTitle}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 uppercase">
                          {sh.platform}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Shared on {new Date(sh.timestamp).toLocaleDateString()} at {new Date(sh.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">Shared</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
