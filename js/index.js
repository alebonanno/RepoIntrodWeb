document.addEventListener('DOMContentLoaded', () => {
    mostrarSalones()

    // Para verificar despues si es un suario logueado (Admin) o usuario final.
    const userLogueado = sessionStorage.getItem('usuario')

    if (userLogueado){
        const salir = document.getElementById('logout');
        if (salir){
            salir.addEventListener('click', () =>{
                sessionStorage.clear();
                window.location.href = 'login.html';
            })
        }
    }
})


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