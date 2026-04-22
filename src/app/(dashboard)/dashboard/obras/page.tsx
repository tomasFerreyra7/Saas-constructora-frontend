'use client';

import { DataTable } from '@/features/projects/components/data-table';
import { ProjectForm } from '@/features/projects/components/project-form'; // <-- Importamos tu formulario
import { Button } from '@/components/ui/button';
import { Plus, Loader2, AlertCircle } from 'lucide-react';

// Importamos las piezas del Panel Lateral
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useGetProjects } from '@/features/projects/api/use-get-projects';

// Mock data (la que ya tenías)
// const data: Project[] = [
//   {
//     id: 1,
//     name: 'Edificio Vistas del Río',
//     address: 'Av. 7 de Marzo 1500',
//     tenantId: 1,
//     latitude: -31.6666,
//     longitude: -60.7712,
//     radiusMeters: 150,
//     usersCount: 12,
//   },
//   {
//     id: 2,
//     name: 'Loteo Los Sauces',
//     address: 'Ruta 19 Km 2.5',
//     tenantId: 1,
//     latitude: -31.65,
//     longitude: -60.8,
//     radiusMeters: 300,
//     usersCount: 5,
//   },
// ];

export default function ObrasPage() {
  const { data: projects, isLoading, isError } = useGetProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Obras Activas</h2>
          <p className="text-muted-foreground">Gestiona los perímetros de fichaje y ubicaciones de tus proyectos.</p>
        </div>

        {/* Aquí está la magia: El Sheet envuelve al botón y al formulario */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nueva Obra
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[90vw] sm:min-w-[600px] md:min-w-[700px] overflow-y-auto overflow-x-hidden">
            <SheetHeader className="mb-6">
              <SheetTitle>Registrar Nueva Obra</SheetTitle>
              <SheetDescription>Ingresa los datos del nuevo proyecto para habilitar el fichaje.</SheetDescription>
            </SheetHeader>

            {/* Inyectamos el formulario tal cual lo construimos */}
            <ProjectForm />
          </SheetContent>
        </Sheet>
      </div>

      {isLoading ? (
        // Estado 1: Cargando (Spinner)
        <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-card border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Conectando con la base de datos...</p>
        </div>
      ) : isError ? (
        // Estado 2: Error de conexión
        <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-destructive/10 text-destructive border-destructive border-dashed">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-sm font-medium">Error de conexión con el servidor.</p>
          <p className="text-xs">Asegúrate de que NestJS esté corriendo en el puerto 8080.</p>
        </div>
      ) : (
        // Estado 3: Éxito (Mostramos la tabla real)
        // Pasamos projects || [] por si viene null o undefined
        <DataTable data={projects || []} />
      )}
    </div>
  );
}

