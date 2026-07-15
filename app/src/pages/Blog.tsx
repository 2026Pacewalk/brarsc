import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Search, BookOpen, Mail } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/data/products';

const categories = ['All', 'Education', 'Science', 'Art', 'Teaching', 'Study Tips'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* Hero */}
      <PageHero
        title="Our Blog"
        subtitle="Discover insights on science education, creative teaching methods, study tips, and the latest from Brar Scribbles"
        backgroundImage="/images/hero-blog.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}

      />

      {/* Search & Filter Bar */}
      <section className="bg-white border-b border-[#E8E4E0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9AAA]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 border border-[#E8E4E0] rounded-lg text-sm text-[#1A1A2E] placeholder-[#9A9AAA] outline-none focus:border-[#F26522] transition-colors"
              />
            </div>
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#F26522] text-white'
                      : 'bg-[#FFFBF7] text-[#5A5A6E] hover:bg-[#FFF0E8] hover:text-[#F26522]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-[#E8E4E0] mx-auto mb-4" />
            <p className="text-[#5A5A6E] text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-[#F26522] font-medium mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(26,26,46,0.08)] hover:shadow-[0_8px_32px_rgba(26,26,46,0.14)] transition-shadow mb-10 group"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 h-[250px] lg:h-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-[#9A9AAA]">
                      <span className="bg-[#FFF0E8] text-[#F26522] px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {featuredPost.readTime ?? '5 min read'}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A2E] mt-4 group-hover:text-[#F26522] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {featuredPost.title}
                    </h2>
                    <p className="text-[#5A5A6E] mt-3 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-6">
                      <span className="flex items-center gap-2 text-sm text-[#5A5A6E]">
                        <User size={14} />
                        {featuredPost.author}
                      </span>
                      <button className="inline-flex items-center gap-2 text-[#F26522] font-medium text-sm group/btn">
                        Read Article
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Remaining Posts Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(26,26,46,0.06)] hover:shadow-[0_8px_24px_rgba(26,26,46,0.12)] transition-all group cursor-pointer flex flex-col"
                  >
                    <div className="h-[180px] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-[#9A9AAA] mb-2">
                        <span className="bg-[#FFF0E8] text-[#F26522] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1A2E] group-hover:text-[#F26522] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#5A5A6E] mt-2 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F5F2EE]">
                        <span className="flex items-center gap-1.5 text-xs text-[#9A9AAA]">
                          <User size={12} />
                          {post.author}
                        </span>
                        <span className="text-[#F26522] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="py-14 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F26522]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#F26522]/5 rounded-full blur-3xl" />
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-[#F26522]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-[#F26522]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Stay in the Loop
            </h2>
            <p className="text-white/60 mt-2 text-sm max-w-md mx-auto">
              Get the latest science tips, new product announcements, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[#F26522] transition-colors w-full"
              />
              <button className="h-11 px-6 bg-[#F26522] hover:bg-[#E55512] text-white rounded-lg font-medium text-sm transition-colors w-full sm:w-auto shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-white/30 text-xs mt-3">No spam, unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
