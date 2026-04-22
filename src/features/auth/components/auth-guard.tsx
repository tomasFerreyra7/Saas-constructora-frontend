'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/use-auth-store';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Esperamos a que Zustand recupere el token del localStorage (hidratación)
    if (token === null && pathname !== '/login') {
      router.replace('/login');
    } else {
      setIsReady(true);
    }
  }, [token, router, pathname]);

  // Mientras se verifica la sesión, mostramos un spinner de carga
  if (!isReady && pathname !== '/login') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Verificando credenciales...</p>
      </div>
    );
  }

  return <>{children}</>;
}

