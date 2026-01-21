'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-zinc-900 shadow-xl rounded-lg overflow-hidden border border-gray-800">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 w-full"></div>

                    <div className="px-6 py-4 relative">
                        <div className="-mt-16 mb-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-24 w-24 rounded-full border-4 border-zinc-900 shadow-md object-cover bg-gray-800"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + user.name;
                                }}
                            />
                        </div>

                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                            <p className="text-gray-400">{user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wide border border-blue-900/50">
                                {user.role}
                            </span>
                        </div>

                        <div className="border-t border-gray-800 pt-6">
                            <h2 className="text-lg font-medium text-white mb-4">Account Details</h2>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-sm text-gray-300">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-300">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-300 capitalize">{user.role}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                                    <dd className="mt-1 text-sm text-gray-300">#{user.id}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-8 border-t border-gray-800 pt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    logout();
                                    router.push('/login');
                                }}
                                className="px-4 py-2 bg-red-900/20 text-red-400 font-medium rounded-md hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 border border-red-900/30"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
