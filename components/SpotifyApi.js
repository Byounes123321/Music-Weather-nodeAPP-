const { response } = require('express');
const weather = require('./OpenWeatherApi'); 
require('dotenv').config();
const clientId = process.env.SPOTIFYCLIENTID;
const clientSecret = process.env.SPOTIFYCLIENTSECRET;


async function getToken() {
    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
        // authToken = data
}

let authToken =  getToken()

async function searchPlaylist() {
    await fetch(`https://api.spotify.com/v1/search?q=sunny&type=playlist&market=CA&limit=5`, {
        headers: {
          'Authorization': 'Bearer' + authToken,
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

module.exports = {
    getToken,
    searchPlaylist,
}