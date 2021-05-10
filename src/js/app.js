let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    inciarApp();
})

function inciarApp(){
    mostrarServicios();
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
                servicioDiv.onclick = serleccionarServicio;
                servicioDiv.dataset.idServicio = id;






                //Inyectar precio y nombre
                servicioDiv.appendChild(nombreServicio);
                servicioDiv.appendChild(precioServicio);

                console.log(servicioDiv)

                //Inyectar en el HTML
                document.querySelector('#servicios').appendChild(servicioDiv);
                
            });
    } catch (error) {
        console.log(error);
    }
}

function serleccionarServicio(event){
    let elemento; 
    if(event.target.tagName === 'P'){
       elemento = event.target.parentElement;
    }else{
        elemento = event.target;
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');
    }else{
        elemento.classList.add('seleccionado');
    }
}