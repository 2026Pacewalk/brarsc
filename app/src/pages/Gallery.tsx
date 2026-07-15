import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ChevronLeft, ChevronRight, Grid3X3, Images, ExternalLink } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { galleryImages } from '@/data/products';

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const goNext = () => lightbox !== null && setLightbox((lightbox + 1) % galleryImages.length);
  const goPrev = () => lightbox !== null && setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7]" onKeyDown={handleKeyDown}>
      {/* Hero */}
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through our science-inspired artwork, creative illustrations, and behind-the-scenes moments"
        backgroundImage="/images/hero-gallery.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}

      >
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          href="https://www.instagram.com/brar_scribbles"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 bg-[#E4405F] hover:bg-[#d13a5a] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
        >
          <Instagram size={16} />
          Follow on Instagram
          <ExternalLink size={12} className="opacity-60" />
        </motion.a>
      </PageHero>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[#E8E4E0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FFF0E8] rounded-lg flex items-center justify-center">
                <Images size={18} className="text-[#F26522]" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#1A1A2E] leading-tight">{galleryImages.length}</div>
                <div className="text-xs text-[#9A9AAA]">Artworks</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FFF0E8] rounded-lg flex items-center justify-center">
                <Grid3X3 size={18} className="text-[#F26522]" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#1A1A2E] leading-tight">Science Art</div>
                <div className="text-xs text-[#9A9AAA]">Illustrations</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FFF0E8] rounded-lg flex items-center justify-center">
                <Instagram size={18} className="text-[#F26522]" />
              </div>
              <div>
                <a
                  href="https://www.instagram.com/brar_scribbles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#1A1A2E] hover:text-[#F26522] transition-colors"
                >
                  @brar_scribbles
                </a>
                <div className="text-xs text-[#9A9AAA]">Follow us</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Style */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Collection
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Science Through Art
            </h2>
            <p className="text-[#5A5A6E] mt-2 max-w-lg mx-auto">
              Click on any image to view it in full size
            </p>
          </motion.div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-medium">{img.alt}</span>
                </div>
                <div className="absolute inset-0 bg-[#F26522]/0 group-hover:bg-[#F26522]/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Want to see more?
            </h2>
            <p className="text-[#5A5A6E] mt-2 max-w-md mx-auto">
              Follow us on Instagram for daily science art, behind-the-scenes content, and exclusive updates.
            </p>
            <a
              href="https://www.instagram.com/brar_scribbles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-[#E4405F] hover:bg-[#d13a5a] text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors"
            >
              <Instagram size={18} />
              Follow @brar_scribbles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#1A1A2E]/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={22} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-sm font-medium">{galleryImages[lightbox].alt}</p>
              <p className="text-white/50 text-xs mt-1">
                {lightbox + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
