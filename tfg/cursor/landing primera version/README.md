# Landing SaaS - Primera version

Landing page ficticia para un producto SaaS de productividad y colaboracion en equipo, construida con HTML, CSS y JavaScript separados.

## Estructura

- `index.html`: estructura semantica de la pagina y contenido.
- `styles.css`: sistema visual (paleta, tipografia, componentes reutilizables, responsive y estados).
- `script.js`: validacion del formulario, estados visuales y feedback de envio.

## Decisiones relevantes

- Se uso un enfoque **mobile-first** con breakpoints para tablet y escritorio.
- Los estados de interfaz (error/exito/hover/focus) se manejan con clases para mantener DRY.
- Se priorizo accesibilidad con:
  - HTML semantico (`header`, `main`, `section`, `footer`).
  - Labels asociados y atributos `aria-describedby` / `aria-live`.
  - Estilos de `focus-visible` para navegacion por teclado.

## Como probar

1. Abre `index.html` en tu navegador.
2. Navega por secciones y revisa estados hover/focus.
3. En el formulario:
   - Prueba enviar campos vacios para ver errores.
   - Introduce un email invalido para validar formato.
   - Completa todos los campos para ver mensaje de exito.

## Suposiciones y limitaciones

- El envio de formulario es simulado en frontend (no existe integracion con backend).
- No se incluyeron analiticas ni cookies porque no estaban en el alcance.
