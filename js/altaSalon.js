document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem("usuario")) {
        alert('Debe loguearse');
        window.location.href = 'login.html';
        return;
    }

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    }
    
    mostrarSalones();
});

function mostrarSalones(){
    const tablaBody = document.querySelector('#tablaSalones tbody');
    tablaBody.innerHTML = ''; //Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    salones.forEach((salon, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.valor}</td>
        <td class="d-flex justify-content-center gap-2">
            <button class="btn btn-primary editar-btn" data-index="${index}">Editar</button>
            <button class="btn btn-primary borrar-btn" data-index="${index}">Borrar</button>
        </td>
        `;
        tablaBody.appendChild(fila);
    })

    // Eventos para los botnes 'editar' y 'borrar'
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
    salones.splice(index, 1);
    localStorage.setItem('salones', JSON.stringify(salones));
    // Vuelve a mostrar la tabla actualizada.
    mostrarSalones()
}


// Variable global para control y poder editar los salones.
let indiceEdicion = null;
// Actualización de los cambios.
const form = document.getElementById('formSalon');
const botonSubmit = form.querySelector('button[type="submit"]');

function editarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const salon = salones[index];

    // Llena el formulario con los datos existentes
    document.getElementById('nombre').value = salon.nombre;
    document.getElementById('direccion').value = salon.direccion;
    document.getElementById('descripcion').value = salon.descripcion;
    document.getElementById('valor').value = salon.valor;

    indiceEdicion = index;

    // Se cambia el texto del boton.
    botonSubmit.textContent = 'Actualizar';

    // Focus al compo nombre al editar
    document.getElementById('nombre').focus();

}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = document.getElementById('valor').value;


    // Validación para evitar lso campos vacios.
    if (!nombre || !direccion || !descripcion || !valor){
        alert("Completa los campos.");
        return;
    }


    const salones = JSON.parse(localStorage.getItem('salones')) || [];
        
    if (indiceEdicion !== null){
        // Aqui se edita
        salones[indiceEdicion] = {nombre, direccion, descripcion, valor};
        indiceEdicion = null;
        // Se restaura el texto del boton a 'Guardar salón'.
        botonSubmit.textContent = 'Guardar salón'
    }
    else{
        // Aqui se agrega un nuevo salon
        salones.push({nombre, direccion, descripcion, valor});
    }
    
    localStorage.setItem('salones', JSON.stringify(salones));

    form.reset();
    mostrarSalones();

});