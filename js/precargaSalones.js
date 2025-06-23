  
    if (!localStorage.getItem('salones')) { // Verificar si ya existen datos en localStorage y sino precarga unos de ejemplo
        const salonesPrecarga = [ {
                idSalon: "1",
                nombre: "Salon happypark",
                direccion: "Av. Principal 123",
                descripcion: "Salón moderno y colorido, ideal para celebraciones infantiles y eventos familiares inolvidables.",
                valor: "120000",
                imagenId: "1",
                estado:"Disponible"
            },
            {
                idSalon: "2",
                nombre: "Salon jungla",
                direccion: "Calle Secundaria 456",
                descripcion: " Ofrece un ambiente selvático y divertido, perfecto para fiestas infantiles llenas de aventura y fantasía.",
                valor: "100000",
                imagenId: "2",
                estado:"Disponible"
            },
            {
                idSalon: "3",
                nombre: "Salon grande",
                direccion: "Edificio B, Piso 2",
                descripcion: "Ofrece un espacio amplio y elegante, ideal para eventos sociales, reuniones y celebraciones especiales.",
                valor: "280000",
                imagenId: "3",
                estado:"Reservado"
            },
            {
                idSalon: "4",
                nombre: "Salon de fiesta",
                direccion: "Edificio C, Planta Baja",
                descripcion: "Lugar perfecto para disfrutar momentos únicos, con música, color y diversión garantizada",
                valor: "150000",
                imagenId: "4",
                estado:"Disponible"
            },
            {
                idSalon: "5",
                nombre: "Salon moderno",
                direccion: "Edificio C, Planta Baja",
                descripcion: "Lugar perfecto para disfrutar momentos únicos, con música, color y diversión garantizada",
                valor: "240000",
                imagenId: "5",
                estado:"Reservado"
            },
            {
                idSalon: "6",
                nombre: "Salon comedor",
                direccion: "Edificio C, Planta Baja",
                descripcion: "Lugar perfecto para disfrutar momentos únicos, con música, color y diversión garantizada",
                valor: "230000",
                imagenId: "6",
                estado:"Reservado"
            }

        ];

        localStorage.setItem('salones', JSON.stringify(salonesPrecarga));/*Transforma a salonesPrecarga en un JSON y lo guarda 
                                                    en localStorage bajo la clave 'salones'*/
    };
    if (!localStorage.getItem('imagenes')) { // Verificar si ya existen datos en localStorage y sino precarga unos de ejemplo
        const imagenesPrecarga = [
            { idImagenes: "0", idSalon: "0", ruta: "images/logo_idw.svg" },
            { idImagenes: "1", idSalon: "1", ruta: "../images/happypark_slider_16.jpg" },
            { idImagenes: "2", idSalon: "2", ruta: "images/NUESTRAS-JUNGLAS-MIXCOAC.jpg" },
            { idImagenes: "3", idSalon: "3", ruta: "images/salon-grande.jpg" },
            { idImagenes: "4", idSalon: "4", ruta: "images/Salon_de_fiesta.jpg" }, 
            { idImagenes: "5", idSalon: "5", ruta: "images/Salon_moderno.jpg" },
            { idImagenes: "6", idSalon: "6", ruta: "images/salon_comedor.jpg" }
        ];

        localStorage.setItem('imagenes', JSON.stringify(imagenesPrecarga));
    };
    if (!localStorage.getItem('servicios')) { // Verificar si ya existen datos en localStorage y sino precarga unos de ejemplo
        const serviciosPrecarga = [
            { idServicios: "1", descripcion: "Mozos", valor: "50000" },
            { idServicios: "2", descripcion: "Ayudante de cocina", valor: "50000" },
            { idServicios: "3", descripcion: "Fotógrafo", valor: "300000" },
            { idServicios: "4", descripcion: "DJ", valor: "300000" }
        ];

        localStorage.setItem('servicios', JSON.stringify(serviciosPrecarga));
    };


    mostrarSalones();    
function mostrarSalones() {
    const contenedor = document.querySelector('#containerFichas');//Selecciona el primer elemento que encuentre que tenga el atributo id="containerFichas"
                                                                    //  en el HTML. y lo guarda en contenedor para poder usarlo
    contenedor.innerHTML = ''; // Limpia el contenido previo
    const salones = JSON.parse(localStorage.getItem('salones')) || []; //obtiene el json de localStorage y lo convierte en array para poder usarlo
    const imagenes = JSON.parse(localStorage.getItem('imagenes')) || []; // Obtener imágenes

    salones.forEach((salon) => {
        const ficha = document.createElement('div');
        ficha.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-4'); // Agrega las clases al div

        // Buscar la imagen correspondiente al salón
        const imagenSalon = imagenes.find(img => img.idSalon === salon.idSalon);

        // Definir clases y atributos del botón según el estado
        const botonClase = salon.estado === "Reservado" ? "btn-danger" : "btn-success";/*operador ternario, si es reservado se vera rojo sino verde*/
        const botonDisabled = salon.estado === "Reservado" ? "disabled" : "";        //operador ternario si esta Reservado el boton no estara disponible para usarlo
        const botonOnClick = salon.estado === "Disponible" ? `onclick="window.location.href='presupuesto.html?idSalon=${salon.idSalon}'"` : ""; /*Si esta Disponible
                                                            al hacer click se redirigirá a presupuesto.html llevando el numero de salon*/

        /*Crea la ficha de un salon determinado en el array salones*/
        // Agregado de bootstrap al boton.
        ficha.innerHTML = `     
            <div class="Imgs">
                <h2>${salon.nombre}: <br/>$ ${salon.valor}</h2>
                <img src="${imagenSalon ? imagenSalon.ruta : 'images/default.jpg'}" alt="${salon.nombre}" />
                <p>${salon.descripcion}</p>
                <p>${salon.direccion}</p>
                <button type="button" class="btn py-3 px-4 ${botonClase}" ${botonDisabled} ${botonOnClick}>${salon.estado}</button>
            </div>
        `;

        contenedor.appendChild(ficha);  //Muestra la ficha en el html
    });
}