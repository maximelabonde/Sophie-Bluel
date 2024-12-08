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
