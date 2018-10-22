// Read and set environment variables
require("dotenv").config();

//Keys
const keys = require("./keys");

//Omdb
const request = require("request");

//Spotify
 const spotify = require("node-spotify-api");
 const Spotify = new Spotify(keys.spotify);

//To read and update files
const fs = require("fs");

//Dates formatter
const moment = require("moment");

//liri commands
const command = process.argv[2];
const query = process.arv[3];

//Omdb 

function movieThis(movie) {
	// Give default value to movie
	
	const search = "";
	if (movie === '') {
		search = 'Cruel Intentions';
	} else {
		search = movie;
	}

	// Replace spaces with '+' for the query string
	search = search.split(' ').join('+');

	// Construct the query string
	const queryStr = `http://www.omdbapi.com/??apikey=${keys.omdb.id}&t=${title}&plot=short`;

	// Send the request to OMDB
	request(queryStr, function (error, response, body) {
		if ( error || (response.statusCode !== 200) ) {
			var errorStr1 = 'ERROR: OMDB entry -- ' + error;

			// Append the error string to the log file
			fs.appendFile('./log.txt', errorStr1, (err) => {
				if (err) throw err;
				console.log(errorStr1);
			});
			return;
		} else {
			const data = JSON.parse(body);
			if (!data.Title && !data.Released && !data.imdbRating) {
				let errorStr2 = 'ERROR: No movie info retrieved, please check the spelling of the movie name!';

				// Append the error string to the log file
				fs.appendFile('./log.txt', errorStr2, (err) => {
					if (err) throw err;
					console.log(errorStr2);
				});
				return;
			} else {
		    	// Pretty print the movie information
		    	let outputStr = '------------------------\n' + 
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







