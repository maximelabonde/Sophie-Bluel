//variable des boutons de navigation
const projectsNav = document.querySelector("#projects-nav")
const contactNav = document.querySelector("#contact-nav")
const loginNav = document.querySelector("#login-nav");

//boutons de navigation
projectsNav.addEventListener("click", () => {
    location.href = "index.html#portfolio"
})

contactNav.addEventListener("click", () => {
    location.href = "index.html#contact"
})

//bouton de connexion/déconnexion
loginNav.addEventListener("click", () => {
    if (!token) {
        window.location = "login.html";
    } else {
        localStorage.removeItem("token");
        location.reload();
    }
});
