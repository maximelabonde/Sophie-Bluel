const form = {
    email: document.querySelector("#login-email"),
    password: document.querySelector("#login-password"),
    submit: document.querySelector("#login-submit"),
};

const button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (form.email.value !== "sophie.bluel@test.tld") {
        alert("Email incorrect")
    } else if (form.password.value !== "S0phie") {
        alert("Mot de passe incorrect")
    } else {
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
                localStorage.setItem("token", data.token)
                window.location = "index.html"
            })
    }
})