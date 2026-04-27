'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createProjectSchema, type CreateProjectFormValues } from '../schema/project-schema';
import { useCreateProject } from '../api/use-create-projects';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
  onSuccessCallback?: () => void;
}

const handleNumberChange = (val: string, onChange: (value: any) => void) => {
  if (val === '' || val === '-' || val === '-0' || val.endsWith('.') || (val.includes('.') && val.endsWith('0'))) {
    onChange(val);
  } else {
    const num = Number(val);
    onChange(isNaN(num) ? val : num);
  }
};

export function ProjectForm({ onSuccessCallback }: ProjectFormProps) {
  const currentTenantId = 1;

  const createProjectMutation = useCreateProject();

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
    const { userIds, tenantId, ...payloadLimpio } = data;

    console.log('Enviando a NestJS:', payloadLimpio);

    createProjectMutation.mutate(payloadLimpio, {
      onSuccess: () => {
        form.reset();
        if (onSuccessCallback) onSuccessCallback();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-4 pb-8">
        <div className="max-w-[550px] mx-auto space-y-10 px-4 sm:px-2">
          {/* SECCIÓN 1: Datos Básicos */}
          <div className="space-y-5">
            <div className="border-b border-border/50 pb-2">
              <h3 className="text-sm font-medium text-foreground tracking-tight">IDENTIFICACIÓN</h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Obra</FormLabel>
                  <FormControl>
                    <Input className="bg-muted/20 transition-colors focus:bg-background" placeholder="Ej: Torre Los Andes" {...field} />
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
                  <FormLabel>Dirección Física</FormLabel>
                  <FormControl>
                    <Input className="bg-muted/20 transition-colors focus:bg-background" placeholder="Ej: Av. San Martín 320" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SECCIÓN 2: Coordenadas */}
          <div className="space-y-5">
            <div className="border-b border-border/50 pb-2">
              <h3 className="text-sm font-medium text-foreground tracking-tight">ÁREA DE FICHAJE</h3>
            </div>

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitud</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted/20 transition-colors focus:bg-background"
                      type="text" // Cambiado a text
                      inputMode="decimal" // Abre el teclado numérico en celulares
                      placeholder="-31.6488"
                      {...field}
                      onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                    />
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
                  <FormLabel>Longitud</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted/20 transition-colors focus:bg-background"
                      type="text"
                      inputMode="decimal"
                      placeholder="-60.7086"
                      {...field}
                      onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                    />
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
                  <FormLabel>Radio permitido (metros)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted/20 transition-colors focus:bg-background"
                      type="text"
                      inputMode="decimal"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Distancia máxima a la redonda para que la app permita fichar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SECCIÓN DE BOTONES */}
          {/* Actualizamos solo la sección de botones para mostrar el estado de carga */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/50">
            <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => form.reset()} disabled={createProjectMutation.isPending}>
              Limpiar datos
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                </>
              ) : (
                'Guardar Obra'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

