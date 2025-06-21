
document.addEventListener('DOMContentLoaded', () => { //Con DOMContentLoaded hace que el evento se ejecuta cuando el contenido del HTML ha sido completamente cargado.
    if (!sessionStorage.getItem("usuario")) {
        alert('Debe loguearse');
        window.location.href = 'login.html';
        return;
    }

    // Mostrar salónescomo admin.
    mostrarSalones()

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener("click", () => {
           // sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
  

    const form = document.getElementById('formSalon');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const valor = document.getElementById('valor').value;
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const salon = {nombre, direccion, descripcion, valor};

        const salones = JSON.parse(localStorage.getItem('salones')) || [];
        const indexEditar = sessionStorage.getItem('indexEditar');
        if (indexEditar !== null) {
            //Estamos editando un elemento existente
            salones[indexEditar] = salon;
            sessionStorage.removeItem('indexEditar');//Borramos el item a editar
        } else {
            //Estamos agregando un nuevo elemento
            salones.push(salon);
        }
        
        localStorage.setItem('salones', JSON.stringify(salones));//agregamos el elemento salones al local storage


        alert(` Salon guardado: \n nombre: ${nombre} \n--direccion: ${direccion} \n--descripcion: ${descripcion} \n--valor: ${valor}`);
        form.reset();//Limpia el formulario
        
        mostrarSalones();
    });
    mostrarSalones();
});

function mostrarSalones(){
    const tablaBody = document.querySelector('#tablaSalones tbody');
    tablaBody.innerHTML = ''; //Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    salones.forEach((salon,index) =>{  //index es una posición unica en el array
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.valor}</td>
        <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${index})">Eliminar</button>
        </td>
        `;
        tablaBody.appendChild(fila);
    })

    // Eventos para los botones 'editar' y 'borrar'
    document.querySelectorAll('.borrar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            borrarSalon(index)
        });
    });

    document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editarSalon(index)
        });
    });
}

function borrarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    // Elimina la posición 'index' del arreglo.
    salones.splice(index, 1);
    // Guarda el array actualizado en localStorage.
    localStorage.setItem('salones', JSON.stringify(salones));
    // Vuelve a mostrar la tabla actualizada.
    mostrarSalones()
}


function editarSalon(index) {
    // Obtiene el array almacenado en localStorage.
    // Si no existe crea un array vacio para evitar errores.
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    // Obtiene el salón segun el indice recibido como parámetro.
    const salon = salones[index]

    // Se guarda el indice del salón a editar, y los datos del salón.
    // Asi se pasan los datos a la pagina de edición.
    sessionStorage.setItem('salonAEditar', JSON.stringify({index, salon}));

    // Redirige a la pagina 'altaSalon', para la edición.
    window.location.href = 'altaSalon.html';
}