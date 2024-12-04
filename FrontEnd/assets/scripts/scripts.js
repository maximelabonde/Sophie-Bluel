const loginButton = document.querySelector("#login-btn");
loginButton.style.cursor = "pointer";

function loginLogout() {
    if (localStorage.getItem("token")) {
        loginButton.textContent = "logout"
    }
}

loginLogout();

loginButton.addEventListener("click", function () {
    if (loginButton.textContent === "login") {
        window.location = "login.html"
    } else {
        localStorage.removeItem("token")
        location.reload()
    }
});