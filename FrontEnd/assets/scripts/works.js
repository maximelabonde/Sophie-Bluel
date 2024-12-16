//fonction pour changer la page d'acceuil si le token est dans le localStorage
function indexChanges() {
    if (token) {
        loginBtn.textContent = "logout";
        modalEditBtn.style.display = "flex";
        editMode.style.display = "flex";
        worksFilters.style.display = "none";
    }
}
indexChanges();

//fonction pour rafraichir la liste des projets
function worksRefresh() {
    while (worksGallery.hasChildNodes()) {
        worksGallery.removeChild(worksGallery.firstChild);
    }
    while (modalGallery.hasChildNodes()) {
        modalGallery.removeChild(modalGallery.firstChild);
    }
    worksGet();
    modalWorksGet();
}

//fonction pour récupérer les projets et les intégrer dans la galerie
async function worksGet() {
    const works = await fetch("http://localhost:5678/api/works").then(
        (response) => response.json()
    );
    for (let i = 0; i < works.length; i++) {
        const worksElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const titleElement = document.createElement("figcaptionp");
        imgElement.src = works[i].imageUrl;
        titleElement.innerText = works[i].title;
        worksGallery.appendChild(worksElement);
        worksElement.appendChild(imgElement);
        worksElement.appendChild(titleElement);
    }
}
worksGet();

//fonction pour récupérer les projets et les intégrer dans la galerie de la modale
async function modalWorksGet() {
    const works = await fetch("http://localhost:5678/api/works").then(
        (response) => response.json()
    );
    for (let i = 0; i < works.length; i++) {
        const worksElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const iconElement = document.createElement("i");
        imgElement.src = works[i].imageUrl;
        worksElement.id = works[i].id;
        iconElement.classList.add("fa-solid", "fa-trash-can");
        modalGallery.appendChild(worksElement);
        worksElement.appendChild(imgElement);
        worksElement.appendChild(iconElement);

        //bouton pour supprimer un projet
        iconElement.addEventListener("click", async function () {
            if (!token) {
                console.error("Token non trouvé");
                return;
            }
            try {
                const response = await fetch(
                    "http://localhost:5678/api/works/" + worksElement.id,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(
                        `Erreur : ${response.status} ${response.statusText}`
                    );
                } else {
                    worksRefresh();
                }
            } catch (error) {
                console.error("Erreur lors de la suppresion du projet:", error);
            }
        });
    }
}
modalWorksGet();

//fonction pour récupérer les categories du formulaire de la modale
async function modalCategoriesGet() {
    const categories = await fetch("http://localhost:5678/api/categories").then(
        (response) => response.json()
    );
    for (let i = 0; i < categories.length; i++) {
        const categoriesOptions = document.createElement("option");
        categoriesOptions.value = categories[i].id;
        categoriesOptions.innerText = categories[i].name;
        modalCategories.appendChild(categoriesOptions);
    }
}
modalCategoriesGet();

//fonction pour ajouter un projet via le formulaire de la modale
async function workAdd(e) {
    e.preventDefault();
    if (!token) {
        console.error("Token non trouvé");
        return;
    }
    const formData = new FormData(e.target);
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(
                `Erreur : ${response.status} ${response.statusText}`
            );
        } else {
            worksRefresh();
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du projet:", error);
    }
}

//bouton pour ajouter un projet
modalForm.addEventListener("submit", (e) => {
    workAdd(e);
});

//bouton pour afficher la modale
modalEditBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

//bouton pour quitter la modale
modalExitBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

//bouton pour revenir dans la galerie de la modale
modalReturnBtn.addEventListener("click", () => {
    modalAdd.style.display = "none";
    modalRemove.style.display = "block";
});

//bouton pour afficher le formulaire pour ajouter un projet
modalAddBtn.addEventListener("click", () => {
    modalRemove.style.display = "none";
    modalAdd.style.display = "block";
});

//affichage de la pré-visualisation de l'image
modalImgBtn.addEventListener("change", (e) => {
    modalImgPreview.src = URL.createObjectURL(e.target.files[0]);
    modalImgSubtitle.style.display = "none";
    modalImgLabel.style.display = "none";
    modalImgPreview.style.display = "block";
});
