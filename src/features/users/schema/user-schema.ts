import { z } from "zod";

const USER_ROLES = ["ADMIN", "FOREMAN"] as const;

export const createUserSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.email("Debe ser un correo electrónico válido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            "Debe contener al menos una mayúscula, una minúscula y un número"
        ),
    confirmPassword: z.string().min(1, "Por favor, confirma la contraseña"),
    role: z.enum(USER_ROLES, {
        message: "Debes seleccionar un rol válido"
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // El error se mostrará debajo del segundo campo
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.email("Debe ser un correo electronico válido"),
    password: z.string().optional(),
    role: z.enum(USER_ROLES, { message: "Debes seleccionar un rol válido" })
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
