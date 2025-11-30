# Clima — App demo (Next.js)

Este proyecto es una app Next.js que muestra el clima para una ciudad (demo). Incluye:
- Interfaz para buscar por ciudad (mock y API real si usas OpenWeatherMap)
- Endpoints API para obtener el clima y guardar historial en Postgres
- Docker Compose con Postgres y pgAdmin

## Despliegue en Vercel (Resumen rápido)

1) Conecta tu cuenta de GitHub a Vercel y añade el repo `ingrid-vega/clima`.
2) En el panel del proyecto en Vercel, configura las variables de entorno en la sección *Environment Variables*:
   - `OPENWEATHER_API_KEY` = (tu clave de OpenWeatherMap) — opcional para usar datos reales
   - `DATABASE_URL` = (cadena de conexión Postgres para la DB que uses en Vercel/externa)
   - `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD` — opcionales si usas pgAdmin en Docker local
3) Despliega: Vercel hará el build automáticamente.

Nota: Vercel no aloja Postgres directamente; usa un servicio externo (p.ej. Supabase, Neon, ElephantSQL, Heroku Postgres). Configura `DATABASE_URL` con la cadena de conexión.

## Recomendación para Postgres en Vercel
- Usa un proveedor administrado (Supabase / Neon): son gratuitos para pruebas y manejan conexiones serverless mejor.
- Configura `DATABASE_URL` en Vercel con la cadena que te da tu proveedor.
- Si tu DB tiene límites de conexiones, habilita pooling (pgBouncer) o usa la solución serverless del proveedor.

## Despliegue usando Docker (local)
Para levantar la app + Postgres + pgAdmin localmente:

```powershell
docker compose up --build -d
docker compose ps
```

Accede:
- App: http://localhost:3000
- pgAdmin: http://localhost:8080

## Cómo probar la API y el historial
- POST `/api/history` para guardar una búsqueda.
- GET `/api/history` para obtener histórico.

## Notas finales
- `vercel.json` está incluido para configuración mínima del build.
- No subas claves en `.env.local`; usa `.env.local.sample` para referencia.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
