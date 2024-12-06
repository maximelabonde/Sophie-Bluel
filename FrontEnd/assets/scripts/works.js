const sectionFiche = document.querySelector(".gallery");
const exitBtn = document.querySelector(".fa-xmark");
const returnBtn = document.querySelector(".fa-arrow-left");
const addBtn = document.querySelector("#add-btn");

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

editBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});
exitBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
returnBtn.addEventListener("click", () => {
    modalAdd.style.display = "none";
    modalRemove.style.display = "block";
});
addBtn.addEventListener("click", () => {
    modalRemove.style.display = "none";
    modalAdd.style.display = "block";
});
