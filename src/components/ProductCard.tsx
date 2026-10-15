import React, { useState } from 'react';
import { Product } from '../data/products';
import { Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickOrder?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickOrder,
}) => {
  const [imageError, setImageError] = useState(false);

  // Helper to format currency in Algerian Dinar
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ar-DZ').format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Box */}
      <div 
        onClick={() => onSelect(product)}
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <ShoppingBag className="w-10 h-10 mb-2 stroke-1" />
            <span className="text-xs font-medium text-slate-500">{product.name}</span>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Discount Tag (Unboxed elegant banner) */}
        {product.discountPercentage && (
          <div className="absolute top-2.5 right-2.5 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
            تخفيض -{product.discountPercentage}%
          </div>
        )}

        {/* Stock / COD badge */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
          الدفع عند الاستلام
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-slate-600">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700 text-[11px] tabular-nums">
                {product.rating}
              </span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors mb-2"
          >
            {product.name}
          </h3>

          {/* Short Teaser Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & CTA Action */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-bold text-orange-600">دج</span>
              </div>
              {product.oldPrice && (
                <div className="text-xs text-slate-400 line-through tabular-nums -mt-0.5">
                  {formatPrice(product.oldPrice)} دج
                </div>
              )}
            </div>

            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              متوفر بالمخزن
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => onSelect(product)}
              title="عرض التفاصيل الكاملة"
              className="col-span-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-2.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onQuickOrder ? onQuickOrder(product) : onSelect(product)}
              className="col-span-4 flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-2.5 px-3 rounded-xl shadow-sm hover:shadow-orange-500/20 active:scale-[0.98] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>اطلب الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
