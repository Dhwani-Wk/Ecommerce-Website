'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, getRelatedProducts, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductResultPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const productData = await getProduct(id);
                setProduct(productData);

                if (productData) {
                    const related = await getRelatedProducts(productData.category.id);
                    setRelatedProducts(related.filter((p: Product) => p.id !== productData.id));
                }
            } catch (error) {
                console.error("Failed to fetch product details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-zinc-800 aspect-square rounded-lg"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-zinc-800 rounded w-3/4"></div>
                        <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
                        <div className="h-24 bg-zinc-800 rounded w-full"></div>
                        <div className="h-10 bg-zinc-800 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-12 text-gray-400">Product not found.</div>;
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden bg-zinc-900 border border-gray-800">
                    <img
                        src={product.images[0] || 'https://placehold.co/600?text=No+Image'}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{product.title}</h1>
                        <p className="mt-2 text-lg text-gray-400">{product.category.name}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                    </div>

                    <button
                        onClick={() => {
                            addToCart(product);
                            alert('Added to cart!');
                        }}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <span>Add to Cart</span>
                        <span className="text-xl">🛒</span>
                    </button>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-800 pt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
