let loginButton = document.querySelector("#login-btn").style.cursor = "pointer";

loginButton.addEventListener("click", () =>
    window.location = "login.html"
);

//Recuperation des projets
const sectionFiche = document.querySelector(".gallery");

async function worksGet() {
    const works = await fetch('http://localhost:5678/api/works')
        .then(response => response.json());
    for (let i = 0; i < works.length; i++) {
        const worksElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const titleElement = document.createElement("figcaptionp")
        imgElement.src = works[i].imageUrl;
        titleElement.innerText = works[i].title;

        sectionFiche.appendChild(worksElement)
        worksElement.appendChild(imgElement)
        worksElement.appendChild(titleElement)
    }
}
worksGet()

//Login
const form = {
    email: document.querySelector("#login-email"),
    password: document.querySelector("#login-password"),
    submit: document.querySelector("#login-submit"),
};

let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        })
    }).then((response) => response.json())
        .then(data => {
            console.log(data)
            sessionStorage.setItem("token", data.token)
        }).then(window.location = "index.html")
})