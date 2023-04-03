require('dotenv').config();

let apiKey = process.env.WEATHERAPIKEY


async function getWeather(lat,long){
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
    ,{method:"GET"})
    console.log("called");
    return response.json();
}
module.exports = {
    getWeather,
}