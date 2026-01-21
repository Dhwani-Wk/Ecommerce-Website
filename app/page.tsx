'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, Product } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('categoryId');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [offset, setOffset] = useState(0);
  const LIMIT = 10;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const catId = categoryIdParam ? Number(categoryIdParam) : null;
    setSelectedCategory(catId);
    setOffset(0);
    loadProducts(0, catId);
  }, [categoryIdParam]);

  const loadProducts = async (currentOffset: number, categoryId: number | null) => {
    setLoading(true);
    try {
      let data: Product[];

      let url = `https://api.escuelajs.co/api/v1/products?limit=${LIMIT}&offset=${currentOffset}`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }

      const res = await fetch(url);
      data = await res.json();

      if (data.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };



  const handleNextPage = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    loadProducts(newOffset, selectedCategory);
  };

  const handlePrevPage = () => {
    if (offset === 0) return;
    const newOffset = offset - LIMIT;
    setOffset(newOffset);
    loadProducts(newOffset, selectedCategory);
  };

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-zinc-800 aspect-square rounded-lg mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400">
                No products found.
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0 || loading}
              className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {Math.floor(offset / LIMIT) + 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!hasMore || loading}
              className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
