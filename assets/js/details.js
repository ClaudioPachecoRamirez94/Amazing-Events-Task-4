const $eventsdetail = document.getElementById('eventsdetail');
const urlParams = location.search;
const params = new URLSearchParams(urlParams);
const eventId = params.get("id");
let cardEvent = [];

fetch('https://mindhub-xj03.onrender.com/api/amazing') 
    .then(response => response.json()) 
    .then(data => {
        cardEvent = data.events.find((evento) => evento._id == eventId);
        printEventDetails(cardEvent);
})
.catch(error => {console.error(error);
});

function printEventDetails(evento) {
  let card = "";
  if (evento.estimate) {
    card = `<div class="row g-0">
    <div class="imgDetails col-md-5">
      <img src="${evento.image}" class="img-fluid rounded-start imageDetails" alt="...">
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h3>Name: ${evento.name}</h3>
        <h3>Date: ${evento.date}</h3>
        <h3>Description: ${evento.description}</h3>
        <h3>Category: ${evento.category}</h3>
        <h3>Place: ${evento.place}</h3>
        <h3>Capacity: ${evento.capacity}</h3>
        <h3>Estimate: ${evento.estimate}</h3>
        <h3>Price: ${evento.price}</h3>
      </div>
    </div>
  </div>`;
  } else {
    card = `<div class="row g-0">
    <div class="imgDetails col-md-5">
      <img src="${evento.image}" class="image img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h3>Name: ${evento.name}</h3>
        <h3>Date: ${evento.date}</h3>
        <h3>Description: ${evento.description}</h3>
        <h3>Category: ${evento.category}</h3>
        <h3>Place: ${evento.place}</h3>
        <h3>Capacity: ${evento.capacity}</h3>
        <h3>Assistance: ${evento.assistance}</h3>
        <h3>Price: ${evento.price}</h3>
      </div>
    </div>
  </div>`;
  }
  $eventsdetail.innerHTML = card;
}


