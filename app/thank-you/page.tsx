'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ThankYouPage } from '@/src/pages/ThankYouPage';
import { OrderData } from '@/src/components/OrderForm';

export default function ThankYou() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('last_order');
      if (saved) {
        try {
          setOrder(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header
        onNavigateHome={() => router.push('/')}
        searchQuery=""
        onSearchChange={() => {}}
        cartCount={0}
      />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-8">
        <ThankYouPage
          order={order}
          onNavigateHome={() => router.push('/')}
        />
      </main>
      <Footer onNavigateHome={() => router.push('/')} />
    </div>
  );
}
