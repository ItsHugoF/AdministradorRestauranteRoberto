"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const tbodyReservas = document.getElementById("tbody-reservas");

  cargarReservas();

  function cargarReservas() {
    fetch("http://localhost:5000/api/admin/reservas")
      .then((response) => response.json())
      .then((reservas) => {
        tbodyReservas.innerHTML = "";
        reservas.forEach((reserva) => {
          const tr = document.createElement("tr");

          const tdId = document.createElement("td");
          tdId.textContent = reserva.id;

          const tdPropietario = document.createElement("td");
          tdPropietario.textContent = reserva.propietario;

          const tdMesa = document.createElement("td");
          tdMesa.textContent = reserva.mesa;

          const tdEstado = document.createElement("td");
          tdEstado.textContent = reserva.estado;

          const tdAcciones = document.createElement("td");

          const btnAceptar = document.createElement("button");
          btnAceptar.classList.add("btn", "aceptar");
          btnAceptar.textContent = "Aceptar";
          btnAceptar.addEventListener("click", () => {
            actualizarEstadoReserva(reserva.id, "aceptado");
          });

          const btnRechazar = document.createElement("button");
          btnRechazar.classList.add("btn", "rechazar");
          btnRechazar.textContent = "Rechazar";
          btnRechazar.addEventListener("click", () => {
            actualizarEstadoReserva(reserva.id, "rechazado");
          });

          tdAcciones.appendChild(btnAceptar);
          tdAcciones.appendChild(btnRechazar);

          if (pedido.estado === "aceptado") {
            const btnCompletar = document.createElement("button");
            btnCompletar.classList.add("btn");
            btnCompletar.textContent = "Completar";
            btnCompletar.addEventListener("click", () => {
              completarReserva(reserva.id);
            });
            tdAcciones.appendChild(btnCompletar);
        }

          tr.appendChild(tdId);
          tr.appendChild(tdPropietario);
          tr.appendChild(tdMesa);
          tr.appendChild(tdEstado);
          tr.appendChild(tdAcciones);

          tbodyReservas.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar reservas:", error);
        alert("Error al cargar reservas");
      });
  }

  function actualizarEstadoReserva(reservaId, nuevoEstado) 
  {
    fetch(`http://localhost:5000/api/admin/reservas/${reservaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.mensaje) {
          alert(data.mensaje);
        }
        cargarReservas();
      })
      .catch((error) => {
        console.error("Error al actualizar reserva:", error);
        alert("Error al actualizar la reserva");
      });
  }


  function completarReserva(reservaId) {
    fetch(`http://localhost:5000/api/admin/reservas/${reservaId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      alert(data.mensaje);
      // Recargar lista de reservas
      cargarReservas();
    })   
    .catch(error => {
      console.error("Error al completar reserva:", error);
      alert("Error al completar reserva");
    });
  }
  
});