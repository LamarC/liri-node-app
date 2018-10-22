// Read and set environment variables
require("dotenv").config();

//Requiered modules

//Omdb
const request = require("request");

//Spotify
const Spotify = require('node-spotfy-api');
const spotify = new Spotify(keys.spotify);

//To read and update files
const fs = require("fs");

//Dates formatter
const moment = require("moment");

//liri commands
let command = process.argv[2];
let query = process.arv[3];

//Omdb 

function findMovie(movie) {
	// Append the command to the log file
	fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + movie + '\n\n', (err) => {
		if (err) throw err;
	});

	// Give default value to movie
	var search;
	if (movie === '') {
		search = 'Cruel Intentions';
	} else {
		search = movie;
	}

	// Replace spaces with '+' for the query string
	search = search.split(' ').join('+');

	// Construct the query string
	var queryStr = 'http://www.omdbapi.com/?t=' + search + '&plot=full&tomatoes=true';

	// Send the request to OMDB
	request(queryStr, function (error, response, body) {
		if ( error || (response.statusCode !== 200) ) {
			var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

			// Append the error string to the log file
			fs.appendFile('./log.txt', errorStr1, (err) => {
				if (err) throw err;
				console.log(errorStr1);
			});
			return;
		} else {
			var data = JSON.parse(body);
			if (!data.Title && !data.Released && !data.imdbRating) {
				var errorStr2 = 'ERROR: No movie info retrieved, please check the spelling of the movie name!';

				// Append the error string to the log file
				fs.appendFile('./log.txt', errorStr2, (err) => {
					if (err) throw err;
					console.log(errorStr2);
				});
				return;
			} else {
		    	// Pretty print the movie information
		    	var outputStr = '------------------------\n' + 
								'Movie Information:\n' + 
								'------------------------\n\n' +
								'Title: ' + data.Title + '\n' + 
								'Year Released: ' + data.Released + '\n' +
								'Rating: ' + data.imdbRating + '\n' +
								'Country Produced: ' + data.Country + '\n' +
								'Language: ' + data.Language + '\n' +
								'Plot: ' + data.Plot + '\n' +
								'Actors: ' + data.Actors + '\n' + 
								'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';

				// Append the output to the log file
				fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
					if (err) throw err;
					console.log(outputStr);
				});
			}
		}
	});
}








