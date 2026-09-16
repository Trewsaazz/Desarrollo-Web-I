const MIN = 1;
const MAX = 100;

let numeroSecreto = generarNumero();
let intentos = 0;

const inputGuess = document.getElementById("guess");
const btnGuess = document.getElementById("btnGuess");
const valorLeido = document.getElementById("valorLeido");
const mensaje = document.getElementById("mensaje");
const intentosParrafo = document.getElementById("intentos");
const btnReiniciar = document.getElementById("btnReiniciar");

function generarNumero() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function comprobarGuess() {

  const valorTexto = inputGuess.value;
  const valor = Number(valorTexto);

  // valor vacío o fuera de 1-100 -> aviso sin gastar intento
  if (!valorTexto || valor < MIN || valor > MAX) {
    valorLeido.textContent = "";
    mensaje.textContent = `Introduce un número entre ${MIN} y ${MAX}`;
    return;
  }


  valorLeido.textContent = `Has dicho: ${valor}`;

  intentos++;
  intentosParrafo.textContent = `Intentos: ${intentos}`;

  if (valor === numeroSecreto) {
    mensaje.textContent = `¡Correcto! Era el ${numeroSecreto}. Lo has adivinado en ${intentos} intento(s) 🎉`;
    terminarJuego();
  } else if (valor < numeroSecreto) {
    mensaje.textContent = "Más alto ⬆️";
  } else {
    mensaje.textContent = "Más bajo ⬇️";
  }

  inputGuess.value = "";
  inputGuess.focus();
}

function terminarJuego() {
  inputGuess.disabled = true;
  btnGuess.disabled = true;
  btnReiniciar.style.display = "inline-block";
}

function reiniciarJuego() {
  numeroSecreto = generarNumero();
  intentos = 0;
  valorLeido.textContent = "";
  mensaje.textContent = "";
  intentosParrafo.textContent = "";
  inputGuess.disabled = false;
  btnGuess.disabled = false;
  inputGuess.value = "";
  inputGuess.focus();
  btnReiniciar.style.display = "none";
}

btnGuess.addEventListener("click", comprobarGuess);
btnReiniciar.addEventListener("click", reiniciarJuego);

inputGuess.addEventListener("keydown", (e) => {
  if (e.key === "Enter") comprobarGuess();
});
