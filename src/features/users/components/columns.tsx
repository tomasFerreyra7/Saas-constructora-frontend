'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Mail, ShieldCheck, UserCog, Edit, Trash2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { User } from '../types';
import { useAuthStore } from '@/features/auth/store/use-auth-store';
import { useDeleteUser } from '../api/use-delete-user';
import { ConfirmModal } from '@/components/shared/confirm-modal';
import { EditUserForm } from './edit-user-form';

const UserActionsCell = ({ userToManage }: { userToManage: User }) => {
  const currentUser = useAuthStore((state) => state.user);
  const isAdmin = currentUser?.role === 'ADMIN';
  const deleteMutation = useDeleteUser();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const onConfirmDelete = () => {
    deleteMutation.mutate(userToManage.id, {
      onSuccess: () => setIsDeleteModalOpen(false),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(userToManage.email)}>
            <Mail className="mr-2 h-4 w-4" />
            Copiar Email
          </DropdownMenuItem>

          {isAdmin && (
            <>
              <DropdownMenuSeparator />

              {/* onSelect previene que el menú cierre el panel de edición */}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsEditSheetOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar usuario
              </DropdownMenuItem>

              {/* Condición para que el ADMIN no pueda borrarse a sí mismo */}
              {currentUser?.id !== userToManage.id && (
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Dar de baja
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* MODAL: Confirmación para borrar */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        title="¿Dar de baja a este empleado?"
        description={`Estás a punto de eliminar el acceso de ${userToManage.name}. Esta acción no se puede deshacer.`}
        confirmText="Sí, dar de baja"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />

      {/* PANEL (SHEET): Formulario para editar */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="w-[90vw] sm:min-w-[600px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Editar Perfil</SheetTitle>
            <SheetDescription>Modifica los datos de {userToManage.name}. Los cambios se aplicarán al instante.</SheetDescription>
          </SheetHeader>

          <EditUserForm user={userToManage} onSuccessCallback={() => setIsEditSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre Completo',
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Mail className="h-3 w-3" />
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol de Usuario',
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={role === 'ADMIN' ? 'default' : 'secondary'} className="capitalize">
          {role === 'ADMIN' ? <ShieldCheck className="mr-1 h-3 w-3" /> : <UserCog className="mr-1 h-3 w-3" />}
          {role === 'ADMIN' ? 'Administrador' : 'Capataz'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserActionsCell userToManage={row.original} />,
  },
];

