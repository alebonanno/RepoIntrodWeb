
document.addEventListener('DOMContentLoaded', () => { //Espera a que se carge el html para ejecutar el codigo
    if (!sessionStorage.getItem("usuario")) {//Verifica que se ha iniciado sesión
        alert('Debe loguearse');            //Sino salta una alerta y redirige al login.html
        window.location.href = 'login.html';
        return;
    }

    const salir = document.getElementById('volver');//Revisa que si está el boton de volver 
    if (salir) {                                    //En caso de oprimirlo nos regresa al 
        salir.addEventListener("click", () => {     //index.html
            window.location.href = 'index.html';
        });
    }

    const form = document.getElementById('formSalon');//busca el formulario
    form.addEventListener('submit', function(event) {   //Esto se ejecuta al clickear el boton guardar salón
        event.preventDefault();                         //Evita que el formulario por defecto recargue la página cuando se envía el formulario.
        const nombre = document.getElementById('nombre').value; //guarda los valores ingresados en los
        const valor = document.getElementById('valor').value;   //input en variables 
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;

        const salones = JSON.parse(localStorage.getItem('salones')) || []; //Obtiene el valor almacenado en localStorage y convierte el JSON en un array de objetos
        const indexEditar = sessionStorage.getItem('indexEditar'); //Obtiene el ID del salon a editar

        if (indexEditar !== null) {
            // Editando un salón existente
            salones[indexEditar].nombre = nombre;
            salones[indexEditar].direccion = direccion;
            salones[indexEditar].descripcion = descripcion;
            salones[indexEditar].valor = valor;
            sessionStorage.removeItem('indexEditar'); //Borra el idSalon que estaba en indexEditar en el localStorage
        } else {//Si no habia un valor en indexEditar es porque se esta ingresando un nuevo salón
            // Agregando un nuevo salón con id autoincremental, revisa cuantos elementos hay en salones, lo converte en entero,
            //le suma 1 y lo convierte en string. Si no hay salones le asigna "1"
            const nuevoId = salones.length > 0 ? (parseInt(salones[salones.length - 1].idSalon) + 1).toString() : "1";
            const salon = {     //Arma el objeto salon 
                idSalon: nuevoId,
                nombre,
                direccion,
                descripcion,
                valor,
                imagenId: "0",
                estado: "Disponible"
            };
            salones.push(salon);    //Lo agrega al array de salones
        }

        localStorage.setItem('salones', JSON.stringify(salones)); //Parsea el array de salones a JSON y lo almacena en localstorage
        //Lanza un alerta con los datos que se han guardado
        alert(`Salon guardado:\nNombre: ${nombre}\nDirección: ${direccion}\nDescripción: ${descripcion}\nValor: ${valor}`);
        form.reset();   //Borra los datos del formulario
        mostrarSalones();   //ejecuta la funcion para mostrar la lista de salones
    });

    mostrarSalones();
});


function mostrarSalones() {
    const tablaBody = document.querySelector('#tablaSalones tbody'); //Busca el elemento tbody en la tabla con el id tablaSalones 
    tablaBody.innerHTML = ''; // Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || []; //Busca la lista de salones
    
    salones.forEach((salon, index) => { 
        //Recorre el array para tomar los datos de cada salon, index es la posición de cada salon en el array 
        const fila = document.createElement('tr');  //Crea un elemento fila de tabla y lo almacena en la variable fila
        //Crea el contenido de la fila de la tabla según los datos del salón y agrega los botones editar y eliminar
        fila.innerHTML = `                          
        <!--<td>${salon.idSalon}</td>-->
        <td>${salon.nombre}</td>
        <td><img src="images/Salon_comedor.jpg" width="80" height="60"></td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.valor}</td>
        <td>${salon.estado}</td>
        <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${index})">Eliminar</button>
        </td>
        `;
        tablaBody.appendChild(fila); // Agrega la fila a la tabla en el HTML.


    });

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