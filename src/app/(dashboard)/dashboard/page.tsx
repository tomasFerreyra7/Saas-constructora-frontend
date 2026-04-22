export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Bienvenido al Panel</h1>
      <p className="text-muted-foreground">Aquí verás un resumen del estado de tus obras, flujo de caja y alertas de inventario.</p>

      {/* Cajas de ejemplo para probar el grid de Tailwind */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Obras Activas</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Presupuestos Pendientes</h3>
          <p className="text-2xl font-bold mt-2">4</p>
        </div>
      </div>
    </div>
  );
}

