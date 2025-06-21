import {login} from './auth.js';/*importamos la funcion login desde auth.js*/

// Verifica si el usuario ya esta logueado.
if (sessionStorage.getItem('usuario')){
    alert('Este usuario ya esta logueado.')
    // Redireccionamiento
    window.location.href = 'altaSalon.html';
    // Caso contrario se quedara en el login.
}
document.getElementById('volver').addEventListener('click', function() {
    window.location.href = 'index.html';
});


if(sessionStorage.getItem("usuario")){
    alert('Este usuario ya está logueado');
    window.location.href = '../altaSalon.html';        
}
document.getElementById('loginForm').addEventListener('submit', async function(event){
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;//Toma el valor del objeto id usuario
    const pass = document.getElementById('contrasena').value;//Toma el valor del objeto id contrasena

    const usuarioValidado = await login(usuario,pass); /*Le asigno a usuarioValidado el valor de userOk de la funcion login de auth.js*/

    if(usuarioValidado){/*Si usuarioValidado no es Undefine entonces entra al if*/
        sessionStorage.setItem('usuario', usuarioValidado.username);//seteamos en local storage que par usuario le asigne el valor de la constante username de ususarioValidado
        sessionStorage.setItem('token', usuarioValidado.accessToken);//guardamos en local starage el token, mail nombre y apellido
        sessionStorage.setItem('nombre', usuarioValidado.firstName);
        sessionStorage.setItem('apellido', usuarioValidado.lastName);
        sessionStorage.setItem('email', usuarioValidado.email);
        alert('Logueo exitoso');
        window.location.href = '../altaSalon.html';//Lo redirigimos a la pagina altaSalon.html
    }else{
        alert('Usuario incorrecto');
    }
});
