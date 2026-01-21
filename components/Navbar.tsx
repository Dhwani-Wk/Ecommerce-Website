'use client';


import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { getCategories, Category } from '@/lib/api';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className='flex items-center gap-4 sm:gap-8'>
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>

                    <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        E-Commerce
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Products
                        </Link>
                        <div className="relative group">
                            <button className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-1 focus:outline-none transition-colors">
                                Categories
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 w-48 bg-zinc-900 border border-gray-800 shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <Link href="/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                                    All Products
                                </Link>
                                {categories.map(cat => (
                                    <Link key={cat.id} href={`/?categoryId=${cat.id}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <Link href="/cart" className="relative group p-2">
                        <span className="sr-only">Cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full border-2 border-black transform translate-x-1/4 -translate-y-1/4">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 hover:bg-white/5 p-1 rounded-md transition-colors">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-700" />
                                <span className="text-sm font-medium text-gray-300 hidden sm:block">{user.name}</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-zinc-950 border-t border-gray-800">
                    <div className="px-4 py-3 space-y-1">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Menu
                        </p>
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                        >
                            All Products
                        </Link>

                        <p className="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Categories
                        </p>
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                href={`/?categoryId=${cat.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                            >
                                {cat.name}
                            </Link>
                        ))}

                        {user && (
                            <>
                                <div className="border-t border-gray-800 my-4"></div>
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-700" />
                                    <div className="text-sm">
                                        <div className="font-medium text-white">{user.name}</div>
                                        <div className="text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Your Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-900/10"
                                >
                                    Sign out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
