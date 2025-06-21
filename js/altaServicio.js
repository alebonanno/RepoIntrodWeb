function mostrarServicios() {
    const tablaBody = document.querySelector('#tablaServicios tbody');
    tablaBody.innerHTML = ''; // Limpia el contenido previo
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const usuarioEnSesion = sessionStorage.getItem('usuario'); // Verificar si hay usuario en sesión

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
    

    // Agregar formulario para ingresar nombre y apellido
    const filaFormulario = document.createElement('tr');
    filaFormulario.innerHTML = `
        <td colspan="3">
            <label>Nombre: <input type="text" id="nombreUsuario" required></label>
            <label>Apellido: <input type="text" id="apellidoUsuario" required></label>
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