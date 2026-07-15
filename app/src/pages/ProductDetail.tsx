import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Heart, Share2, ShoppingCart, Check, Minus, Plus,
  Truck, ShieldCheck, RotateCcw, Facebook, Twitter,
  ChevronRight, Tag, AlertCircle
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import { SITE_ORIGIN } from '@/lib/site';

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? 'text-[#FFB800] fill-[#FFB800]' : 'text-[#E8E4E0]'}
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? '');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showShare, setShowShare] = useState(false);

  if (!product) {
    return (
      <main className="pt-[112px] lg:pt-[164px] min-h-screen flex items-center justify-center bg-[#FFFBF7]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-[#F26522] hover:underline">Browse our shop</Link>
        </div>
      </main>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productImages = [product.image, product.image, product.image];

  // Share the canonical product URL rather than window.location.href: it is
  // stable, free of tracking params, and readable during prerender (there is
  // no window in Node).
  const shareUrl = `${SITE_ORIGIN}/product/${product.slug}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.name)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(SITE_ORIGIN + product.image)}&description=${encodeURIComponent(product.name)}`,
  };

  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${SITE_ORIGIN}${product.image}`,
    description: product.shortDesc,
    sku: `BRAR-${product.id}`,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Brar Scribbles' },
    offers: {
      '@type': 'Offer',
      url: shareUrl,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Brar Scribbles' },
    },
  };

  // Only claim ratings where real reviews exist — fabricated aggregateRating is
  // a manual-action risk and most products here have none yet.
  if (product.reviews > 0 && product.rating > 0) {
    productSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    };
    productSchema.review = product.reviewList.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating },
      reviewBody: r.comment,
    }));
  }

  return (
    <main className="pt-[112px] lg:pt-[164px] bg-[#FFFBF7]">
      <SEO
        title={product.name}
        description={product.shortDesc}
        keywords={product.tags.join(', ')}
        canonical={`/product/${product.slug}`}
        ogImage={`${SITE_ORIGIN}${product.image}`}
        ogType="product"
        schema={productSchema}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E4E0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-[#9A9AAA]">
            <Link to="/" className="hover:text-[#F26522]">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-[#F26522]">Shop</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?cat=${product.category.toLowerCase()}`} className="hover:text-[#F26522]">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-[#F26522] truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FFFBF7]">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-[#1A1A2E]/60 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-[#F26522]' : 'border-[#E8E4E0] hover:border-[#F26522]/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <StarRating rating={product.rating} />
                <span className="text-sm text-[#5A5A6E]">({product.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold text-[#F26522]">&#8377;{product.price}</span>
              <span className="text-lg text-[#9A9AAA] line-through">&#8377;{product.oldPrice}</span>
              {discount > 0 && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-3">
              {product.inStock ? (
                <>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Short Desc */}
            <p className="text-[#5A5A6E] mt-4 leading-relaxed text-sm">{product.shortDesc}</p>

            {/* Quantity */}
            {product.inStock && (
              <div className="flex items-center gap-4 mt-6">
                <span className="text-sm font-medium text-[#1A1A2E]">Quantity:</span>
                <div className="flex items-center border border-[#E8E4E0] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#FFFBF7] text-[#5A5A6E] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center border-x border-[#E8E4E0] font-medium text-[#1A1A2E]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#FFFBF7] text-[#5A5A6E] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 min-w-[180px] h-14 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all shadow-lg ${
                  addedToCart
                    ? 'bg-green-500 text-white shadow-green-500/20'
                    : product.inStock
                    ? 'bg-gradient-to-r from-[#F26522] to-[#FF8A50] text-white shadow-[#F26522]/20 hover:shadow-xl'
                    : 'bg-[#E8E4E0] text-[#9A9AAA] cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-[#E8E4E0] text-[#9A9AAA] hover:border-red-200 hover:text-red-500'
                }`}
              >
                <Heart size={20} className={inWishlist ? 'fill-red-500' : ''} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShare(!showShare)}
                  className="w-14 h-14 rounded-xl border-2 border-[#E8E4E0] text-[#9A9AAA] hover:border-[#F26522] hover:text-[#F26522] flex items-center justify-center transition-all"
                >
                  <Share2 size={20} />
                </motion.button>
                {showShare && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-[#E8E4E0] p-2 flex gap-2 z-10">
                    <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center text-white hover:opacity-80">
                      <Facebook size={18} />
                    </a>
                    <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1DA1F2] rounded-lg flex items-center justify-center text-white hover:opacity-80">
                      <Twitter size={18} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex items-center gap-2 text-xs text-[#5A5A6E]">
                <Truck size={16} className="text-[#F26522]" />
                <span>Free shipping over &#8377;499</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5A5A6E]">
                <ShieldCheck size={16} className="text-[#F26522]" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5A5A6E]">
                <RotateCcw size={16} className="text-[#F26522]" />
                <span>7-day return</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/shop?search=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 bg-[#FFFBF7] border border-[#E8E4E0] text-[#5A5A6E] text-xs px-3 py-1.5 rounded-full hover:border-[#F26522] hover:text-[#F26522] transition-colors"
                >
                  <Tag size={10} />
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Description + Reviews Tabs */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(26,26,46,0.06)] border border-[#E8E4E0]/50 overflow-hidden">
            <div className="flex border-b border-[#E8E4E0]">
              <button className="px-6 py-4 text-sm font-semibold text-[#F26522] border-b-2 border-[#F26522]">
                Description
              </button>
              {product.reviewList.length > 0 && (
                <button className="px-6 py-4 text-sm font-medium text-[#5A5A6E] hover:text-[#1A1A2E]">
                  Reviews ({product.reviews})
                </button>
              )}
            </div>

            {/* Description Content */}
            <div className="p-6 md:p-8">
              <div className="text-[#5A5A6E] text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Reviews Section */}
            {product.reviewList.length > 0 && (
              <div className="border-t border-[#E8E4E0] p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  {product.reviewList.map((review, i) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 pb-6 border-b border-[#E8E4E0] last:border-0"
                    >
                      <div className="w-10 h-10 bg-[#F26522] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#1A1A2E] text-sm">{review.name}</span>
                          <span className="text-xs text-[#9A9AAA]">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} size={14} />
                        <p className="text-sm text-[#5A5A6E] mt-2 leading-relaxed">{review.comment}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp, i) => (
                <ProductCard key={rp.id} product={rp} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
