'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createProjectSchema, type CreateProjectFormValues } from '../schema/project-schema';

export function ProjectForm() {
  const currentTenantId = 1;

  const form = useForm({
    resolver: zodResolver(createProjectSchema) as any,
    defaultValues: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      radiusMeters: 100,
      tenantId: currentTenantId,
      userIds: [],
    },
  });

  function onSubmit(data: CreateProjectFormValues) {
    console.log('Payload perfecto para TypeORM:', data);
    toast.success('Obra registrada correctamente.');
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 pt-4 pb-8">
        {/* SECCIÓN 1: Datos Básicos (Sin cajas, puro espacio en blanco) */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Identificación</h3>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nombre de la Obra</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="Ej: Torre Los Andes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Dirección Física</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="Ej: Av. San Martín 320" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Separador visual limpio */}
        <hr className="border-border" />

        {/* SECCIÓN 2: Coordenadas */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Área de Fichaje</h3>
          </div>

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Latitud</FormLabel>
                <FormControl>
                  <Input className="h-12" type="number" step="any" placeholder="-31.6488" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Longitud</FormLabel>
                <FormControl>
                  <Input className="h-12" type="number" step="any" placeholder="-60.7086" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="radiusMeters"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Radio permitido (metros)</FormLabel>
                <FormControl>
                  <Input className="h-12" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormDescription className="text-sm">Distancia máxima a la redonda para que la app permita fichar.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECCIÓN DE BOTONES: Optimizados para pantallas táctiles */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 mt-2 border-t">
          <Button type="button" variant="ghost" className="h-12 sm:h-10 w-full sm:w-auto text-muted-foreground" onClick={() => form.reset()}>
            Limpiar datos
          </Button>
          <Button type="submit" className="h-12 sm:h-10 w-full sm:w-auto text-base sm:text-sm font-semibold">
            Guardar Obra
          </Button>
        </div>
      </form>
    </Form>
  );
}

