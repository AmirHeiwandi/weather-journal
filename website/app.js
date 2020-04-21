/* Global Variables */
const baseURL= 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2c47b9023e1f461b27b4ae92e9c9e393';
let button = document.getElementById('generate');
const test = 'api.openweathermap.org/data/2.5/weather?zip=10002,us&appid=2c47b9023e1f461b27b4ae92e9c9e393'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// GET function to retrive data from OpenWeatherMap API.
async function getData (baseURL, zip, apiKey) {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();
    return data;
}

async function postData (url, recievedData){
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(recievedData)
    };
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}

async function updateUI () {
    const res = await fetch('/geti');
    const data = await res.json();
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature.temp;
    document.getElementById('content').innerHTML = data.userResponse;
}

button.addEventListener('click', () => {
    let firstZip = document.getElementById('zip').value;
    let zip = `${firstZip},us`; // To add country-code rather than have user put it in.
    let feelings = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey).then(function (data){
        postData('/posti', {
        temperature: data.main, // I chose to only use the main part, but ofc I can use entire.
        date: newDate, 
        userResponse: 
        feelings} 
        ).then(function (){
            updateUI();
        });
    });
});