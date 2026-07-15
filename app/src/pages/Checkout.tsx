import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, MapPin, CheckCircle2, ShoppingCart,
  X, ChevronRight, Lock
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const indianStates = [
  'Punjab', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana',
  'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Haryana', 'Himachal Pradesh',
  'Kerala', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Assam', 'Jharkhand',
  'Chhattisgarh', 'Uttarakhand', 'Goa', 'Andhra Pradesh', 'Jammu & Kashmir',
];

const WHATSAPP_NUMBER = '918427976607';

export default function Checkout() {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'confirm' | 'sent'>('info');
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Kept so the sent screen can reopen the same link after the cart is cleared.
  const [orderUrl, setOrderUrl] = useState('');

  const shipping = totalPrice >= 499 ? 0 : 49;
  const total = totalPrice + shipping;

  const validateInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.state) newErrors.state = 'Required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid PIN';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Hand the order to WhatsApp — the customer sends it from their own account,
     so there is no server involved and nothing is charged here. */
  const handleSendOrder = () => {
    const lines = items.map(
      (i, n) => `${n + 1}. ${i.product.name} x${i.quantity} — ₹${i.product.price * i.quantity}`
    ).join('\n');

    const text =
      `*New Order from Brar Scribbles Website*\n\n` +
      `*Items*\n${lines}\n\n` +
      `Subtotal: ₹${totalPrice}\n` +
      `Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n` +
      `*Total: ₹${total}*\n\n` +
      `*Deliver to*\n` +
      `${formData.fullName}\n` +
      `${formData.phone}\n` +
      `${formData.email}\n` +
      `${formData.address}\n` +
      `${formData.city}, ${formData.state} - ${formData.pincode}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    setOrderUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    setStep('sent');
  };

  if (items.length === 0 && step !== 'sent') {
    return (
      <main className="pt-[112px] lg:pt-[164px] min-h-screen bg-[#FFFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#FFF0E8] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={32} className="text-[#F26522]/30" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Your cart is empty</h2>
          <p className="text-[#5A5A6E] mb-4">Add some products to proceed with checkout</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#F26522] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#E55512] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[112px] lg:pt-[164px] bg-[#FFFBF7] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { label: 'Cart', key: 'cart' },
            { label: 'Shipping', key: 'info' },
            { label: 'Confirm', key: 'confirm' },
            { label: 'Sent', key: 'sent' },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                s.key === step || (s.key === 'cart' && step === 'info') || (s.key === 'cart' && step === 'confirm')
                  ? 'bg-[#F26522] text-white'
                  : s.key === 'sent' && step === 'sent'
                  ? 'bg-green-500 text-white'
                  : 'bg-[#E8E4E0] text-[#9A9AAA]'
              }`}>
                {s.key === 'sent' && step === 'sent' ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${
                s.key === step ? 'text-[#F26522]' : 'text-[#9A9AAA]'
              }`}>{s.label}</span>
              {i < 3 && <ChevronRight size={14} className="text-[#E8E4E0]" />}
            </div>
          ))}
        </div>

        {/* Sent State */}
        {step === 'sent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50 max-w-[500px] mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <WhatsAppIcon className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Order Is Ready to Send
            </h2>
            <p className="text-[#5A5A6E] mb-1">
              WhatsApp should have opened with your order details filled in.
            </p>
            <p className="text-sm text-[#9A9AAA] mb-6">
              Please hit send in WhatsApp to reach us — your order isn&apos;t placed
              until you do. We usually reply within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.open(orderUrl, '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                Open WhatsApp Again
              </button>
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 border border-[#E8E4E0] text-[#5A5A6E] px-6 py-3 rounded-xl font-medium hover:bg-[#FFFBF7] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        )}

        {/* Checkout Form */}
        {(step === 'info' || step === 'confirm') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50">
                <h3 className="font-semibold text-[#1A1A2E] mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <ShoppingCart size={18} className="text-[#F26522]" />
                  Order Summary ({items.length} items)
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.quantity}`} className="flex gap-4 p-3 bg-[#FFFBF7] rounded-xl">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A2E] truncate">{item.product.name}</p>
                        <p className="text-[#F26522] font-bold text-sm">&#8377;{item.product.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded bg-white border border-[#E8E4E0] flex items-center justify-center text-xs hover:border-[#F26522]">-</button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded bg-white border border-[#E8E4E0] flex items-center justify-center text-xs hover:border-[#F26522]">+</button>
                          <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-[#9A9AAA] hover:text-red-500">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 'info' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50"
                  >
                    <h3 className="font-semibold text-[#1A1A2E] mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <MapPin size={18} className="text-[#F26522]" />
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'John Doe' },
                        { label: 'Email', key: 'email', type: 'email', placeholder: 'john@example.com' },
                        { label: 'Phone', key: 'phone', type: 'tel', placeholder: '9876543210' },
                        { label: 'City', key: 'city', type: 'text', placeholder: 'Patiala' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">{field.label} <span className="text-[#EF4444]">*</span></label>
                          <input
                            type={field.type}
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => { setFormData(prev => ({ ...prev, [field.key]: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n[field.key]; return n; }); }}
                            placeholder={field.placeholder}
                            className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:border-[#F26522] transition-colors ${errors[field.key] ? 'border-[#EF4444]' : 'border-[#E8E4E0]'}`}
                          />
                          {errors[field.key] && <p className="text-[#EF4444] text-xs mt-1">{errors[field.key]}</p>}
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">State <span className="text-[#EF4444]">*</span></label>
                        <select
                          value={formData.state}
                          onChange={(e) => { setFormData(prev => ({ ...prev, state: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n.state; return n; }); }}
                          className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:border-[#F26522] transition-colors bg-white ${errors.state ? 'border-[#EF4444]' : 'border-[#E8E4E0]'}`}
                        >
                          <option value="">Select State</option>
                          {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.state && <p className="text-[#EF4444] text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">PIN Code <span className="text-[#EF4444]">*</span></label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => { setFormData(prev => ({ ...prev, pincode: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n.pincode; return n; }); }}
                          placeholder="140001"
                          maxLength={6}
                          className={`w-full h-11 border rounded-lg px-3 text-sm outline-none focus:border-[#F26522] transition-colors ${errors.pincode ? 'border-[#EF4444]' : 'border-[#E8E4E0]'}`}
                        />
                        {errors.pincode && <p className="text-[#EF4444] text-xs mt-1">{errors.pincode}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Address <span className="text-[#EF4444]">*</span></label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => { setFormData(prev => ({ ...prev, address: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n.address; return n; }); }}
                          placeholder="House no, Street, Locality..."
                          rows={3}
                          className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F26522] transition-colors resize-none ${errors.address ? 'border-[#EF4444]' : 'border-[#E8E4E0]'}`}
                        />
                        {errors.address && <p className="text-[#EF4444] text-xs mt-1">{errors.address}</p>}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { if (validateInfo()) setStep('confirm'); }}
                      className="w-full mt-6 h-12 bg-gradient-to-r from-[#F26522] to-[#FF8A50] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                    >
                      Continue to Confirm
                    </motion.button>
                  </motion.div>
                )}

                {step === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50"
                  >
                    <h3 className="font-semibold text-[#1A1A2E] mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <WhatsAppIcon className="w-[18px] h-[18px] text-[#25D366]" />
                      Confirm Your Order on WhatsApp
                    </h3>

                    <p className="text-sm text-[#5A5A6E] leading-relaxed">
                      Tap the button below and your order details will open in a
                      ready-to-send WhatsApp message. We&apos;ll confirm availability,
                      share payment options and give you a delivery estimate right
                      there in the chat.
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {[
                        'Nothing is charged on this website',
                        'Pay by UPI or Cash on Delivery once we confirm',
                        'You get a real person, not an automated reply',
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-[#5A5A6E]">
                          <CheckCircle2 size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setStep('info')}
                        className="flex-1 h-12 border border-[#E8E4E0] text-[#5A5A6E] rounded-xl font-medium hover:bg-[#FFFBF7] transition-colors"
                      >
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSendOrder}
                        className="flex-1 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-semibold shadow-[0_4px_12px_rgba(37,211,102,0.3)] transition-colors flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-[18px] h-[18px]" />
                        Send Order on WhatsApp
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50 sticky top-[160px]">
                <h3 className="font-semibold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Price Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#5A5A6E]">
                    <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                    <span>&#8377;{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A6E]">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span>&#8377;{shipping}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-[#5A5A6E]">
                    <span>Discount</span>
                    <span className="text-green-600">-&#8377;{items.reduce((a, i) => a + (i.product.oldPrice - i.product.price) * i.quantity, 0)}</span>
                  </div>
                  <div className="h-px bg-[#E8E4E0] my-3" />
                  <div className="flex justify-between">
                    <span className="font-bold text-[#1A1A2E]">Total</span>
                    <span className="font-bold text-xl text-[#F26522]">&#8377;{total}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-xs text-green-700 flex items-center gap-2">
                    <Truck size={14} />
                    You got free shipping!
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-[#9A9AAA]">
                  <Lock size={12} />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
