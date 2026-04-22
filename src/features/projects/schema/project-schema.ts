import { z } from "zod"

export const createProjectSchema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
    address: z.string().min(5, { message: "La dirección física es obligatoria." }),

    // Validaciones geográficas estrictas
    latitude: z.number()
        .min(-90, "La latitud mínima es -90")
        .max(90, "La latitud máxima es 90"),
    longitude: z.number()
        .min(-180, "La longitud mínima es -180")
        .max(180, "La longitud máxima es 180"),

    radiusMeters: z.number()
        .int("El radio no puede tener decimales")
        .positive("El radio de fichaje debe ser mayor a 0")
        .default(100),

    // Claves foráneas y relaciones necesarias para tu backend
    tenantId: z.number().int().positive("Se requiere el identificador de la constructora (Tenant)."),

    // Array de IDs de usuarios para la tabla intermedia project_assignments
    userIds: z.array(z.number()),
})

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>
