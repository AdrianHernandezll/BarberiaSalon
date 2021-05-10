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
    } catch (error) {
        console.log(error);
    }
}