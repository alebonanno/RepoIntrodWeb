import {login} from './auth.js';/*importamos la funcion login desde auth.js*/

// Verifica si el usuario ya esta logueado.
if (sessionStorage.getItem('usuario')){
    alert('Este usuario ya esta logueado.')
    // Redireccionamiento
    window.location.href = 'altaSalon.html';
    // Caso contrario se quedara en el login.
}
//Le damos funcionalidad al botón volver linkeandolo a index.html
document.getElementById('volver').addEventListener('click', function() {
    window.location.href = 'index.html';
});

/*
if(sessionStorage.getItem("usuario")){
    alert('Este usuario ya está logueado');
    window.location.href = '../altaSalon.html';        
}*/
/*Este código en JavaScript maneja el evento de envío (submit) de un formulario con el id="loginForm". 
Su propósito es validar las credenciales del usuario y, si son correctas, almacenar información en sessionStorage y redirigirlo a otra página.
La función que maneja el evento es asíncrona (async), lo que permite el uso de await dentro de ella.
*/
document.getElementById('loginForm').addEventListener('submit', async function(event){
    event.preventDefault();//evitar que el formulario se envíe de manera tradicional (recargando la página).
    const usuario = document.getElementById('usuario').value;//Se obtiene el valor ingresado en los campos de entrada (input) con id="usuario"
    const pass = document.getElementById('contrasena').value;//Se obtiene el valor ingresado en los campos de entrada (input) con id="contrasena"


    const usuarioValidado = await login(usuario,pass); /*Le asigno a usuarioValidado el valor de userOk de la funcion login de auth.js
    Se usa await porque login es una función asíncrona que devuelve una promesa.
    usuarioValidado contendrá los datos del usuario si las credenciales son correctas, o undefined/false si son incorrectas.*/
    if(usuarioValidado){/*Si usuarioValidado no es Undefine entonces entra al if*/
        sessionStorage.setItem('usuario', usuarioValidado.username);//seteamos en local storage que para usuario le asigne el valor de la
                                                                //  constante username de ususarioValidado
        sessionStorage.setItem('token', usuarioValidado.accessToken);//guardamos en local starage el token, mail nombre y apellido
        sessionStorage.setItem('nombre', usuarioValidado.firstName);
        sessionStorage.setItem('apellido', usuarioValidado.lastName);
        sessionStorage.setItem('email', usuarioValidado.email);
        alert('Logueo exitoso');    //Se dispara un alert indicando el logueo exitoso
        window.location.href = '../altaSalon.html';//Lo redirigimos a la pagina altaSalon.html
    }else{
        alert('Usuario incorrecto'); //Si el usuario no ha sido validado entonce dispara un alert y no hace el login
    }
});
