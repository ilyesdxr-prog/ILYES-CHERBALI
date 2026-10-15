'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { ProductPage } from '@/src/pages/ProductPage';
import { PRODUCTS } from '@/src/data/products';
import { OrderData } from '@/src/components/OrderForm';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const handleOrderSubmitted = (order: OrderData) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_order', JSON.stringify(order));
    }
    router.push('/thank-you');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header
        onNavigateHome={() => router.push('/')}
        searchQuery=""
        onSearchChange={() => {}}
        cartCount={0}
      />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-8">
        <ProductPage
          product={product}
          onBack={() => router.push('/')}
          onSubmitOrder={handleOrderSubmitted}
        />
      </main>
      <Footer onNavigateHome={() => router.push('/')} />
    </div>
  );
}
