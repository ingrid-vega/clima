
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Clima en Viña del Mar</h1>
        <p className="text-lg text-blue-700">Consulta el estado del tiempo actual</p>
      </header>
      <main className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <section className="w-full" aria-label="Información del clima">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Hoy</h2>
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl">☀️</span>
            <p className="text-4xl font-bold text-gray-900">22°C</p>
            <p className="text-base text-gray-700">Soleado</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <div>
                <dt className="font-medium">Humedad</dt>
                <dd>60%</dd>
              </div>
              <div>
                <dt className="font-medium">Viento</dt>
                <dd>15 km/h</dd>
              </div>
              <div>
                <dt className="font-medium">Presión</dt>
                <dd>1015 hPa</dd>
              </div>
              <div>
                <dt className="font-medium">Sensación</dt>
                <dd>21°C</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <footer className="mt-8 text-gray-500 text-xs">
        <p>Datos simulados para demostración. © 2025</p>
      </footer>
    </div>
  );
}
