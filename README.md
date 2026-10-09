# Vamos demo

Prototipo visual de una plataforma para encontrar y crear planes con personas y negocios.

## Ejecutar

Requisitos: Node.js compatible con Vite (20.19+ o 22.12+).

```bash
npm install
npm run dev
```

Luego abre la dirección local que Vite muestra en la terminal.

## Acceso de muestra

- Correo: `camila@demo.com`
- Contraseña ficticia: `123456`

También se puede pulsar **Continuar como Camila**.

## Qué se puede probar

- Buscar y filtrar planes por categoría o tipo de organizador.
- Ver detalles e inscribirse o salir de un plan.
- Crear un plan personal o de negocio.
- Consultar actividades organizadas por negocios.
- Cerrar sesión.

## Rutas

- `/login`: acceso ficticio de la demo.
- `/`: exploración y filtros de planes.
- `/negocios`: actividades organizadas por negocios.
- `/mis-planes`: planes propios y planes a los que te uniste.
- `/crear`: formulario para publicar un plan.
- `/planes/:planId`: detalle de un plan.

Las vistas están en `src/pages`, los elementos reutilizables en `src/components` y el estado compartido de la demo en `src/context/DemoContext.jsx`.

Los cambios de planes, inscripciones y sesión se guardan en el `localStorage` de ese navegador. El contenido inicial vive en `src/data/*.json`.

## Alcance

Es una demo local. No tiene backend, cuentas reales, contraseñas reales, mensajería, pagos ni datos compartidos entre navegadores. No se deben usar datos personales ni contraseñas reales.

