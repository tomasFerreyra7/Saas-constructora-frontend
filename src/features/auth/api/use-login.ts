import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "../store/use-auth-store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const router = useRouter()

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            // PASO 1: Hacemos el POST para obtener el token
            const { data: authData } = await api.post("/auth/login", credentials)
            const token = authData.access_token

            // PASO 2: Con el token en mano, le preguntamos al backend "¿Quién soy?"
            // Le pasamos el token en los headers solo para esta petición
            const { data: userData } = await api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // PASO 3: Juntamos ambas cosas y las mandamos al onSuccess
            return { token, user: userData }
        },
        onSuccess: (data) => {
            // Ahora data.user sí existe y tiene tu nombre, email, tenantId y el rol "ADMIN"
            setAuth(data.token, data.user)

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
