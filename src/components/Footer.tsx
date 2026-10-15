import React from 'react';
import { Phone, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      {/* Trust Pillars Strip */}
      <div className="border-b border-slate-800 py-8 px-4 bg-slate-950/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">توصيل 58 ولاية</h4>
              <p className="text-xs text-slate-400">توصيل سريع حتى باب منزلك أو مكتبك</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">الدفع عند الاستلام</h4>
              <p className="text-xs text-slate-400">لا تدفع أي دينار حتى تعاين المنتج بنفسك</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ضمان الاستبدال</h4>
              <p className="text-xs text-slate-400">إمكانية الاستبدال في حال وجود أي عيب مصنعي</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">خدمة الزبائن 7/7</h4>
              <p className="text-xs text-slate-400">فريقنا متواجد لتأكيد طلباتكم والرد عليكم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-lg">
                I
              </div>
              <span className="text-xl font-black text-white">
                Ilyes<span className="text-orange-500">Shop</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              متجرك الإلكتروني الجزائري الأول للمنتجات العصرية والمميزة. نوفر لك أفضل تجربة تسوق مضمونة ومريحة مع خدمة الدفع عند الاستلام في كل ربوع الجزائر 🇩🇿.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>نستقبل الطلبات على مدار 24 ساعة</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">روابط تهمك</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-orange-400 transition-colors"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <span className="hover:text-orange-400 transition-colors cursor-pointer">
                  سياسة التوصيل والشحن
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 transition-colors cursor-pointer">
                  طريقة الدفع عند الاستلام
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 transition-colors cursor-pointer">
                  شروط الاستبدال والاسترجاع
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">خدمة الزبائن والطلبات</h4>
            <p className="text-xs text-slate-400 mb-4">
              هل لديك استفسار حول منتج أو طلبية؟ تواصل معنا مباشرة عبر واتساب وسنجيبك في أسرع وقت.
            </p>
            <a
              href="https://wa.me/213555123456?text=مرحبا%20أريد%20الاستفسار%20عن%20منتجات%20Ilyes%20Shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل معنا عبر واتساب</span>
            </a>
            <div className="mt-3 text-[11px] text-slate-500">
              هاتف خدمة الزبائن: <span className="font-mono text-slate-300">0555 12 34 56</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Ilyes Shop. جميع الحقوق محفوظة لمتجر إلياس شوب الجزائري.</p>
          <p className="text-slate-400">التوصيل متوفر لجميع الـ 58 ولاية 🇩🇿</p>
        </div>
      </div>
    </footer>
  );
};
