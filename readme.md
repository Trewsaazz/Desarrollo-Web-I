# Readme — Ahorcado

## estructura

El proyecto son 3 ficheros con una responsabilidad cada uno:

- **`index.html`** — esqueleto: los elementos que el JS necesita (`#dibujo`, `#palabra`, `#mensaje`, `#teclado`, marcador y botón), cada uno con su `id`. 
- **`style.css`** — apariencia. Usa variables CSS (`--bg`, `--texto`, etc.) en `:root`, y la clase `.modo-oscuro` las redefine; por eso cambiar de tema es solo añadir/quitar una clase en el `<body>`, no tocar estilos uno a uno.
- **`script.js`** — toda la lógica, organizada en bloques:
  - **Datos fijos**: `PALABRAS`, `LETRAS`, `MAX_FALLOS` y `DIBUJOS` (los 7 dibujos ASCII del ahorcado, uno por número de fallos).
  - **Un único objeto `estado`**: guarda la palabra actual, las letras probadas (en un `Set`, para no duplicar), los fallos y el marcador. Todo el juego lee y escribe sobre este objeto.
  - **Funciones de flujo**: `iniciarPartida()` prepara una partida nueva; `intentarLetra()` es el corazón del juego (comprueba si la letra está, actualiza fallos, comprueba victoria/derrota); `finalizarPartida()` cierra la partida y actualiza el marcador.
  - **Funciones de pintado separadas de la lógica**: `pintarPalabra()` y `pintarDibujo()` solo leen `estado` y actualizan el DOM, no deciden nada por su cuenta.
  - **Easter eggs**: un único listener de `keydown` en `window` que acumula las últimas teclas pulsadas y compara ese texto con `"dd"` o `"caos"`.
  - **Markdown**: Formateado por IA

## Autopsia — Revision de codigo generado por IA

Cosas que sé que no están perfectas, para no vender el código como mejor de lo que es:

- **Estado global mutable**: `estado` es un objeto global que cualquier función puede modificar directamente. Funciona porque el proyecto es pequeño, pero en algo más grande sería fácil perder de vista quién cambia qué y cuándo.
- **El listener de teclado hace demasiadas cosas a la vez**: en el mismo callback de `keydown` se decide si la tecla es una letra del juego, si activa el modo oscuro o si activa el modo caos. Sería más limpio separarlo en dos o tres funciones pequeñas, aparte de que de esta manera al escribir esas palabras se generan intentos que no deberian ocurrir, es un bug.
- **Dibujos ASCII escritos a mano**: los 7 estados del muñeco del ahorcado están escritos como texto fijo. Si cambiara `MAX_FALLOS` habría que rehacerlos a mano uno a uno en vez de generarlos.
- **Todo en el ámbito global**: no se usan módulos (`import`/`export`), así que todas las funciones y variables comparten el mismo espacio global. No es cómo se estructuraría un proyecto más grande.
- **Comentarios**: En general los comentarios son correctos, claude alucinó un comentario que decia que este proyecto se realizo sin IA, lo cual es mentira, fue eliminado.