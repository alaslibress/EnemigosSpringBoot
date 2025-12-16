document.addEventListener('DOMContentLoaded', cargarEnemigos);

//Variable global
let enemigosActuales = []; // Variable global para guardar los enemigos y ordenarlos

async function cargarEnemigos(){
    try{
        const response = await fetch('/api/enemigo');
        const enemigos = await response.json();
        mostrarEnemigos(enemigos);
    }catch(error){
        console.error("Error al cargar a tus amigos políticos "+error)
    }
}

function mostrarEnemigos(enemigos){
    enemigosActuales = enemigos; // Guardar para ordenar después

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

// INSERTAR
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

        const texto = await response.text(); //Leer como texto primero

        if(response.ok){
            console.log('Enemigo creado (El país cada vez tambalea más):', texto);
            document.getElementById('formInsertarEnemigo').reset();
            await cargarEnemigos();
            alert('Enemigo creado correctamente');
        }else{
            //El servidor devuelve el mensaje de error como texto
            alert('Error: ' + texto);
        }
    }catch (error){
        console.error(error);
        alert('Error de conexión');
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

        if(response.ok || response.status === 204){
            console.log('Enemigo eliminado correctamente');
            document.getElementById('formEliminarEnemigo').reset();
            await cargarEnemigos();
            alert('Enemigo eliminado correctamente (Esto es un avance)');
        }else if(response.status === 404){
            alert('No se encontró un enemigo con ese ID');
        }else{
            alert('Error al eliminar enemigo');
        }
    }catch (error){
        console.error('Error al eliminar enemigo:', error);
        alert('Error al eliminar enemigo (más dificil de eliminar que una plaga)');
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
        alert('Error al actualizar enemigo (Ya me quedo sin ideas para los chistes)');
    } finally{
        btnActualizar.disabled = false;
        btnActualizar.textContent = 'Actualizar';
    }
});

//BUSCAR POR NOMBRE
document.getElementById('formBuscarEnemigo').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreBuscar').value.trim();

    try {
        const response = await fetch('/api/enemigo/buscar?nombre=' + encodeURIComponent(nombre));
        const enemigos = await response.json();

        if(enemigos.length === 0) {
            alert('Ese nombre no existe (A lo mejor se ha perdido en los canales internos del partido junto a las pruebas de incriminación a paco salazar, junto con los mensajes de whatshapp de antonio navarro, o quizás con las denuncias de josé tomé...)');
        } else {
            mostrarEnemigos(enemigos);
        }
    } catch(error) {
        console.error('Error al buscar:', error);
        alert('Error al buscar enemigo');
    }
});

//MOSTRAR TODOS (resetear búsqueda)
document.getElementById('btnMostrarTodos').addEventListener('click', function() {
    cargarEnemigos();
});

// ORDENAR ALFABÉTICAMENTE
document.getElementById('btnOrdenar').addEventListener('click', function() {
    // Copia el array y ordena por nombre (A-Z)
    const ordenados = [...enemigosActuales].sort((a, b) => {
        return a.nombre.localeCompare(b.nombre);
    });
    mostrarEnemigos(ordenados);
});

// DESCARGAR CSV
document.getElementById('btnDescargarCSV').addEventListener('click', function() {
    if(enemigosActuales.length === 0) {
        alert('No hay datos para descargar, eso significa que la corrupción a acabado (ojalá)');
        return;
    }

    // Cabeceras del CSV
    let csv = 'ID,Nombre,Pais,Afiliacion\n';

    // Añadir cada fila
    enemigosActuales.forEach(enemigo => {
        csv += `${enemigo.id},${enemigo.nombre},${enemigo.pais},${enemigo.afiliacion}\n`;
    });

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enemigos.csv';
    link.click();
});