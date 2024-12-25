//fonction pour verifier la connexion
async function loginAuth(e) {
    e.preventDefault();
    const form = {
        email: document.querySelector("#login-email"),
        password: document.querySelector("#login-password"),
    };
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(
                `Erreur : ${response.status} ${response.statusText}`
            );
        } else {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location = "index.html";
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
    }
}

//bouton de connexion
const loginForm = document.querySelector("#login-form").addEventListener("submit", (e) => {
    loginAuth(e);
});
