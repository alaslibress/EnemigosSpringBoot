document.addEventListener('DOMContentLoaded', cargarEnemigos);

async function cargarEnemigos(){
    try{
        const response = await fetch('api/enemigo');
        const enemigos = await response.json();
        mostrarEnemigos(enemigos);
    }catch(error){
        console.error("Error al cargar usuarios "+error)
    }//fin catch
}//fin cargar enemigos

async function mostrarEnemigos(enemigos){
    const tbody = document.getElementById('enemigosBody');
    const table = document.getElementById('enemigosTable');

    tbody.innerHTML = '';
    if(enemigos.length===0){
        console.log("no hay enemigos")
    }

    enemigos.forEach(enemigo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${enemigo.id}</td>
            <td>${enemigo.nombre}</td>
            <td>${enemigo.pais}</td>
            <td>${enemigo.afiliacion}</td>
        `;
        tbody.appendChild(tr);
    })

    table.style.display = 'table';
}

document.getElementById('formInsertarEnemigo').addEventListener('submit')

async function formInsertarEnemigo(){
    const nombre = document.getElementById('nombre').value;
    const pais = document.getElementById('pais').value;
    const afiliacion = document.getElementById('afiliacion').value;
    const btnEnviar = document.getElementById('btnSubmit');

    //Esto es mientras se procesa
    btnEnviar.disbled=true;
    btnEnviar.textContent= 'Enviando a francia...';

    try{
        const response = await fetch('api/enemigo', {
            method: 'POST',
            headers: {
                'Contend-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                pais: pais,
                afiliacion: afiliacion
            })
        });

        if(response.ok){
            const nuevoEnemigo = await response.json();
            document.getElementById('formInsertarEenemigo')
            //awair cargarEnemigos();
        }else{
            const error = await.response.text();
            console.log(error);
        }
    }catch (error){
        console.error(error);
    } finally{
        btnEnviar.disabled= false;
        btnEnviar.textContent= 'Agregar Enemigo';
    }
}//fin insertar