import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Download, Heart, User, Settings,
  LogOut, Package, Star, Clock, ChevronRight, MapPin, Phone, Mail,
  GraduationCap, BookOpen, AlertCircle, Truck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

/* ─── Demo Data ─── */
const demoOrders = [
  { id: 'ORD-7832', product: 'Projectile Motion: Formulae Sheets', price: 50, status: 'Delivered', date: '2025-05-28', type: 'Digital', image: '/images/prod-1.jpg' },
  { id: 'ORD-7831', product: 'Modern Periodic Table Chart', price: 40, status: 'Shipped', date: '2025-05-25', type: 'Physical', image: '/images/prod-7.jpg' },
  { id: 'ORD-7790', product: 'Ionic Bonding Coffee Mug', price: 299, status: 'Delivered', date: '2025-05-20', type: 'Physical', image: '/images/prod-8.jpg' },
  { id: 'ORD-7756', product: 'Chemical Reactions Synopsis', price: 30, status: 'Delivered', date: '2025-05-15', type: 'Digital', image: '/images/prod-2.jpg' },
];

const demoDownloads = [
  { id: 1, name: 'Projectile Motion Formulae Sheets', file: 'projectile-motion-formulae.pdf', size: '2.4 MB', downloads: 3, max: 5, image: '/images/prod-1.jpg' },
  { id: 2, name: 'Chemical Reactions Synopsis', file: 'chemical-reactions-synopsis.pdf', size: '1.8 MB', downloads: 1, max: 5, image: '/images/prod-2.jpg' },
  { id: 3, name: 'Motion Formulae Sheet', file: 'motion-formulae.pdf', size: '3.1 MB', downloads: 2, max: 5, image: '/images/prod-3.jpg' },
];

const demoActivity = [
  { action: 'Downloaded', item: 'Projectile Motion Formulae', time: '2 hours ago' },
  { action: 'Purchased', item: 'Modern Periodic Table Chart', time: '3 days ago' },
  { action: 'Added to Wishlist', item: 'Physics Handbook', time: '5 days ago' },
  { action: 'Order Delivered', item: 'Ionic Bonding Mug', time: '1 week ago' },
];

type TabId = 'dashboard' | 'orders' | 'downloads' | 'wishlist' | 'profile';

const sidebarTabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'downloads', label: 'My Downloads', icon: Download },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
];

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
}

/* ════════════════════════════ */
export default function StudentDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('All');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'student') return null;

  const filteredOrders = orderFilter === 'All' ? demoOrders : demoOrders.filter(o => o.status === orderFilter);

  /* ─── DASHBOARD TAB ─── */
  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#F26522] to-[#FF8A50] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Welcome, {user?.name || 'Student'}!
              </h2>
              <p className="text-white/80 text-sm">Here's what's happening with your account.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/shop" className="bg-white text-[#F26522] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">
              Browse Products
            </Link>
            <button onClick={() => setActiveTab('orders')} className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
              View Orders
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: demoOrders.length, icon: Package, color: 'bg-blue-50 text-blue-600' },
          { label: 'Downloads', value: demoDownloads.length, icon: Download, color: 'bg-green-50 text-green-600' },
          { label: 'Wishlist', value: wishlistItems.length, icon: Heart, color: 'bg-pink-50 text-pink-500' },
          { label: 'Spent', value: '\u20b9419', icon: ShoppingBag, color: 'bg-[#FFF0E8] text-[#F26522]' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white rounded-xl p-5 border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]"
          >
            <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} />
            </div>
            <p className="text-xl font-bold text-[#1A1A2E]">{s.value}</p>
            <p className="text-xs text-[#9A9AAA]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]"
        >
          <div className="p-5 border-b border-[#E8E4E0] flex items-center justify-between">
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Orders</h3>
            <button onClick={() => setActiveTab('orders')} className="text-xs text-[#F26522] font-medium hover:underline flex items-center gap-0.5">
              View All <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-[#E8E4E0]/50">
            {demoOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-[#FFFBF7] transition-colors">
                <img src={order.image} alt={order.product} className="w-12 h-12 rounded-lg object-cover border border-[#E8E4E0]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{order.product}</p>
                  <p className="text-xs text-[#9A9AAA]">{order.id} &middot; {order.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[#F26522]">&#8377;{order.price}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]"
        >
          <div className="p-5 border-b border-[#E8E4E0]">
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Activity</h3>
          </div>
          <div className="p-4 space-y-4">
            {demoActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#FFF0E8] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={13} className="text-[#F26522]" />
                </div>
                <div>
                  <p className="text-sm text-[#1A1A2E]"><span className="font-medium">{a.action}</span> {a.item}</p>
                  <p className="text-xs text-[#9A9AAA]">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  /* ─── ORDERS TAB ─── */
  const OrdersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>My Orders</h2>
        <div className="flex items-center gap-2">
          {['All', 'Delivered', 'Shipped', 'Processing'].map((f) => (
            <button
              key={f}
              onClick={() => setOrderFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                orderFilter === f ? 'bg-[#F26522] text-white' : 'bg-[#F5F2EE] text-[#5A5A6E] hover:bg-[#E8E4E0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <img src={order.image} alt={order.product} className="w-16 h-16 rounded-xl object-cover border border-[#E8E4E0] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-[#1A1A2E]">{order.product}</p>
                    <p className="text-xs text-[#9A9AAA] mt-0.5">{order.id} &middot; {order.date}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-[#F5F2EE]">
                  <span className="text-sm"><span className="text-[#9A9AAA]">Price:</span> <span className="font-semibold text-[#F26522]">&#8377;{order.price}</span></span>
                  <span className="text-sm"><span className="text-[#9A9AAA]">Type:</span> <span className="font-medium text-[#1A1A2E]">{order.type}</span></span>
                  {order.status === 'Delivered' && order.type === 'Digital' && (
                    <button
                      onClick={() => setActiveTab('downloads')}
                      className="ml-auto text-xs bg-[#FFF0E8] text-[#F26522] px-3 py-1.5 rounded-lg font-medium hover:bg-[#F26522] hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Download size={12} /> Download
                    </button>
                  )}
                  {order.status === 'Shipped' && (
                    <span className="ml-auto text-xs text-blue-600 flex items-center gap-1">
                      <Truck size={12} /> In Transit
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E8E4E0]/50">
            <Package size={40} className="text-[#E8E4E0] mx-auto mb-3" />
            <p className="text-[#5A5A6E]">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── DOWNLOADS TAB ─── */
  const DownloadsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>My Downloads</h2>
      <div className="bg-[#FFF0E8]/40 border border-[#F26522]/10 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-[#F26522] shrink-0 mt-0.5" />
        <p className="text-sm text-[#5A5A6E]">You have <strong className="text-[#F26522]">5 downloads</strong> per product. Files expire 30 days after purchase.</p>
      </div>
      <div className="space-y-3">
        {demoDownloads.map((dl, i) => (
          <motion.div
            key={dl.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <img src={dl.image} alt={dl.name} className="w-16 h-16 rounded-xl object-cover border border-[#E8E4E0] shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-[#1A1A2E]">{dl.name}</p>
                <p className="text-xs text-[#9A9AAA]">{dl.file} &middot; {dl.size}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 h-2 bg-[#E8E4E0] rounded-full overflow-hidden max-w-[160px]">
                    <div
                      className="h-full bg-[#F26522] rounded-full transition-all"
                      style={{ width: `${(dl.downloads / dl.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#9A9AAA]">{dl.downloads}/{dl.max} downloads</span>
                  <button className="ml-auto bg-[#F26522] hover:bg-[#E55512] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  /* ─── WISHLIST TAB ─── */
  const WishlistTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#E8E4E0]/50">
          <Heart size={40} className="text-[#E8E4E0] mx-auto mb-3" />
          <p className="text-[#5A5A6E]">Your wishlist is empty</p>
          <Link to="/shop" className="inline-block mt-3 text-[#F26522] font-medium text-sm hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlistItems.map((product: typeof wishlistItems[0], i: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-4 flex gap-4"
            >
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover border border-[#E8E4E0]" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="text-sm font-medium text-[#1A1A2E] hover:text-[#F26522] transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="text-[#FFB800] fill-[#FFB800]" />
                  <span className="text-xs text-[#5A5A6E]">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-[#F26522]">&#8377;{product.price}</span>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  /* ─── PROFILE TAB ─── */
  const ProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>My Profile</h2>
      <div className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E8E4E0]">
          <div className="w-16 h-16 bg-[#F26522] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>{user?.name || 'Student'}</p>
            <p className="text-sm text-[#9A9AAA]">{user?.email || 'student@demo.com'}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-semibold uppercase tracking-wider">Student</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: user?.name || 'Demo Student', icon: User },
            { label: 'Email Address', value: user?.email || 'student@demo.com', icon: Mail },
            { label: 'Phone Number', value: '+91 98765 43210', icon: Phone },
            { label: 'Location', value: 'Patiala, Punjab', icon: MapPin },
            { label: 'Member Since', value: 'January 2024', icon: BookOpen },
            { label: 'Account Type', value: 'Student Account', icon: GraduationCap },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4 bg-[#FFFBF7] rounded-xl">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <item.icon size={16} className="text-[#F26522]" />
              </div>
              <div>
                <p className="text-xs text-[#9A9AAA]">{item.label}</p>
                <p className="text-sm font-medium text-[#1A1A2E]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabComponents: Record<TabId, React.ComponentType> = {
    dashboard: DashboardTab,
    orders: OrdersTab,
    downloads: DownloadsTab,
    wishlist: WishlistTab,
    profile: ProfileTab,
  };

  const ActiveComponent = tabComponents[activeTab];

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden sticky top-[72px] z-30 bg-white border-b border-[#E8E4E0]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-[#1A1A2E]"
        >
          <span className="flex items-center gap-2">
            <Settings size={16} />
            {sidebarTabs.find(t => t.id === activeTab)?.label}
          </span>
          <span className="text-[#F26522]">{sidebarOpen ? 'Close' : 'Menu'}</span>
        </button>
        {sidebarOpen && (
          <div className="border-t border-[#E8E4E0] p-2">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-[#FFF0E8] text-[#F26522]' : 'text-[#5A5A6E] hover:bg-[#FAFAFA]'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="sticky top-[160px] bg-white rounded-2xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-4">
              <p className="text-[10px] text-[#9A9AAA] uppercase tracking-wider font-semibold px-3 mb-3">Menu</p>
              <nav className="space-y-1">
                {sidebarTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'bg-[#FFF0E8] text-[#F26522]' : 'text-[#5A5A6E] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-[#E8E4E0]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
