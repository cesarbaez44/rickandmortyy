
const url = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector(".container");
const details = document.querySelector(".details");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");


const createCard = (character) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <button class="btn" data-id="${character.id}">Ver más</button>
    `;

    return div;
};

const searchCharacter = () => {
    const name = searchInput.value.trim();
    if (!name) return;

    container.innerHTML = "";

    fetch(url + "?name=" + name)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(character => {
                container.appendChild(createCard(character));
            });
        })
        .catch(error => console.error(error));
};

const switchDiv = () => {
    container.classList.toggle("invisible");
    details.classList.toggle("invisible");
};

const getId = (e) => {
    if (e.target.classList.contains("btn")) {
        const id = e.target.dataset.id;

        fetch(url + id)
            .then(response => response.json())
            .then(character => {
                const html = `
                    <h2>${character.name}</h2>
                    <img src="${character.image}">
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Origin:</strong> ${character.origin.name}</p>
                `;

                details.querySelector("div").innerHTML = html;
                switchDiv();
            })
            .catch(error => console.error(error));
    }
};

const page = Math.ceil(Math.random() * 42);

fetch(url + "?page=" + page)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            container.appendChild(createCard(character));
        });
    })
    .catch(error => console.error(error));

container.addEventListener("click", getId);
searchBtn.addEventListener("click", searchCharacter);
