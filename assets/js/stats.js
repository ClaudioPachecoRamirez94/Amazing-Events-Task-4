let dataEvents = [];
const $tableStats = document.getElementById("tableStats");

//trae los datos desde la api en reemplazo de data.js
fetch('https://mindhub-xj03.onrender.com/api/amazing') 
    .then(response => response.json()) 
    .then(data => {
        dataEvents = data.events;
        createTable();
})
.catch(error => {console.error(error);
});


//dibujar tabla
function createTable(){
    const table = `
    <table class="table">
            <thead>
              <tr>
                <th scope="col">Events stadistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Events with the highest percentage of attendance</td>
                <td>Events with the lowest percentage of attendance</td>
                <td>Events with larger capacity</td>
              </tr>
              <tr>
                <td>${highestAttendance()}</td>
                <td>${lowestAttendance()}</td>
                <td>${highestCapacity()}</td>
              </tr>
            </tbody>
            </table>
  
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Upcoming events statistics by category</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of attendance</td>
              </tr>
              ${printDataTable('estimate')}
            </tbody>
            </table>
  
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Past Events statistics by category</th>
                </tr>
              <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of attendance</td>
              </tr>
              ${printDataTable('assistance')}
            </tbody>
            </table>
    `
    $tableStats.innerHTML = table;
}

function highestAttendance(){
    let highestAverageAssistance = 0;
    let eventName = "";

    dataEvents.forEach(eventItem => {
        const assitanceAverage = (eventItem.assistance / eventItem.capacity) * 100;

        if(assitanceAverage > highestAverageAssistance){
            highestAverageAssistance = assitanceAverage;
            eventName = eventItem.name;
        }
    })
    return `${eventName} : ${highestAverageAssistance.toFixed(2)}%`
}

function lowestAttendance(){
    let lowestAverageAssistance = 100;
    let eventName = "";

    dataEvents.forEach(eventItem => {
        const assitanceAverage = (eventItem.assistance / eventItem.capacity) * 100;

        if(assitanceAverage < lowestAverageAssistance){
            lowestAverageAssistance = assitanceAverage;
            eventName = eventItem.name;
        }
    })
    return `${eventName} : ${lowestAverageAssistance.toFixed(2)}%`
}

function highestCapacity(){
    let highestCapacity = 0;
    let eventName = "";

    dataEvents.forEach(eventItem => {
        if(eventItem.capacity > highestCapacity){
            highestCapacity = eventItem.capacity;
            eventName = eventItem.name;
        }
    })
    return `${eventName} : ${highestCapacity}`
}

function extractCategories(eventType){
    const categories = [];
    dataEvents.forEach(evento => {
        if(eventType === "assistance"){
            if(evento.assistance){
                categories.push(evento.category);
            }
        }else{
            if(evento.estimate){
                categories.push(evento.category);
            }
        }
    } )
    const uniqueCategories = Array.from(new Set(categories)).sort();
    return uniqueCategories;
}

function eventsStats(eventType){
    const filteredCategories = extractCategories(eventType);
    const categoryData = [];

    filteredCategories.forEach(category => {
        let categoryRevenues = 0;
        let categoryAttendance = 0;
        let count = 0;
        dataEvents.forEach(itemEvent => {
            if(eventType === "assistance"){
                if(itemEvent.category === category && itemEvent.assistance) {
                    categoryRevenues += itemEvent.assistance * itemEvent.price;
                    categoryAttendance += (itemEvent.assistance / itemEvent.capacity) * 100;
                    count ++;
                }
            }else{
                if(itemEvent.category === category && itemEvent.estimate) {
                    categoryRevenues += itemEvent.estimate * itemEvent.price;
                    categoryAttendance += (itemEvent.estimate / itemEvent.capacity) * 100;
                    count ++;
                }
            }
    
        });
        const averageCategoryAttendance = categoryAttendance / count;
        categoryData.push({category: category, revenues: categoryRevenues, attendance: averageCategoryAttendance})
    });

    return categoryData;
}

function printDataTable(eventType) {
    const categoryData = eventsStats(eventType);
    let itemTable = "";
    categoryData.forEach(category => {
        itemTable += `<tr>
         <td>${category.category}</td>
         <td>${category.revenues}</td>
         <td>${category.attendance.toFixed(2)}%</td>
        </tr>`
        
    })
    return itemTable;
}

