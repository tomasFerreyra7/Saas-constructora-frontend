import { cookies } from 'next/headers';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AuthGuard } from '@/features/auth/components/auth-guard';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. El servidor lee las cookies antes de dibujar nada
  const cookieStore = await cookies();

  // 2. Verificamos si el usuario había colapsado el menú anteriormente
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false';

  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="flex flex-1 flex-col w-full">
          {/* Un encabezado sutil con el botón para abrir/cerrar el menú */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
          </header>

          {/* Aquí adentro se renderiza tu página de Obras */}
          <div className="p-6 overflow-auto">{children}</div>
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}

