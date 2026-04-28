// Importamos Project para hacer la relación cruzada
import { Project } from "@/features/projects/types";

// Tipamos estrictamente los roles según tu Entidad
export type UserRole = "ADMIN" | "FOREMAN";

export interface User {
    id: number;
    name: string;
    email: string;
    // La contraseña no la ponemos en la interfaz base porque tu backend tiene { select: false }
    tenantId: number;
    role: UserRole;
    createdAt: string; // En el frontend las fechas de la API llegan como ISO strings
    deletedAt: string | null;

    // Relación con Obras
    projects?: Project[];
}

// Interfaz para cuando quieras crear un usuario desde el frontend
export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'projects'> & {
    password?: string; // Solo aquí permitimos la contraseña, para el formulario de registro
};
