require('dotenv').config();

let apiKey = process.env.WEATHERAPIKEY


async function getWeather(lat,long){
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
    ,{method:"GET"})
    console.log("Called weather");
    return response.json();
}


module.exports = {
    getWeather,
}