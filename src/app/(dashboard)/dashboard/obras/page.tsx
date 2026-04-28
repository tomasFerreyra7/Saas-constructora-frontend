'use client';

import { useState } from 'react';
import { DataTable } from '@/features/projects/components/data-table';
import { ProjectForm } from '@/features/projects/components/project-form';
import { Button } from '@/components/ui/button';
// Importamos RefreshCw para el icono de recargar
import { Plus, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { columns } from '@/features/projects/components/columns';

export default function ObrasPage() {
  // 1. Extraemos refetch (la función) e isFetching (para saber si está girando)
  const { data: projects, isLoading, isError, refetch, isFetching } = useGetProjects();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Obras Activas</h2>
          <p className="text-muted-foreground">Gestiona los perímetros de fichaje y ubicaciones de tus proyectos.</p>
        </div>

        {/* 2. Agrupamos los botones a la derecha */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* EL BOTÓN DE REFRESCAR */}
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching} title="Actualizar datos">
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-primary' : ''}`} />
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="flex-1 sm:flex-none">
                <Plus className="mr-2 h-4 w-4" /> Nueva Obra
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[90vw] sm:min-w-[600px] md:min-w-[700px] overflow-y-auto overflow-x-hidden">
              <SheetHeader className="mb-6">
                <SheetTitle>Registrar Nueva Obra</SheetTitle>
                <SheetDescription>Ingresa los datos del nuevo proyecto para habilitar el fichaje.</SheetDescription>
              </SheetHeader>
              <ProjectForm onSuccessCallback={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-card border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Conectando con la base de datos...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-destructive/10 text-destructive border-destructive border-dashed">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-sm font-medium">Error de conexión con el servidor.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={projects || []} />
      )}
    </div>
  );
}

