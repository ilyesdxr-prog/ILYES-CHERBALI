import React, { useState } from 'react';
import { Product } from '../data/products';
import { WILAYAS, Wilaya } from '../data/wilayas';
import { 
  ShoppingBag, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export interface OrderData {
  orderNumber: string;
  fullName: string;
  phone: string;
  wilaya: Wilaya;
  address: string;
  quantity: number;
  product: Product;
  productTotal: number;
  deliveryFee: number;
  grandTotal: number;
  createdAt: string;
}

interface OrderFormProps {
  product: Product;
  onSubmitOrder: (order: OrderData) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ product, onSubmitOrder }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  // Default to Alger (16) as a standard starting Wilaya
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(16);
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentWilaya = WILAYAS.find((w) => w.id === selectedWilayaId) || WILAYAS[15];

  // Calculations
  const productTotal = product.price * quantity;
  const deliveryFee = currentWilaya.deliveryFee;
  const grandTotal = productTotal + deliveryFee;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ar-DZ').format(amount);
  };

  // Algerian phone validation: 10 digits starting with 05, 06, or 07
  const validatePhone = (val: string): boolean => {
    const cleaned = val.replace(/\s+/g, '');
    const regex = /^(05|06|07)[0-9]{8}$/;
    return regex.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'يرجى كتابة الاسم واللقب الكامل';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'الاسم قصير جداً، يرجى كتابة الاسم واللقب';
    }

    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'يرجى كتابة رقم الهاتف';
    } else if (!validatePhone(cleanPhone)) {
      newErrors.phone = 'رقم غير صحيح! يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام';
    }

    if (!address.trim()) {
      newErrors.address = 'يرجى كتابة البلدية والعنوان الكامل لتسهيل التوصيل';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      // Generate a random Algerian order code (e.g. ILY-8492)
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const orderNumber = `ILY-${randomNum}`;

      const orderData: OrderData = {
        orderNumber,
        fullName: fullName.trim(),
        phone: cleanPhone,
        wilaya: currentWilaya,
        address: address.trim(),
        quantity,
        product,
        productTotal,
        deliveryFee,
        grandTotal,
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onSubmitOrder(orderData);
    }, 400);
  };

  return (
    <div id="order-form-container" className="bg-white rounded-2xl border-2 border-orange-500/30 p-5 sm:p-7 shadow-lg shadow-orange-500/5">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md mb-1">
            ⚡ طلب سريع ومباشر
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            املأ الاستمارة لتأكيد طلبك الآن
          </h3>
          <p className="text-xs text-slate-500">
            الدفع نقداً عند استلام ومعاينة المنتج أمام رجل التوصيل
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field 1: Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            الاسم واللقب الكامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="مثال: محمد بن علي"
              className={`w-full pl-3 pr-10 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                errors.fullName
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
              }`}
            />
            <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.fullName && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </div>
          )}
        </div>

        {/* Field 2: Algerian Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            رقم الهاتف (للاتصال والتأكيد) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="05 / 06 / 07 XX XX XX XX"
              maxLength={12}
              className={`w-full pl-3 pr-10 py-3 text-sm text-right rounded-xl border bg-slate-50 focus:bg-white focus:outline-none transition-all font-mono ${
                errors.phone
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.phone ? (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 mt-1">
              نقبل أرقام موبيليس (06)، جازي (07)، وأوريدو (05).
            </p>
          )}
        </div>

        {/* Field 3: Wilaya Dropdown (58 Wilayas) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">
              الولاية <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-orange-600 font-semibold">
              توصيل لـ 58 ولاية 🇩🇿
            </span>
          </div>
          <div className="relative">
            <select
              value={selectedWilayaId}
              onChange={(e) => setSelectedWilayaId(Number(e.target.value))}
              className="w-full pl-3 pr-10 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 font-medium cursor-pointer"
            >
              {WILAYAS.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.code} - {w.nameAr} ({w.nameFr}) — توصيل: {formatPrice(w.deliveryFee)} دج
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Field 4: Address / Municipality */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            البلدية والعنوان بالتفصيل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="مثال: بلدية الأبيار، حي النخيل عمارة ب رقم 4"
              className={`w-full pl-3 pr-10 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                errors.address
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
              }`}
            />
            <Home className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.address && (
            <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.address}</span>
            </div>
          )}
        </div>

        {/* Field 5: Quantity Stepper */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">الكمية المطلوبة</span>
              <span className="text-[11px] text-slate-500">اختر عدد القطع</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-base text-slate-900 w-6 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Bill Breakdown */}
        <div className="bg-orange-50/60 border border-orange-200/60 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>سعر المنتج ({quantity} قطعة):</span>
            <span className="font-semibold text-slate-900 tabular-nums">{formatPrice(productTotal)} دج</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>كلفة التوصيل إلى ({currentWilaya.nameAr}):</span>
            <span className="font-semibold text-slate-900 tabular-nums">{formatPrice(deliveryFee)} دج</span>
          </div>
          <div className="pt-2 border-t border-orange-200 flex justify-between items-baseline font-bold text-sm text-slate-900">
            <span>المبلغ الإجمالي عند الاستلام:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-orange-600 tabular-nums">
                {formatPrice(grandTotal)}
              </span>
              <span className="text-xs text-orange-600 font-bold">دج</span>
            </div>
          </div>
        </div>

        {/* Main Prominent Orange Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>جارٍ تسجيل الطلب...</span>
            </div>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>🛒 اطلب الآن - الدفع عند الاستلام</span>
            </>
          )}
        </button>

        {/* WhatsApp Inquiry Button */}
        <a
          href={`https://wa.me/213555123456?text=${encodeURIComponent(
            `السلام عليكم، أريد الاستفسار بخصوص منتج: ${product.name}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm py-3 px-4 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>استفسر عبر واتساب قبل الطلب</span>
        </a>

        {/* Guarantee Points */}
        <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>معاينة المنتج قبل الدفع</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>توصيل سريع لباب المنزل</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>ضمان الجودة والاستبدال</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>اتصال هاتفي قبل الشحن</span>
          </div>
        </div>
      </form>
    </div>
  );
};
