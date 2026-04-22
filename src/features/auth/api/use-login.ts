import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "../store/use-auth-store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Ajusta esta interfaz según lo que pida tu backend
interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const router = useRouter()

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            // Hacemos el POST a tu endpoint real
            const { data } = await api.post("/auth/login", credentials)
            return data
        },
        onSuccess: (data) => {
            // OJO AQUÍ: Por defecto NestJS suele devolver { access_token: "..." }
            // Si tu backend devuelve solo { token: "..." }, cambia data.access_token por data.token
            setAuth(data.access_token, data.user)

            toast.success("¡Bienvenido al sistema!")

            // Redirigimos al usuario a la pantalla de obras
            router.push("/dashboard/obras")
        },
        onError: (error) => {
            console.error(error)
            toast.error("Credenciales incorrectas o error de conexión.")
        }
    })
}
