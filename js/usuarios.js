document.addEventListener('DOMContentLoaded', async () =>{
    const tabla = document.querySelector('#tablaUsuarios tbody');

    try {
        const response = await fetch('https://dummyjson.com/users');
        if(response.ok){
            const data = await response.json();
            const usuarios = data.users;

            usuarios.forEach((usuario) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.firstName}</td>
                    <td>${usuario.lastName}</td>
                    <td>${usuario.username}</td>
                    <!--<td>${usuario.password}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.phone}</td>-->
                `;
                tabla.appendChild(fila);
            });
        }else{
            console.error(response.status);
            throw Error("Error al consultar");
        }
    }catch(error){
        console.error("error: ", error);
        alert("error con la api de usuarios");
    };

});
document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'index.html';
});