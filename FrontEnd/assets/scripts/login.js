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
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
     });
})