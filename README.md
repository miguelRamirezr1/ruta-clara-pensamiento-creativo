# RutaClara

> Avisa de forma proactiva **cuándo y por qué** se detiene un envío en Colombia —sobre todo en
> retenciones de la DIAN—, **cuánto va a tardar** y **qué hacer** para destrabarlo.

Interfaz web del proyecto *Retenciones y Rastreo de Envíos*. Es una **demo de interfaz**
(prototipo navegable de la v1.0.0) construida con **React + Vite + Tailwind**. Los datos son
simulados a propósito: no hay backend. El objetivo es probar en vivo la experiencia de uso y
validar las funcionalidades con usuarios reales, no la lógica de negocio.

> ℹ️ Proyecto académico (curso de emprendimiento "Pensamiento Creativo"). El diseño parte de
> una encuesta propia: la gente no pide *más información*, pide que la información **la busque
> a ella**. Por eso la app es proactiva.

---

## Qué resuelve

- **Aviso inmediato** cuando un envío queda retenido, sin tener que revisar manualmente.
- **Causa en lenguaje simple**, no un estado genérico ni jerga de transportadora.
- **Tiempo estimado** realista y **pasos concretos** para destrabar el envío.
- **Vista compartida** para que el cliente vea la misma información, en tiempo real.
- **Atención con una persona real** (chat de soporte).
- **Modelo freemium**: planes gratis, personal y de negocio.

---

## Stack

| | |
|---|---|
| Framework | React 18 |
| Build / dev server | Vite 5 |
| Estilos | Tailwind CSS 3 |
| Routing | React Router 6 (`HashRouter`) |
| Contenedor | Docker + Docker Compose (Node 20 Alpine) |

Sin backend, sin base de datos, sin dependencias de red.

---

## Cómo correrlo

### Con Docker Compose (recomendado)

```bash
docker compose up --build
```

La app queda en **http://localhost:5173**. Para detenerla: `docker compose down`.

### En local sin Docker

```bash
npm install
npm run dev        # http://localhost:5173
```

### Otros comandos

```bash
npm run build      # build de producción (genera dist/)
npm run preview    # sirve el build de producción
```

---

## Rutas

Como usa `HashRouter`, las URLs llevan `#` (p. ej. `http://localhost:5173/#/envio/SV-88213904`).

| Ruta | Descripción |
|---|---|
| `/` | Panel de envíos con filtros y búsqueda |
| `/envio/:id` | Detalle: causa, tiempo estimado, pasos y línea de tiempo |
| `/agregar` | Asistente para registrar/conectar un nuevo pedido |
| `/plan` | Comparación de planes |
| `/notificaciones` | Centro de alertas (enlazan a su pedido) |
| `/ajustes` | Preferencias de aviso (WhatsApp, push, correo) |
| `/s/:id` | **Vista pública** de solo lectura (lo que ve el cliente final) |

---

## Estructura

```
rutaclara/
├─ src/
│  ├─ components/   Sidebar, Topbar, tarjeta de envío, línea de tiempo, chat, modal…
│  ├─ pages/        Dashboard, detalle, agregar, planes, alertas, ajustes, vista pública
│  ├─ context/      ShipmentsContext (store de envíos) y ChatContext (drawer de soporte)
│  ├─ data/         mockData.js — datos semilla + helpers
│  ├─ App.jsx       rutas + providers
│  ├─ main.jsx      punto de entrada (HashRouter)
│  └─ index.css     Tailwind + estilos base
├─ Dockerfile
├─ docker-compose.yml
└─ tailwind.config.js
```

---

## Cómo funciona (notas de arquitectura)

- **Estado de los envíos:** vive en un store en memoria, `context/ShipmentsContext.jsx`
  (`useShipments()`), **sembrado desde `src/data/mockData.js` en cada carga**. Esto hace que
  cada sesión de prueba empiece limpia. El store expone:
  - `addShipment()` — crea un pedido y lo antepone a la lista.
  - `resolveRetention()` — destraba una retención en una sola acción.
  - `toggleStep()` — marca los pasos de "Qué hacer".
- **Flujos funcionales:** crear pedidos y resolver retenciones **sí** modifican la lista y el
  estado. El chat de soporte es simulado (respuestas predefinidas).
- **Convenciones de datos** (`mockData.js`): estados `retenido | transito | entregado`; los
  pasos que dependen del usuario llevan `ownerAction: true`; las transportadoras fuera del
  catálogo se resuelven con `resolveCarrier(shipment)`. Envío retenido de ejemplo con
  resolución accionable: **`SV-88213904`**.
- **Sin persistencia:** recargar la página reinicia los datos. Es intencional.

---

## Interfaz

- **Español** en toda la interfaz, estados y textos.
- Diseño responsive (móvil y escritorio).
- Paleta y tipografías definidas en `tailwind.config.js`.
