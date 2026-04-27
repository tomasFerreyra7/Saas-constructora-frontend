'use client';
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MapPin, MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthStore } from '@/features/auth/store/use-auth-store';
import { Project } from '../types';

// Definición de columnas optimizadas
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="text-muted-foreground">#{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre de la Obra',
    cell: ({ row }) => <span className="font-semibold">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    accessorKey: 'radiusMeters',
    header: 'Radio de Fichaje',
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md text-xs font-medium">
        <MapPin className="w-3 h-3 text-muted-foreground" />
        {row.getValue('radiusMeters')}m
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const project = row.original;

      const user = useAuthStore((state) => state.user);
      const isAdmin = user?.role === 'ADMIN';

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {/* 1. Acción pública: Ver en el mapa */}
            <DropdownMenuItem
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${project.latitude},${project.longitude}`, '_blank')}
              className="cursor-pointer"
            >
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Ver en Google Maps
            </DropdownMenuItem>

            {/* 2. Acciones restringidas: Solo visibles si es ADMIN */}
            {isAdmin && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => console.log('Abriendo edición para', project.id)} className="cursor-pointer">
                  <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                  Editar Obra
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => console.log('Disparando modal de eliminación para', project.id)}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar Obra
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

