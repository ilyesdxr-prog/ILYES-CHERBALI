import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, ShieldCheck, Truck, X } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
}) => {
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Announcement Ribbon */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 font-medium">
          <div className="flex items-center gap-2 truncate">
            <Truck className="w-4 h-4 shrink-0 text-orange-100" />
            <span className="truncate">🚚 توصيل سريع لجميع ولايات الجزائر (58 ولاية)</span>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-orange-100" />
            <span>💰 الدفع عند الاستلام بعد معاينة المنتج</span>
          </div>
          <a
            href="https://wa.me/213555123456?text=مرحبا%20Ilyes%20Shop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs transition-colors shrink-0"
          >
            <Phone className="w-3 h-3" />
            <span>اتصل بنا</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              I
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                Ilyes<span className="text-orange-500">Shop</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                متجر الدفع عند الاستلام 🇩🇿
              </p>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن منتجك المفضل..."
              className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-800 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
              className="sm:hidden p-2 text-slate-700 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart || onNavigateHome}
              className="flex items-center gap-2 bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600 px-3.5 py-2 rounded-xl transition-all border border-slate-200/80 group"
              aria-label="سلة الطلبات"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-700 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold">الطلبات</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Field */}
        {isSearchOpenMobile && (
          <div className="sm:hidden pt-3 pb-1">
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
