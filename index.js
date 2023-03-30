// import modules
const {req , res} = require ("express");
const express = require ("express");
const path = require ("path");
const weather = require('./components/OpenWeatherApi'); 
const spotify = require('./components/SpotifyApi');
const bodyParser = require('body-parser');
// Set up express app
const app = express();
const port = process.env.PORT || 8888;

// Define views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Set home page
app.get("/", async (req, res) =>{
    let city = req.query.city;
    let weatherRes = await weather.getWeather(city);
    console.log(weatherRes);
    // let getToken = await spotify.getToken();
    let getPlaylists  = await spotify.searchPlaylist();
    res.render("index", {title: "Home", weather: weatherRes, music: getPlaylists })
})

app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`);
})