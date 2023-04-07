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
//Set body parser
app.use(bodyParser.json());
//set MIME type for style sheet
app.get('/views/style.css', function(req, res) {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(__dirname + '/views/style.css');
});

//get location from client
let weatherRes= "";
app.post('/getcity', async (req, res) => {
  try {
    console.log('Received POST request to /getcity');
    const { latitude, longitude } = req.body;
    console.log("latitude:", latitude, "longitude:", longitude);
    weatherRes = await weather.getWeather(latitude, longitude);
    console.log(weatherRes);
    let getPlaylist  = await spotify.searchPlaylist(weatherRes);
    res.send({weatherRes , getPlaylist});
  } catch (error) { 
    console.error(error);
    res.status(500).send('Internal server error'); 
  }
});


//Set home page
app.get("/", async (req, res) =>{
  res.render("index", {title: "Home"})
})

app.listen(port, () =>{
  console.log(`listening on http://localhost:${port}`);
})