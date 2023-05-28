// import modules
const { req, res } = require("express");
const express = require("express");
const path = require("path");
const weather = require("./components/OpenWeatherApi");
const spotify = require("./components/SpotifyApi");
const bodyParser = require("body-parser");
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
app.get("/views/style.css", function (req, res) {
  res.setHeader("Content-Type", "text/css");
  res.sendFile(__dirname + "/views/style.css");
});

// get location from client
let weatherRes = "";
app.post("/api/getcity", async (req, res) => {
  try {
    console.log("Received POST request to /getcity");
    const { latitude, longitude } = req.body;
    console.log("latitude:", latitude, "longitude:", longitude);

    // Set a timeout value (in milliseconds) for the API call
    const timeoutDuration = 5000; // 5 seconds

    // Create a promise that rejects if the API call takes too long
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("API request timed out"));
      }, timeoutDuration);
    });

    // Perform the API call and wait for the response or timeout
    const weatherPromise = weather.getWeather(latitude, longitude);

    // Use Promise.race() to wait for either the API response or the timeout
    weatherRes = await Promise.race([weatherPromise, timeoutPromise]);

    if (weatherRes instanceof Error) {
      // The request timed out
      res.status(408).send("Request timed out. Please try again.");
    } else {
      console.log(weatherRes);
      let getPlaylist = await spotify.searchPlaylist(weatherRes);
      res.send({ weatherRes, getPlaylist });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//Set home page
app.get("/", async (req, res) => {
  res.render("index", { title: "Music Weather App" });
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
