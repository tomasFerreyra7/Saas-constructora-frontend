import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { UpdateUserFormValues } from "../schema/user-schema";

export const useUpdateUser = (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserFormValues) => {
            // Limpiamos la contraseña si está vacía para no mandarla al backend
            const payload = { ...data };
            if (!payload.password || payload.password.trim() === "") {
                delete payload.password;
            }

            const response = await api.patch(`/users/${userId}`, payload);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Datos del usuario actualizados");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            const backendError = error.response?.data;
            if (backendError?.message) {
                toast.error(Array.isArray(backendError.message) ? backendError.message[0] : backendError.message);
            } else {
                toast.error("Ocurrió un error al actualizar al usuario.");
            }
        }
    });
};
