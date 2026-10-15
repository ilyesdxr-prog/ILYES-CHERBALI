'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { HomePage } from '@/src/pages/HomePage';
import { Product } from '@/src/data/products';

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectProduct = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header
        onNavigateHome={() => router.push('/')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={0}
      />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-8">
        <HomePage
          onSelectProduct={handleSelectProduct}
          searchQuery={searchQuery}
        />
      </main>
      <Footer onNavigateHome={() => router.push('/')} />
    </div>
  );
}
