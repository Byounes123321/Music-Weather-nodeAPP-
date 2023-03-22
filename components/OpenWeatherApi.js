let apiKey = process.env.WEATHERAPIKEY

async function getWeather(city){
    var response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    ,{method:"GET"})
    return response.json();
}
module.exports = {
    getWeather,

}