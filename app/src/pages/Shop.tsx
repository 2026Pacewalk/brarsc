import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid, List, ChevronLeft, ChevronRight, Search,
  SlidersHorizontal, X, Star, Package, Tag, Award, Sparkles
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import { products, categories } from '@/data/products';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹50', min: 0, max: 50 },
  { label: '₹50 - ₹100', min: 50, max: 100 },
  { label: '₹100 - ₹300', min: 100, max: 300 },
  { label: 'Over ₹300', min: 300, max: Infinity },
];

const ratingFilters = [
  { label: '4 Stars & Up', min: 4 },
  { label: '3 Stars & Up', min: 3 },
  { label: '2 Stars & Up', min: 2 },
  { label: '1 Star & Up', min: 1 },
];

const stats = [
  { icon: Package, label: 'Products', value: products.length },
  { icon: Tag, label: 'Categories', value: categories.length },
  { icon: Award, label: 'Top Rated', value: '4.9+' },
  { icon: Sparkles, label: 'Handcrafted', value: '100%' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('cat') || '';

  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [activeCategory, setActiveCategory] = useState(categoryFilter || 'All Categories');

  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory && activeCategory !== 'All Categories') {
      result = result.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    const pr = priceRanges[priceRange];
    if (pr) {
      result = result.filter((p) => p.price >= pr.min && p.price <= pr.max);
    }

    const rf = ratingFilters[ratingFilter - 1];
    if (rf) {
      result = result.filter((p) => p.rating >= rf.min);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy, priceRange, ratingFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFiltersCount = (activeCategory !== 'All Categories' ? 1 : 0) + (priceRange > 0 ? 1 : 0) + (ratingFilter > 0 ? 1 : 0);

  const clearFilters = () => {
    setActiveCategory('All Categories');
    setPriceRange(0);
    setRatingFilter(0);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* Hero */}
      <PageHero
        title="Our Shop"
        subtitle="Explore our handcrafted science merchandise — from creative study materials to unique STEM-inspired gifts"
        backgroundImage="/images/hero-shop.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop' },
        ]}

      />

      {/* Stats Bar */}
      <section className="bg-white border-b border-[#E8E4E0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#FFF0E8] rounded-lg flex items-center justify-center shrink-0">
                  <stat.icon size={18} className="text-[#F26522]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1A1A2E] leading-tight">{stat.value}</div>
                  <div className="text-xs text-[#9A9AAA]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {/* Search info & Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 h-10 px-4 border border-[#E8E4E0] rounded-lg text-sm text-[#1A1A2E] hover:border-[#F26522] transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-[#F26522] text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 border border-[#E8E4E0] rounded-lg px-3 text-sm text-[#5A5A6E] outline-none focus:border-[#F26522] bg-white"
            >
              <option value="default">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="rating">Highest Rated</option>
            </select>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-[#F26522] hover:underline"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#9A9AAA] mr-2">
              {filteredProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <button
              onClick={() => setViewMode('grid')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#F26522] text-white' : 'border border-[#E8E4E0] text-[#5A5A6E] hover:border-[#F26522]'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#F26522] text-white' : 'border border-[#E8E4E0] text-[#5A5A6E] hover:border-[#F26522]'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`shrink-0 transition-all duration-300 ease-out overflow-hidden lg:w-[260px] lg:opacity-100 lg:overflow-visible ${
              sidebarOpen ? 'w-[260px] opacity-100' : 'w-0 opacity-0 lg:w-[260px] lg:opacity-100'
            }`}
          >
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50 sticky top-[160px] space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-sm text-[#1A1A2E] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat
                          ? 'bg-[#FFF0E8] text-[#F26522] font-medium'
                          : 'text-[#5A5A6E] hover:bg-[#FAFAFA]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-[#E8E4E0]">
                <h3 className="font-semibold text-sm text-[#1A1A2E] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Price Range
                </h3>
                <div className="space-y-1">
                  {priceRanges.map((pr, i) => (
                    <label key={pr.label} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === i}
                        onChange={() => { setPriceRange(i); setCurrentPage(1); }}
                        className="w-4 h-4 accent-[#F26522]"
                      />
                      <span className={`text-sm ${priceRange === i ? 'text-[#F26522] font-medium' : 'text-[#5A5A6E]'}`}>{pr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-[#E8E4E0]">
                <h3 className="font-semibold text-sm text-[#1A1A2E] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Rating
                </h3>
                <div className="space-y-1">
                  {ratingFilters.map((rf, i) => (
                    <label key={rf.label} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === i + 1}
                        onChange={() => { setRatingFilter(i + 1); setCurrentPage(1); }}
                        className="w-4 h-4 accent-[#F26522]"
                      />
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s >= rf.min ? 'text-[#FFB800] fill-[#FFB800]' : 'text-[#E8E4E0]'} />
                        ))}
                        <span className="text-xs text-[#9A9AAA] ml-1">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {paginatedProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-[#FFF0E8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-[#F26522]/30" />
                </div>
                <p className="text-[#5A5A6E] text-lg mb-2">No products found</p>
                <p className="text-sm text-[#9A9AAA] mb-4">Try adjusting your filters</p>
                <button onClick={clearFilters} className="text-[#F26522] font-medium hover:underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-[#E8E4E0] flex items-center justify-center text-[#5A5A6E] hover:border-[#F26522] hover:text-[#F26522] disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-[#F26522] text-white'
                        : 'border border-[#E8E4E0] text-[#5A5A6E] hover:border-[#F26522] hover:text-[#F26522]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-[#E8E4E0] flex items-center justify-center text-[#5A5A6E] hover:border-[#F26522] hover:text-[#F26522] disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
