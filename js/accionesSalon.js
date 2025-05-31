function editarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones') || []);
    const salon = salones[index];

    document.getElementById('nombre').value=salon.nombre;
    document.getElementById('direccion').value=salon.direccion;
    document.getElementById('descripcion').value=salon.descripcion;
    document.getElementById('valor').value=salon.valor;
    
    // Guardar índice para saber que estamos editando
    sessionStorage.setItem('indexEditar', index);

    // Desplazar la vista hacia el formulario
    document.getElementById('formSalon').scrollIntoView({ behavior: 'smooth' });

}

function eliminarSalon(index) {
    // Obtener el arreglo de salones desde localStorage
    let salones = JSON.parse(localStorage.getItem('salones')) || [];

    // Confirmar si el usuario realmente quiere eliminar el salón
    if (confirm(`¿Estás seguro de que quieres eliminar el salón "${salones[index].nombre}"?`)) {
        // Eliminar el elemento en la posición "index"
        salones.splice(index, 1);

        // Guardar el arreglo actualizado en localStorage
        localStorage.setItem('salones', JSON.stringify(salones));

        // Volver a mostrar la lista actualizada
        mostrarSalones();
    }
}