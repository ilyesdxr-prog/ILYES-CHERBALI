import React from 'react';
import { OrderData } from '../components/OrderForm';
import { 
  CheckCircle2, 
  Home, 
  Phone, 
  MapPin, 
  Package, 
  Truck, 
  Clock, 
  MessageCircle, 
  FileText 
} from 'lucide-react';

interface ThankYouPageProps {
  order: OrderData | null;
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onNavigateHome }) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ar-DZ').format(amount);
  };

  // Fallback demo order if visited directly
  const safeOrder: OrderData = order || {
    orderNumber: 'ILY-73921',
    fullName: 'زبون محترم',
    phone: '0555123456',
    wilaya: { id: 16, code: '16', nameAr: 'الجزائر العاصمة', nameFr: 'Alger', deliveryFee: 350 },
    address: 'الجزائر العاصمة',
    quantity: 1,
    product: {
      id: 'demo',
      name: 'منتج من متجر Ilyes Shop',
      category: 'عام',
      price: 4900,
      rating: 5,
      reviewsCount: 1,
      shortDescription: '',
      fullDescription: '',
      features: [],
      images: ['/src/assets/images/smartwatch_ultra_1792085198325.jpg'],
    },
    productTotal: 4900,
    deliveryFee: 350,
    grandTotal: 5250,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Celebration Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 text-center shadow-md relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Animated Check Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/15">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-200/80">
          تم استلام طلبك بنجاح 🎉
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          شكراً لثقتك بمتجر Ilyes Shop!
        </h1>

        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
          لقد تم تسجيل طلبيتك بنجاح برقم مميز. يرجى إبقاء هاتفك قريباً منك لاستقبال اتصال التأكيد.
        </p>

        {/* Order Reference Badge */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl px-5 py-3 text-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <FileText className="w-4 h-4 text-orange-600" />
            <span>رقم الطلبية الخاص بك:</span>
          </div>
          <span className="font-mono text-lg font-black text-orange-600 tracking-wider">
            {safeOrder.orderNumber}
          </span>
        </div>
      </div>

      {/* Important Confirmation Timeline Alert */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3.5 text-amber-900">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <Clock className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-black text-amber-950">
            📞 سنتصل بك خلال 24 ساعة لتأكيد الطلب
          </h4>
          <p className="text-amber-800 leading-relaxed">
            سيقوم أحد ممثلي خدمة العملاء في Ilyes Shop بالاتصال بك هاتفياً لتأكيد العنوان وموعد تسليم الشحنة مع شركة التوصيل.
          </p>
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-600" />
            <span>تفاصيل الطلبية</span>
          </h3>
          <span className="text-xs text-slate-400">
            طريقة الدفع: الدفع عند الاستلام (COD)
          </span>
        </div>

        {/* Product Line */}
        <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
          <img
            src={safeOrder.product.images[0]}
            alt={safeOrder.product.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 text-sm truncate">
              {safeOrder.product.name}
            </h4>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
              <span>الكمية: <strong className="text-slate-800">{safeOrder.quantity}</strong></span>
              <span>·</span>
              <span>سعر القطعة: <strong className="text-slate-800">{formatPrice(safeOrder.product.price)} دج</strong></span>
            </div>
          </div>
        </div>

        {/* Customer Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>رقم الهاتف:</span>
            </div>
            <p className="font-bold text-slate-800 font-mono text-sm">{safeOrder.phone}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>الولاية:</span>
            </div>
            <p className="font-bold text-slate-800 text-sm">
              {safeOrder.wilaya.nameAr} ({safeOrder.wilaya.code})
            </p>
          </div>

          <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>عنوان التوصيل الكامل:</span>
            </div>
            <p className="font-bold text-slate-800 text-sm">{safeOrder.address}</p>
          </div>
        </div>

        {/* Pricing Calculation Summary */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>مجموع السلعة ({safeOrder.quantity} قطع):</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {formatPrice(safeOrder.productTotal)} دج
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>كلفة التوصيل إلى ولاية {safeOrder.wilaya.nameAr}:</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {formatPrice(safeOrder.deliveryFee)} دج
            </span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-black text-slate-900 text-base sm:text-lg">
            <span>المبلغ الإجمالي للدفع عند الباب:</span>
            <div className="flex items-baseline gap-1 text-orange-600">
              <span className="text-2xl font-black tabular-nums">
                {formatPrice(safeOrder.grandTotal)}
              </span>
              <span className="text-xs font-bold">دج</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="w-full sm:flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>العودة للصفحة الرئيسية ومواصلة التسوق</span>
        </button>

        <a
          href={`https://wa.me/213555123456?text=${encodeURIComponent(
            `السلام عليكم، لقد قمت بطلب رقم ${safeOrder.orderNumber} وأود متابعة تفاصيله.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>تواصل مع الدعم عبر واتساب</span>
        </a>
      </div>
    </div>
  );
};
