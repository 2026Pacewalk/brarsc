import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck,
  ShieldCheck,
  Lock,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Youtube,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, topCategories, productCategories } from '@/data/products';
import SEO from '@/components/SEO';

/* ───────── Hero ───────── */
function HeroSection() {
  return (
    <section className="relative w-full bg-[#ffeef5] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/hero-banner-exact.jpg"
          alt="Brar Scribbles - Creative Study Notes, Books, Prints, Science Mugs, Apparel, Art, Science Toys & Activity Kits"
          className="w-full h-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] object-cover object-center"
        />
      </motion.div>
    </section>
  );
}

/* ───────── Features Bar ───────── */
const features = [
  { icon: Truck, title: 'Fastest Delivery', desc: 'Fastest & safest delivery' },
  { icon: ShieldCheck, title: 'Quality Product', desc: 'Assured quality of products' },
  { icon: Lock, title: 'Secure Payment', desc: '100% secure payment' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support' },
];

function FeaturesBar() {
  return (
    <section className="bg-white border-b border-[#E8E4E0]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`flex items-center gap-3 ${i < features.length - 1 ? 'md:border-r md:border-[#E8E4E0] md:pr-6' : ''} ${i > 0 ? 'md:pl-6' : ''}`}
            >
              <f.icon size={28} className="text-[#F26522] shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>{f.title}</h3>
                <p className="text-[13px] text-[#5A5A6E]">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── About Author ───────── */
function AboutAuthor() {
  return (
    <section className="py-16 md:py-20 bg-[#FFFBF7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-[45%]"
          >
            <img
              src="/images/author-exact.jpg"
              alt="JP Brar - Teacher by Profession & Artist by Passion"
              className="w-full max-w-[400px] mx-auto rounded-xl shadow-[0_2px_8px_rgba(26,26,46,0.06)] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-[55%] text-center md:text-left"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About the Author
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Hi, I'm JP Brar!
            </h2>
            <p className="text-lg text-[#5A5A6E] mt-2 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Teacher by Profession &amp; Artist by Passion
            </p>
            <p className="mt-4 text-[#5A5A6E] leading-relaxed">
              I'm the author and illustrator of Brar Scribbles. I love communicating science and always try to bring new, creative, engaging, fun, and interactive tools to help students for better subject understanding. Our aim is to demystify Science by creating easy, interactive and enjoyable Learning Resources, cool science stuff, Educational YouTube Videos, Science Inspired Mugs/Apparel/Gifts/Art, Sharing Ideas &amp; more !! BRAR SCRIBBLES is an online store that celebrates science &amp; helps to promote diversity in science, technology, engineering &amp; math (STEM). Our colourful science notes, gifts and accessories are perfect way to showcase how awesome science is! It creates a unique way to communicate science and cultivate curiosity among the students for the better concept learning. Overall, we love helping students learn in a creative way!!
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1 mt-5 text-[#F26522] font-medium hover:underline transition-all"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Read My Full Story &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Countdown Timer ───────── */
function CountdownTimer() {
  const [time, setTime] = useState({ h: 3, m: 26, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#5A5A6E] hidden sm:inline">Ends In</span>
      <div className="flex gap-1">
        {['h', 'm', 's'].map((unit, i) => (
          <div key={unit} className="flex items-center gap-1">
            <span className="w-10 h-10 border border-[#E63946] rounded-md flex items-center justify-center font-bold text-[#E63946] text-lg font-mono">
              {pad(time[unit as 'h' | 'm' | 's'])}
            </span>
            {i < 2 && <span className="text-[#E63946] font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Latest Products ───────── */
function LatestProducts() {
  const latestProducts = products.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-[#FFFBF7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Latest Products
          </h2>
          <CountdownTimer />
          <Link to="/shop" className="text-[#F26522] font-medium text-sm hover:underline">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── YouTube & Amazon CTAs ───────── */
function PromoCards() {
  return (
    <section className="py-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* YouTube */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#E8E4E0] rounded-2xl p-8 md:p-10 flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm text-[#5A5A6E]">Subscribe to Our</p>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                YouTube Channel
              </h3>
              <a
                href="https://www.youtube.com/channel/UCP7baQZYF2uL-s5-c8arukQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[#FF0000] hover:bg-[#CC0000] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                <Youtube size={16} />
                Subscribe Now
              </a>
            </div>
            <div className="w-16 h-16 bg-[#FF0000]/10 rounded-full flex items-center justify-center shrink-0">
              <Youtube size={32} className="text-[#FF0000]" />
            </div>
          </motion.div>

          {/* Amazon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-[#E8E4E0] rounded-2xl p-8 md:p-10 flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm text-[#5A5A6E]">Visit Our</p>
              <h3 className="text-xl md:text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Amazon Store
              </h3>
              <a
                href="https://www.amazon.in/s?k=brar+scribbles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[#FF9900] hover:bg-[#E68A00] text-[#1A1A2E] px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                <ExternalLink size={16} />
                Brar Scribbles
              </a>
            </div>
            <div className="w-16 h-16 bg-[#FF9900]/10 rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag size={32} className="text-[#FF9900]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Top Categories ───────── */
function TopCategories() {
  return (
    <section className="py-16 md:py-20 bg-[#FFFBF7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-[28px] font-bold text-[#1A1A2E] text-center mb-8"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Top Categories
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <h3
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Product Categories Grid ───────── */
function ProductCategoriesGrid() {
  return (
    <section className="pb-16 md:pb-20 bg-[#FFFBF7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(26,26,46,0.06)] hover:shadow-[0_8px_24px_rgba(26,26,46,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 px-2 text-center">
                <h3 className="font-medium text-sm text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Best Sellers ───────── */
function BestSellers() {
  const [scrollRef, setScrollRef] = useState<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef) {
      const scrollAmount = 300;
      scrollRef.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#FFFBF7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Best Seller
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E8E4E0] flex items-center justify-center text-[#5A5A6E] hover:text-[#F26522] hover:border-[#F26522] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E8E4E0] flex items-center justify-center text-[#5A5A6E] hover:text-[#F26522] hover:border-[#F26522] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={setScrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-[260px] sm:w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Featured Products ───────── */
function FeaturedProducts() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-[28px] font-bold text-[#1A1A2E] mb-8"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={`featured-${product.id}`} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer Promo Bar ───────── */
function FooterPromo() {
  return (
    <section className="bg-[#F26522] py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-white font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Brar Scribbles
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://www.youtube.com/channel/UCP7baQZYF2uL-s5-c8arukQ"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-[#F26522] px-5 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Subscribe to Our YouTube Channel
          </a>
          <a
            href="https://www.amazon.in/s?k=brar+scribbles"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-[#F26522] px-5 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Visit Our Amazon Store
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Home Page ───────── */
export default function Home() {
  return (
    <main>
      <SEO
        title="Science Study Material & Formula Sheets"
        description="Colourful CBSE formula sheets, synopsis notes and science-inspired mugs by JP Brar. Physics, Chemistry and Biology study material from ₹30."
        keywords="science study material, cbse formula sheets, physics notes, chemistry notes, class 10 notes, class 12 notes, science mugs, jp brar"
        canonical="/"
      />
      <div>
        <HeroSection />
        <FeaturesBar />
        <AboutAuthor />
        <LatestProducts />
        <PromoCards />
        <TopCategories />
        <ProductCategoriesGrid />
        <BestSellers />
        <FeaturedProducts />
        <FooterPromo />
      </div>
    </main>
  );
}