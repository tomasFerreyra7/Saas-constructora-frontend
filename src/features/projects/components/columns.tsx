'use client';
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MapPin, MoreHorizontal, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Tipado exacto reflejando tu entidad TypeORM
export type Project = {
  id: number;
  name: string;
  address: string;
  tenantId: number;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  // Propiedad virtual: ideal que el backend devuelva el conteo de usuarios asignados
  usersCount?: number;
};

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id.toString())}>Copiar ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${project.latitude},${project.longitude}`, '_blank')}>
              Ver en Google Maps
            </DropdownMenuItem>
            <DropdownMenuItem>Asignar Personal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

