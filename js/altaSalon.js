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
    const form = document.getElementById('formSalon');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const valor = document.getElementById('valor').value;
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const salon = {nombre, direccion, descripcion, valor};
        const salones = JSON.parse(localStorage.getItem('salones')) || [];
        salones.push(salon);
        localStorage.setItem('salones', JSON.stringify(salones));//agregamos el elemento salones al local storage


        alert(` El nuevo salon tiene los siguientes atributos nombre: ${nombre} --direccion: ${direccion} --descripcion: ${descripcion} --valor: ${valor}`);
        form.reset();//Limpia el formulario
        
        mostrarSalones();
    });
    mostrarSalones();
});
function mostrarSalones(){
    const tablaBody = document.querySelector('#tablaSalones tbody');
    tablaBody.innerHTML = ''; //Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    salones.forEach((salon) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td>${salon.valor}</td>
        `;
        tablaBody.appendChild(fila);
    })
}