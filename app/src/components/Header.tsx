import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight,
  Phone, Mail, MapPin, Package, Heart, LogOut, LayoutDashboard,
  FlaskConical, BookOpen, Coffee, Shirt, Gift, Sticker, KeyRound,
  Baby, Image, Box, ArrowRight, TrendingDown, Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

/* ─── Shop Mega Menu Data ─── */
const shopCategories = [
  { name: 'Physics Study Material', path: '/shop?cat=physics', icon: BookOpen, image: '/images/cat-physics-exact.jpg', desc: 'Formulae sheets & notes', color: '#3B82F6' },
  { name: 'Chemistry Study Material', path: '/shop?cat=chemistry', icon: FlaskConical, image: '/images/cat-chemistry-exact.jpg', desc: 'Reaction charts & tables', color: '#22C55E' },
  { name: 'Science Inspired Mugs', path: '/shop?cat=mugs', icon: Coffee, image: '/images/cat-science-mugs-exact.jpg', desc: 'Cool science-themed mugs', color: '#F26522' },
  { name: 'Inspirational Coffee Mugs', path: '/shop?cat=coffee-mugs', icon: Coffee, image: '/images/cat-coffee-mugs-exact.jpg', desc: 'Motivational quote mugs', color: '#EC4899' },
  { name: 'Science Toys & Kits', path: '/shop?cat=toys', icon: Gift, image: '/images/cat-toys-exact.jpg', desc: 'STEM activity kits', color: '#8B5CF6' },
  { name: 'Stickers | Magnets | Pins', path: '/shop?cat=stickers', icon: Sticker, image: '/images/cat-stickers-exact.jpg', desc: 'Science accessories', color: '#06B6D4' },
  { name: 'Keychains | Car Hangings', path: '/shop?cat=keychains', icon: KeyRound, image: '/images/cat-keychains-exact.jpg', desc: 'Custom keychains', color: '#F59E0B' },
  { name: 'Plushies | Pillow Covers', path: '/shop?cat=plushies', icon: Baby, image: '/images/cat-plushies-exact.jpg', desc: 'Soft science toys', color: '#EF4444' },
  { name: 'Apparel', path: '/shop?cat=apparel', icon: Shirt, image: '/images/cat-apparel-exact.jpg', desc: 'Science t-shirts', color: '#14B8A6' },
  { name: 'Posters | Prints', path: '/shop?cat=posters', icon: Image, image: '/images/cat-posters-exact.jpg', desc: 'Educational posters', color: '#6366F1' },
  { name: 'Acrylic Blocks', path: '/shop?cat=acrylic', icon: Box, image: '/images/cat-acrylic-exact.jpg', desc: 'Decorative blocks', color: '#84CC16' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop', mega: true },
  { name: 'Sale', path: '/shop?cat=sale', badge: 'HOT' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

/* ─── Main Header Component ─── */
export default function Header() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  /* Scroll handler — uses ref, NO state updates on scroll (prevents re-render/shaking) */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setShowTopBar(currentY < lastScrollY.current || currentY < 50);
          setHeaderShadow(currentY > 10);
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Click outside handlers */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/shop') return location.pathname === '/shop' || location.pathname === '/shop/';
    return location.pathname === path;
  };

  return (
    <>
      {/* ═══════ Row 1: Top Bar ═══════
          Uses CSS transform instead of height animation — NO layout shift */}
      <div
        className={`bg-[#1A1A2E] text-white overflow-hidden relative z-[60] transition-transform duration-300 ease-out will-change-transform ${
          showTopBar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-4">
            <a href="tel:+918427976607" className="flex items-center gap-1.5 hover:text-[#F26522] transition-colors duration-200">
              <Phone size={11} />
              <span className="hidden sm:inline font-medium">+91-84279-76607</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a href="mailto:brarscribbles@gmail.com" className="flex items-center gap-1.5 hover:text-[#F26522] transition-colors duration-200">
              <Mail size={11} />
              <span className="hidden md:inline">brarscribbles@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden md:flex items-center gap-1 hover:text-[#F26522] transition-colors duration-200">
              <MapPin size={11} />
              <span>Store Location</span>
            </Link>
            <Link to="/contact" className="hidden md:flex items-center gap-1 hover:text-[#F26522] transition-colors duration-200">
              <Package size={11} />
              <span>Track Your Order</span>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-[#F26522] font-medium">{user?.name}</span>
                <button onClick={logout} className="flex items-center gap-1 hover:text-red-400 transition-colors">
                  <LogOut size={11} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 hover:text-[#F26522] transition-colors duration-200">
                <User size={11} />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ═══════ Row 2: Main Header ═══════ */}
      <header className={`bg-white/95 backdrop-blur-md sticky top-0 z-[50] transition-shadow duration-300 ${headerShadow ? 'shadow-[0_4px_20px_rgba(26,26,46,0.1)]' : ''}`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <img src="/images/logo.png" alt="Brar Scribbles" className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F26522]/20 group-hover:ring-[#F26522]/50 transition-all duration-300" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22C55E] rounded-full border-2 border-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-[#F26522] font-bold text-[19px] leading-tight tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Brar Scribbles
              </span>
              <p className="text-[10px] text-[#9A9AAA] tracking-wide uppercase font-medium">Teacher & Artist</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-[520px] relative">
            <div className="flex w-full h-[44px] border border-[#E8E4E0] rounded-xl overflow-hidden bg-[#FAFAFA] hover:border-[#F26522]/40 focus-within:border-[#F26522] focus-within:ring-2 focus-within:ring-[#F26522]/10 transition-all duration-200">
              <select className="bg-transparent border-r border-[#E8E4E0] px-3 text-[13px] text-[#5A5A6E] outline-none cursor-pointer hover:text-[#1A1A2E]">
                <option>All</option>
                <option>Chemistry</option>
                <option>Physics</option>
                <option>Mugs</option>
                <option>Sale</option>
              </select>
              <input
                type="text"
                placeholder="Search for science notes, mugs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 text-[13px] outline-none bg-transparent placeholder:text-[#9A9AAA]"
              />
              <button type="submit" className="bg-[#F26522] hover:bg-[#E55512] text-white px-4 flex items-center gap-1.5 transition-colors duration-200">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#FFF0E8] text-[#1A1A2E] transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link to="/shop" className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-[#FFF0E8] text-[#1A1A2E] hover:text-[#F26522] transition-all duration-200 relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E63946] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 relative ${accountOpen ? 'bg-[#FFF0E8] text-[#F26522]' : 'hover:bg-[#FFF0E8] text-[#1A1A2E]'}`}
              >
                <User size={20} />
                {isAuthenticated && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#22C55E] rounded-full" />}
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(26,26,46,0.18)] border border-[#E8E4E0]/60 p-4 z-[60]"
                  >
                    {isAuthenticated ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 pb-3 mb-2 border-b border-[#E8E4E0]">
                          <div className="w-10 h-10 bg-[#F26522]/10 rounded-full flex items-center justify-center text-[#F26522] font-bold">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#1A1A2E]">{user?.name}</p>
                            <p className="text-xs text-[#9A9AAA]">{user?.email}</p>
                          </div>
                        </div>
                        {user?.role === 'superadmin' && (
                          <Link to="/admin" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFF0E8] text-[#1A1A2E] transition-colors">
                            <LayoutDashboard size={16} className="text-[#F26522]" />
                            <span className="text-sm font-medium">Admin Dashboard</span>
                          </Link>
                        )}
                        <button onClick={() => { logout(); setAccountOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                          <LogOut size={16} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-[#9A9AAA] px-1 mb-1">Welcome! Sign in to access your account.</p>
                        <Link to="/login" onClick={() => setAccountOpen(false)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F26522] hover:bg-[#E55512] text-white rounded-xl text-sm font-semibold transition-colors">
                          <User size={15} />
                          Login / Register
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Dropdown */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 relative ${cartOpen ? 'bg-[#FFF0E8] text-[#F26522]' : 'hover:bg-[#FFF0E8] text-[#1A1A2E]'}`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#F26522] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-[0_20px_60px_rgba(26,26,46,0.18)] border border-[#E8E4E0]/60 z-[60] overflow-hidden"
                  >
                    <div className="p-4 border-b border-[#E8E4E0] flex items-center justify-between">
                      <h3 className="font-semibold text-[#1A1A2E] text-sm">Shopping Cart ({totalItems})</h3>
                      <button onClick={() => setCartOpen(false)} className="text-[#9A9AAA] hover:text-[#1A1A2E] transition-colors">
                        <X size={16} />
                      </button>
                    </div>

                    {items.length > 0 ? (
                      <>
                        <div className="max-h-[320px] overflow-y-auto">
                          {items.map((item) => (
                            <div key={item.product.id} className="flex gap-3 p-4 border-b border-[#E8E4E0]/60 hover:bg-[#FAFAFA] transition-colors">
                              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover border border-[#E8E4E0]" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1A1A2E] truncate">{item.product.name}</p>
                                <p className="text-[#F26522] font-bold text-sm mt-0.5">&#8377;{item.product.price}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-md bg-[#F5F5F5] hover:bg-[#E8E4E0] flex items-center justify-center text-xs transition-colors">-</button>
                                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-[F5F5F5] hover:bg-[#E8E4E0] flex items-center justify-center text-xs transition-colors">+</button>
                                  <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-[#9A9AAA] hover:text-red-500 transition-colors">
                                    <X size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-[#FAFAFA]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-[#5A5A6E]">Total</span>
                            <span className="text-lg font-bold text-[#F26522]">&#8377;{totalPrice}</span>
                          </div>
                          <Link
                            to="/checkout"
                            onClick={() => setCartOpen(false)}
                            className="flex items-center justify-center w-full py-3 bg-[#F26522] hover:bg-[#E55512] text-white rounded-xl font-semibold text-sm transition-colors"
                          >
                            Checkout
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-[#FFF0E8] rounded-full flex items-center justify-center mx-auto mb-3">
                          <ShoppingCart size={24} className="text-[#F26522]/50" />
                        </div>
                        <p className="text-[#5A5A6E] text-sm">Your cart is empty</p>
                        <Link to="/shop" onClick={() => setCartOpen(false)} className="inline-block mt-3 text-[#F26522] text-sm font-medium hover:underline">
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#FFF0E8] text-[#F26522] transition-colors ml-1"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expand — CSS-only, no layout animation */}
        <div
          className={`md:hidden overflow-hidden border-t border-[#E8E4E0] bg-white transition-all duration-300 ease-out ${
            searchOpen ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <form onSubmit={handleSearch} className="p-3">
            <div className="flex h-11 border border-[#E8E4E0] rounded-xl overflow-hidden bg-[#FAFAFA]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={searchOpen}
                className="flex-1 px-4 text-sm outline-none bg-transparent"
              />
              <button type="submit" className="bg-[#F26522] text-white px-4">
                <Search size={16} />
              </button>
            </div>
          </form>
        </div>

        {/* ═══════ Row 3: Navigation Bar ═══════ */}
        <nav className="hidden lg:block bg-[#F26522] relative">
          <div className="max-w-[1280px] mx-auto px-6">
            <ul className="flex items-center justify-center">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <Link
                    to={link.path}
                    onMouseEnter={() => link.mega && setMegaMenuOpen(true)}
                    className={`relative flex items-center gap-1.5 px-5 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-white/10 ${
                      isActive(link.path) ? 'bg-white/15 font-semibold' : ''
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="bg-white text-[#F26522] text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {link.mega && <ChevronDown size={13} className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />}
                    {isActive(link.path) && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {link.mega && megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(26,26,46,0.2)] border border-[#E8E4E0]/50 overflow-hidden z-[55]"
                      >
                        {/* Featured Banner */}
                        <div className="bg-gradient-to-r from-[#F26522] to-[#FF8A50] px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Explore Collection</p>
                            <p className="text-white font-bold text-lg">Shop by Category</p>
                          </div>
                          <Link to="/shop" onClick={() => setMegaMenuOpen(false)} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors backdrop-blur-sm">
                            View All <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Categories Grid */}
                        <div className="p-5 grid grid-cols-3 gap-2">
                          {shopCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              to={cat.path}
                              onClick={() => setMegaMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF0E8] transition-all duration-200 group"
                            >
                              <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#E8E4E0] group-hover:border-[#F26522]/30 transition-colors">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-[#1A1A2E] group-hover:text-[#F26522] transition-colors truncate leading-tight">{cat.name}</p>
                                <p className="text-[11px] text-[#9A9AAA] truncate">{cat.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Bottom Promo */}
                        <div className="px-5 pb-4">
                          <Link to="/shop?cat=sale" onClick={() => setMegaMenuOpen(false)} className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-3 hover:from-red-100 hover:to-orange-100 transition-all">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                              <TrendingDown size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-red-600">Sale Items</p>
                              <p className="text-xs text-red-400">Up to 50% off on selected items</p>
                            </div>
                            <Zap size={16} className="text-red-400 ml-auto" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* ═══════ Mobile Menu Overlay ═══════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-[46] lg:hidden overflow-y-auto shadow-[-20px_0_60px_rgba(0,0,0,0.2)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#E8E4E0]">
                <div className="flex items-center gap-2.5">
                  <img src="/images/logo.png" alt="" className="w-9 h-9 rounded-full" />
                  <span className="font-bold text-[#F26522]" style={{ fontFamily: 'Poppins, sans-serif' }}>Menu</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FFF0E8] text-[#1A1A2E] transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && (
                <div className="p-5 bg-gradient-to-r from-[#FFF0E8] to-white border-b border-[#E8E4E0]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F26522] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A2E]">{user?.name}</p>
                      <p className="text-xs text-[#9A9AAA]">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="p-4">
                <p className="text-[10px] text-[#9A9AAA] uppercase tracking-wider font-semibold px-3 mb-2">Navigation</p>
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-[#FFF0E8] text-[#F26522]'
                            : 'text-[#1A1A2E] hover:bg-[#FAFAFA]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {link.name}
                          {link.badge && (
                            <span className="bg-[#F26522] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{link.badge}</span>
                          )}
                        </span>
                        <ChevronRight size={16} className="text-[#9A9AAA]" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Shop Subcategories */}
                <div className="mt-6">
                  <p className="text-[10px] text-[#9A9AAA] uppercase tracking-wider font-semibold px-3 mb-2">Shop Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {shopCategories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[#E8E4E0] hover:border-[#F26522]/30 hover:bg-[#FFF0E8] transition-all text-center"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-medium text-[#1A1A2E] leading-tight">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Auth Actions */}
                <div className="mt-6 pt-4 border-t border-[#E8E4E0]">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      {user?.role === 'superadmin' && (
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#FFF0E8] text-[#1A1A2E] transition-colors">
                          <LayoutDashboard size={18} className="text-[#F26522]" />
                          <span className="text-sm font-medium">Admin Dashboard</span>
                        </Link>
                      )}
                      <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#F26522] hover:bg-[#E55512] text-white rounded-xl font-semibold text-sm transition-colors">
                      <User size={16} />
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
