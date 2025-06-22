function mostrarServicios() {   //Función para mostrar los servicios en la tabla con id tablaServicios
    const tablaBody = document.querySelector('#tablaServicios tbody');  //Busca el elemento tbody de la tabla id tablaServicios
    tablaBody.innerHTML = ''; // Limpia el contenido previo
    //Busca con la clave 'servicios' en el local storage el JSON y lo convierte en array de objetos, 'servicios'
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  
    //Recorre el array 'servicios' y toma los datos de cada servicio y arma una fila de la tabla
    //con los datos y agrega los botones editar y eliminar
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
        tablaBody.appendChild(fila);    //agrega la fila a la tabla
    });

    // Agregar formulario para ingresar un nuevo servicio
    const filaFormulario = document.createElement('tr');
    filaFormulario.innerHTML = `
        <td><input type="text" id="descripcionServicio" placeholder="Descripción" required></td>
        <td><input type="number" id="valorServicio" placeholder="Valor" required></td>
        <td><button class="btn btn-sm btn-success" onclick="agregarServicio()">Agregar Servicio</button></td>
    `;
    tablaBody.appendChild(filaFormulario);  //Agregamos la fila con el formulario para un nuevo servicio
}
function agregarServicio() {
    //Obtiene del formulario los datos ingresados
    const descripcion = document.getElementById('descripcionServicio').value;
    const valor = document.getElementById('valorServicio').value;

    if (!descripcion || !valor) {   //Si no hay datos en los input salta un alerta
        alert("Por favor, completa todos los campos.");
        return;
    }

    //Busca con la clave 'servicios' en el local storage el JSON y lo convierte en array de objetos, 'servicios'
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const nuevoServicio = { //genera un id autoincremental y asigna los valores del nuevo servicio al objeto nuevoServicio
        idServicio: servicios.length > 0 ? servicios[servicios.length - 1].idServicio + 1 : 1,
        descripcion,
        valor: parseFloat(valor)
    };

    servicios.push(nuevoServicio);      //Agrega el nuevo servicio al array 'servicios'
    localStorage.setItem('servicios', JSON.stringify(servicios));   //parsea el array a JSON y lo almacena en local storage

    mostrarServicios(); // Actualiza la tabla
}
function editarServicio(index) {
    //Busca con la clave 'servicios' en el local storage el JSON y lo convierte en array de objetos, 'servicios'
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios[index];  //Mediante el parámetro index busca el servicio a editar y lo asigna a la constante 'servicio'

    // Mostrar formulario de edición con los datos del servicio en cuestión
    const filaEdicion = document.createElement('tr');
    filaEdicion.innerHTML = `
        <td><input type="text" id="editDescripcion" value="${servicio.descripcion}" required></td>
        <td><input type="number" id="editValor" value="${servicio.valor}" required></td>
        <td>
            <button class="btn btn-sm btn-success" onclick="guardarEdicion(${index})">Guardar</button>
            <button class="btn btn-sm btn-secondary" onclick="mostrarServicios()">Cancelar</button>
        </td>
    `;
    //Busca en la tabla la fila del servicio a editar y la remplaza con la fila con el formulario de edicion
    const tablaBody = document.querySelector('#tablaServicios tbody'); 
    tablaBody.replaceChild(filaEdicion, tablaBody.children[index]);
}

function guardarEdicion(index) {
    //Busca con la clave 'servicios' en el local storage el JSON y lo convierte en array de objetos, 'servicios'
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    //Cambia los valores del servicio a editar en el array por los valores del input del formulario de edicion
    servicios[index].descripcion = document.getElementById('editDescripcion').value;
    servicios[index].valor = parseFloat(document.getElementById('editValor').value);

    localStorage.setItem('servicios', JSON.stringify(servicios));//parsea el array a JSON y lo almacena en local storage
    mostrarServicios();// Actualiza la tabla
}
function eliminarServicio(index) {
    //Busca con la clave 'servicios' en el local storage el JSON y lo convierte en array de objetos, 'servicios'
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.splice(index, 1);     //Elimina en el array 'servicios' los objeto a partir de la posicion index y cantidad 1
    localStorage.setItem('servicios', JSON.stringify(servicios));//parsea el array a JSON y lo almacena en local storage
    mostrarServicios();// Actualiza la tabla
}
//Espera a que se carge el html y ejecuta la función mostrarServicios
document.addEventListener("DOMContentLoaded", mostrarServicios);




