document.addEventListener('DOMContentLoaded', () => {
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
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }
    

// Variable global para controlar la edición.
let indiceEdicion = null;

    // Obtiene el dato 'salonAEditar' de sessionStorage, que tiene la info. del salón a editar.
    const editarData = sessionStorage.getItem('salonAEditar');
    if (editarData){
        // Si existe la información, se edita, parseandola (JSON a objeto).
        const {index, salon} = JSON.parse(editarData);

        // Llena el campo 'nombre' del formulario con el nombre del salón.
        document.getElementById('nombre').value = salon.nombre;
        // Llena el campo 'direccion' del formulario con el nombre del salón.
        document.getElementById('direccion').value = salon.direccion;
        // Llena el campo 'descripcion' del formulario con el nombre del salón.
        document.getElementById('descripcion').value = salon.descripcion;
        // Llena el campo 'valor' del formulario con el nombre del salón.
        document.getElementById('valor').value = salon.valor;

        // Guarda el indice del salón que se esta editando para usarlo luego al guardar.
        indiceEdicion = index;

        // Se cambia el textod el botón a 'Actualizar', ya que se esta editando.
        document.querySelector('button[type=submit]').textContent = 'Actualizar';

        // Focusea el campo 'Nombre', para editar desde ahi.
        document.getElementById('nombre').focus();
    }

    // Se selecciona el formulario del DOM para luego escuchar el envio.
    const form = document.getElementById('formSalon');

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        // Se obtiene el valor de cada campo del formulario, y '.trim()' quita los espacios en blanco antes y despues.
        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const valor = document.getElementById('valor').value.trim();

        // Valida si los campos estan vacios.
        if (!nombre || ! direccion || !descripcion || !valor){
            alert('Todos los campos son obligatorios.')
            return
        }

        // Lee la lista de salones desde localStorage, si no existe devuelve 'null', 
        // asi que se le asigna una lista vacia para evitar errores.
        const salones = JSON.parse(localStorage.getItem('salones')) || [];

        // Aqui si 'indiceEdicion' tiene valor, edita.
        if (indiceEdicion !== null){
            salones[indiceEdicion] = {nombre, direccion, descripcion, valor};
        }
        // Sino crea un salón nuevo y lo coloca al final del array.
        else{
            // Se agrega un salon.
            salones.push({nombre, direccion, descripcion, valor});
        }

        // Se comvierte el array actualizado a 'JSON' y guarda en 'localStorage' para persistir los datos.
        localStorage.setItem('salones', JSON.stringify(salones));

        // Elimina el objeto de edicion temporal guardaedo en 'sessionStorage', porque ya no es necesario.
        sessionStorage.removeItem('salonAEditar');
        // Redirige a 'altaSalon.html', asi refresca la actualización.
        window.location.href = 'altaSalon.html';

    })


});

function mostrarSalones(){
    const tablaBody = document.querySelector('#tablaSalones tbody');
    tablaBody.innerHTML = ''; //Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    // Verificación por consola.
    console.log("Salones cargados: ", salones);
    // Para verificar despues si es un suario logueado (Admin) o usuario final.
    // Se define de nuevo por que afecta solo a la funcion.
    const userLogueado = sessionStorage.getItem('usuario')

    salones.forEach((salon, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td class='centrado-vertical'>${salon.nombre}</td>
        <td>
            <img src='./images/Salon_comedor.jpg' alt='Imagen del salón' style='width: 100px; height: auto;'>
        </td>
        <td class='centrado-vertical'>${salon.direccion}</td>
        <td class='centrado-vertical'>${salon.descripcion}</td>
        <td class='centrado-vertical'>${salon.valor}</td>
        <td class="d-flex justify-content-center gap-2 py-4">
            ${userLogueado ? ` 
            <button class="btn btn-primary editar-btn" data-index="${index}">Editar</button>
            <button class="btn btn-danger borrar-btn" data-index="${index}">Borrar</button>
            `: '<button class="btn btn-primary comprar-btn" data-index="${index}">Comprar</button>'}
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