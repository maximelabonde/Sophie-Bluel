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
        sectionFiche.appendChild(worksElement);
        worksElement.appendChild(imgElement);
        worksElement.appendChild(titleElement);
    }
}

worksGet();

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

async function worksModalGet() {
    if (!token) {
        console.error("Token non trouvé");
        return;
    }
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

        
        iconElement.addEventListener("click", async function () {
            console.log(worksElement.id);
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
                worksElement.remove();
            }
        });
    }
}

worksModalGet();

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
        }
        const data = await response.json();
        if (data) {
            console.log(data);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image:", error);
    }
}

modalForm.addEventListener("submit", (e) => {
    addWork(e);
});

modalEditBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});
modalExitBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
modalReturnBtn.addEventListener("click", () => {
    modalAdd.style.display = "none";
    modalRemove.style.display = "block";
});
modalAddBtn.addEventListener("click", () => {
    modalRemove.style.display = "none";
    modalAdd.style.display = "block";
});
