document.addEventListener('DOMContentLoaded', cargarEnemigos);

async function cargarEnemigos(){
    try{
        const response = await fetch('/api/enemigo');
        const enemigos = await response.json();
        mostrarEnemigos(enemigos);
    }catch(error){
        console.error("Error al cargar usuarios "+error)
    }
}

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

// INSERTAR - CORREGIDO (faltaba el callback completo)
document.getElementById('formInsertarEnemigo').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const pais = document.getElementById('pais').value;
    const afiliacion = document.getElementById('afiliacion').value;
    const btnEnviar = document.getElementById('btnSubmit');

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try{
        const response = await fetch('/api/enemigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                pais: pais,
                afiliacion: afiliacion
            })
        });

        if(response.ok){
            const nuevoEnemigo = await response.json();
            console.log('Enemigo creado:', nuevoEnemigo);
            document.getElementById('formInsertarEnemigo').reset();
            await cargarEnemigos();
        }else{
            const error = await response.text();
            console.log(error);
            alert('Error al crear enemigo');
        }
    }catch (error){
        console.error(error);
        alert('Error al crear enemigo');
    } finally{
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Agregar Enemigos';
    }
});

// ELIMINAR
document.getElementById('formEliminarEnemigo').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('idEliminar').value;
    const btnEliminar = document.querySelector('#formEliminarEnemigo button[type="submit"]');

    btnEliminar.disabled = true;
    btnEliminar.textContent = 'Eliminando...';

    try{
        const response = await fetch('/api/enemigo/' + id, {
            method: 'DELETE'
        });

        if(response.ok){
            console.log('Enemigo eliminado correctamente');
            document.getElementById('formEliminarEnemigo').reset();
            await cargarEnemigos();
        }else if(response.status === 404){
            console.error('No se encontró un enemigo con ese ID');
            alert('No se encontró un enemigo con ese ID');
        }else{
            console.error('Error al eliminar enemigo');
            alert('Error al eliminar enemigo');
        }
    }catch (error){
        console.error('Error al eliminar enemigo:', error);
        alert('Error al eliminar enemigo');
    } finally{
        btnEliminar.disabled = false;
        btnEliminar.textContent = 'Eliminar';
    }
});

// ACTUALIZAR
document.getElementById('formActualizarEnemigo').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('idActualizar').value;
    const nombre = document.getElementById('nombreActualizar').value;
    const pais = document.getElementById('paisActualizar').value;
    const afiliacion = document.getElementById('afiliacionActualizar').value;
    const btnActualizar = document.querySelector('#formActualizarEnemigo button[type="submit"]');

    btnActualizar.disabled = true;
    btnActualizar.textContent = 'Actualizando...';

    try{
        const response = await fetch('/api/enemigo/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                pais: pais,
                afiliacion: afiliacion
            })
        });

        if(response.ok){
            const enemigoActualizado = await response.json();
            console.log('Enemigo actualizado:', enemigoActualizado);
            document.getElementById('formActualizarEnemigo').reset();
            await cargarEnemigos();
        }else if(response.status === 404){
            console.error('No se encontró un enemigo con ese ID');
            alert('No se encontró un enemigo con ese ID');
        }else{
            const error = await response.text();
            console.log(error);
            alert('Error al actualizar enemigo');
        }
    }catch (error){
        console.error('Error al actualizar enemigo:', error);
        alert('Error al actualizar enemigo');
    } finally{
        btnActualizar.disabled = false;
        btnActualizar.textContent = 'Actualizar';
    }
});