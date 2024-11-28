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