// Juego de adivinar el número

let numeroSecreto = generarNumero();
let intentos = 0;

const inputGuess = document.getElementById("guess");
const btnGuess = document.getElementById("btnGuess");
const mensaje = document.getElementById("mensaje");
const intentosDiv = document.getElementById("intentos");
const btnReiniciar = document.getElementById("btnReiniciar");

function generarNumero() {
  return Math.floor(Math.random() * 100) + 1; // entre 1 y 100
}

function comprobarGuess() {
  const valor = Number(inputGuess.value);

  if (!inputGuess.value || valor < 1 || valor > 100) {
    mensaje.textContent = "Introduce un número entre 1 y 100";
    return;
  }

  intentos++;

  if (valor === numeroSecreto) {
    mensaje.textContent = `¡Correcto! Era el ${numeroSecreto} 🎉`;
    intentosDiv.textContent = `Lo has adivinado en ${intentos} intento(s)`;
    terminarJuego();
  } else if (valor < numeroSecreto) {
    mensaje.textContent = "Más alto ⬆️";
    intentosDiv.textContent = `Intentos: ${intentos}`;
  } else {
    mensaje.textContent = "Más bajo ⬇️";
    intentosDiv.textContent = `Intentos: ${intentos}`;
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
  mensaje.textContent = "";
  intentosDiv.textContent = "";
  inputGuess.disabled = false;
  btnGuess.disabled = false;
  inputGuess.value = "";
  inputGuess.focus();
  btnReiniciar.style.display = "none";
}

btnGuess.addEventListener("click", comprobarGuess);
btnReiniciar.addEventListener("click", reiniciarJuego);

// Permitir pulsar Enter en vez de hacer click
inputGuess.addEventListener("keydown", (e) => {
  if (e.key === "Enter") comprobarGuess();
});
