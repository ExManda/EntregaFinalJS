// Lista de destinos para surfear
const destinos = [
    { id: 1, nombre: "Bali, Indonesia", precio: 1200, imagen: "images/bali.jpg" },
    { id: 2, nombre: "Puerto Escondido, Mexico", precio: 800, imagen: "images/puerto_escondido.jpg" },
    { id: 3, nombre: "Gold Coast, Australia", precio: 1500, imagen: "images/gold_coast.jpg" },
    { id: 4, nombre: "Jeffreys Bay, Sudáfrica", precio: 1000, imagen: "images/jeffreys_bay.jpg" },
    { id: 5, nombre: "Río de Janeiro, Brasil", precio: 600, imagen: "images/rio_de_janeiro.jpg" },
    { id: 6, nombre: "Half Moon Bay, EE.UU", precio: 1800, imagen: "images/maverick.jpg" }
];

// API de conversión de moneda
const API_KEY = "f3947cf0375d1003c4a7bff0";
const URL_EXCHANGE = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
let monedaSeleccionada = "USD";

// tasas de cambio de la API
function obtenerTasasDeCambio() {
    return fetch(URL_EXCHANGE)
        .then(response => response.json())
        .then(data => ({
            ARS: data.conversion_rates.ARS,
            BRL: data.conversion_rates.BRL
        }))
        .catch(error => {
            console.error("Error al obtener tasas de cambio:", error);
            return { ARS: null, BRL: null };
        });
}


// Actualizar los precios con tasas de cambio

function actualizarPrecios() {
    obtenerTasasDeCambio()
        .then(tasas => {
            if (!tasas.ARS || !tasas.BRL) {
                console.error("No se pudieron obtener las tasas de cambio.");
                return;
            }

            destinos.forEach(destino => {
                destino.precioARS = (destino.precio * tasas.ARS).toFixed(2);
                destino.precioBRL = (destino.precio * tasas.BRL).toFixed(2);
            });

            renderDestinos();
        })
        .catch(error => console.error("Error al actualizar precios:", error));
}





// Render la aplicación

function renderApp() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <section id="destinos">
            <h2>Destinos Disponibles</h2>
            <label for="moneda">Selecciona tu moneda:</label>
            <select id="moneda">
                <option value="USD">USD - Dólar</option>
                <option value="ARS">ARS - Pesos Argentinos</option>
                <option value="BRL">BRL - Reales Brasileños</option>
            </select>
            <div id="destinos-container"></div>
        </section>

        <section id="formulario">
            <h2>Formulario de Contacto</h2>
            <form id="contactoForm" novalidate>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required placeholder="Ingrese su nombre completo">
                
                <label for="email">Email:</label>
                <input type="email" id="email" required placeholder="Ingrese su email">
                
                <label for="destino">Destino:</label>
                <select id="destino"></select>
                
                <button type="submit">Comprar Pasaje</button>
            </form>
        </section>

        <section id="mensaje"></section>
    `;

    renderDestinos();
    agregarEventoFormulario();
}

// Render los destinos con precios dinámicos
function renderDestinos() {
    const destinosContainer = document.getElementById("destinos-container");
    const selectDestino = document.getElementById("destino");

    destinosContainer.innerHTML = destinos.map(({ nombre, precio, precioARS, precioBRL, imagen }) => {
        let precioMostrado;

        // Mostrar precio de la moneda seleccionada
        if (monedaSeleccionada === "USD") {
            precioMostrado = `$${precio} USD`;
        } else if (monedaSeleccionada === "ARS") {
            precioMostrado = precioARS ? `$${precioARS} ARS` : "Cargando...";
        } else if (monedaSeleccionada === "BRL") {
            precioMostrado = precioBRL ? `R$${precioBRL} BRL` : "Cargando...";
        }

        return `
            <div class="card">
                <img src="${imagen}" alt="${nombre}" class="card-img">
                <div class="card-info">
                    <h3>${nombre}</h3>
                    <p>Precio: ${precioMostrado}</p>
                </div>
            </div>
        `;
    }).join("");

    selectDestino.innerHTML = destinos.map(({ id, nombre }) => `
        <option value="${id}">${nombre}</option>
    `).join("");
}



// Guardar en el localStorage
function guardarEnLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function leerDeLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}



// Evento para cambiar moneda en tiempo real
document.addEventListener("change", (e) => {
    if (e.target.id === "moneda") {
        monedaSeleccionada = e.target.value;
        renderDestinos();
    }
});




// Formulario con SweetAlert
function agregarEventoFormulario() {
    document.getElementById("contactoForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const idDestino = parseInt(document.getElementById("destino").value);

        if (!email.includes("@")) {
            Swal.fire("Email inválido", `La dirección "${email}" no es válida.`, "error");
            return;
        }

        const destinoSeleccionado = destinos.find(d => d.id === idDestino);

        // Datos para storage
        const compra = {
            nombre,
            email,
            destino: destinoSeleccionado.nombre,
            fecha: new Date().toLocaleString()
        };

        console.log("Compra registrada:", compra); // <-- Para verificar en consola

        // Compras previas y nuevas en el storage

        const comprasPrevias = leerDeLocalStorage("compras");
        comprasPrevias.push(compra);
        guardarEnLocalStorage("compras", comprasPrevias);

        Swal.fire("¡Compra Confirmada!", `¡Gracias ${nombre}! Tu pasaje a ${destinoSeleccionado.nombre} está listo.`, "success");
    });
}




// Iniciar la app y actualizar precios
renderApp();
actualizarPrecios();
