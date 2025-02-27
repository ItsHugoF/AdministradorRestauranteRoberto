"use strict"

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'catering.html';
    });

    const form = document.getElementById('nuevoPlatoForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const url_imagen = document.getElementById('url_imagen').value.trim();
        const nuevoPlato = { nombre, precio, url_imagen };
        console.log(nuevoPlato);

        try {
            const response = await fetch('https://api-restaurante-robert-sand.vercel.app/api/crearPlato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoPlato)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.mensaje || 'Plato creado correctamente');
                form.reset();
                window.location.href = 'catering.html';
            } else {
                alert(result.mensaje || 'Error al crear el plato');
            }
        } catch (error) {
            console.error('Error en el fetch:', error);
            alert('Error al conectar con el servidor');
        }
    });
});
