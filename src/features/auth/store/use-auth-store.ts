import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    token: string | null;
    // Podríamos guardar datos del usuario logueado también
    user: { id: number; name: string; tenantId: number } | null;
    setAuth: (token: string, user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,

            // Función para guardar el token cuando inicie sesión
            setAuth: (token, user) => set({ token, user }),

            // Función para cerrar sesión
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "saas-auth-storage", // Así se llamará en el LocalStorage de tu navegador
        }
    )
)
