let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    inciarApp();
});

function inciarApp() {
    mostrarServicios();

    //Resalta el Div Actual segun su Tab
    mostrarSeccion();


    //Oculta o muestra una seccion segun el Tab
    cambiarSeccion();

    //Paginacion siguiente y anterior
    paginaSiguiente();

    paginaAnterior();

    //Comprueba la pagina actual para ocultar o mostrar la paginacion
    botonesPaginador();

    //Muestra el resumen de la cita (o mensaje en caso de que no pase la verificacion)

    mostrarResumen();
    //Almacena el nombre de la cita 
    nombre();
}

function mostrarSeccion() {
    //Eliminar mostrar-seccion de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    //Eliminar la clase de actual en el tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resaltar el Tab actual
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            //Llamar la funcion de mostrar secciòn
            mostrarSeccion();

            botonesPaginador();
        })
    })



}

async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const {
            servicios
        } = db;

        //General el HTML
        servicios.forEach(servicio => {
            const {
                id,
                nombre,
                precio
            } = servicio;

            //DOM Scripting
            //Generar nombre de servicio
            const nombreServicio = document.createElement("P");
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');
            //Generar el Precio de Servicio
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio')

            //Generar un contenedor DIV en servicios
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');

            //Selecciona un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;
            servicioDiv.dataset.idServicio = id;






            //Inyectar precio y nombre
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);



            //Inyectar en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);

        });

    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e) {
    let elemento;
    //Forzar que el elemento que le damos click sea un DIV
    if (e.target.tagName === 'P') {
        elemento = e.target.parentElement;
    } else {
        elemento = e.target;
    }

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');

        const id = parseInt(elemento.dataset.idServicio);

        eliminarServicio(id);
    } else {
        elemento.classList.add('seleccionado');

        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            precio: elemento.firstElementChild.nextElementSibling.textContent,
        }
        // console.log(servicioObj);


        agregarServicio(servicioObj);
    }
}

function eliminarServicio(id) {
    const {
        servicios
    } = cita;
    cita.servicios = servicios.filter(servicio => servicio.id !== id);

    console.log(cita);
}

function agregarServicio(servicioObj) {
    const {
        servicios
    } = cita;

    cita.servicios = [...servicios, servicioObj];

    // console.log(cita);
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++

        botonesPaginador();
    });
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--

        botonesPaginador();
    });
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if (pagina === 1) {
        paginaAnterior.classList.add('ocultar');
    } else if (pagina === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion(); //Cambiar la seccion que se muestra por la pagina
}

function mostrarResumen() {
    // Destructuring
    const {
        nombre,
        fecha,
        hora,
        servicios
    } = cita;

    //Seleccionar resumen
    const resumenDiv = document.querySelector('.contenido-resumen');



    //Validacion
    if (Object.values(cita).includes('')) {
        const noServicios = document.createElement('P');
        noServicios.textContent = "Faltan datos de Servicios hora, fecha o nombre.";

        noServicios.classList.add('invalidar-cita');

        //Agregar a resumen Div
        resumenDiv.appendChild(noServicios);
    }
}

function nombreCita() {
    const nombreInput = document.querySelector('#nombre');
    nombreInput.addEventListener('input', () => {
        console.log('escribiendo');
    })
}