'use client';

import Link from 'next/link';
import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative bg-zinc-900 border border-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <Link href={`/products/${product.id}`} className="aspect-square w-full overflow-hidden bg-gray-950 group-hover:opacity-75 lg:h-80 block">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400';
                    }}
                />
            </Link>
            <div className="mt-4 flex flex-col justify-between px-4 pb-4 flex-grow">
                <div>
                    <h3 className="text-sm text-gray-200 font-medium line-clamp-2 min-h-[2.5rem]">
                        <Link href={`/products/${product.id}`} className="hover:text-blue-400 transition-colors">
                            {product.title}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-white">${product.price}</p>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/products/${product.id}`}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                        >
                            View
                        </Link>
                        <button
                            onClick={() => addToCart(product)}
                            className="p-1.5 text-xl bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
                            title="Add to Cart"
                        >
                            🛒
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
