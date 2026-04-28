'use client';

import { useState } from 'react';
import { DataTable } from '@/features/projects/components/data-table';
import { columns } from '@/features/users/components/columns';
import { UserForm } from '@/features/users/components/user-form';
import { Button } from '@/components/ui/button';
import { UserPlus, Loader2, RefreshCw, AlertCircle, ShieldAlertIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useGetUsers } from '@/features/users/api/use-get-users';
import { useAuthStore } from '@/features/auth/store/use-auth-store';

export default function PersonalPage() {
  const user = useAuthStore((state) => state.user);
  console.log('Usuario en memoria:', user);
  const isAdmin = user?.role === 'ADMIN';

  const { data: users, isLoading, isError, refetch, isFetching } = useGetUsers(isAdmin);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4 animate-in fade-in duration-500">
        <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <ShieldAlertIcon className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Acceso Restringido</h2>
        <p className="text-muted-foreground max-w-[500px]">
          Esta sección es exclusiva para la administración. No tienes los permisos necesarios para gestionar el personal de la empresa.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Personal</h2>
          <p className="text-muted-foreground">Administra los accesos de administradores y capataces de tu empresa.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching} title="Actualizar lista">
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-primary' : ''}`} />
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="flex-1 sm:flex-none">
                <UserPlus className="mr-2 h-4 w-4" /> Nuevo Miembro
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[90vw] sm:min-w-[600px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>Registrar Nuevo Usuario</SheetTitle>
                <SheetDescription>Completa los datos para dar acceso al sistema. La contraseña será requerida para el inicio de sesión.</SheetDescription>
              </SheetHeader>

              <UserForm onSuccessCallback={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-md border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Cargando personal...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-destructive/10 text-destructive border-dashed">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-sm font-medium">Error al obtener la lista de usuarios.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={users || []} />
      )}
    </div>
  );
}

