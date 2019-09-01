//require the .env file that holds my unique spotify indentifiers
require('dotenv').config();

//require the key.js file 
let keys = require('./keys.js');

//require the axios package
let axios = require('axios');

//require the moment.js package for use in pulling in date from response data on Bandsintown api
let moment = require('moment');

//require the node-spotify-api
let Spotify = require('node-spotify-api');

//node package for reading or writing a txt file
let fs = require('fs');

//variable created for the command line arguments in index 2
let commandName = process.argv[2];

//variable created for the command line arguments in index 3 which will take strings and join them together for searching the APIs
let inputData = process.argv[3] ? process.argv.slice(3).join(" ") : "";
//Both of the last two variables will be called in my userChoice function below and will be my arguments passed in


//switch case statement  created with parameters that refer to the cases (such as concert-this or movie-this) as well as a parameter that refers back to the data in my individual
//functions created for each thing I want LIRI to do.
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



//**********************************CONCERT-THIS**********************************************/

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


//**********************************SPOTIFY-THIS**********************************************/
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
            console.log(songs.length + ' songs found')
        }
    );

}






//**********************************MOVIE-THIS**********************************************/


//function crated to pull in the movie data from omdb
let movieInfo = function (movie) {

    //if a movie title is not input then the default movie is chosen for the user
    let chosenMovie = (movie == "") ? "Mr Nobody" : movie;
    //console.log('movie:' + JSON.stringify(chosenMovie));
    //URL that will be queried
    let URL = "http://www.omdbapi.com/?t=" + chosenMovie + "&y=&plot=short&apikey=trilogy";
    axios.get(URL).then(function (response) {

        //console log the results from the query
        console.log(
            `------------------------------ \nMovie Title: ${response.data.Title} \nYear of Release: ${response.data.Year} \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes rating: ${response.data.Ratings[1].Value} \nProduction Country: ${response.data.Country} \nLanguage: ${response.data.Language} \nActors: ${response.data.Actors} \nPlot: ${response.data.Plot} \n------------------------------`
        );

    })
};


//**********************************DO-WHAT-IT-SAYS**********************************************/

let doWhatItSays = function () {
    //code to read the random.txt file
    fs.readFile('random.txt', 'utf8', function (error, data) {



        console.log(data);

        //variable created to grab the data from the .txt file and put it into an array
        let dataArr = data.split(',');

        //ternary statement to check if the length of the array is 2 then run the userChoice function with the first two indexes in the array otherwise it will only run with the first index which 
        //will pull the default song set
        (dataArr.length === 2) ? userChoice(dataArr[0], dataArr[1]) : userChoice(dataArr[0]);


    })

}




//calling main process function for this app
userChoice(commandName, inputData);