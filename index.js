// import modules
const {req , res} = require ("express");
const express = require ("express");
const path = require ("path");
const weather = require('./components/OpenWeatherApi'); 
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
    // res.status(200).send("Test page");
    let city = req.body.city;
    //TODO:
    // cant get city? idk but do this first!!!!!!!!
    let weatherRes =  weather.getWeather(city);
    res.render("index", {title: "Home", weather: weatherRes})
})

app.listen(port, () =>{
    console.log(`listening on http://localhost:${port}`);
})