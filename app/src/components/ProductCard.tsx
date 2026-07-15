import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(26,26,46,0.06)] hover:shadow-[0_8px_24px_rgba(26,26,46,0.12)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#FFFBF7]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            loading="lazy"
          />
        </Link>

        {/* Sale Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#E63946] text-white text-xs font-semibold px-2.5 py-1 rounded">
            {product.badge}
          </span>
        )}

        {/* Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#1A1A2E]/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wide">OUT OF STOCK</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#F26522] hover:text-white transition-colors text-[#1A1A2E]"
          >
            <Eye size={15} />
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-[#1A1A2E] hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart size={15} className={inWishlist ? 'fill-white' : ''} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-[#1A1A2E] line-clamp-2 min-h-[40px] hover:text-[#F26522] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={star <= product.rating ? 'text-[#FFB800] fill-[#FFB800]' : 'text-[#E8E4E0]'}
                />
              ))}
            </div>
            <span className="text-xs text-[#9A9AAA]">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#F26522] font-bold text-base">&#8377;{product.price}</span>
          <span className="text-[#9A9AAA] text-sm line-through">&#8377;{product.oldPrice}</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full mt-3 py-2.5 bg-[#F26522] hover:bg-[#E55512] disabled:bg-[#E8E4E0] disabled:text-[#9A9AAA] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors active:scale-[0.97]"
        >
          <ShoppingCart size={15} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}
