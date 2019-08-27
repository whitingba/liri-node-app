//require("dotenv").config();

//var keys = require("./keys.js");

//require the axios package
var axios = require("axios");

//require the moment.js package for use in pulling in date from response data on Bandsintown api
var moment = require('moment');






// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")



//FIXME: - create a function for this action

// let artist = process.argv.slice(2).join(" ");
// //create a function to get the Bandsintown response data from the bandsintown api, passing in a paramater of artist that is plugged into the bandsintown url to search for the artist.
// //let concertInfo = function (artist) {

// //URL we will query to get the response data from
// let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// //axios get method to query URL
// axios.get(queryURL).then(function (response) {

//     //give an error if the artist is not found
//     if (!response.data.length) {
//         console.log("Error, no results found.");
//         return;
//     }

//     //loop through the response data 
//     for (var i = 0; i < response.data.length; i++) {
//         //this array is not named in the JSON data, give it a name to be able to reference it in my console log
//         let event = response.data[i];

//         //console log the results:
//         console.log(
//             `Get excited, because ${artist} will be playing at the ${event.venue.name} in ${event.venue.city}, ${event.venue.region} on ${moment(event.datetime).format("MM/DD/YYYY")}.`
//         )
//     }


// })

//}




//TODO:

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).


//TODO:

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


let movie = process.argv.slice(2).join(" ");

let URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

axios.get(URL).then(function (response) {

    if (!response.data.length) {
        //console an error message if movie not found
        console.log("Error, movie title not found");
    }

    for (var i = 0; i < response.data.length; i++) {


        console.log(
            response.data.title
            //   `Movie Title: ${response.data.title} \nYear of Release: ${response.data.year} \nIMDB Rating: ${response.data.Ratings.imdbRating}`
        );
    };
})


//TODO:

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.



//TODO:
// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


