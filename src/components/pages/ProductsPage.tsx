import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Car, 
  Bookmark, 
  Share2, 
  Calendar, 
  Gauge, 
  Fuel, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Product } from '../../types';

export const ProductsPage: React.FC = () => {
  const { 
    products, 
    departments, 
    openInquiryModal, 
    openShareModal, 
    toggleSaveItem, 
    isItemSaved,
    navigate 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStock, setSelectedStock] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC'>('NEWEST');
  
  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesDept = selectedDeptId === 'ALL' || p.departmentId === selectedDeptId;
      const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchesStock = selectedStock === 'ALL' || p.stockStatus === selectedStock;
      const matchesSearch = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesCat && matchesStock && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.price - b.price;
      if (sortBy === 'PRICE_DESC') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, selectedDeptId, selectedCategory, selectedStock, searchQuery, sortBy]);

  return (
    <div className="bg-[#070B14] text-slate-100 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
            <Package className="w-4 h-4" />
            Verified Catalog & Showroom Stock
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Products & Showroom Inventory
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Browse verified luxury vehicles, sports motorcycles, bespoke boutique collections, and enterprise equipment with physical inspection available in Kigali.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0B1220] border border-slate-800 rounded-2xl p-5 mb-10 space-y-4">
          
          {/* Top row: Search and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by model, brand, spec, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="NEWEST">Sort: Newest First</option>
                <option value="PRICE_ASC">Sort: Price (Low to High)</option>
                <option value="PRICE_DESC">Sort: Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Filter dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Division / Department
              </label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="ALL">All Divisions</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="ALL">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                Stock Status
              </label>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-400"
              >
                <option value="ALL">All Availability</option>
                <option value="IN_STOCK">In Stock (Kigali)</option>
                <option value="AVAILABLE_FOR_IMPORT">Available For Import</option>
                <option value="PRE_ORDER">Pre-Order</option>
                <option value="SOLD">Sold Archive</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>Showing {filteredProducts.length} verified listings</span>
          {(selectedDeptId !== 'ALL' || selectedCategory !== 'ALL' || selectedStock !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDeptId('ALL');
                setSelectedCategory('ALL');
                setSelectedStock('ALL');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const dept = departments.find(d => d.id === prod.departmentId);
            const isSaved = isItemSaved('product', prod.id);

            return (
              <div
                key={prod.id}
                className="bg-[#0B1220] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={prod.mainImage}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-bold text-[10px] tracking-wide flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                      {prod.stockStatus.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSaveItem('product', prod.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-amber-500 text-black' : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                      title={isSaved ? 'Saved' : 'Save'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openShareModal({
                        type: 'product',
                        id: prod.id,
                        title: prod.name,
                        excerpt: `${prod.price.toLocaleString()} ${prod.currency}`,
                        image: prod.mainImage
                      })}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
                      title="Share / Repost"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-300 font-medium flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{prod.location || 'Kigali Showroom'}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{dept?.name || 'YusKar Empire'}</span>
                      <span className="text-amber-400">{prod.category}</span>
                    </div>

                    <h3 
                      onClick={() => setSelectedProduct(prod)}
                      className="font-heading font-bold text-lg text-white mt-1 group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {prod.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Specs if vehicle or bike */}
                    {prod.specifications && Object.keys(prod.specifications).length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                        {Object.entries(prod.specifications).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="truncate">
                            <span className="text-slate-500">{k}:</span> <span className="font-semibold text-slate-200">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        PRICE (RWANDA)
                      </div>
                      <div className="text-lg font-heading font-extrabold text-amber-400">
                        {prod.price.toLocaleString()} {prod.currency}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
                    >
                      <span>VIEW DETAILS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in-50 duration-150">
            <div 
              className="w-full max-w-2xl bg-[#0B1220] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#070B14]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    YusKar Verified Listing
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="aspect-[16/10] rounded-xl overflow-hidden relative border border-slate-700">
                  <img
                    src={selectedProduct.mainImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold">
                      {selectedProduct.stockStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {selectedProduct.category}
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-white mt-1">
                    {selectedProduct.name}
                  </h2>
                  <div className="text-xl font-heading font-extrabold text-amber-400 mt-2">
                    {selectedProduct.price.toLocaleString()} {selectedProduct.currency}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Specifications List */}
                {selectedProduct.specifications && (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                      Verified Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">{key}</span>
                          <span className="text-slate-100 font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t border-slate-800 bg-[#070B14] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Available at: {selectedProduct.location || 'Kigali Showroom'}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      openInquiryModal({
                        departmentId: prod.departmentId,
                        type: 'PRODUCT_ORDER',
                        itemTitle: prod.name,
                        relatedItemId: prod.id
                      });
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Inquire / Order Now
                  </button>

                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      openShareModal({
                        type: 'product',
                        id: prod.id,
                        title: prod.name,
                        excerpt: `${prod.price.toLocaleString()} ${prod.currency}`,
                        image: prod.mainImage
                      });
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                    title="Share / Repost"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
