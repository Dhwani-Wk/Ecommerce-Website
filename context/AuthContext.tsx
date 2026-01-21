'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loginUser, getProfile, User } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const userProfile = await getProfile(token);
                    setUser(userProfile);
                } catch (error) {
                    console.error("Session expired or invalid:", error);
                    localStorage.removeItem('access_token');
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { access_token } = await loginUser(email, password);
            localStorage.setItem('access_token', access_token);
            const userProfile = await getProfile(access_token);
            setUser(userProfile);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
