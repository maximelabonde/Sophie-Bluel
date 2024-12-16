//variable du bouton de connexion
const loginBtn = document.querySelector("#login-btn");

//variable du token d'authentification
const token = localStorage.getItem("token");

//bouton de connexion/déconnexion
loginBtn.addEventListener("click", () => {
    if (!token) {
        window.location = "login.html";
    } else {
        localStorage.removeItem("token");
        location.reload();
    }
});
