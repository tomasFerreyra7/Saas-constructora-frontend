import { User } from "@/features/users/types";

export interface Project {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    radiusMeters: number;
    tenantId: number;
    deletedAt: string | null;
    // Si tienes la interfaz de User, cámbiala aquí
    users?: User[];
    createdAt?: string;
    updatedAt?: string;
}

// Este tipo representa lo que el Backend espera recibir (tu DTO)
export type CreateProjectInput = Omit<Project, 'id' | 'tenantId' | 'users' | 'deletedAt' | 'createdAt' | 'updatedAt'>;
