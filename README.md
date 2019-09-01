# liri-node-app

1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
This app will allow the user to search by artist and see upcoming concerts, song title to find the artist(s) and preview the song, movie to search ombd for information on the movie. It will also read a .txt file and search for a given song title through Spotify

2. Give a high-level overview of how the app is organized
User will be able to input concert-this and the title of an artist/band name and get upcoming concert information. 
spotify-this with name of song to get information about the song
movie-this with name of movie to get information about the movie
do-what-it-says and nothing else and it is going to read the random.txt file and do what ever is specified in the file. In this case it is spotify-this,I want it that way

I have the variable for the node packages that will be required organized at the top.
Below that is the switch-case statement for the different cases needed to pull in the data, such as concert-this.
Then I have each of the functions that will run based on the case selected. If concert-this is chosen then the concertInfo function will run. Etc.



3. Give start-to-finish instructions on how to run the app
In the terminal while in the app's directory you will type on the command line 'node liri.js concert-this --with a band name inserted here--'  
example: node liri.js concert-this Korn
node liri.js spotify-this white christmas
node liri.js movie-this It
node liri.js do-what-it-says

4. Include screenshots, gifs or videos of the app functioning
These can be found in the directory /images_of_app_working


5. Contain a link to a deployed version of the app
https://whitingba.github.io/liri-node-app/
(Though I thought the instructions said this app could not be deployed)

6. Clearly list the technologies used in the app
Used axios to fetch the data from Bandsintown.com and OMDB
Used moment.js package to 'translate' the date of the concerts
Used spotify package
Used fs package to be able to read the random.txt file

