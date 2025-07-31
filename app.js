// ==========================================================================================
// Variables Globales del Juego
// Estas variables controlan el estado y los datos principales del juego "Número Secreto".
// ==========================================================================================
let numeroSecreto = 0; // Almacena el número aleatorio que el jugador debe adivinar. Se inicializa en 0 y se genera al inicio o reinicio.
let intentos = 0; // Lleva la cuenta de cuántos intentos le ha tomado al jugador adivinar el número.
let listaDeNumerosSorteados = []; // Un array (o lista) que guarda los números secretos que ya han salido para evitar repeticiones.
let numeroMaximo = 10; // Define el rango máximo para el número secreto (el número será entre 1 y este valor).
let monedas = 100; // La cantidad de "monedas" que tiene el jugador, un elemento de gamificación.

// ==========================================================================================
// Funciones de Inicialización y Actualización de la Interfaz (UI)
// Estas funciones se encargan de configurar los mensajes iniciales y mantener la UI actualizada.
// ==========================================================================================

// Muestra un mensaje de bienvenida al usuario.
alert('¡Hola! Bienvenido al juego del número secreto.');
console.log('----------------------------------------------------------------');
console.log('¡Hola! Bienvenido al juego del número secreto.');

// Pide al usuario su nombre al inicio del juego para personalizar la experiencia.
let nombreUsuario = prompt('Por favor, dime tu nombre:');
console.log(`¡Bienvenido, ${nombreUsuario}!`); // Confirma el nombre en la consola.

/**
 * Actualiza la cantidad de monedas mostrada en la interfaz del usuario.
 * Busca el elemento con ID 'cantidadMonedas' y actualiza su contenido de texto.
 */
function actualizarMonedas() {
    document.getElementById('cantidadMonedas').textContent = monedas;
}

/**
 * Asigna texto a un elemento HTML específico.
 * Es una función auxiliar para simplificar la actualización de títulos y párrafos.
 * @param {string} elemento - El selector CSS del elemento HTML (ej. 'h1', 'p', '#miId').
 * @param {string} texto - El texto que se insertará en el elemento.
 */
function asignarTextoAlElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); // Busca el elemento en el DOM.
    elementoHTML.innerHTML = texto; // Asigna el texto al contenido HTML del elemento.
    return; // No devuelve ningún valor explícitamente.
}

/**
 * Muestra información relevante del juego en la consola para depuración.
 * Incluye el número secreto, el intento del usuario y sus tipos de datos.
 * @param {number} numeroDelUsuario - El número que el usuario intentó adivinar.
 */
function mostrarNumerosPorConsola(numeroDelUsuario) {
    console.log('----------------------------------------------------------------');
    console.log(`El número secreto es: ${numeroSecreto}`);
    console.log(`El tipo del número secreto es: ${typeof(numeroSecreto)}`);
    console.log(`Número seleccionado por el usuario: ${numeroDelUsuario}`);
    console.log(`El tipo del número seleccionado por el usuario es: ${typeof(numeroDelUsuario)}`);
    // Compara si los números son iguales tanto en valor (==) como en valor y tipo (===).
    console.log(`¿Los números son iguales (solo valor): ${(numeroDelUsuario == numeroSecreto) ? 'Sí.' : 'No.'}`);
    console.log(`¿Los números son de igual tipo y valor: ${(numeroDelUsuario === numeroSecreto) ? 'Sí.' : 'No.'}`);
    // Muestra el número de intento actual, manejando singular y plural.
    console.log(`Número de ${(intentos === 1) ? 'intento' : 'intentos'}: ${intentos}`);
    return;
}

/**
 * Configura los mensajes iniciales en la interfaz del juego cuando este se carga o reinicia.
 * Establece el título principal, el nombre del usuario y la instrucción para adivinar.
 */
function mensajesIniciales() {
    asignarTextoAlElemento('h1', 'Juego del Número Secreto'); // Título principal del juego.
    asignarTextoAlElemento('#user', nombreUsuario); // Muestra el nombre del usuario en el encabezado.
    asignarTextoAlElemento('h3', `Indica un número del 1 al ${numeroMaximo}.`); // Instrucción para el jugador.
    actualizarMonedas(); // Asegura que las monedas se muestren correctamente al inicio.
    return;
}

/**
 * Establece los parámetros iniciales de las variables para una nueva partida.
 * Genera un nuevo número secreto y reinicia el contador de intentos.
 */
function parametrosInicialesDeVariables() {
    numeroSecreto = generarNumeroSecreto(); // Genera un nuevo número secreto.
    intentos = 1; // Reinicia el contador de intentos a 1.
    return;
}

/**
 * Controla el estado (habilitado/deshabilitado) de los botones de juego.
 * Deshabilita el botón 'Nuevo Juego' y habilita el botón 'Intentar'.
 */
function estadosDeBotonesDeNuevoJuego() {
    document.getElementById('reiniciar').setAttribute('disabled', true); // Deshabilita el botón 'Nuevo juego'.
    document.getElementById('intentar').removeAttribute('disabled'); // Habilita el botón 'Intentar'.
    return;
}

// ==========================================================================================
// Lógica Principal del Juego
// Estas funciones manejan la generación del número, la verificación de intentos y el flujo del juego.
// ==========================================================================================

/**
 * Genera un número aleatorio dentro del rango definido (1 hasta numeroMaximo).
 * Se asegura de que el número no haya sido sorteado previamente en la partida actual.
 * Si todos los números posibles ya fueron sorteados, se notifica al jugador.
 * @returns {number} El número secreto generado.
 */
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Genera un número aleatorio.

    console.log('Número generado:', numeroGenerado);
    console.log('Lista de números sorteados:', listaDeNumerosSorteados);

    // Verifica si ya se sortearon todos los números posibles dentro del rango.
    if (listaDeNumerosSorteados.length === numeroMaximo) {
        // Si todos los números han sido sorteados, muestra un mensaje y deshabilita el botón de intentar.
        asignarTextoAlElemento('h3', `¡Ya se sortearon todos los números posibles (${numeroMaximo})! Reinicia la página con 'F5' para jugar de nuevo.`);
        document.getElementById('intentar').setAttribute('disabled', true); // Deshabilita el botón de intentar.
        // Opcional: podrías considerar un botón de "Reiniciar" el juego completamente aquí, borrando la lista.
        return null; // Devuelve null o undefined si no se puede generar un nuevo número.
    } else {
        // Si el número generado ya está en la lista de números sorteados...
        if (listaDeNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); // ...llama a la función recursivamente para generar otro número.
        } else {
            listaDeNumerosSorteados.push(numeroGenerado); // Si el número es nuevo, lo añade a la lista.
            return numeroGenerado; // Devuelve el número generado.
        }
    }
}

/**
 * Captura el intento del usuario, lo compara con el número secreto y proporciona retroalimentación.
 * Esta función se activa con el botón "Intentar".
 */
function verificarIntento() {
    // Obtiene el valor del input del usuario y lo convierte a un número entero.
    let numeroDelUsuario = parseInt(document.getElementById('valorDelUsuario').value);
    
    // Muestra detalles de la comparación en la consola para depuración.
    mostrarNumerosPorConsola(numeroDelUsuario); 

    if (numeroDelUsuario === numeroSecreto) {
        // El usuario acertó el número.
        monedas += 10; // Gana 10 monedas.
        actualizarMonedas(); // Actualiza el display de monedas.
        asignarTextoAlElemento('h3', `🎉 ¡Felicitaciones ${nombreUsuario}, acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        console.log(`¡Felicitaciones, acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);

        // Habilita el botón 'Nuevo Juego' y deshabilita el botón 'Intentar'.
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', true);
    } else {
        // El usuario no acertó el número.
        monedas -= 5; // Pierde 5 monedas.
        actualizarMonedas(); // Actualiza el display de monedas.

        // Verifica si el jugador se quedó sin monedas.
        if (monedas <= 0) { // Usamos <= 0 para capturar casos donde las monedas bajan de 0.
            asignarTextoAlElemento('h3', `¡Oh no, ${nombreUsuario}! Ya no te quedan monedas para jugar. Reinicia la página con 'F5' para empezar de nuevo.`);
            document.getElementById('intentar').setAttribute('disabled', true); // Deshabilita el botón 'Intentar'.
            document.getElementById('reiniciar').setAttribute('disabled', true); // Asegura que el botón de reiniciar también esté deshabilitado si no hay monedas.
            return; // Termina la función para no dar más pistas.
        }

        // Proporciona una pista al usuario.
        if (numeroDelUsuario > numeroSecreto) {
            asignarTextoAlElemento('h3', '¡El número secreto es Menor!');
        } else {
            asignarTextoAlElemento('h3', '¡El número secreto es Mayor!');
        }

        intentos++; // Incrementa el contador de intentos.
        limpiarCaja(); // Limpia el campo de entrada para el siguiente intento.
    }
    return;
}

/**
 * Limpia el contenido del campo de entrada donde el usuario escribe su número.
 */
function limpiarCaja() {
    document.querySelector('#valorDelUsuario').value = ''; // Selecciona el input por su ID y vacía su valor.
}

/**
 * Reinicia el juego a su estado inicial para comenzar una nueva partida.
 * Esta función se activa con el botón "Nuevo Juego".
 */
function reiniciarJuego() {
    // 1. Limpia el campo de entrada del usuario.
    limpiarCaja();
    // 2. Restablece los mensajes iniciales en la interfaz.
    mensajesIniciales();
    // 3. Restablece el estado de los botones (deshabilita 'Nuevo Juego', habilita 'Intentar').
    estadosDeBotonesDeNuevoJuego();
    // 4. Genera un nuevo número secreto y reinicia el contador de intentos.
    parametrosInicialesDeVariables();
    // Opcional: Podrías querer resetear la listaDeNumerosSorteados si quieres que los números se repitan entre juegos.
    // Para el comportamiento actual (no repetir entre partidas hasta que se acaben todos los números posibles), no se resetea aquí.
    return;
}

// ==========================================================================================
// Ejecución Inicial del Juego
// Estas llamadas inician el juego cuando la página se carga por primera vez.
// ==========================================================================================

mensajesIniciales(); // Configura los textos iniciales en la interfaz.
parametrosInicialesDeVariables(); // Genera el primer número secreto y establece los intentos.