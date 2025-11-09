# BancoSim Frontend

Aplicación creada con Next.js (App Router) que replica un panel bancario interno. Integra Bootstrap para la interfaz y expone tres flujos principales: exploración de productos, simulación de créditos/inversiones y flujo básico de onboarding de clientes.

## ⚙️ Tech Stack
- Next.js 16 con React 19 y TypeScript
- Bootstrap 5 (CSS + bundle JS mediante `BootstrapClient`) y Bootstrap Icons
- Alias de rutas `@/*` para importar utilidades y tipos desde `src`

## 🚀 Puesta en Marcha
1. Instala dependencias: `npm install`
2. Ejecuta en desarrollo: `npm run dev`
3. Abre `http://localhost:3000`. El layout ya monta `Sidebar` y Bootstrap, por lo que no necesitas pasos adicionales.

## 🧭 Navegación y Funcionalidades

### Inicio (`/`)
- Hero con imagen y copy de bienvenida que explica los flujos del panel.
- Sirve como punto de partida para dirigir al usuario al menú lateral.

### Productos (`/products`)
- BFF con **SSR en cada request** (`dynamic = 'force-dynamic'`) para que los saldos permanezcan frescos; el servidor llama a `fetchProducts` y entrega la lista lista para renderizar.
- Búsqueda con debounce (300 ms) que filtra por nombre, alias o tipo.
- Tarjetas responsivas con badges por tipo, alias opcional y saldo formateado con `Intl.NumberFormat`.
- Mensaje de vacío cuando no hay coincidencias y layout responsivo basado en Bootstrap.

### Simulador (`/simulator`)
- Ruta marcada con **ISR (revalidate en producción)** para poder cachear la UI y refrescarla sólo cuando cambien las reglas del simulador.
- Formulario dinámico que cambia etiquetas y validaciones según el tipo de producto seleccionado.
- Hook de input monetario con caret estable, montos mínimos por tipo y feedback inmediato.
- Para créditos: selector crediticio que precarga tasas sugeridas, plazos permitidos e impide continuar si falta alguna selección.
- Para CDT/Inversión: selector compuesto plazo/tasa que sincroniza los campos de meses y TEA.
- Cálculos centralizados en `src/lib/utils/financial.ts` (sistema francés y crecimiento compuesto) y resultados explicativos con tasa, plazo y monto final.

### Onboarding (`/onboarding`)
- Card con formulario Bootstrap (nombre, tipo/número de documento, correo) con validaciones controladas campo a campo.
- Incluye un reCAPTCHA simulado con token oculto; sólo permite enviar si el token está en estado `OK` y muestra un código UUID de seguimiento cuando la solicitud es aceptada.

## 🧱 Componentes Compartidos y Utilidades
- `Sidebar`: navegación fija con estados de colapso y resaltado de ruta activa (`usePathname`).
- `BootstrapClient`: carga el bundle JS de Bootstrap sólo en cliente para mantener la compatibilidad con SSR.
- `src/lib/config/simulator.ts`: define tasas por producto, presets de crédito e intervalos de plazos que consume `Simulator`.
- `src/types/product.d.ts`: contrato tipado que usan las páginas y utilidades para renderizar productos.

## 📦 Despliegue
Puedes desplegar en Vercel sin configuraciones extra. Asegúrate de habilitar la variable `NODE_ENV=production` durante `next build`.
