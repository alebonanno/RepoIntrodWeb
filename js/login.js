// Verifica si el usuario ya esta logueado.
if (sessionStorage.getItem('usuario')){
    alert('Este usuario ya esta logueado.')
    // Redireccionamiento
    window.location.href = 'altaSalon.html';
    // Caso contrario se quedara en el login.
}
document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();//Cuando llegue el evento no se recarga la página

    const usuario =  document.getElementById('usuario').value;//Toma el valor del objeto id usuario
    const password = document.getElementById('contrasena').value;//Toma el valor del objeto id contrasena

    if (usuario === 'admin' && password === '1234') {
        sessionStorage.setItem('usuario', usuario);//seteamos en local storage que par usuario le asigne el valor de la constante ususario
        alert('Logueo exitoso.')
        window.location.href = 'altaSalon.html';//Lo redirigimos a la pagina altaSalon.html
    }
    else{
        alert('Datos incorrectos.')
    }
})
document.getElementById('volver').addEventListener('click', function() {
    window.location.href = 'index.html';
});
