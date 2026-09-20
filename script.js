"use strict";

const PALABRAS = [
  "JAVASCRIPT", "NAVEGADOR", "SERVIDOR", "FUNCION", "VARIABLE",
  "ARCHIVO", "TECLADO", "ORDENADOR", "INTERNET", "PANTALLA",
  "PROGRAMA", "USUARIO", "ENLACE", "BOTON", "VENTANA",
];

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_FALLOS = 6;

const DIBUJOS = [
`  +---+
  |   |
      |
      |
      |
      |
=========`,
`  +---+
  |   |
  O   |
      |
      |
      |
=========`,
`  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
`  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
`  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
`  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
`  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
];

const estado = {
  palabra: "",
  letrasIntentadas: new Set(),
  fallos: 0,
  terminada: false,
  ganadas: 0,
  perdidas: 0,
  modoCaos: false,
};

/* ---------- Referencias DOM ---------- */
const $dibujo = document.getElementById("dibujo");
const $palabra = document.getElementById("palabra");
const $mensaje = document.getElementById("mensaje");
const $teclado = document.getElementById("teclado");
const $ganadas = document.getElementById("ganadas");
const $perdidas = document.getElementById("perdidas");
const $btnJugarOtra = document.getElementById("btnJugarOtra");

/* ---------- Flujo del juego ---------- */
function iniciarPartida() {
  estado.palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  estado.letrasIntentadas = new Set();
  estado.fallos = 0;
  estado.terminada = false;

  renderTeclado();
  pintarPalabra();
  pintarDibujo();
  mostrarMensaje("");
}

function renderTeclado() {
  $teclado.innerHTML = "";
  LETRAS.forEach((letra) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.id = `tecla-${letra}`;
    boton.className = "tecla";
    boton.textContent = letra;
    boton.addEventListener("click", () => intentarLetra(letra));
    $teclado.appendChild(boton);
  });
}

function intentarLetra(letra) {
  if (estado.terminada || estado.letrasIntentadas.has(letra)) return;
  estado.letrasIntentadas.add(letra);

  const boton = document.getElementById(`tecla-${letra}`);
  boton.disabled = true;

  if (estado.palabra.includes(letra)) {
    boton.classList.add("acertada");
    pintarPalabra();
    if (palabraCompleta()) finalizarPartida(true);
  } else {
    boton.classList.add("fallida");
    estado.fallos++;
    pintarDibujo();
    if (estado.fallos >= MAX_FALLOS) finalizarPartida(false);
  }
}

function palabraCompleta() {
  return estado.palabra.split("").every((letra) => estado.letrasIntentadas.has(letra));
}

function pintarPalabra() {
  $palabra.textContent = estado.palabra
    .split("")
    .map((letra) => (estado.letrasIntentadas.has(letra) ? letra : "_"))
    .join(" ");
}

function pintarDibujo() {
  $dibujo.textContent = DIBUJOS[estado.fallos];
}

function finalizarPartida(gano) {
  estado.terminada = true;
  LETRAS.forEach((letra) => { document.getElementById(`tecla-${letra}`).disabled = true; });

  if (gano) {
    estado.ganadas++;
    mostrarMensaje("¡Has ganado! 🎉");
  } else {
    estado.perdidas++;
    $palabra.textContent = estado.palabra.split("").join(" ");
    mostrarMensaje(`Has perdido. La palabra era "${estado.palabra}".`);
  }
  actualizarMarcador();
}

function mostrarMensaje(texto) { $mensaje.textContent = texto; }

function actualizarMarcador() {
  $ganadas.textContent = estado.ganadas;
  $perdidas.textContent = estado.perdidas;
}

/* ---------- Hidden features ---------- */
// Escribe "dd" para alternar el modo oscuro, o "caos" para el modo caos.
let bufferTeclas = "";
let intervaloCaos = null;

function alternarModoCaos() {
  estado.modoCaos = !estado.modoCaos;
  document.body.classList.toggle("modo-caos", estado.modoCaos);

  if (estado.modoCaos) {
    intervaloCaos = setInterval(desordenarTeclado, 900);
  } else {
    clearInterval(intervaloCaos);
    ordenarTecladoAlfabeticamente();
  }
}

function desordenarTeclado() {
  const botones = Array.from($teclado.children);
  for (let i = botones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [botones[i], botones[j]] = [botones[j], botones[i]];
  }
  botones.forEach((boton) => {
    boton.style.setProperty("--giro", `${Math.floor(Math.random() * 50 - 25)}deg`);
    $teclado.appendChild(boton);
  });
}

function ordenarTecladoAlfabeticamente() {
  LETRAS.forEach((letra) => {
    const boton = document.getElementById(`tecla-${letra}`);
    boton.style.removeProperty("--giro");
    $teclado.appendChild(boton);
  });
}

window.addEventListener("keydown", (evento) => {
  if (evento.key.length === 1) {
    bufferTeclas = (bufferTeclas + evento.key.toLowerCase()).slice(-4);
    if (bufferTeclas.endsWith("dd")) {
      document.body.classList.toggle("modo-oscuro");
      bufferTeclas = "";
    } else if (bufferTeclas === "caos") {
      alternarModoCaos();
      bufferTeclas = "";
    }
  }

  const tecla = evento.key.toUpperCase();
  if (LETRAS.includes(tecla)) intentarLetra(tecla);
});

/* ---------- Arranque ---------- */
$btnJugarOtra.addEventListener("click", iniciarPartida);
iniciarPartida();
