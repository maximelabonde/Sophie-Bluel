const sectionFiche = document.querySelector(".gallery");
const modal = document.querySelector("#modal");
const modalRemove = document.querySelector(".remove");
const modalAdd = document.querySelector(".add");
const modalCategories = document.querySelector("#modal-categories");
const modalEditBtn = document.querySelector(".edit-btn");
const modalExitBtn = document.querySelector(".fa-xmark");
const modalReturnBtn = document.querySelector(".fa-arrow-left");
const modalAddBtn = document.querySelector("#add-btn");
const loginBtn = document.querySelector("#login-btn");
const editMode = document.querySelector("#edit-mode");

function loginAction() {
    if (localStorage.getItem("token")) {
        loginBtn.textContent = "logout";
        modalEditBtn.style.display = "flex";
        modalEditBtn.style.display = "flex";
    }
}

loginAction();

loginBtn.addEventListener("click", () => {
    if (loginBtn.textContent === "login") {
        window.location = "login.html";
    } else {
        localStorage.removeItem("token");
        location.reload();
    }
});
