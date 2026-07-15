import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbs: { label: string; href?: string }[];
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
  overlayOpacity?: number;
}

/* Lightweight CSS-only floating dots — no canvas, no RAF jitter */
const floatingDots = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.5 + 3) % 100}%`,
  top: `${(i * 7.3 + 5) % 100}%`,
  size: Math.random() * 4 + 2,
  delay: (i * 0.7) % 5,
  duration: 4 + (i % 3) * 2,
}));

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs,
  showScrollIndicator = true,
  children,
  overlayOpacity = 0.72,
}: PageHeroProps) {
  const titleWords = title.split(' ');

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'clamp(360px, 55vh, 520px)' }}>
      {/* Background Image — static, no scale transform */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(26,26,46,${overlayOpacity}) 0%, rgba(26,26,46,${overlayOpacity * 0.75}) 40%, rgba(242,101,34,${overlayOpacity * 0.25}) 100%)`,
        }}
      />

      {/* CSS-only floating dots (no canvas RAF loop) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {floatingDots.map((dot) => (
          <span
            key={dot.id}
            className="absolute rounded-full bg-white/30 will-change-transform"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              animation: `float ${dot.duration}s ease-in-out ${dot.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Decorative shapes — static, no animation */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#F26522]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-white/70 mb-5 flex-wrap justify-center"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-white/40 shrink-0" />}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-[#F26522] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F26522] font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* Title with word-by-word animation */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: 'easeOut' as const }}
              className="inline-block mr-[0.3em] will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-20 h-[3px] bg-[#F26522] mx-auto mt-4 rounded-full origin-left will-change-transform"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-base md:text-lg text-white/80 mt-4 max-w-xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-white/50" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
