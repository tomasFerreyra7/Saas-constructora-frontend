'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar, // 1. Importamos el hook de Shadcn
} from '@/components/ui/sidebar';
import { Home, HardHat, FileText, Package, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

const items = [
  { title: 'Panel de Control', url: '/dashboard', icon: Home },
  { title: 'Obras', url: '/dashboard/obras', icon: HardHat },
  { title: 'Inventario', url: '/dashboard/inventario', icon: Package },
  { title: 'Personal', url: '/dashboard/personal', icon: Users },
];

export function AppSidebar() {
  // 2. Extraemos la función para cerrar el menú en versión móvil
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2 overflow-hidden">
        {/* Agregamos shrink-0 para que el cuadradito del logo NUNCA se deforme */}
        <div className="bg-primary text-primary-foreground p-1.5 rounded-md flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5" />
        </div>

        {/* Agregamos la magia: group-data-[collapsible=icon]:hidden oculta el texto al achicar */}
        <span className="font-bold text-lg tracking-tight truncate transition-all group-data-[collapsible=icon]:hidden">BuildSaaS</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Empresa</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2"
                      // 3. ¡LA MAGIA! Al hacer clic, cerramos el panel móvil
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

