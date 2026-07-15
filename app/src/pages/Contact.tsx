import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, ShoppingBag, Handshake,
  Phone, Mail, MapPin, Clock, Facebook, Twitter, Youtube,
  Instagram, ChevronDown, Sparkles, User, AtSign, FileText,
  AlignLeft, ArrowRight, HeadphonesIcon, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: 'How do I place an order?',
    a: 'You can browse our shop, add items to your cart, and proceed to checkout. We accept multiple payment methods including UPI, Cards, and Net Banking.',
  },
  {
    q: 'What is the delivery time?',
    a: 'Digital products (PDF notes) are delivered instantly to your email after payment. Physical products like mugs and apparel are delivered within 5-7 business days across India.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Due to the digital nature of our study materials, we do not offer refunds on PDF downloads. For physical products, please contact us within 7 days of delivery if there is any issue.',
  },
  {
    q: 'Are the notes useful for competitive exams?',
    a: 'Absolutely! Our formula sheets and synopsis are designed to help students preparing for CBSE board exams, JEE, NEET, and other competitive exams.',
  },
  {
    q: 'Do you offer bulk orders for schools?',
    a: 'Yes! We offer special discounts for schools and coaching institutes. Please use the contact form below or WhatsApp us for bulk order inquiries.',
  },
];

/* ─── Info Cards Data ─── */
const infoCards = [
  {
    icon: MessageCircle,
    title: 'Order Support',
    subtitle: 'Questions about an Order?',
    content: 'If you have any issues or questions related to an item from brarscribbles.com, email store support directly or use this form. Be sure to include your order number.',
    bgColor: 'bg-[#FFF0E8]',
    iconColor: 'text-[#F26522]',
  },
  {
    icon: ShoppingBag,
    title: 'Product Inquiry',
    subtitle: 'Where to buy our products?',
    content: 'All of our products are sold directly through brarscribbles.com. Brar Scribbles Notes are also available on Amazon. For wholesale, distribution and bulk orders, contact us.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Handshake,
    title: 'Business & Collabs',
    subtitle: 'Business Opportunities',
    content: 'If you would like to discuss paid commissions, licensing, collaborations, or other business opportunities please describe the project and budget in as much detail as you can.',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

/* ─── Contact Details ─── */
const contactDetails = [
  { icon: Phone, label: 'Phone', value: '+91-84279-76607', href: 'tel:+918427976607' },
  { icon: Mail, label: 'Email', value: 'brarscribbles@gmail.com', href: 'mailto:brarscribbles@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Patiala, Punjab, India', href: '#' },
  { icon: Clock, label: 'Business Hours', value: 'Mon - Sat: 9AM - 6PM', href: '#' },
];

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/brar.scribbles', color: 'bg-[#1877F2]' },
  { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/BrarScribbles', color: 'bg-[#1DA1F2]' },
  { icon: Youtube, name: 'YouTube', url: 'https://www.youtube.com/channel/UCP7baQZYF2uL-s5-c8arukQ', color: 'bg-[#FF0000]' },
  { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/brar_scribbles', color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
];

/* ─── FAQ Accordion Item ─── */
function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-[#E8E4E0] rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FFFBF7] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#FFF0E8] text-[#F26522] flex items-center justify-center text-sm font-bold shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-medium text-[#1A1A2E] text-[15px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ml-3"
        >
          <ChevronDown size={18} className="text-[#9A9AAA]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-16">
              <p className="text-[#5A5A6E] text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Contact Page ─── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const WHATSAPP_NUMBER = '918427976607';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Send via WhatsApp */
  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subjectLine = formData.subject ? `*Subject:* ${formData.subject}\n` : '';
    const text = `*New Message from Brar Scribbles Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n${subjectLine}*Message:*\n${formData.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  /* Shared input classes */
  const inputBase = 'w-full h-[50px] bg-white border rounded-xl pl-11 pr-4 text-sm text-[#1A1A2E] outline-none transition-all duration-200 placeholder:text-[#9A9AAA]/80';
  const inputNormal = `${inputBase} border-[#E8E4E0] focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/10 focus:shadow-[0_2px_12px_rgba(242,101,34,0.08)]`;
  const inputError = `${inputBase} border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/10`;

  return (
    <main>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#1e1e3a] to-[#F26522]/20 overflow-hidden">
        {/* CSS-only floating dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                left: `${(i * 5.5 + 3) % 100}%`,
                top: `${(i * 7.3 + 5) % 100}%`,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                animation: `float ${4 + (i % 3) * 2}s ease-in-out ${(i * 0.7) % 5}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-[120px] lg:pt-[172px] pb-16 md:pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-[#F26522]" />
              <span className="text-white/80 text-xs font-medium tracking-wide">We'd love to hear from you</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get in <span className="text-[#F26522]">Touch</span>
            </h1>
            <p className="mt-5 text-white/60 text-base md:text-lg max-w-[600px] mx-auto leading-relaxed">
              Have a question, collaboration idea, or just want to say hi? Reach out to us and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Detail Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {contactDetails.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white/80 text-sm transition-all duration-200 hover:text-white"
              >
                <item.icon size={14} className="text-[#F26522]" />
                <span>{item.value}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ INFO CARDS ═══════════ */}
      <section className="py-16 md:py-20 bg-[#FFFBF7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              How Can We Help
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              We're Here to Assist You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(26,26,46,0.06)] hover:shadow-[0_12px_40px_rgba(26,26,46,0.12)] transition-shadow duration-300 border border-[#E8E4E0]/50"
              >
                <div className={`w-14 h-14 ${card.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={26} className={card.iconColor} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A2E] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {card.title}
                </h3>
                <p className="text-xs text-[#F26522] font-medium mb-3">{card.subtitle}</p>
                <p className="text-sm text-[#5A5A6E] leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHATSAPP CONTACT FORM + SIDEBAR ═══════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* WhatsApp Form - Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {/* Section Header */}
              <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Send a Message
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mt-2 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Drop Us a Line
              </h2>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onSubmit={handleSendWhatsApp}
                noValidate
                className="bg-[#FFFBF7] rounded-2xl p-6 md:p-8 border border-[#E8E4E0]/60 shadow-[0_2px_16px_rgba(26,26,46,0.04)]"
              >
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                      Full Name <span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'name' ? 'text-[#F26522]' : 'text-[#9A9AAA]'}`}
                      />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        className={errors.name ? inputError : inputNormal}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[#EF4444] text-xs mt-1.5 pl-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                      Email Address <span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <AtSign
                        size={16}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-[#F26522]' : 'text-[#9A9AAA]'}`}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className={errors.email ? inputError : inputNormal}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[#EF4444] text-xs mt-1.5 pl-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    Subject <span className="text-[#9A9AAA] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileText
                      size={16}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'subject' ? 'text-[#F26522]' : 'text-[#9A9AAA]'}`}
                    />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Order #12345 / Collaboration / Bulk Order"
                      className={inputNormal}
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    Your Message <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <AlignLeft
                      size={16}
                      className={`absolute left-4 top-4 transition-colors duration-200 ${focusedField === 'message' ? 'text-[#F26522]' : 'text-[#9A9AAA]'}`}
                    />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className={`${errors.message ? inputError : inputNormal} pl-11 pr-4 py-3 resize-none !h-auto`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[#EF4444] text-xs mt-1.5 pl-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* WhatsApp Send Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-7 h-[54px] bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0e7a6e] text-white rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.45)] cursor-pointer"
                >
                  <MessageSquare size={18} />
                  Send Message via WhatsApp
                </motion.button>

                {/* WhatsApp Note */}
                <p className="text-center text-xs text-[#9A9AAA] mt-4">
                  Your message will be sent directly to us on WhatsApp
                </p>

                {/* Direct WhatsApp Link */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="w-8 h-px bg-[#E8E4E0]" />
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#25D366] font-medium hover:underline flex items-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    Or chat directly on WhatsApp
                  </a>
                  <span className="w-8 h-px bg-[#E8E4E0]" />
                </div>
              </motion.form>
            </motion.div>

            {/* Sidebar - Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Info Card */}
              <div className="bg-[#1A1A2E] rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <HeadphonesIcon size={20} className="text-[#F26522]" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactDetails.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#F26522] transition-colors duration-200">
                        <item.icon size={16} className="text-[#F26522] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">{item.label}</p>
                        <p className="text-white/90 text-sm font-medium group-hover:text-[#F26522] transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="h-px bg-white/10 my-5" />

                <p className="text-white/40 text-xs mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200`}
                      aria-label={social.name}
                    >
                      <social.icon size={17} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/60 hover:border-green-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.15)] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(37,211,102,0.3)]">
                    <MessageSquare size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Chat on WhatsApp
                    </h3>
                    <p className="text-sm text-[#5A5A6E] mt-1 leading-relaxed">
                      Get instant replies. Available Mon-Sat, 9AM-6PM.
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-[#25D366] font-medium text-sm group-hover:gap-2 transition-all">
                      Start Chatting <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>

              {/* Quick Shop CTA */}
              <div className="bg-gradient-to-br from-[#FFF0E8] to-white rounded-2xl p-6 border border-[#F26522]/10">
                <h3 className="font-semibold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Looking for Study Materials?
                </h3>
                <p className="text-sm text-[#5A5A6E] mb-4">
                  Browse our collection of colorful science notes, formula sheets, and more.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#E55512] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Visit Shop
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section className="py-16 md:py-20 bg-[#FFFBF7]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Got Questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MAP / LOCATION SECTION ═══════════ */}
      <section className="relative h-[300px] md:h-[400px] bg-[#1A1A2E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F26522] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_32px_rgba(242,101,34,0.4)]">
              <MapPin size={28} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Patiala, Punjab, India
            </h3>
            <p className="text-white/50 text-sm mt-1">
              WHITEHAWK ACADEMY - Brar Scribbles Headquarters
            </p>
            <a
              href="https://maps.google.com/?q=Patiala,Punjab,India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-white/10 hover:bg-white/20 text-white text-sm px-5 py-2 rounded-lg transition-colors backdrop-blur-sm"
            >
              <MapPin size={14} />
              View on Google Maps
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
