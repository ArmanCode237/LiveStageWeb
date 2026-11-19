# Live Stage — Sitio oficial (Vite + React Router)

Sitio web independiente del motor C++ y de OSC Live Stage. Presenta dos productos dentro de la marca **Live Stage**:

- **Live Stage / instrumento virtual:** Piano (cinco capas), Synth (cuatro capas), Organ, mixer y cuatro racks de efectos; el proyecto original usa un backend C++ y una GUI React.
- **OSC Live Stage / controlador:** aplicación independiente, en versión alpha, con OSC bidireccional por UDP, editor de escenas y controles (faders, knobs, pads y toggles), y opciones MIDI (USB y Bluetooth LE) que dependen de las plataformas compatibles.

## Contenido actualizado

- `public/media/perform.png`, `piano.png`, `synth.png`, `organ.png`: capturas generadas de los archivos de la versión reciente de Live Stage, incorporando la corrección de escalado de Perform del 19/11/2026. Se renderizaron en navegador de vista previa *sin backend de audio activo*.
- `public/media/osc-live.png`, `osc-editor.png`: capturas reproducidas desde los archivos `src/index.html`, `src/styles.css` y scripts JavaScript del `Stage_OSC.zip` recibido. Son pantallas reales del frontend, renderizadas localmente sin conexión a un DAW.
- `/osc-live-stage`: presenta la aplicación OSC real, con selector de imágenes Live/Editor, y enumera sus funciones documentadas.
- `/apoyar`: **único enlace de donaciones:** https://paypal.me/theMusicman2237. Se configura en `src/siteConfig.ts`; no existen botones para Ko-fi, Patreon ni GitHub Sponsors.
- Los enlaces de descarga continúan sin configurarse: no se publicaron URLs oficiales para los instaladores.

## Requisitos y ejecución

Node.js 20 o posterior y npm. En la carpeta de este proyecto:

```bash
npm install
npm run dev
```

El servidor Vite mostrará la dirección local en la terminal (usualmente `http://localhost:5173`).

Para producción:

```bash
npm run typecheck
npm run build
npm run preview
```

El contenido de `dist/` se publica en un hosting web. Hay reglas SPA para Netlify (`public/_redirects`) y Vercel (`vercel.json`). Nginx y Apache requieren reescritura de rutas React a `index.html`.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Portada y dos productos |
| `/live-stage` | Instrumento, especificaciones y galería actualizada |
| `/osc-live-stage` | OSC Live Stage, capturas reales y sus funciones |
| `/proyecto` | Visión y prioridades |
| `/apoyar` | Enlace único de donación PayPal |
| `*` | Página 404 |

## Compilación alternativa incluida en esta entrega

Se entrega un `dist/` construido con `npm run build:offline`, que permite ejecutar una **vista previa estática** usando el conjunto de dependencias ya disponible. Es un empaquetador de emergencia sin optimización de Vite; para publicar definitivamente utiliza `npm install && npm run build` en un sistema con las dependencias nativas correspondientes.

```bash
npm run preview:offline
```

## Alcance y notas

El sitio web no se conecta ni modifica el motor C++, los sintetizadores, el plugin VST3 o la aplicación OSC. Mostrar la interfaz de OSC no significa que esta página envíe mensajes OSC; son capturas del proyecto proporcionado. Los pagos se procesan fuera del sitio, en PayPal. Verifica permisos de distribución de software, capturas e imágenes antes de hacer público el código.
