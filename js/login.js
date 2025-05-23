// Verifica si el usuario ya esta logueado.
if (sessionStorage.getItem('usuario')){
    alert('Este usuario ya esta logueado.')
    // Redireccionamiento
    window.location.href = '../altaSalon.html';
    // Caso contrario se quedara en el login.
}
document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    const usuario =  document.getElementById('usuario').value;
    const password = document.getElementById('contrasena').value;

    if (usuario === 'admin' && password === 'admin') {
        sessionStorage.setItem('usuario', usuario);
        alert('Logueo exitoso.')
        window.location.href = '../altaSalon.html';
    }
    else{
        alert('Datos incorrectos.')
    }
})
    
