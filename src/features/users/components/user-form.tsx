'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { createUserSchema, type CreateUserFormValues } from '../schema/user-schema';
import { useCreateUser } from '../api/use-create-user';

interface UserFormProps {
  onSuccessCallback?: () => void;
}

export function UserForm({ onSuccessCallback }: UserFormProps) {
  const createUserMutation = useCreateUser();

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'FOREMAN',
    },
  });

  function onSubmit(data: CreateUserFormValues) {
    // Extraemos "confirmPassword" para no mandarlo al backend de NestJS
    const { confirmPassword, ...payloadLimpio } = data;

    createUserMutation.mutate(payloadLimpio, {
      onSuccess: () => {
        form.reset();
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña de Acceso</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="bg-muted/20 transition-colors focus:bg-background pr-10"
                        placeholder="Mínimo 8 caracteres"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>Debe incluir al menos una mayúscula, una minúscula y un número.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetir Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="bg-muted/20 transition-colors focus:bg-background pr-10"
                        placeholder="Vuelve a escribir la contraseña"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-5">
            <div className="border-b border-border/50 pb-2">
              <h3 className="text-sm font-medium text-foreground tracking-tight">PERMISOS DEL SISTEMA</h3>
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
                  <FormDescription>El Capataz solo utilizará el sistema para registrar entradas/salidas y ver datos básicos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/50">
            <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => form.reset()} disabled={createUserMutation.isPending}>
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
                </>
              ) : (
                'Registrar Miembro'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

