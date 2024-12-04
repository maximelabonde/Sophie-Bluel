const editMode = document.querySelector("#edit-mode");
const editBtn = document.querySelector(".edit-btn")
const loginBtn = document.querySelector("#login-btn");
loginBtn.style.cursor = "pointer";

function loginLogout() {
    if (localStorage.getItem("token")) {
        loginBtn.textContent = "logout"
        editMode.style.display = "flex"
        editBtn.style.display = "flex"
    }
}

loginLogout();

loginBtn.addEventListener("click", () => {
    if (loginBtn.textContent === "login") {
        window.location = "login.html"
    } else {
        localStorage.removeItem("token")
        location.reload()
    }
});