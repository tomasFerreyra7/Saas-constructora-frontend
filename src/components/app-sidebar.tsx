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
} from '@/components/ui/sidebar';
import { Home, HardHat, FileText, Package, Users, Building2 } from 'lucide-react';
import Link from 'next/link';

// 1. Asegúrate de que esta constante NO se haya borrado
const items = [
  { title: 'Panel de Control', url: '/dashboard', icon: Home },
  { title: 'Obras Activas', url: '/dashboard/obras', icon: HardHat },
  { title: 'Presupuestos', url: '/dashboard/presupuestos', icon: FileText },
  { title: 'Inventario', url: '/dashboard/inventario', icon: Package },
  { title: 'Personal', url: '/dashboard/personal', icon: Users },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-md flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight">BuildSaaS</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Empresa</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Estructura blindada: asChild + UN SOLO hijo (Link) */}
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-2">
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

