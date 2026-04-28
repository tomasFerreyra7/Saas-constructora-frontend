'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { updateUserSchema, type UpdateUserFormValues } from '../schema/user-schema';
import { useUpdateUser } from '../api/use-update-user';
import { User } from '../types';

interface EditUserFormProps {
  user: User;
  onSuccessCallback?: () => void;
}

export function EditUserForm({ user, onSuccessCallback }: EditUserFormProps) {
  const updateUserMutation = useUpdateUser(user.id);

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role as 'ADMIN' | 'FOREMAN',
      password: '',
    },
  });

  function onSubmit(data: UpdateUserFormValues) {
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        if (onSuccessCallback) onSuccessCallback();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-4 pb-8">
        <div className="max-w-[550px] mx-auto space-y-8 px-4 sm:px-2">
          <div className="space-y-5">
            <div className="border-b border-border/50 pb-2">
              <h3 className="text-sm font-medium text-foreground tracking-tight">DATOS DEL EMPLEADO</h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input className="bg-muted/20 transition-colors focus:bg-background" placeholder="Ej: Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" className="bg-muted/20 transition-colors focus:bg-background" placeholder="Ej: juan@constructora.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-5">
            <div className="border-b border-border/50 pb-2">
              <h3 className="text-sm font-medium text-foreground tracking-tight">PERMISOS Y SEGURIDAD</h3>
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol asignado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/20 focus:bg-background">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FOREMAN">Capataz (Solo lectura en Obras)</SelectItem>
                      <SelectItem value="ADMIN">Administrador (Acceso total)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-muted/20 transition-colors focus:bg-background"
                      placeholder="Dejar en blanco para no cambiarla"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Solo completa este campo si deseas cambiar la contraseña actual del usuario.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                form.reset();
                if (onSuccessCallback) onSuccessCallback();
              }}
              disabled={updateUserMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

