import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await api.delete(`/users/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success("Usuario dado de baja correctamente");
            // Actualiza la tabla automáticamente
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            toast.error("Ocurrió un error al intentar eliminar el usuario.");
        }
    });
};
