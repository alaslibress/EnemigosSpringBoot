document.addEventListener('DOMContentLoaded', cargarEnemigos);

async function cargarEnemigos() {
    try {
        const response = await fetch('api/enemigo');
        const enemigos = await response.json();
        mostrarEnemigos(enemigos);
    } catch (error) {
        console.error("Error al cargar enemigos: " + error);
    }
}

function mostrarEnemigos(enemigos) {
    const tbody = document.getElementById('enemigosBody');
    const table = document.getElementById('enemigosTable');

    tbody.innerHTML = '';

    enemigos.forEach(enemigo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${enemigo.id}</td>
            <td>${enemigo.nombre}</td>
            <td>${enemigo.pais}</td>
            <td>${enemigo.afiliacion}</td>
        `;
        tbody.appendChild(tr);
    });

    if (enemigos.length > 0) {
        table.style.display = 'table';
    }
}

// FALTA el listener correcto
document.getElementById('formInsertarEnemigo').addEventListener('submit', function (e) {
    e.preventDefault();
    formInsertarEnemigo();
});

async function formInsertarEnemigo() {
    const nombre = document.getElementById('nombre').value;
    const pais = document.getElementById('pais').value;
    const afiliacion = document.getElementById('afiliacion').value;
    const btnEnviar = document.getElementById('btnSubmit');

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try {
        const response = await fetch('api/enemigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, pais, afiliacion })
        });

        if (response.ok) {
            await cargarEnemigos();
            document.getElementById('formInsertarEnemigo').reset();
        } else {
            const error = await response.text();
            console.error("Error: " + error);
        }
    } catch (error) {
        console.error(error);
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Agregar Enemigo';
    }
}
