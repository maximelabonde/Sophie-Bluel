//variables des éléments de la modale
const modalRemove = document.querySelector(".remove");
const modalAdd = document.querySelector(".add");
const modalCategories = document.querySelector("#modal-categories");
const modalEditBtn = document.querySelector(".edit-btn");
const modalExitBtn = document.querySelector(".fa-xmark");
const modalReturnBtn = document.querySelector(".fa-arrow-left");
const modalAddBtn = document.querySelector("#add-btn");
const modalForm = document.querySelector("#modal-form");
const modalGallery = document.querySelector(".projects-remove");
const modalImgBtn = document.querySelector("#modal-img");
const modalImgPreview = document.querySelector("#modal-img-preview");
const modalImgSubtitle = document.querySelector("#modal-img-subtitle");
const modalImgLabel = document.querySelector("#modal-img-label");
const modalSubmit = document.querySelector("#add-submit");
const modalTitle = document.querySelector("#modal-title");

//variables de la page d'accueil
const worksFilters = document.querySelector(".gallery-filters");
const worksGallery = document.querySelector(".gallery");
const editMode = document.querySelector("#edit-mode");
const filtersBtn = document.querySelectorAll(".filter-btn");

//changer la page d'accueil si le token est dans le localStorage
function indexChanges() {
    if (token) {
        loginNav.textContent = "logout";
        modalEditBtn.style.display = "flex";
        editMode.style.display = "flex";
        worksFilters.style.display = "none";
    }
}
indexChanges();

//récupérer les projets du back-end
async function loadWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
            `Erreur : ${response.status} ${response.statusText}`;
        } else {
            data = await response.json();
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//faire disparaitre les projects de la page d'accueil
function removeWorks() {
    while (worksGallery.hasChildNodes()) {
        worksGallery.removeChild(worksGallery.firstChild);
    }
}

//faire disparaitre les projets de la modale
function removeModalWorks() {
    while (modalGallery.hasChildNodes()) {
        modalGallery.removeChild(modalGallery.firstChild);
    }
}

//supprimer la classe "actif" des boutons de filtre
function filterClassRemove() {
    for (let i = 0; i < filtersBtn.length; i++) {
        filtersBtn[i].classList.remove("filter-btn-active");
    }
}

//rafraichir la liste des projets
function worksRefresh() {
    removeModalWorks();
    removeWorks();
    getWorks();
    getModalWorks();
}

//verifier si le formulaire de la modale est valide
function checkIfFormIsValide() {
    if (!modalImgBtn.value || !modalCategories.value || !modalTitle.value) {
        modalSubmit.disabled = true;
        modalSubmit.style.background = "#A7A7A7";
    } else {
        modalSubmit.disabled = false;
        modalSubmit.style.background = "#1D6154";
    }
}

//réinitialiser le formulaire de la modale
function formReset() {
    modalCategories.getElementsByTagName("option")[0].selected = "selected";
    modalTitle.value = "";
    modalImgBtn.value = "";
    modalImgPreview.src = "#";
    modalImgPreview.style.display = "none";
    modalImgLabel.style.display = "flex";
    modalImgSubtitle.style.display = "block";
    checkIfFormIsValide();
}

//filtrer les projets par catégories
function worksFilter(category) {
    if (category === 0) {
        removeWorks();
        getWorks();
        return;
    }
    loadWorks().then(() => {
        let filteredData;
        filteredData = data.filter((work) => {
            if (category === 1) {
                return work.categoryId === 1;
            } else if (category === 2) {
                return work.categoryId === 2;
            } else if (category === 3) {
                return work.categoryId === 3;
            }
        });
        removeWorks();
        for (let i = 0; i < filteredData.length; i++) {
            const worksElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            const titleElement = document.createElement("figcaptionp");
            imgElement.src = filteredData[i].imageUrl;
            titleElement.innerText = filteredData[i].title;
            worksGallery.appendChild(worksElement);
            worksElement.appendChild(imgElement);
            worksElement.appendChild(titleElement);
        }
    });
}

//intégrer les projets dans la galerie de la page d'accueil
function getWorks() {
    loadWorks().then(() => {
        for (let i = 0; i < data.length; i++) {
            const worksElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            const titleElement = document.createElement("figcaptionp");
            imgElement.src = data[i].imageUrl;
            titleElement.innerText = data[i].title;
            worksGallery.appendChild(worksElement);
            worksElement.appendChild(imgElement);
            worksElement.appendChild(titleElement);
        }
    });
}
getWorks();

//intégrer les projets dans la galerie de la modale
function getModalWorks() {
    loadWorks().then(() => {
        for (let i = 0; i < data.length; i++) {
            const worksElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            const iconElement = document.createElement("i");
            imgElement.src = data[i].imageUrl;
            worksElement.id = data[i].id;
            iconElement.classList.add("fa-solid", "fa-trash-can");
            modalGallery.appendChild(worksElement);
            worksElement.appendChild(imgElement);
            worksElement.appendChild(iconElement);

            //boutons pour supprimer un projet du back-end
            iconElement.addEventListener("click", async () => {
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
                    console.error(
                        "Erreur lors de la suppresion du projet:",
                        error
                    );
                }
            });
        }
    });
}
getModalWorks();

//récupérer les categories du formulaire de la modale
async function getModalCategories() {
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
getModalCategories();

//ajouter un projet via le formulaire de la modale
async function addWork(e) {
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
            formReset();
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du projet:", error);
    }
}

//boutons pour filtrer les projets sur la page d'accueil
filtersBtn[0].addEventListener("click", () => {
    filterClassRemove();
    worksFilter((category = 0))
    filtersBtn[0].classList.add("filter-btn-active");
});

filtersBtn[1].addEventListener("click", () => {
    filterClassRemove();
    worksFilter((category = 1));
    filtersBtn[1].classList.add("filter-btn-active");
});

filtersBtn[2].addEventListener("click", () => {
    filterClassRemove();
    worksFilter((category = 2));
    filtersBtn[2].classList.add("filter-btn-active");
});

filtersBtn[3].addEventListener("click", () => {
    filterClassRemove();
    worksFilter((category = 3));
    filtersBtn[3].classList.add("filter-btn-active");
});

//bouton pour ajouter un projet
modalForm.addEventListener("submit", (e) => {
    addWork(e);
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

//bouton pour afficher le formulaire de la modale
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

//blocage du bouton en cas de formulaire incomplet
modalForm.addEventListener("change", () => {
    checkIfFormIsValide();
});
