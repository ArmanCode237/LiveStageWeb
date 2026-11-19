# Actualización del sitio Live Stage — 19 de noviembre de 2026

## Cambios

1. Sustituidas las cuatro capturas antiguas de Live Stage por renderizados obtenidos del frontend de la versión reciente del instrumento: Perform, Piano, Synth y Organ; el ajuste de escalado Master/Pan/Tune está presente.
2. Integradas dos imágenes reales generadas desde `Stage_OSC.zip` (modo de actuación Live y modo Editor), retirando la demostración inventada de cuatro faders de la web anterior.
3. Actualizados los textos de OSC Live Stage con características respaldadas por los archivos adjuntos: UDP bidireccional, escenas, controles editables y opciones de MIDI por USB o BLE. La versión figura como Alpha.
4. Único destino de aportaciones: **https://paypal.me/theMusicman2237**. Retiradas las propuestas inactivas de Ko-fi y GitHub Sponsors.
5. Conservados React 18, TypeScript, Vite, React Router DOM y las rutas del sitio, sin tocar ninguno de los dos programas originales.

## Comprobaciones

- `tsc --noEmit`: correcto.
- `npm run build:offline`: correcto. Incluye imágenes, CSS, JavaScript y configuración de fallback SPA en `dist/`.
- Navegación por Inicio, Control OSC y Apoyar en Chromium: verificada con modo de prueba de rutas en memoria (para adaptarse a la política del navegador del entorno).
- Render en vista de 1440×900 y 390×844: sin errores JavaScript, imágenes visibles y enlace externo PayPal correcto.
- El editor de OSC original (en modo de vista previa local) generó sus controles por defecto sin errores JavaScript.
- No se validó una conexión real con DAW ni audio, OSC o MIDI físicos; no se modificó ninguno de los dos backends.
- El build Vite nativo (`npm run build`) queda pendiente de ejecutar con dependencias del sistema correspondiente: en este contenedor las dependencias nativas preinstaladas de Rollup/esbuild son para Windows. La vista previa entregada utiliza un bundle alternativo.

## Capturas

- Instrumento (frontend React): `public/media/{perform,piano,synth,organ}.png`.
- OSC real: `public/media/{osc-live,osc-editor}.png`.

## Instalación

Descomprime `Live_Stage_Website_React_Router_Actualizada.zip`, ejecuta `npm install && npm run dev`; para publicar recompila con `npm run build` y despliega la carpeta `dist/`. Para visualizar rápidamente la versión precompilada, descomprime el ZIP de distribución estática y sirve sus archivos con un hosting HTTP que respete el fallback SPA.
