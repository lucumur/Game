# Cómo colaborar en el Escritorio de Versalles

Este repositorio es **la versión principal** del juego. Pueden editarlo Claude, ChatGPT, Gemini, Grok o una persona.
Se juega en **https://lucumur.github.io/Game/web/** (GitHub Pages publica cada cambio en `main` en un par de minutos).
El artifact de Claude es solo una copia de respaldo y ya no se sincroniza.

## Reglas para quien edite
1. Lee [REGLAS.md](REGLAS.md) antes de tocar mecánicas o datos. **La base es la autoridad.**
2. Exactitud histórica: todo dato nuevo de 1722 lleva nivel de confianza (confirmado / probable / dudoso). No inventes ocupantes, fechas ni cargos.
3. Si tocas `web/css` o `web/js`, corre `python3 herramientas/version.py` antes del commit (evita que los navegadores sigan usando la versión vieja).
4. Cambios pequeños y revisables: un tema por commit, mensaje en español que diga qué y por qué.
5. No renombres funciones ni variables globales sin buscar todos sus usos: los módulos comparten ámbito global.
6. No cambies datos de `web/datos/` a mano salvo para corregir un error documentado; son la exportación de la base de Claude.

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

## Datos e imágenes
En GitHub no hay base de datos en vivo: todo se edita en `web/datos/`. El dueño puede subir retratos, imágenes de estancias y ocupantes desde la propia página pegando su llave de GitHub en *Partida → Llave de GitHub* (`js/github.js` hace los commits). A mano: Un retrato nuevo va en `web/datos/retratos/<id>.jpg` y su nombre de archivo se añade a `web/datos/indice.json`; igual para `estancias/`. Las partidas se guardan solo en el navegador de quien juega (exportables a archivo).

`herramientas/empaquetar.py` sigue generando un archivo único (`dist/escritorio.html`) por si se quiere volver a publicar en Claude.
