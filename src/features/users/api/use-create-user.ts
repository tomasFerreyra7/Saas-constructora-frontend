import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CreateUserFormValues } from "../schema/user-schema";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newUser: CreateUserFormValues) => {
            // Como tu backend agarra el tenantId del Token, el payload va súper limpio
            const { data } = await api.post("/users", newUser);
            return data;
        },
        onSuccess: () => {
            toast.success("Personal registrado exitosamente en el sistema");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            const backendError = error.response?.data;
            // Tu backend arroja BadRequestException para correos duplicados, lo capturamos aquí
            if (backendError?.message) {
                toast.error(Array.isArray(backendError.message) ? backendError.message[0] : backendError.message);
            } else {
                toast.error("Ocurrió un error al registrar al usuario.");
            }
        }
    });
};
