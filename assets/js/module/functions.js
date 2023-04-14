//1.- REFERENCIAS
const $cards = document.getElementById('cards');

//3.-CREACION DE ELEMENTOS
//(crea cartas)
function createCard(cardEvents) {
    let template = '';
    if (cards.length === 0){
        template = "<h4>There are no Events</h4>";
    }else{
        for (const card of cardEvents) {
            template += `<div class="card" style="width: 25rem">
            <img src="${card.image}" class="imageDetails card-img-top" alt="foods" />
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>
            </div>
            <div class="cardfooter">
                <p>Price: ${card.price}</p>
                <a class="btn btn-light" href="/assets/pages/details.html?id=${card._id}">Details</a>
            </div>
            </div>`;
        }
    }
    $cards.innerHTML = template;
}

//(crea html checkbox)
function createCheckCategories(category, index) {
    return `<div class="form-check">
    <input class="form-check-input inputsquare" type="checkbox" value="${category}" id="check-${index}" />
    <label class="form-check-label" for="check-${index}">${category}</label>
    </div>`;
}

//5.- FUNCIONES DE FILTRO

//5.3
function filterByCheckbox(events, selectedCategories){
    const filteredEventsByCheckbox =  events.filter(event => selectedCategories.includes(event.category));
    if (filteredEventsByCheckbox.length === 0) {
        return events;
    }else{
        return filteredEventsByCheckbox;
    }
}

//5.4
function filterByText(events, text){
    return events.filter(event => event.name.toLowerCase().includes(text.toLowerCase()));
}

//5.2 
function crossFilter(events, text, selectedCategories){
    const filteredByCheckbox = filterByCheckbox(events, selectedCategories);
    const filteredByText = filterByText(filteredByCheckbox, text);
    //Retorna las cards filtradas por texto y categoria simultaneamente
    return filteredByText;
}

export {
    createCard,
    crossFilter,
    createCheckCategories
}
