import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  Send, 
  Share2, 
  Download, 
  ExternalLink,
  Sparkles,
  Repeat
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { shareModal, closeShareModal, recordSocialShare, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [customComment, setCustomComment] = useState('');

  if (!shareModal.isOpen || !shareModal.item) return null;

  const { item } = shareModal;
  const currentUrl = window.location.href.split('#')[0] + '#' + (item.url || (item.type === 'post' ? `/posts/${item.id}` : `/products?id=${item.id}`));
  
  const defaultCaption = `Check out "${item.title}" from YusKar Empire Ltd (Kigali, Rwanda): ${item.excerpt || ''} \n\n#YusKarEmpire #Rwanda #Kigali #AfricaInnovates`;
  const finalShareText = customComment 
    ? `${customComment}\n\n${defaultCaption}\n${currentUrl}`
    : `${defaultCaption}\n${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    recordSocialShare({
      platform: 'copied_link',
      contentType: item.type,
      contentId: item.id,
      contentTitle: item.title,
      captionUsed: finalShareText
    });
    showToast('Direct link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePlatformShare = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'telegram' | 'linkedin' | 'email') => {
    recordSocialShare({
      platform,
      contentType: item.type,
      contentId: item.id,
      contentTitle: item.title,
      captionUsed: finalShareText
    });

    let targetUrl = '';
    const encodedText = encodeURIComponent(finalShareText);
    const encodedUrl = encodeURIComponent(currentUrl);

    switch (platform) {
      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
      case 'twitter':
        targetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodedUrl}&hashtags=YusKarEmpire,Rwanda,Kigali`;
        break;
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'telegram':
        targetUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'linkedin':
        targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        targetUrl = `mailto:?subject=${encodeURIComponent(item.title)}&body=${encodedText}`;
        break;
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
    showToast(`Shared via ${platform.toUpperCase()}`, 'success');
    closeShareModal();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: customComment ? `${customComment} - ${item.title}` : item.title,
          url: currentUrl,
        });
        recordSocialShare({
          platform: 'native',
          contentType: item.type,
          contentId: item.id,
          contentTitle: item.title,
          captionUsed: finalShareText
        });
        showToast('Shared successfully!', 'success');
        closeShareModal();
      } catch (e) {
        // cancelled by user
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div 
        className="w-full max-w-lg bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#070B14]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Share & Repost YusKar Content
              </h3>
              <p className="text-[11px] text-slate-400">
                Share this {item.type} directly to your networks
              </p>
            </div>
          </div>
          <button
            onClick={closeShareModal}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Card Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700"
              />
            )}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                YusKar Empire • {item.type}
              </span>
              <h4 className="font-semibold text-sm text-slate-100 truncate">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {item.excerpt || 'Official verified listing from YusKar Empire Ltd, Kigali, Rwanda'}
              </p>
            </div>
          </div>

          {/* Add custom commentary / caption */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Add Your Personal Caption (Optional):</span>
              <span className="text-[10px] text-slate-500 font-normal">Included before official quote</span>
            </label>
            <textarea
              rows={2}
              value={customComment}
              onChange={(e) => setCustomComment(e.target.value)}
              placeholder="e.g. Highly recommend this vehicle from YusKar Motors! Inspected in Kigali."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-400 outline-none transition-colors"
            />
          </div>

          {/* Platform Buttons */}
          <div>
            <div className="text-xs font-semibold text-slate-300 mb-2">
              Select Sharing Destination:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {/* WhatsApp */}
              <button
                onClick={() => handlePlatformShare('whatsapp')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp</span>
              </button>

              {/* X / Twitter */}
              <button
                onClick={() => handlePlatformShare('twitter')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-semibold transition-all group"
              >
                <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>X / Twitter</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handlePlatformShare('telegram')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold transition-all group"
              >
                <Share2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Telegram</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handlePlatformShare('facebook')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handlePlatformShare('linkedin')}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-300 text-xs font-semibold transition-all group"
              >
                <Share2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </button>

              {/* Native / Mobile */}
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-all group"
              >
                <Share2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Device Share</span>
              </button>
            </div>
          </div>

          {/* Copy Direct Link */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-400 mb-1.5">
              Direct Web Link:
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 pl-3">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-transparent text-xs text-slate-300 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#070B14] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Social Reposts Help Promote Rwandan Innovation
          </span>
          <button
            onClick={closeShareModal}
            className="text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
