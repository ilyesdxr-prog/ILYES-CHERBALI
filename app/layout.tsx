import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ilyes Shop - متجر الدفع عند الاستلام في الجزائر',
  description: 'متجر إلياس شوب الجزائري: تسوق أفضل المنتجات مع خدمة الدفع عند الاستلام والتوصيل السريع لـ 58 ولاية جزائرية.',
  openGraph: {
    title: 'Ilyes Shop - متجر الدفع عند الاستلام في الجزائر',
    description: 'تسوق أفضل المنتجات مع خدمة الدفع عند الاستلام والتوصيل السريع لـ 58 ولاية جزائرية.',
    locale: 'ar_DZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
