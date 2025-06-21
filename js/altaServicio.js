function mostrarServicios() {
    const tablaBody = document.querySelector('#tablaServicios tbody');
    tablaBody.innerHTML = ''; // Limpia el contenido previo

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    servicios.forEach((servicio, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${servicio.descripcion}</td>
            <td>$ ${servicio.valor}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editarServicio(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });

    // Agregar formulario para ingresar un nuevo servicio
    const filaFormulario = document.createElement('tr');
    filaFormulario.innerHTML = `
        <td><input type="text" id="descripcionServicio" placeholder="Descripción" required></td>
        <td><input type="number" id="valorServicio" placeholder="Valor" required></td>
        <td><button class="btn btn-sm btn-success" onclick="agregarServicio()">Agregar Servicio</button></td>
    `;
    tablaBody.appendChild(filaFormulario);
}
function agregarServicio() {
    const descripcion = document.getElementById('descripcionServicio').value;
    const valor = document.getElementById('valorServicio').value;

    if (!descripcion || !valor) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const nuevoServicio = {
        idServicio: servicios.length > 0 ? servicios[servicios.length - 1].idServicio + 1 : 1,
        descripcion,
        valor: parseFloat(valor)
    };

    servicios.push(nuevoServicio);
    localStorage.setItem('servicios', JSON.stringify(servicios));

    mostrarServicios(); // Actualiza la tabla
}
function editarServicio(index) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios[index];

    // Mostrar formulario de edición
    const filaEdicion = document.createElement('tr');
    filaEdicion.innerHTML = `
        <td><input type="text" id="editDescripcion" value="${servicio.descripcion}" required></td>
        <td><input type="number" id="editValor" value="${servicio.valor}" required></td>
        <td>
            <button class="btn btn-sm btn-success" onclick="guardarEdicion(${index})">Guardar</button>
            <button class="btn btn-sm btn-secondary" onclick="mostrarServicios()">Cancelar</button>
        </td>
    `;

    const tablaBody = document.querySelector('#tablaServicios tbody');
    tablaBody.replaceChild(filaEdicion, tablaBody.children[index]);
}

function guardarEdicion(index) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios[index].descripcion = document.getElementById('editDescripcion').value;
    servicios[index].valor = parseFloat(document.getElementById('editValor').value);

    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios();
}
function eliminarServicio(index) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.splice(index, 1);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios();
}
document.addEventListener("DOMContentLoaded", mostrarServicios);




