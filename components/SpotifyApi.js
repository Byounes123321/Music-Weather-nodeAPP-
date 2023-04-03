const { response } = require('express');
const weather = require('./OpenWeatherApi'); 
require('dotenv').config();
const clientId = process.env.SPOTIFYCLIENTID;
const clientSecret = process.env.SPOTIFYCLIENTSECRET;


async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  });
  const data = await response.json();
  return data.access_token;
}



async function searchPlaylist() {

  let authToken = await getToken();
  // console.log(authToken);

  const response = await fetch(`https://api.spotify.com/v1/search?q=cloudsvibes&type=playlist&market=CA&limit=5`, {
        headers: {
          'Authorization': 'Bearer ' + authToken,
        }
      });
  const data = await response.json();
  console.log(data.playlists.items[0].name);
  return data.playlists.items[0];
}
// searchPlaylist();

module.exports = {
    getToken,
    searchPlaylist,
}