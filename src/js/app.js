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