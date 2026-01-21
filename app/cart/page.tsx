'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, removeFromCart, total, clearCart } = useCart();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <div className="text-center py-20 bg-zinc-900 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
                <p className="mt-2 text-gray-400">Looks like you haven&apos;t added anything yet.</p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
            </div>

            <ul className="divide-y divide-gray-800">
                {cart.map((item) => (
                    <li key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-6">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-800 bg-gray-800">
                            <img
                                src={item.images[0] || 'https://placehold.co/100?text=No+Image'}
                                alt={item.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="mt-4 sm:mt-0 ml-0 sm:ml-4 flex flex-1 flex-col w-full">
                            <div>
                                <div className="flex justify-between text-base font-medium text-white">
                                    <h3 className="line-clamp-1 mr-4">
                                        <Link href={`/products/${item.id}`} className="hover:text-blue-400 transition-colors">{item.title}</Link>
                                    </h3>
                                    <p className="ml-4 font-bold">${item.price * item.quantity}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-400">{item.category.name}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                <p className="text-gray-400">Qty {item.quantity}</p>

                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="border-t border-gray-800 px-6 py-6 bg-zinc-900/50">
                <div className="flex justify-between text-base font-medium text-white mb-4">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-400 mb-6">
                    Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => {
                            alert('Checkout!');
                        }}
                        className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        Checkout
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center rounded-md border border-gray-700 bg-zinc-800 px-6 py-3 text-base font-medium text-gray-300 shadow-sm hover:bg-zinc-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
