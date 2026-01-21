export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    role: string;
    avatar: string;
}

export interface CreateProductDto {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'API Error');
    }
    return res.json();
}

export const getProducts = async (limit = 10, offset = 0) => {
    return fetchAPI(`/products?limit=${limit}&offset=${offset}`);
}

export const getProduct = async (id: string) => {
    return fetchAPI(`/products/${id}`);
}

export const getRelatedProducts = async (categoryId: number) => {
    return fetchAPI(`/categories/${categoryId}/products?limit=5&offset=0`);
}

export const getCategories = async () => {
    return fetchAPI('/categories');
}

export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }
    return res.json();
}

export const getProfile = async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
}
