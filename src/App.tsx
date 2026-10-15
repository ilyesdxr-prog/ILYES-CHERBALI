import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { Product, PRODUCTS } from './data/products';
import { OrderData } from './components/OrderForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'product' | 'thank-you'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ordersHistory, setOrdersHistory] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem('ilyes_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle URL hash or direct routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (hash.startsWith('#/product/')) {
        const prodId = hash.replace('#/product/', '');
        const found = PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
          window.scrollTo(0, 0);
          return;
        }
      } else if (hash === '#/thank-you') {
        setCurrentPage('thank-you');
        window.scrollTo(0, 0);
        return;
      }

      // Default home
      if (hash === '' || hash === '#/' || hash === '#') {
        setCurrentPage('home');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#/';
    setCurrentPage('home');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `#/product/${product.id}`;
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSubmitted = (order: OrderData) => {
    setLastOrder(order);
    const updated = [order, ...ordersHistory];
    setOrdersHistory(updated);
    try {
      localStorage.setItem('ilyes_orders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    window.location.hash = '#/thank-you';
    setCurrentPage('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <Header
        onNavigateHome={navigateToHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={ordersHistory.length}
        onOpenCart={() => {
          if (lastOrder) {
            setCurrentPage('thank-you');
            window.location.hash = '#/thank-you';
          } else {
            navigateToHome();
          }
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-8">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={navigateToProduct}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onBack={navigateToHome}
            onSubmitOrder={handleOrderSubmitted}
          />
        )}

        {currentPage === 'thank-you' && (
          <ThankYouPage
            order={lastOrder}
            onNavigateHome={navigateToHome}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateHome={navigateToHome} />
    </div>
  );
}
