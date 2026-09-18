import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Search, 
  Share2, 
  Calendar, 
  User as UserIcon, 
  ArrowRight, 
  Tag,
  Sparkles
} from 'lucide-react';

export const PostsPage: React.FC = () => {
  const { posts, departments, openShareModal, navigate } = useApp();
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const publishedPosts = posts.filter(p => p.status === 'PUBLISHED');

  const filteredPosts = publishedPosts.filter(p => {
    const matchesDept = selectedDeptId === 'ALL' || p.departmentId === selectedDeptId;
    const matchesSearch = !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <FileText className="w-4 h-4" />
            Insights & Company Dispatch
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            News, Insights & Announcements
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Market reports, official division launches, automotive advice, and economic trends from YusKar Empire advisors in Kigali.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news, topics, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            <button
              onClick={() => setSelectedDeptId('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedDeptId === 'ALL' ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Topics
            </button>
            {departments.slice(0, 5).map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedDeptId === dept.id ? 'bg-amber-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const dept = departments.find(d => d.id === post.departmentId);
            return (
              <article
                key={post.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
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

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>{dept?.name || 'YusKar Empire'}</span>
                    </div>

                    <h2 
                      onClick={() => navigate(`/posts/${post.slug}`)}
                      className="font-heading font-bold text-lg text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                      {post.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/posts/${post.slug}`)}
                      className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Read Full Story <ArrowRight className="w-3 h-3" />
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
                      title="Share / Repost"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Repost</span>
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
};
