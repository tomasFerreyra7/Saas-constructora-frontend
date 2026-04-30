import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Este middleware intercepta TODAS las rutas de Next.js
export function middleware(request: NextRequest) {
    // 1. Buscamos el token que guardaste en el paso anterior
    const token = request.cookies.get('auth_token')?.value

    // 2. ¿A qué página está intentando entrar?
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

    // 3. Regla 1: Si quiere entrar al panel pero no tiene token -> Lo pateamos al login
    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 4. Regla 2: Si ya está logueado y quiere entrar al login -> Lo mandamos al panel
    if (isLoginRoute && token) {
        return NextResponse.redirect(new URL('/dashboard/obras', request.url))
    }

    // 5. Si todo está bien, lo dejamos pasar
    return NextResponse.next()
}

// Configuración opcional: le decimos a Next.js a qué rutas debe aplicarle esta vigilancia
// (Para ahorrar recursos y no vigilar imágenes o archivos css)
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login'
    ]
}
