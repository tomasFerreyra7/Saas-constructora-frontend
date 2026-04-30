import { useAuthStore } from '@/features/auth/store/use-auth-store';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/'

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        // 1. Buscamos el token en nuestro estado global
        const token = useAuthStore.getState().token;

        // 2. Si hay token, lo inyectamos en la cabecera de Autorización
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
