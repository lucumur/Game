# Cómo colaborar en el Escritorio de Versalles

Este repositorio es la copia de trabajo compartida. Pueden editarlo Claude, ChatGPT, Gemini, Grok o una persona.
La versión jugable con base de datos en vivo está en Claude (artifact); esta es la misma interfaz partida en archivos legibles.

## Reglas para quien edite
1. Lee [REGLAS.md](REGLAS.md) antes de tocar mecánicas o datos. **La base es la autoridad.**
2. Exactitud histórica: todo dato nuevo de 1722 lleva nivel de confianza (confirmado / probable / dudoso). No inventes ocupantes, fechas ni cargos.
3. Cambios pequeños y revisables: un tema por commit, mensaje en español que diga qué y por qué.
4. No renombres funciones ni variables globales sin buscar todos sus usos: los módulos comparten ámbito global.
5. No cambies datos de `web/datos/` a mano salvo para corregir un error documentado; son la exportación de la base de Claude.

## Estructura de `web/`
| Archivo | Contenido |
|---|---|
| `index.html` | Marcado de todas las pantallas (épocas, creación, escritorio, mapa, caras, diario, planes, biografía, relaciones) |
| `libro.html` | Libro de caras completo (fichas, rankings) |
| `css/escritorio.css` | Todo el estilo |
| `js/00-datos.js` | Datos incrustados (personajes del escritorio, linaje, glosario, provincias) |
| `js/01-epocas.js` … `07-contenido-de-ejemplo.js` | Épocas, fechas, catálogos, nombres, creación de personaje, familia, contenido de ejemplo |
| `js/08-utilidades.js` | Funciones `$`, `el`, almacenamiento local |
| `js/09` – `11` | Selector, barra superior, escritorio con papeles |
| `js/12-mapas.js` | Plano del palacio (3 pisos, alas, alojamientos), dominio; esquema de estancias e `INFO_EST` |
| `js/13-buscador-de-lugares.js` | Buscador del mapa |
| `js/14-francia-…` | Mapa de provincias |
| `js/15` – `22` | Caras, linaje, diario y glosario, planes, calendario, épocas, partidas, biografía y relaciones |
| `js/23-navegacion.js` | Navegación entre vistas y arranque (`show`) |
| `js/99-estatico.js` | Fuera de Claude carga `datos/` en lugar de la base en vivo |
| `datos/personajes.json` | Libro de caras (43 personajes) exportado de la base |
| `datos/retratos/`, `datos/estancias/` | Retratos e imágenes de estancias; `datos/indice.json` los enumera |

Los scripts se cargan en orden en `index.html`. Una función declarada en un módulo posterior **no** puede usarse en el nivel superior de uno anterior (sí dentro de funciones que se llaman después).

## Probar
Sirve la carpeta: `cd web && python3 -m http.server` y abre `http://localhost:8000`. (Abrir el archivo con doble clic no carga `datos/`.)
Con GitHub Pages activado (Settings → Pages → rama `main`, carpeta raíz) queda en `https://lucumur.github.io/Game/web/`.

## Volver a Claude
`python3 herramientas/empaquetar.py` genera `dist/escritorio.html` (un solo archivo) que Claude publica en el artifact. Los cambios de datos (personajes, retratos, ocupantes) se suben a la base del artifact por separado.
