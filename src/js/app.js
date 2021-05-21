let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    inciarApp();
})

function inciarApp(){
    mostrarServicios();

    //Resalta el Div Actual segun su Tab



    //Oculta o muestra una seccion segun el Tab
    cambiarSeccion()
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

   enlaces.forEach(enlace => {
       enlace.addEventListener('click', e => {
           e.preventDefault();

           pagina = parseInt(e.target.dataset.paso);

           const seccion = document.querySelector(`#paso-${pagina}`);
           seccion.classList.add('mostrar-seccion');
       })
   })
       
   
    
}

async function mostrarServicios(){
    try {
            const resultado = await fetch('./servicios.json');
            const db = await resultado.json();

            const {servicios} = db;

            //General el HTML
            servicios.forEach(servicio => {
                const {id, nombre, precio} = servicio;

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

function seleccionarServicio(e){
    let elemento; 
    //Forzar que el elemento que le damos click sea un DIV
    if(e.target.tagName === 'P'){
       elemento = e.target.parentElement;
    }else{
        elemento = e.target;
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');
    }else{
        elemento.classList.add('seleccionado');
    }
}

