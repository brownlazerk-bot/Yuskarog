import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  User as UserIcon, 
  Share2, 
  Building2, 
  Tag, 
  Bookmark,
  CheckCircle2
} from 'lucide-react';

interface PostDetailPageProps {
  slug: string;
}

export const PostDetailPage: React.FC<PostDetailPageProps> = ({ slug }) => {
  const { posts, departments, openShareModal, toggleSaveItem, isItemSaved, navigate } = useApp();

  const post = posts.find(p => p.slug.toLowerCase() === slug.toLowerCase());

  if (!post) {
    return (
      <div className="bg-[#070B14] min-h-screen text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4 bg-[#0B1220] p-8 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white">Article Not Found</h2>
          <p className="text-xs text-slate-400">The requested article could not be located in our publication index.</p>
          <button
            onClick={() => navigate('/posts')}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const dept = departments.find(d => d.id === post.departmentId);
  const isSaved = isItemSaved('post', post.id);

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/posts')}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        {/* Header Title & Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              {post.category}
            </span>
            {dept && (
              <span className="text-xs text-slate-400 font-medium">
                • A publication of <strong className="text-white">{dept.name}</strong>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{post.publishDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveItem('post', post.id)}
                className={`p-2 rounded-lg border transition-colors ${
                  isSaved 
                    ? 'bg-amber-500 text-black border-amber-400' 
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Bookmark article"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={() => openShareModal({
                  type: 'post',
                  id: post.slug,
                  title: post.title,
                  excerpt: post.shortDescription,
                  image: post.coverImage
                })}
                className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/10"
              >
                <Share2 className="w-4 h-4" />
                <span>Share / Repost</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-slate-800 shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed border-l-2 border-amber-400 pl-4 italic">
            {post.shortDescription}
          </p>

          <div className="space-y-4 text-slate-300 whitespace-pre-line leading-relaxed">
            {post.fullContent}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Repost Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-base text-white">
              Found this insight valuable?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Repost this article directly with your custom comments on WhatsApp, X, or LinkedIn.
            </p>
          </div>
          <button
            onClick={() => openShareModal({
              type: 'post',
              id: post.slug,
              title: post.title,
              excerpt: post.shortDescription,
              image: post.coverImage
            })}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
          >
            <Share2 className="w-4 h-4" />
            <span>Repost Article</span>
          </button>
        </div>

      </div>
    </div>
  );
};
