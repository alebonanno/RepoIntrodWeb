

        // Obtener el parámetro idSalon de la URL
const urlParams = new URLSearchParams(window.location.search);
const idSalon = urlParams.get('idSalon');

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("main").style.width = "60%";
    document.querySelector("main").style.margin = "0% 20%";
});

if (idSalon) {
    // Obtener los salones desde localStorage
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];

    // Buscar el salón por idSalon
    const salonSeleccionado = salones.find(salon => salon.idSalon === idSalon);
    const imagenSalon = imagenes.find(img => img.idSalon === idSalon);

    if (salonSeleccionado) {
        // Mostrar los datos del salón en la página
        document.getElementById('nombreSalon').textContent = salonSeleccionado.nombre;
        document.getElementById('direccionSalon').textContent = salonSeleccionado.direccion;
        document.getElementById('descripcionSalon').textContent = salonSeleccionado.descripcion;
        document.getElementById('valorSalon').textContent = `$ ${salonSeleccionado.valor}`;
        document.getElementById('imagenSalon').src = imagenSalon ? imagenSalon.ruta : 'images/default.jpg';
    } else {
        document.getElementById('contenidoSalon').innerHTML = "<p>Salón no encontrado.</p>";
    }
    mostrarServicios(idSalon)   
}
function mostrarServicios(idSalon) {
    const tablaBody = document.querySelector('#tablaServicios tbody');
    tablaBody.innerHTML = ''; // Limpia el contenido previo
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const usuarioEnSesion = sessionStorage.getItem('usuario'); // Verificar si hay usuario en sesión
    let total = parseFloat(document.getElementById('valorSalon').textContent.replace('$', '').trim()) || 0;

    servicios.forEach((servicio, index) => {
        const fila = document.createElement('tr');

        let columnaAccion = "";
        if (usuarioEnSesion) {
            // Si hay usuario en sesión, mostrar botones de edición y eliminación
            columnaAccion = `
                <button class="btn btn-sm btn-warning me-2" onclick="editarServicio(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
            `;
        } else {
            // Si no hay usuario en sesión, mostrar checkbox para seleccionar el servicio
            columnaAccion = `
                <input type="checkbox" class="servicio-checkbox" data-valor="${servicio.valor}" onchange="actualizarTotal()">
            `;
        }

        fila.innerHTML = `
            <td>${servicio.descripcion}</td>
            <td>$ ${servicio.valor}</td>
            <td>${columnaAccion}</td>
        `;

        tablaBody.appendChild(fila);
    });


    

    // Agregar formulario para ingresar nombre y apellido y email
    const filaFormulario = document.createElement('tr');
    filaFormulario.innerHTML = `
        <td colspan="3">
            <label>Nombre: <input type="text" id="nombreUsuario" required></label>
            <label>Apellido: <input type="text" id="apellidoUsuario" required></label>
            <label>E-m a i l:         <input type="text" id="emailUsuario" required></label>
        </td>
    `;
    tablaBody.appendChild(filaFormulario);

    // Agregar fila para mostrar el total y el botón de guardar
    const filaTotal = document.createElement('tr');
    filaTotal.innerHTML = `
        <td><strong>Total:</strong></td>
        <td id="totalPrecio">$ ${total}</td>
        <td><button class="btn btn-sm btn-success" onclick="guardarPresupuesto(${idSalon})">Enviar por mail (al localStorage)</button></td>
    `;
    tablaBody.appendChild(filaTotal);
}

function actualizarTotal() {
    let total = parseFloat(document.getElementById('valorSalon').textContent.replace('$', '').trim()) || 0;
    const checkboxes = document.querySelectorAll('.servicio-checkbox');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.getAttribute('data-valor'));
        }
    });

    document.getElementById('totalPrecio').textContent = `$ ${total}`;
}
function guardarPresupuesto(idSalon) {
    const nombre = document.getElementById('nombreUsuario').value.trim();
    const apellido = document.getElementById('apellidoUsuario').value.trim();
    const email = document.getElementById('emailUsuario').value.trim();
    const total = parseFloat(document.getElementById('totalPrecio').textContent.replace('$', '').trim()) || 0;

    if (!nombre || !apellido) {
        alert("Por favor, ingresa tu nombre y apellido.");
        return;
    }

    // Obtener los servicios seleccionados
    const serviciosSeleccionados = [];
    document.querySelectorAll('.servicio-checkbox:checked').forEach(checkbox => {
        serviciosSeleccionados.push(checkbox.closest('tr').querySelector('td').textContent);
    });

    // Obtener el último ID de presupuesto y generar uno nuevo
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const idPresupuesto = presupuestos.length > 0 ? presupuestos[presupuestos.length - 1].idPresupuesto + 1 : 1;

    // Crear objeto de presupuesto
    const nuevoPresupuesto = {
        idPresupuesto,
        nombre,
        apellido,
        fecha: new Date().toLocaleDateString(),
        idSalon,
        valorTotal: total,
        servicios: serviciosSeleccionados
    };

    // Guardar en localStorage
    presupuestos.push(nuevoPresupuesto);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

    alert("Presupuesto guardado correctamente.");
}