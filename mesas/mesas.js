"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const tbodyMesas = document.getElementById("tbody-mesas");
  const formCrearMesa = document.getElementById("formCrearMesa");
  const campoId = document.getElementById("campoId");

  cargarMesas();

  function cargarMesas() {
    fetch("http://localhost:5000/api/admin/mesas")
      .then((res) => res.json())
      .then((mesas) => {
        tbodyMesas.innerHTML = "";
        mesas.forEach((mesa) => {
          const tr = document.createElement("tr");

          const tdId = document.createElement("td");
          tdId.textContent = mesa.id;

          const tdEstado = document.createElement("td");
          tdEstado.textContent = mesa.estado ? "Libre" : "Ocupada";

          const tdAcciones = document.createElement("td");
          // Botón eliminar
          const btnEliminar = document.createElement("button");
          btnEliminar.classList.add("btn", "rechazar");
          btnEliminar.textContent = "Eliminar";
          btnEliminar.addEventListener("click", () => {
            eliminarMesa(mesa.id);
          });
          
          tdAcciones.appendChild(btnEliminar);

          tr.appendChild(tdId);
          tr.appendChild(tdEstado);
          tr.appendChild(tdAcciones);

          tbodyMesas.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar mesas:", error);
        alert("Error al cargar mesas");
      });
  }

  function eliminarMesa(idMesa) {
    if (!confirm("¿Deseas eliminar esta mesa?")) return;

    fetch(`http://localhost:5000/api/admin/mesas/${idMesa}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        cargarMesas();
      })
      .catch((error) => {
        console.error("Error al eliminar mesa:", error);
        alert("Error al eliminar mesa");
      });
  }

  // c) Crear nueva mesa (siempre libre)
  formCrearMesa.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaMesa = {
      id: parseInt(campoId.value) //Creams con estado true por defecto
    };

    fetch("http://localhost:5000/api/admin/mesas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaMesa)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.mensaje) alert(data.mensaje);
        formCrearMesa.reset();
        cargarMesas();
      })
      .catch((error) => {
        console.error("Error al crear mesa:", error);
        alert("Error al crear mesa");
      });
  });
});
