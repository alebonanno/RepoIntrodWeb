
document.addEventListener("DOMContentLoaded", function () {
    // Cargar el nav
    document.querySelector("header").innerHTML = `
        <nav>
            <picture>
                <source srcset="images/hamburguesa.svg" media="(max-width: 300px)">
                <img id="logo" src="images/logo_idw.svg" alt="Logo de IDW Introducción al Desarrollo Web">
            </picture>
            <h1>Bienvenidos a IDW S.A.</h1>
            <ul class="menu">
                <li><a class="nav-link" href="index.html">Inicio</a></li>
                <li><a class="nav-link" href="institucional.html">Institucional</a></li>
                <li><a class="nav-link" href="contactos.html">Contacto</a></li>
                <li id="soloMiembros" class="soloMiembros"><a class="nav-link" href="altaSalon.html">New salón</a></li>
                <li id="soloMiembros" class="soloMiembros"><a class="nav-link" href="altaServicio.html">New Servicios</a></li>
                <li><a class="nav-link" id="loginLogoutBtn" href="#">Login</a></li>
            </ul>    
        </nav>
    `;

    // Cargar el footer
    document.querySelector("footer").innerHTML = `
        <p>&copy; 2025 IDW S.A. - Todos los derechos reservados.</p>
    `;

    // Verificar si hay un usuario en sessionStorage
    const usuario = sessionStorage.getItem("usuario");
    const elementosMiembros = document.querySelectorAll(".soloMiembros");
    const loginLogoutBtn = document.getElementById("loginLogoutBtn");

    if (usuario) {
        // Si hay usuario, mostrar los elementos de miembros
        elementosMiembros.forEach(el => el.style.display = "block");

        // Cambiar el botón a "Logout"
        loginLogoutBtn.textContent = "Logout";
        loginLogoutBtn.href = "#"; // Evita que redirija a login.html

        // Agregar evento para cerrar sesión
        loginLogoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("usuario"); // Borra el usuario
            window.location.href = "index.html"; // Redirige al inicio
        });
    } else {
        // Si no hay usuario, ocultar los elementos de miembros
        elementosMiembros.forEach(el => el.style.display = "none");

        // Mantener el botón como "Login"
        loginLogoutBtn.textContent = "Login";
        loginLogoutBtn.href = "login.html"; // Redirige a login.html
    }
    // **Cambiar color del enlace activo según la página**
    const paginaActual = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
    const enlaces = document.querySelectorAll(".nav-link");

    enlaces.forEach(enlace => {
        if (enlace.getAttribute("href") === paginaActual) {
            enlace.style.color = "#800020"; // Color bordeau
        }
    });
});



/*

document.addEventListener("DOMContentLoaded", function () {
    // Cargar el nav
    document.querySelector("header").innerHTML = `
        <nav>
            <picture>
                <source srcset="images/hamburguesa.svg" media="(max-width: 300px)">
                <img id="logo" src="images/logo_idw.svg" alt="Logo de IDW Introducción al Desarrollo Web">
            </picture>
            <h1>Bienvenidos a IDW S.A.</h1>
            <ul class="menu">
                <li><a class="nav-link" href="index.html" data-page="index">Inicio</a></li>
                <li><a class="nav-link" href="institucional.html" data-page="institucional">Institucional</a></li>
                <li><a class="nav-link" href="contactos.html" data-page="contactos">Contacto</a></li>
                <li id="soloMiembros" class="soloMiembros"><a class="nav-link" href="altaSalon.html" data-page="altaSalon">New salón</a></li>
                <li id="soloMiembros" class="soloMiembros"><a class="nav-link" href="altaServicio.html" data-page="altaServicio">New Servicios</a></li>
                <li><a class="nav-link" id="loginLogoutBtn" href="#" data-page="login">Login</a></li>
            </ul>    
        </nav>
    `;

    // Cargar el footer
    document.querySelector("footer").innerHTML = `
        <p>&copy; 2025 IDW S.A. - Todos los derechos reservados.</p>
    `;

    // Verificar si hay un usuario en sessionStorage
    const usuario = sessionStorage.getItem("usuario");
    const elementosMiembros = document.querySelectorAll(".soloMiembros");
    const loginLogoutBtn = document.getElementById("loginLogoutBtn");

    if (usuario) {
        // Si hay usuario, mostrar los elementos de miembros
        elementosMiembros.forEach(el => el.style.display = "block");

        // Cambiar el botón a "Logout"
        loginLogoutBtn.textContent = "Logout";
        loginLogoutBtn.href = "#"; // Evita que redirija a login.html

        // Agregar evento para cerrar sesión
        loginLogoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("usuario"); // Borra el usuario
            window.location.href = "index.html"; // Redirige al inicio
        });
    } else {
        // Si no hay usuario, ocultar los elementos de miembros
        elementosMiembros.forEach(el => el.style.display = "none");

        // Mantener el botón como "Login"
        loginLogoutBtn.textContent = "Login";
        loginLogoutBtn.href = "login.html"; // Redirige a login.html
    }

    // **Cambiar color del enlace activo según la página**
    const paginaActual = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual
    const enlaces = document.querySelectorAll(".nav-link");

    enlaces.forEach(enlace => {
        if (enlace.getAttribute("href") === paginaActual) {
            enlace.style.color = "#800020"; // Color bordeau
            enlace.style.fontWeight = "bold"; // Opcional: hacer el texto más destacado
        }
    });
});*/