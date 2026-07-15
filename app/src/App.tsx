import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Checkout from '@/pages/Checkout';
import About from '@/pages/About';
import Gallery from '@/pages/Gallery';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import StudentDashboard from '@/pages/StudentDashboard';
import SuperAdmin from '@/pages/SuperAdmin';
import FAQs from '@/pages/FAQs';
import Privacy from '@/pages/Privacy';
import Disclaimer from '@/pages/Disclaimer';
import Terms from '@/pages/Terms';
import Shipping from '@/pages/Shipping';
import Refund from '@/pages/Refund';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <ScrollToTop />
      {/* Metadata lives on each page so every URL gets its own title,
          description, canonical and schema. A shared tag here would emit a
          second <title> on every route. */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<SuperAdmin />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
