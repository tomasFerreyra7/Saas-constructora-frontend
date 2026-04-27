'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Mail, ShieldCheck, UserCog } from 'lucide-react';

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
import { User } from '../types';

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
          {role}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>Copiar Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Dar de baja</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

