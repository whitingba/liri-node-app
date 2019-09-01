require('dotenv').config();

let keys = require('./keys.js');

//require the axios package
let axios = require('axios');

//require the moment.js package for use in pulling in date from response data on Bandsintown api
let moment = require('moment');

//require the node-spotify-api
let Spotify = require('node-spotify-api');

let commandName = process.argv[2];

let inputData = process.argv[3] ? process.argv.slice(3).join(" ") : "";



let userChoice = function (doThisChoice, data) {

    switch (doThisChoice) {
        case 'concert-this':
            concertInfo(data);
            break;
        case 'spotify-this':
            spotifySong(data);
            break;
        case 'movie-this':
            movieInfo(data);
            break;
        case 'do-what-it-says':
            doWhatItSays(data);
            break;
        default:
            console.log('Sorry, I cannot help you');
            break;
    }
};





//create a function to get the Bandsintown data from the bandsintown api, passing in a paramater of chodenArtist that is plugged into the bandsintown url to search for the chosen artist.
let concertInfo = function (artist) {

    //I created my own default if no artist was listed.
    let chosenArtist = (artist == "") ? "Tool" : artist;

    //URL we will query to get the response data from
    let queryURL = "https://rest.bandsintown.com/artists/" + chosenArtist + "/events?app_id=codingbootcamp";

    //axios get method to query URL
    axios.get(queryURL).then(function (response) {

        //give an error if the artist is not found
        if (!response.data.length) {
            console.log("Error, no results found.");
            return;
        }

        //loop through the response data 
        for (var i = 0; i < response.data.length; i++) {
            //this array is not named in the JSON data, give it a name to be able to reference it in my console log
            let event = response.data[i];

            //console log the results:
            console.log(
                `Get excited, because ${chosenArtist} will be playing at the ${event.venue.name} in ${event.venue.city}, ${event.venue.region} on ${moment(event.datetime).format("MM/DD/YYYY")}.`
            )
        }


    })

}


let spotify = new Spotify(keys.spotify);

//Function to grabArtist name from Spotify API data
let grabArtist = function (artist) {

    return artist.name;
};
//Main function created to pull date in from the Spotify API
let spotifySong = function (songName) {

    //If a song is not listed by the user than a default song - 'The Sign' will display instead
    let chosenSong = (songName == "") ? "The Sign" : songName;

    //search method as pulled form the Spotify API documentation
    spotify.search(
        {
            type: 'track',
            query: chosenSong
        }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            //variable created to shorten the length of the response object when console logging
            var songs = data.tracks.items;
            //Loop through the songs data that is given back through the search
            for (var i = 0; i < songs.length; i++) {
                //console log the results
                console.log(
                    `---------------------------- \nArtist: ${songs[i].artists.map(grabArtist)} \nSong: ${songs[i].name} \nPreview: ${songs[i].preview_url} \nAlbum: ${songs[i].album.name}`
                );
            }
            //Final console log that displays the total number of songs that were found in the search
            console.log(songs.length + " songs found.")
        }
    );

}






//********************************************************************************************* */


// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
//****************************************************************************** */



//FIXME: - need to correct error then call Mr. Nobody movie and create a function for this to assign to movie-this

let movieInfo = function (movie) {


    let chosenMovie = (movie == "") ? "Mr Nobody" : movie;
    console.log('movie:' + JSON.stringify(chosenMovie));

    let URL = "http://www.omdbapi.com/?t=" + chosenMovie + "&y=&plot=short&apikey=trilogy";


    axios.get(URL).then(function (response) {


        console.log(
            `------------------------------ \nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nProduction Country: ${response.data.Country} \nLanguage: ${response.data.Language} \nActors: ${response.data.Actors} \nPlot: ${response.data.Plot} \n------------------------------`
        );


    })
};


//TODO:

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.




//calling main process function for this app
userChoice(commandName, inputData);