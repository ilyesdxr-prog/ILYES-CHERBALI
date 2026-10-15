import React, { useState } from 'react';
import { Product } from '../data/products';
import { OrderForm, OrderData } from '../components/OrderForm';
import { 
  Star, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Check, 
  MessageCircle, 
  ShoppingBag, 
  Share2, 
  Clock, 
  Award 
} from 'lucide-react';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onSubmitOrder: (order: OrderData) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  onSubmitOrder,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ar-DZ').format(amount);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-orange-600 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع المنتجات</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'تم نسخ الرابط!' : 'مشاركة المنتج'}</span>
        </button>
      </div>

      {/* Main Grid: Gallery & Info + Direct Order Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media & Product Details (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gallery Container */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            {/* Main Featured Photo */}
            <div className="relative aspect-4/3 w-full bg-slate-100 rounded-2xl overflow-hidden mb-3">
              {imageError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
                  <ShoppingBag className="w-12 h-12 mb-2 stroke-1" />
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
              ) : (
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Discount Tag */}
              {product.discountPercentage && (
                <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                  تخفيض -{product.discountPercentage}%
                </div>
              )}
            </div>

            {/* Thumbnails (If multiple images available) */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setImageError(false);
                    }}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-orange-500 scale-102 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Description & Features */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Title & Trust Header */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-bold text-orange-600">{product.category}</span>
                <span>·</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  متوفر بالمخزن الجزائري
                </span>
                <span>·</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700 tabular-nums">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} تقييم)</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm font-bold text-orange-600">دينار جزائري (دج)</span>
                </div>
                {product.oldPrice && (
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    {formatPrice(product.oldPrice)} دج
                  </span>
                )}
              </div>
            </div>

            {/* Trust Banner Callout */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">✅ الدفع عند الاستلام | ✅ توصيل لـ 58 ولاية جزائرية</span>
              </div>
              <span className="text-[11px] bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-800 font-semibold shadow-2xs">
                فحص السلعة قبل دفع الدينار
              </span>
            </div>

            {/* Full Prose Description */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">وصف المنتج:</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Key Features Bullet Points */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">أبرز المميزات والمواصفات:</h3>
              <ul className="space-y-2.5">
                {product.features.map((feat, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fast WhatsApp Question Trigger */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">لديك أي استفسار قبل الطلب؟</span>
              <a
                href={`https://wa.me/213555123456?text=${encodeURIComponent(
                  `السلام عليكم، أود الاستفسار عن ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>استفسر عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Fast COD Order Form (5 Cols on LG) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <OrderForm product={product} onSubmitOrder={onSubmitOrder} />

          {/* Shipping Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>معلومات التوصيل والشحن في الجزائر</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              • التوصيل إلى ولايات الوسط (الجزائر، البليدة، تيبازة، بومرداس): من 24 إلى 48 ساعة.<br />
              • التوصيل لباقي الولايات الشمالية والهضاب: من 2 إلى 3 أيام.<br />
              • التوصيل لولايات الجنوب الكبير: من 3 إلى 5 أيام.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Devices */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 block">السعر:</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs font-bold text-orange-600">دج</span>
          </div>
        </div>
        <button
          onClick={scrollToOrderForm}
          className="flex-1 max-w-xs bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>اطلب الآن - الدفع عند الاستلام</span>
        </button>
      </div>
    </div>
  );
};
