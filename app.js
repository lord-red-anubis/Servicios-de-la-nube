import {
  saveUser,
  getUsers,
  onGetUsers,
  deleteUser,
  getUser,
  updateUser,
} from "./firebase.js";

const userForm = document.getElementById("user-form");
const usersContainer = document.getElementById("users-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  onGetUsers((users) => {
    let html = "";

    users.forEach((user) => {
      html += `
            <div class="card mt-2 border-primary">
                <div class="card-body">
                    <h3 class="card-title">${user.name}</h3>
                    <p class="card-text"><strong>Teléfono:</strong> ${user.phone}</p>
                    <p class="card-text"><strong>Correo electrónico:</strong> ${user.email}</p>
                    <p class="card-text"><strong>Gustos:</strong> ${user.interests}</p>
                    <button class="btn btn-danger btn-delete" data-id="${user.id}">Eliminar</button>
                    <button class="btn btn-primary btn-edit" data-id="${user.id}">Editar</button>
                </div>
            </div>
            `;
    });

    usersContainer.innerHTML = html;

    const btnsDelete = usersContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteUser(e.target.dataset.id);
      });
    });

    const btnsEdit = usersContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getUser(e.target.dataset.id);
        const user = doc.data();

        userForm["name"].value = user.name;
        userForm["phone"].value = user.phone;
        userForm["email"].value = user.email;
        userForm["interests"].value = user.interests;

        editStatus = true;
        id = doc.id;

        userForm["btn-user-save"].innerText = "Actualizar";
      });
    });
  });
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = userForm["name"].value;
  const phone = userForm["phone"].value;
  const email = userForm["email"].value;
  const interests = userForm["interests"].value;

  if (!editStatus) {
    saveUser(name, phone, email, interests);
  } else {
    updateUser(id, { name, phone, email, interests });
    editStatus = false;
    id = "";
    userForm["btn-user-save"].innerText = "Guardar Usuario";
  }

  userForm.reset();

});

// Función para inicializar el mapa
window.initMap = function () {
  const ubicacion = { lat: -34.5956145, lng: -58.4431949 };
  const mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: ubicacion,
    zoom: 10, // Nivel de zoom inicial
  });

  const marker = new google.maps.Marker({
    position: ubicacion, mapa,
  });
};