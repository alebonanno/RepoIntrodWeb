//Con document.addEventListener('DOMContentLoaded' se ejecuta 
// el código despues que se cargue el html
document.addEventListener('DOMContentLoaded', async () =>{
        //Busca el elemento tbody dentro de la tabla con id tablaUsuarios
    const tabla = document.querySelector('#tablaUsuarios tbody');

    try {
        //La función es asíncrona (async) porque usa fetch() para obtener datos de una API.
        const response = await fetch('https://dummyjson.com/users');
        if(response.ok){    //Si la respuesta es ok entra al if
            const data = await response.json();//Se convierte la respuesta en JSON (await response.json()).
            const usuarios = data.users;//Se extrae la lista de usuarios (data.users).

            /*Se recorre la lista de usuarios con forEach().
            Se crea un elemento <tr> (fila) para cada usuario.
            Se insertan los datos en la fila (innerHTML).
            Se agrega la fila a la tabla (tabla.appendChild(fila))*/
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
        }else{ //Si la respuesta del fetch es incorrecta se lanza un error
            console.error(response.status);
            throw Error("Error al consultar");
        }
    }catch(error){ //Si ocurre un error, se muestra un mensaje en la consola y una alerta.
        console.error("error: ", error);
        alert("error con la api de usuarios");
    };

});
//Se agrega un event listener al botón con id="logout".
document.getElementById('logout').addEventListener('click', function() {
    window.location.href = 'index.html';// Cuando el usuario hace clic, se redirige a index.html.
});