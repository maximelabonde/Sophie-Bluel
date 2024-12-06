const loginBtn = document.querySelector("#login-btn");
const editMode = document.querySelector("#edit-mode");
const editBtn = document.querySelector(".edit-btn");
const modal = document.querySelector("#modal");
const modalRemove = document.querySelector(".remove");
const modalAdd = document.querySelector(".add");

function loginAction() {
    if (localStorage.getItem("token")) {
        loginBtn.textContent = "logout";
        editMode.style.display = "flex";
        editBtn.style.display = "flex";
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
