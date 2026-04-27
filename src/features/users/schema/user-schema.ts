import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
        ),
    // Simplificamos al máximo usando solo "message" como pide el error de TS
    role: z.enum(["ADMIN", "FOREMAN"], {
        message: "Debes seleccionar un rol válido"
    }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
