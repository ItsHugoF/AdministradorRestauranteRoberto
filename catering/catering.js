document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.getElementById('newPageBtn').addEventListener('click', () => {
        window.location.href = 'nuevoPlato.html';
    });

    function cargarAlimentos() {
        fetch('http://localhost:3000/api/obtenerPlatos')
            .then(response => response.json())
            .then(data => {
                const contenedor = document.getElementById('alimentos');
                contenedor.innerHTML = ''; // Limpiar contenido anterior
                data.forEach(plato => {
                    console.log(data);
                    const divPlato = document.createElement('div');
                    divPlato.className = 'alimento';

                    const img = document.createElement('img');
                    img.src = plato.url_imagen;
                    img.alt = plato.nombre;

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'alimento-info';
                    infoDiv.innerHTML = `<h3>${plato.nombre}</h3><p>Precio: $${plato.precio}</p>`;

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.textContent = 'X';
                    deleteBtn.addEventListener('click', () => {
                        if (confirm(`¿Desea eliminar el plato ${plato.nombre}?`)) {
                            fetch(`http://localhost:3000/api/eliminarPlato/${plato.nombre}`, {
                                method: 'DELETE'
                            })
                                .then(response => response.json())
                                .then(result => {
                                    alert(result.mensaje);
                                    cargarAlimentos(); // Recargar la lista
                                })
                                .catch(error => {
                                    console.error('Error al eliminar el plato:', error);
                                    alert('Error al eliminar el plato');
                                });
                        }
                    });

                    divPlato.appendChild(img);
                    divPlato.appendChild(infoDiv);
                    divPlato.appendChild(deleteBtn);

                    contenedor.appendChild(divPlato);
                });
            })
            .catch(error => console.error('Error al cargar los platos:', error));
    }

    cargarAlimentos();
});