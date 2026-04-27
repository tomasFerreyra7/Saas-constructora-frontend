import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // 1. Hacemos la petición POST a tu backend
        mutationFn: async (newProject: any) => {
            const { data } = await api.post("/projects", newProject);
            return data;
        },
        // 2. Si sale bien, mostramos el éxito y RECARGAMOS LA TABLA
        onSuccess: () => {
            toast.success("¡Obra registrada exitosamente en la base de datos!");
            // Esta línea invalida la caché y hace que la tabla haga un GET automático
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        // 3. Si falla (ej. error 500 de NestJS), avisamos
        onError: (error) => {
            console.error("Error del backend:", error);
            toast.error("Ocurrió un error al intentar guardar la obra.");
        }
    });
};
