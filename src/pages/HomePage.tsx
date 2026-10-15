import React, { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Truck, ShieldCheck, ThumbsUp, Search, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectProduct, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const list = Array.from(new Set(PRODUCTS.map((p) => p.category)));
    return ['all', ...list];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Campaign Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>عروض التوفير الكبرى في الجزائر</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-balance">
            تسوق بكل ثقة مع <span className="text-orange-500">Ilyes Shop</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
            أحدث المنتجات العصرية بأفضل الأسعار في السوق الجزائري. لا تدفع مسبقاً، اطلب الآن وادفع نقداً عند استلام ومعاينة طلبيتك في منزلك!
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>توصيل سريع لـ 58 ولاية</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>الدفع عند الاستلام 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <ThumbsUp className="w-4 h-4 text-blue-400" />
              <span>معاينة المنتج قبل الدفع</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Category Filter Tabs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              المنتجات المتاحة حالياً
            </h2>
            <p className="text-xs text-slate-500">
              اختر أي منتج واطلبه بضغطة زر واحدة فقط
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg tabular-nums">
            {filteredProducts.length} منتجات
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const label = cat === 'all' ? 'جميع المنتجات' : cat;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              لم نتمكن من العثور على نتائج لبحثك
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              جرب البحث بكلمات أخرى أو تصفح كل المنتجات
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickOrder={onSelectProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Shop With Ilyes Shop */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-black text-slate-900 mb-6 text-center">
          لماذا يثق الجزائريون في <span className="text-orange-600">Ilyes Shop</span>؟
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xl mb-3">
              🇩🇿
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">تغطية وطنية شاملة</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              شبكة توصيل تغطي 58 ولاية من الشمال إلى أقصى الجنوب بالتعاون مع أفضل شركات التوصيل السريع.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl mb-3">
              💵
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">الدفع الآمن عند الباب</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              لا حاجة لبطاقة ذهبية أو دفع مسبق. تستلم سلعتك، تفحصها بيدك، ثم تسلّم المبلغ لرجل التوصيل.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl mb-3">
              📞
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">تأكيد ومتابعة هاتفية</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              بمجرد تقديمك للطلب، يتصل بك فريقنا لتأكيد معلومات التوصيل وإعطائك رقم تتبع الشحنة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
