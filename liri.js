//require("dotenv").config();

//var keys = require("./keys.js");

var axios = require("axios");

var moment = require('moment');



// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

let artist = process.argv[2];
//create a function to get the Bandsintown response data from the bandsintown api, passing in a paramater of artist that is plugged into the bandsintown url to search for the artist.
//let concertInfo = function (artist) {

//URL we will query to get the response data from
let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//axios get method to query URL
axios.get(queryURL).then(function (response) {

    if (!response.data.length) {
        console.log("Error, no results found.");
        return;
    }

    for (var i = 0; i < response.data.length; i++) {
        let event = response.data[i];



        console.log(
            `Get excited, because ${artist} will be playing at the ${event.venue.name} in ${event.venue.city}, ${event.venue.region} on ${moment(event.datetime).format("MM/DD/YYYY")}.`
        )
    }



})

//}







