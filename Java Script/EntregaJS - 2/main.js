class Destino {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Lista de destinos disponibles para viajar
const destinos = [
    new Destino("Río de Janeiro", 500),
    new Destino("San Pablo", 450),
    new Destino("Chicama", 800),
    new Destino("Puerto Escondido", 1150),
    new Destino("Santiago de Chile", 200),
];

// Carrito de compras
const carrito = [];

function mostrarDestinos() {
    console.log("Destinos disponibles:");
    destinos.forEach((destino, index) => {
        console.log(`${destino.nombre} - $${destino.precio}`);
    });
}


// agregar al carrito

function agregarAlCarrito() {
    const nombreDestino = prompt("Ingrese el nombre del destino que desea comprar:");

    const destinoSeleccionado = destinos.find(destino => destino.nombre.toLowerCase() === nombreDestino.toLowerCase());

    if (destinoSeleccionado && !carrito.includes(destinoSeleccionado)) {
        carrito.push(destinoSeleccionado);
        console.log(`Has agregado ${destinoSeleccionado.nombre} al carrito.`);
    } else {
        alert("Destino no válido o ya está en el carrito.");
    }
}

// calcular  total

function calcularTotal() {
    const totalSinIva = carrito.reduce((total, destino) => total + destino.precio, 0);
    const iva = totalSinIva * 0.21;
    const totalConIva = totalSinIva + iva;

    console.log("Tu carrito:");
    carrito.forEach((destino) => {
        console.log(`- ${destino.nombre}`);
    });
    console.log(`Total sin IVA: $${totalSinIva}`);
    console.log(`IVA (21%): $${iva.toFixed(2)}`);
    console.log(`Total con IVA: $${totalConIva.toFixed(2)}`);

    alert("Buen Viaje");
}

function iniciarCompra() {
    mostrarDestinos();

    let seguirComprando = true;
    while (seguirComprando) {
        agregarAlCarrito();
        seguirComprando = confirm("¿Deseas agregar otro destino?");
    }

    calcularTotal();
}

iniciarCompra();