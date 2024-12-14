//variables des elements de la modale
const modalRemove = document.querySelector(".remove");
const modalAdd = document.querySelector(".add");
const modalCategories = document.querySelector("#modal-categories");
const modalEditBtn = document.querySelector(".edit-btn");
const modalExitBtn = document.querySelector(".fa-xmark");
const modalReturnBtn = document.querySelector(".fa-arrow-left");
const modalAddBtn = document.querySelector("#add-btn");
const modalSubmit = document.querySelector("#add-submit");
const modalForm = document.querySelector("#modal-form");
const modalGallery = document.querySelector(".projects-remove");

//variables de la page d'accueil
const sectionFiche = document.querySelector(".gallery");
const editMode = document.querySelector("#edit-mode");

//variables de la page de connexion
const loginForm = document.querySelector("#login-form");
const loginBtn = document.querySelector("#login-btn");

//variable du token d'authentification
const token = localStorage.getItem("token");

//bouton de deconnexion
loginBtn.addEventListener("click", () => {
    if (loginBtn.textContent === "login") {
        window.location = "login.html";
    } else {
        localStorage.removeItem("token");
        location.reload();
    }
});
