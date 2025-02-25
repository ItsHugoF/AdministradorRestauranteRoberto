"use strict"

document.addEventListener('DOMContentLoaded', () => {
    const tbodyPedidos = document.getElementById('tbody-pedidos');

    cargarPedidos();

    function cargarPedidos(){
        fetch("http://localhost:5000/api/admin/pedidos")
        .then((response) => response.json())
        .then((pedidos) => {
            tbodyPedidos.innerHTML = "";

            pedidos.forEach((pedido) => {
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = pedido.id;
      
                const tdPropietario = document.createElement("td");
                tdPropietario.textContent = pedido.propietario;

                /*
                // Fecha: si no se guarda en la base, podrías generarla al crear el pedido
                // o simplemente eliminar esta columna si no existe la info real
                const tdFecha = document.createElement("td");
                // Ejemplo de "fecha" si no la tienes:
                tdFecha.textContent = "—";
                */
                const tdEstado = document.createElement("td");
                tdEstado.textContent = pedido.estado;
      
                // Botones de Acciones
                const tdAcciones = document.createElement("td");
      
                const btnAceptar = document.createElement("button");
                btnAceptar.classList.add("btn", "aceptar");
                btnAceptar.textContent = "Aceptar";
                btnAceptar.addEventListener("click", () => {
                  actualizarEstadoPedido(pedido.id, "aceptado");
                });
      
                const btnRechazar = document.createElement("button");
                btnRechazar.classList.add("btn", "rechazar");
                btnRechazar.textContent = "Rechazar";
                btnRechazar.addEventListener("click", () => {
                  actualizarEstadoPedido(pedido.id, "rechazado");
                });
      
                tdAcciones.appendChild(btnAceptar);
                tdAcciones.appendChild(btnRechazar);

                if (pedido.estado === "aceptado") {
                    const btnCompletar = document.createElement("button");
                    btnCompletar.classList.add("btn");
                    btnCompletar.textContent = "Completar";
                    btnCompletar.addEventListener("click", () => {
                      completarPedido(pedido.id);
                    });
                    tdAcciones.appendChild(btnCompletar);
                }

                // Agregar celdas al tr
                tr.appendChild(tdId);
                tr.appendChild(tdPropietario);
                tr.appendChild(tdEstado);
                tr.appendChild(tdAcciones);
      
                // Finalmente añadimos la fila al tbody
                tbodyPedidos.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Error al cargar pedidos:", error);
            alert("Error al cargar pedidos");
        });
    }


    function actualizarEstadoPedido(pedidoId, nuevoEstado){
        fetch(`http://localhost:5000/api/admin/pedidos/${pedidoId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: nuevoEstado }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.mensaje) {
                alert(data.mensaje);
            }
            cargarPedidos();        
        })
        .catch((error) => {
            console.error("Error al actualizar pedido:", error);
            alert("Error al actualizar el estado del pedido");
        });
    }


    function completarPedido(pedidoId) {
        fetch(`http://localhost:5000/api/admin/pedidos/${pedidoId}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
          alert(data.mensaje);
          // Recargar la tabla de pedidos
          cargarPedidos();
        })
        .catch(error => {
          console.error("Error al completar pedido:", error);
          alert("Error al completar pedido");
        });
      }
      
});