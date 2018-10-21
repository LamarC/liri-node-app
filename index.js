// Read and set environment variables
require("dotenv").config();

console.log(process.env.SPOTIFY_ID);
console.log(process.env.SPOTIFY_SECRET);

const SpotifyWebApi = require('spotify-web-api-node');

const keys = {
    spotify:process.env.SPOTIFY_ID
}


var request = require('request');
request(function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});