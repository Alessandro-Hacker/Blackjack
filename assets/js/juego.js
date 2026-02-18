//Patron de módulo: es una función autoejecutable que devuelve un objeto con las funciones que queremos exponer al exterior, en este caso, el nuevoJuego. Esto nos permite encapsular el código y evitar la contaminación del espacio global.
const miModulo = (() => {
    "use strict";

    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

    // referencias de componentes del HTML
    const jugadorCartas = document.querySelector("#jugador-cartas"),
        jugadorPuntos = document.querySelector("#jugador-puntos"),
        computadoraCartas = document.querySelector("#computadora-cartas"),
        computadoraPuntos = document.querySelector("#computadora-puntos");

    const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

    const inicializarJuego = () => crearDeck();

    // Función para crear una nueva baraja
    const crearDeck = () => {
        deck = [];
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
        // función de la librería underscore para mezclar el deck
        return _.shuffle(deck);
    };

    

    //DATOS_IMPORTANTE: todos los script pueden ser trabajados como arreglos
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); // extrae el valor de la carta sin el tipo
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //isNaN() devuelve true si el argumento no es un número
    };

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }        
        return deck.pop();
    };

    
    const acumularPuntos = (carta, jugador) => {
        if(jugador){
            jugadorPuntos.innerText = Number(jugadorPuntos.innerText) + valorCarta(carta);
        } else {
            computadoraPuntos.innerText = Number(computadoraPuntos.innerText) + valorCarta(carta);
        }
    }

    const crearCarta = (carta, jugador) => {        
        if(jugador){
            jugadorCartas.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
        } else {
            computadoraCartas.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
        }
    }

    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            crearCarta(carta, false);
            acumularPuntos(carta, false);

            if (puntosMinimos > 21) {
                break;
            }
        } while (
            Number(computadoraPuntos.innerText) < puntosMinimos &&
            puntosMinimos <= 21
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
        crearCarta(carta, true);
        acumularPuntos(carta, true);

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
        inicializarJuego();        
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

    return {
        nuevoJuego,
        nuevaCarta,
        detener
    }
})();
