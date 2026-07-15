import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Package, Users,
  LogOut, TrendingUp, TrendingDown, Search, Pencil,
  Eye, ChevronRight, Crown, BarChart3,
  DollarSign, CheckCircle2, Clock, Truck,
  ArrowUpDown, Ban, RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { products } from '@/data/products';

type AdminTab = 'dashboard' | 'orders' | 'products' | 'users' | 'analytics';

const sidebarTabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

/* ─── Demo Data ─── */
const demoOrders = [
  { id: '#ORD-7832', customer: 'Rahul Sharma', email: 'rahul@email.com', product: 'Projectile Motion Formulae', amount: 50, status: 'Delivered', date: '2025-05-28', type: 'Digital' },
  { id: '#ORD-7831', customer: 'Priya Patel', email: 'priya@email.com', product: 'Modern Periodic Table', amount: 40, status: 'Shipped', date: '2025-05-27', type: 'Physical' },
  { id: '#ORD-7830', customer: 'Amit Kumar', email: 'amit@email.com', product: 'Ionic Bonding Coffee Mug', amount: 299, status: 'Processing', date: '2025-05-27', type: 'Physical' },
  { id: '#ORD-7829', customer: 'Sneha Gupta', email: 'sneha@email.com', product: 'Chemical Reactions Synopsis', amount: 30, status: 'Delivered', date: '2025-05-26', type: 'Digital' },
  { id: '#ORD-7828', customer: 'Vikram Singh', email: 'vikram@email.com', product: 'Electric Charges & Fields', amount: 25, status: 'Pending', date: '2025-05-26', type: 'Digital' },
  { id: '#ORD-7827', customer: 'Neha Reddy', email: 'neha@email.com', product: 'Physics Handbook', amount: 199, status: 'Shipped', date: '2025-05-25', type: 'Physical' },
  { id: '#ORD-7826', customer: 'Arjun Mehta', email: 'arjun@email.com', product: 'Motion Formulae Sheet', amount: 20, status: 'Delivered', date: '2025-05-24', type: 'Digital' },
  { id: '#ORD-7825', customer: 'Divya Iyer', email: 'divya@email.com', product: 'Current Electricity Notes', amount: 15, status: 'Cancelled', date: '2025-05-23', type: 'Digital' },
];

const demoUsers = [
  { id: 'USR-001', name: 'Rahul Sharma', email: 'rahul@email.com', orders: 5, spent: 454, joined: '2025-01-15', status: 'Active' },
  { id: 'USR-002', name: 'Priya Patel', email: 'priya@email.com', orders: 3, spent: 389, joined: '2025-02-20', status: 'Active' },
  { id: 'USR-003', name: 'Amit Kumar', email: 'amit@email.com', orders: 8, spent: 1200, joined: '2024-11-10', status: 'Active' },
  { id: 'USR-004', name: 'Sneha Gupta', email: 'sneha@email.com', orders: 2, spent: 80, joined: '2025-03-05', status: 'Active' },
  { id: 'USR-005', name: 'Vikram Singh', email: 'vikram@email.com', orders: 1, spent: 25, joined: '2025-05-20', status: 'New' },
  { id: 'USR-006', name: 'Neha Reddy', email: 'neha@email.com', orders: 4, spent: 556, joined: '2024-12-01', status: 'Active' },
  { id: 'USR-007', name: 'Arjun Mehta', email: 'arjun@email.com', orders: 6, spent: 340, joined: '2025-01-28', status: 'Active' },
  { id: 'USR-008', name: 'Divya Iyer', email: 'divya@email.com', orders: 2, spent: 55, joined: '2025-04-15', status: 'Inactive' },
];

const monthlySales = [
  { month: 'Jan', sales: 8500 },
  { month: 'Feb', sales: 7200 },
  { month: 'Mar', sales: 9800 },
  { month: 'Apr', sales: 11200 },
  { month: 'May', sales: 15400 },
  { month: 'Jun', sales: 13200 },
];

const categoryBreakdown = [
  { name: 'Physics Notes', sales: 4200, color: 'bg-blue-500' },
  { name: 'Chemistry Notes', sales: 3100, color: 'bg-green-500' },
  { name: 'Mugs', sales: 8900, color: 'bg-[#F26522]' },
  { name: 'Apparel', sales: 5600, color: 'bg-purple-500' },
  { name: 'Posters', sales: 2400, color: 'bg-cyan-500' },
];

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-orange-100 text-orange-700',
    Cancelled: 'bg-red-100 text-red-700',
    Active: 'bg-green-100 text-green-700',
    New: 'bg-blue-100 text-blue-700',
    Inactive: 'bg-gray-100 text-gray-600',
  };
  return <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100'}`}>{status}</span>;
}

/* ════════════════════════════ */
export default function SuperAdmin() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Orders state */
  const [orderList, setOrderList] = useState(demoOrders);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSort, setOrderSort] = useState<'date' | 'amount'>('date');
  const [statusFilter, setStatusFilter] = useState('All');

  /* Users state */
  const [userSearch, setUserSearch] = useState('');

  /* Products state */
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: 0, oldPrice: 0, inStock: true });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'superadmin') navigate('/login');
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'superadmin') return null;

  const totalRevenue = orderList.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.amount, 0);

  const filteredOrders = orderList
    .filter(o => statusFilter === 'All' || o.status === statusFilter)
    .filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase()) || o.product.toLowerCase().includes(orderSearch.toLowerCase()))
    .sort((a, b) => orderSort === 'amount' ? b.amount - a.amount : 0);

  const filteredUsers = demoUsers.filter(u => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));

  const updateOrderStatus = (id: string, status: string) => {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const startEdit = (p: typeof products[0]) => {
    setEditingProduct(p.id);
    setEditForm({ name: p.name, price: p.price, oldPrice: p.oldPrice, inStock: p.inStock });
  };

  const saveEdit = (id: number) => {
    setProductList(prev => prev.map(p => p.id === id ? { ...p, ...editForm } : p));
    setEditingProduct(null);
  };

  /* ─── DASHBOARD ─── */
  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2d2d4a] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F26522]/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#F26522] rounded-full flex items-center justify-center">
            <Crown size={26} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Super Admin Dashboard</h2>
            <p className="text-white/60 text-sm mt-0.5">Welcome back, {user?.name || 'Admin'}! Here's your store overview.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: demoUsers.length.toString(), change: '+12%', up: true, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Orders', value: orderList.filter(o => o.status !== 'Cancelled').length.toString(), change: '+8%', up: true, icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
          { label: 'Revenue', value: `\u20b9${totalRevenue.toLocaleString()}`, change: '+23%', up: true, icon: DollarSign, color: 'bg-[#FFF0E8] text-[#F26522]' },
          { label: 'Products', value: productList.length.toString(), change: '+3', up: true, icon: Package, color: 'bg-purple-50 text-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-xl p-5 border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center`}><s.icon size={18} /></div>
              <span className={`flex items-center gap-1 text-xs font-medium ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{s.change}
              </span>
            </div>
            <p className="text-xl font-bold text-[#1A1A2E] mt-3">{s.value}</p>
            <p className="text-xs text-[#9A9AAA]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]">
          <div className="p-5 border-b border-[#E8E4E0] flex items-center justify-between">
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Recent Orders</h3>
            <button onClick={() => setActiveTab('orders')} className="text-xs text-[#F26522] font-medium hover:underline flex items-center gap-0.5">View All <ChevronRight size={12} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="text-left text-xs text-[#9A9AAA] uppercase tracking-wider"><th className="px-5 py-3 font-medium">Order</th><th className="px-5 py-3 font-medium">Customer</th><th className="px-5 py-3 font-medium">Amount</th><th className="px-5 py-3 font-medium">Status</th></tr></thead>
              <tbody className="divide-y divide-[#E8E4E0]/50">
                {orderList.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-[#FFFBF7] transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-[#1A1A2E]">{o.id}</td>
                    <td className="px-5 py-3 text-sm text-[#5A5A6E]">{o.customer}</td>
                    <td className="px-5 py-3 text-sm font-medium text-[#F26522]">&#8377;{o.amount}</td>
                    <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)]">
          <div className="p-5 border-b border-[#E8E4E0]">
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Top Products</h3>
          </div>
          <div className="p-4 space-y-3">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-5 h-5 bg-[#FFF0E8] text-[#F26522] rounded-full flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-[#E8E4E0]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">{p.name}</p>
                  <p className="text-xs text-[#9A9AAA]">{p.category}</p>
                </div>
                <span className="text-sm font-bold text-[#F26522]">&#8377;{p.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  /* ─── ORDERS ─── */
  const OrdersTab = () => (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Management</h2>
        <span className="text-sm text-[#9A9AAA]">{filteredOrders.length} orders found</span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E8E4E0]/50 p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9AAA]" />
          <input type="text" placeholder="Search orders..." value={orderSearch} onChange={e => setOrderSearch(e.target.value)} className="w-full h-10 pl-9 pr-4 border border-[#E8E4E0] rounded-lg text-sm outline-none focus:border-[#F26522]" />
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-[#F26522] text-white' : 'bg-[#F5F2EE] text-[#5A5A6E] hover:bg-[#E8E4E0]'}`}>{s}</button>
          ))}
        </div>
        <button onClick={() => setOrderSort(orderSort === 'date' ? 'amount' : 'date')} className="flex items-center gap-1 px-3 py-2 border border-[#E8E4E0] rounded-lg text-xs text-[#5A5A6E] hover:border-[#F26522] transition-colors">
          <ArrowUpDown size={12} /> Sort
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs text-[#9A9AAA] uppercase tracking-wider bg-[#FFFBF7]">
              <th className="px-5 py-3 font-medium">Order ID</th><th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Product</th><th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#E8E4E0]/50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FFFBF7] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-[#1A1A2E]">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-[#5A5A6E]">{order.customer}<br/><span className="text-xs text-[#9A9AAA]">{order.email}</span></td>
                  <td className="px-5 py-4 text-sm text-[#5A5A6E]">{order.product}<br/><span className="text-xs text-[#9A9AAA]">{order.type}</span></td>
                  <td className="px-5 py-4 text-sm font-medium text-[#F26522]">&#8377;{order.amount}</td>
                  <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-4 text-sm text-[#9A9AAA]">{order.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {order.status === 'Pending' && <button onClick={() => updateOrderStatus(order.id, 'Processing')} title="Process" className="w-8 h-8 rounded-lg hover:bg-yellow-50 text-yellow-600 flex items-center justify-center transition-colors"><Clock size={14} /></button>}
                      {order.status === 'Processing' && <button onClick={() => updateOrderStatus(order.id, 'Shipped')} title="Ship" className="w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center justify-center transition-colors"><Truck size={14} /></button>}
                      {order.status === 'Shipped' && <button onClick={() => updateOrderStatus(order.id, 'Delivered')} title="Deliver" className="w-8 h-8 rounded-lg hover:bg-green-50 text-green-600 flex items-center justify-center transition-colors"><CheckCircle2 size={14} /></button>}
                      {order.status !== 'Cancelled' && order.status !== 'Delivered' && <button onClick={() => updateOrderStatus(order.id, 'Cancelled')} title="Cancel" className="w-8 h-8 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors"><Ban size={14} /></button>}
                      {order.status === 'Cancelled' && <button onClick={() => updateOrderStatus(order.id, 'Pending')} title="Restore" className="w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center justify-center transition-colors"><RefreshCw size={14} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && <div className="text-center py-10 text-[#9A9AAA]">No orders found</div>}
      </div>
    </div>
  );

  /* ─── PRODUCTS ─── */
  const ProductsTab = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Product Management</h2>
        <span className="text-sm text-[#9A9AAA]">{productList.length} products</span>
      </div>

      <div className="space-y-3">
        {productList.map((product) => (
          <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] overflow-hidden">
            <div className="p-4 flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover border border-[#E8E4E0] shrink-0" />
              <div className="flex-1 min-w-0">
                {editingProduct === product.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input value={editForm.name} onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))} className="border border-[#E8E4E0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F26522]" />
                    <div className="flex gap-2">
                      <input type="number" value={editForm.price} onChange={e => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))} className="border border-[#E8E4E0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F26522] w-full" placeholder="Price" />
                      <input type="number" value={editForm.oldPrice} onChange={e => setEditForm(prev => ({ ...prev, oldPrice: Number(e.target.value) }))} className="border border-[#E8E4E0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F26522] w-full" placeholder="Old Price" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editForm.inStock} onChange={e => setEditForm(prev => ({ ...prev, inStock: e.target.checked }))} className="rounded" /> In Stock</label>
                      <button onClick={() => saveEdit(product.id)} className="ml-auto bg-[#F26522] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#E55512]">Save</button>
                      <button onClick={() => setEditingProduct(null)} className="bg-[#F5F2EE] text-[#5A5A6E] px-3 py-1.5 rounded-lg text-xs font-medium">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A2E] truncate">{product.name}</p>
                      <p className="text-xs text-[#9A9AAA]">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#F26522]">&#8377;{product.price}</span>
                        {product.oldPrice > product.price && <span className="text-xs text-[#9A9AAA] line-through ml-1">&#8377;{product.oldPrice}</span>}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.inStock ? 'In Stock' : 'Out'}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => startEdit(product)} className="w-8 h-8 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center justify-center"><Pencil size={14} /></button>
                        <Link to={`/product/${product.id}`} className="w-8 h-8 rounded-lg hover:bg-[#FFF0E8] text-[#F26522] flex items-center justify-center"><Eye size={14} /></Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  /* ─── USERS ─── */
  const UsersTab = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>User Management</h2>
        <div className="relative w-[260px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9AAA]" />
          <input type="text" placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="w-full h-10 pl-9 pr-4 border border-[#E8E4E0] rounded-lg text-sm outline-none focus:border-[#F26522]" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs text-[#9A9AAA] uppercase tracking-wider bg-[#FFFBF7]">
              <th className="px-5 py-3 font-medium">User ID</th><th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th><th className="px-5 py-3 font-medium">Orders</th>
              <th className="px-5 py-3 font-medium">Spent</th><th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr></thead>
            <tbody className="divide-y divide-[#E8E4E0]/50">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-[#FFFBF7] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-[#1A1A2E]">{u.id}</td>
                  <td className="px-5 py-4 text-sm text-[#1A1A2E]">{u.name}</td>
                  <td className="px-5 py-4 text-sm text-[#5A5A6E]">{u.email}</td>
                  <td className="px-5 py-4 text-sm text-[#1A1A2E]">{u.orders}</td>
                  <td className="px-5 py-4 text-sm font-medium text-[#F26522]">&#8377;{u.spent}</td>
                  <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
                  <td className="px-5 py-4 text-sm text-[#9A9AAA]">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ─── ANALYTICS ─── */
  const AnalyticsTab = () => {
    const maxSales = Math.max(...monthlySales.map(s => s.sales));
    const totalCatSales = categoryBreakdown.reduce((s, c) => s + c.sales, 0);

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Sales Analytics</h2>

        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-6">
          <h3 className="font-semibold text-[#1A1A2E] mb-6">Monthly Revenue</h3>
          <div className="flex items-end gap-4 h-[200px]">
            {monthlySales.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-[#9A9AAA]">&#8377;{(m.sales / 1000).toFixed(1)}k</span>
                <div className="w-full bg-[#F5F2EE] rounded-t-lg overflow-hidden relative" style={{ height: '140px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.sales / maxSales) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' as const }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#F26522] to-[#FF8A50] rounded-t-lg"
                  />
                </div>
                <span className="text-xs font-medium text-[#1A1A2E]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-6">
          <h3 className="font-semibold text-[#1A1A2E] mb-5">Sales by Category</h3>
          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#1A1A2E]">{cat.name}</span>
                  <span className="text-sm font-medium text-[#F26522]">&#8377;{cat.sales.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-[#F5F2EE] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.sales / totalCatSales) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' as const }}
                    className={`h-full ${cat.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Avg Order Value', value: '\u20b9175', icon: ShoppingBag, bg: 'bg-blue-50', text: 'text-blue-600' },
            { label: 'Repeat Customers', value: '62%', icon: Users, bg: 'bg-green-50', text: 'text-green-600' },
            { label: 'Digital vs Physical', value: '45:55', icon: Package, bg: 'bg-purple-50', text: 'text-purple-600' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl border border-[#E8E4E0]/50 p-5">
              <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.text} flex items-center justify-center mb-3`}><s.icon size={18} /></div>
              <p className="text-lg font-bold text-[#1A1A2E]">{s.value}</p>
              <p className="text-xs text-[#9A9AAA]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const tabComponents: Record<AdminTab, React.ComponentType> = {
    dashboard: DashboardTab,
    orders: OrdersTab,
    products: ProductsTab,
    users: UsersTab,
    analytics: AnalyticsTab,
  };

  const ActiveComponent = tabComponents[activeTab];

  return (
    <main className="min-h-screen bg-[#FFFBF7]">
      {/* Mobile Sidebar */}
      <div className="lg:hidden sticky top-[72px] z-30 bg-white border-b border-[#E8E4E0]">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-[#1A1A2E]">
          <span className="flex items-center gap-2"><Crown size={16} /> {sidebarTabs.find(t => t.id === activeTab)?.label}</span>
          <span className="text-[#F26522]">{sidebarOpen ? 'Close' : 'Menu'}</span>
        </button>
        {sidebarOpen && (
          <div className="border-t border-[#E8E4E0] p-2">
            {sidebarTabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#FFF0E8] text-[#F26522]' : 'text-[#5A5A6E] hover:bg-[#FAFAFA]'}`}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-2"><LogOut size={16} /> Logout</button>
          </div>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="sticky top-[160px] bg-white rounded-2xl border border-[#E8E4E0]/50 shadow-[0_2px_8px_rgba(26,26,46,0.04)] p-4">
              <div className="flex items-center gap-3 px-3 pb-4 mb-3 border-b border-[#E8E4E0]">
                <div className="w-10 h-10 bg-[#1A1A2E] rounded-full flex items-center justify-center">
                  <Crown size={18} className="text-[#F26522]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A2E]">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-[#9A9AAA]">Super Administrator</p>
                </div>
              </div>
              <nav className="space-y-1">
                {sidebarTabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#FFF0E8] text-[#F26522]' : 'text-[#5A5A6E] hover:bg-[#FAFAFA]'}`}>
                    <tab.icon size={16} /> {tab.label}
                  </button>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-[#E8E4E0]">
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"><LogOut size={16} /> Logout</button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
