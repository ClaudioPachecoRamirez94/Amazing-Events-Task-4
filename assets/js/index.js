import {createCard, crossFilter, createCheckCategories} from "./module/functions.js";

const $searchCategories = document.getElementById('searchCategories');
const $checkforms = document.getElementById('checkforms');
let cardEvents = [];
let selectedCategories = [];

//2.- DATOS
fetch('https://mindhub-xj03.onrender.com/api/amazing') // Reemplazar con la URL de la API real
    .then(response => response.json()) // Analizar la respuesta como JSON
    .then(data => {
        cardEvents = data.events;
        console.log(cardEvents);
        createCard(cardEvents);
        extractCategories(cardEvents);
})
.catch(error => {console.error(error);
});

//mostrar check sin repetir categoria
function extractCategories(cardEvents){
    //recorre los datos data.js y devuelve todas las categorias aun si estan repetidas
    const categories = cardEvents.map(evento => evento.category)
    //crea un array con las categorias sin repetir ordenadas alfabeticamente (sort)
    const uniqueCategories = Array.from(new Set(categories)).sort();
    //recorrer cada categoria y las imprime en el html
    uniqueCategories.forEach((category, index) => {
        $checkforms.innerHTML += createCheckCategories(category, index)
    })
}

//5.1.-se ejecuta el primer filtro que se use
$checkforms.addEventListener("change", () => {
    selectedCategories = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(item => item.value);

    const textSearch = $searchCategories.value.toLowerCase();
    const filterCard = crossFilter(cardEvents, textSearch, selectedCategories);
    createCard(filterCard);
})

$searchCategories.addEventListener("keyup", () => {
    const textSearch = $searchCategories.value.toLowerCase();
    const filterCards = crossFilter(cardEvents, textSearch, selectedCategories);
    createCard(filterCards);
})