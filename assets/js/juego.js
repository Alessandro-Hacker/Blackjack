/**
 * 2C = Two of Clubs(Treboles)
 * 2D = Two of Diamonds(Diamantes)
 * 2H = Two of Hearts(Corazones)
 * 2S = Two of Spades(Picas)
 */
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// referencias de componentes del HTML
const jugadorCartas = document.querySelector("#jugador-cartas");
const jugadorPuntos = document.querySelector("#jugador-puntos");
const computadoraCartas = document.querySelector("#computadora-cartas");
const computadoraPuntos = document.querySelector("#computadora-puntos");

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

// Función para crear una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck); // función de la librería underscore para mezclar el deck
    return deck;
};

crearDeck();

//DATOS_IMPORTANTE: todos los script pueden ser trabajados como arreglos
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // extrae el valor de la carta sin el tipo
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //isNaN() devuelve true si el argumento no es un número
};

const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
};

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        computadoraCartas.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
        const valor = valorCarta(carta);
        computadoraPuntos.innerText =
            Number(computadoraPuntos.innerText) + valor;

        if (puntosMinimos > 21) {
            break;
        }
    } while (
        (Number(computadoraPuntos.innerText) < puntosMinimos) &&
        (puntosMinimos <= 21)
    );

    setTimeout(() => {
        if (Number(computadoraPuntos.innerText) === Number(puntosMinimos)) {
            alert("Nadie gana ");
        } else if (puntosMinimos > 21) {
            alert("Computadora gana");
        } else if (Number(computadoraPuntos.innerText) > 21) {
            alert("Jugador gana");
        } else {
            alert("Computadora gana");
        }
    }, 10);
};

const nuevaCarta = () => {
    let carta = pedirCarta();
    jugadorCartas.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
    const valor = valorCarta(carta);
    jugadorPuntos.innerText = Number(jugadorPuntos.innerText) + valor;

    if (Number(jugadorPuntos.innerText) > 21) {
        console.warn("Lo siento, perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(jugadorPuntos.innerText);
    } else if (Number(jugadorPuntos.innerText) === 21) {
        console.warn("21, genial!");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(jugadorPuntos.innerText);
    }
};

const nuevoJuego = () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    console.log(deck);
    jugadorPuntos.innerText = 0;
    computadoraPuntos.innerText = 0;
    jugadorCartas.innerHTML = "";
    computadoraCartas.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
};

const detener = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(jugadorPuntos.innerText);
};
