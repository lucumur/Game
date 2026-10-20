# Instrucciones para agentes (Claude, Gemini/Antigravity, ChatGPT, Grok…)

Lee esto antes de cada tarea en este repositorio. Detalle técnico en [COLABORAR.md](COLABORAR.md); reglas del juego en [REGLAS.md](REGLAS.md).

## 1. Proponer antes de ejecutar
- **No cambies nada sin aprobación.** Antes de tocar un archivo responde con:
  1. Qué entendiste del encargo.
  2. Qué piensas hacer y qué archivos vas a tocar.
  3. Qué no se puede hacer, qué tiene un costo o un riesgo, y qué alternativas ves.
  4. Tus dudas.
- **Espera un "adelante" (o equivalente) del dueño.** Si el encargo es ambiguo, pregunta; no adivines.
- Si a mitad del trabajo descubres que el plan no sirve, detente y avisa antes de cambiar de rumbo.

## 2. No pisar el trabajo de otros
- `git pull --rebase` antes de empezar y antes de cada push. Otros agentes y el editor web hacen commits en `main`.
- Edita solo las partes que cambias; no reescribas archivos completos desde una copia vieja. Nunca `git push --force`.
- Si tocas `web/css` o `web/js`, corre `python3 herramientas/version.py` antes del commit.
- Un tema por commit, mensaje en español que diga qué y por qué.

## 3. Exactitud histórica (Versalles, 1722)
- No inventes. Todo dato histórico nuevo lleva confianza: **confirmado / probable / dudoso**, y fuente si la hay.
- No mezcles categorías distintas (p. ej. apanaje ≠ gobierno de provincia ≠ tierras privadas; ducado ≠ gobierno).
- Si no sabes algo, dilo y déjalo marcado como pendiente.

## 4. Al terminar
- Resume qué cambiaste, qué probaste y qué quedó pendiente o dudoso.
