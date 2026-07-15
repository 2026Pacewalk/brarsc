import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, AlertTriangle, ScrollText,
  Truck, RotateCcw, HelpCircle, ChevronRight, ArrowLeft
} from 'lucide-react';
import SEO from './SEO';

const policyLinks = [
  { name: 'FAQs', path: '/faqs', icon: HelpCircle, desc: 'Common questions answered' },
  { name: 'Privacy Policy', path: '/privacy', icon: Shield, desc: 'How we protect your data' },
  { name: 'Disclaimer', path: '/disclaimer', icon: AlertTriangle, desc: 'Terms of use' },
  { name: 'Terms & Conditions', path: '/terms', icon: ScrollText, desc: 'Rules and guidelines' },
  { name: 'Shipping & Delivery', path: '/shipping', icon: Truck, desc: 'Delivery information' },
  { name: 'Cancellation & Refund', path: '/refund', icon: RotateCcw, desc: 'Return policies' },
];

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  keywords: string;
  children: React.ReactNode;
  faqSchema?: Array<{ question: string; answer: string }>;
  lastUpdated?: string;
  heroGradient?: string;
}

export default function PolicyLayout({
  title,
  subtitle,
  description,
  keywords,
  children,
  faqSchema,
  lastUpdated = 'January 1, 2024',
  heroGradient = 'from-[#1A1A2E] via-[#1e1e3a] to-[#F26522]/20',
}: PolicyLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={`https://brarscribbles.com${currentPath}`}
        faqSchema={faqSchema}
      />

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className={`relative bg-gradient-to-br ${heroGradient} overflow-hidden`}>
          {/* CSS-only floating dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  left: `${(i * 6.7 + 2) % 100}%`,
                  top: `${(i * 8.3 + 5) % 100}%`,
                  width: Math.random() * 3 + 2,
                  height: Math.random() * 3 + 2,
                  animation: `float ${4 + (i % 3) * 2}s ease-in-out ${(i * 0.7) % 5}s infinite alternate`,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-[120px] lg:pt-[172px] pb-14 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {title}
              </h1>
              <p className="mt-3 text-white/60 text-base md:text-lg max-w-[600px]">
                {subtitle}
              </p>
              <p className="text-white/30 text-xs mt-4">Last Updated: {lastUpdated}</p>
            </motion.div>
          </div>
        </section>

        {/* ═══════ BREADCRUMB ═══════ */}
        <div className="bg-white border-b border-[#E8E4E0]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-[#9A9AAA]">
              <Link to="/" className="hover:text-[#F26522] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/contact" className="hover:text-[#F26522] transition-colors">Contact</Link>
              <ChevronRight size={12} />
              <span className="text-[#F26522] font-medium">{title}</span>
            </div>
          </div>
        </div>

        {/* ═══════ CONTENT ═══════ */}
        <section className="py-12 md:py-16 bg-[#FFFBF7]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50 sticky top-[160px]">
                  <h3 className="font-semibold text-[#1A1A2E] mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Quick Links
                  </h3>
                  <nav className="space-y-1.5">
                    {policyLinks.map((link) => {
                      const isActive = currentPath === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-[#F26522] text-white shadow-md'
                              : 'text-[#5A5A6E] hover:bg-[#FFF0E8] hover:text-[#F26522]'
                          }`}
                        >
                          <link.icon size={16} className={isActive ? 'text-white' : 'text-[#9A9AAA]'} />
                          <span>{link.name}</span>
                          {isActive && <ChevronRight size={14} className="ml-auto" />}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Contact CTA */}
                  <div className="mt-6 pt-5 border-t border-[#E8E4E0]">
                    <p className="text-xs text-[#9A9AAA] mb-3">Still have questions?</p>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F26522] hover:bg-[#E55512] text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50">
                  {children}
                </div>

                {/* Interlinking Cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {policyLinks
                    .filter((l) => l.path !== currentPath)
                    .slice(0, 4)
                    .map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          to={link.path}
                          className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#E8E4E0]/60 hover:border-[#F26522]/30 hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="w-11 h-11 bg-[#FFF0E8] rounded-xl flex items-center justify-center group-hover:bg-[#F26522] transition-colors duration-300">
                            <link.icon size={18} className="text-[#F26522] group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1A2E] text-sm group-hover:text-[#F26522] transition-colors">{link.name}</p>
                            <p className="text-xs text-[#9A9AAA]">{link.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-[#E8E4E0] group-hover:text-[#F26522] ml-auto transition-colors" />
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
