require("dotenv").config();
let axios = require("axios");
let omdb = require("omdb-client");
let moment = require("moment");
let chalk = require("chalk");
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
let fs = require("fs");

let action = process.argv[2];
let query = process.argv.slice(3).join("-");

function search() {
  switch (action) {
    case "concert-this":
      axios
        .get(
          `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`
        )
        .then(function(response) {
          let data = response.data;
          for (i = 0; i < data.length; i++) {
            if (i <= 10) {
              console.log(chalk.blue("Event", i + 1));
              console.log(chalk.blue("Venue:"), data[i].venue.name);
              console.log(
                chalk.blue("Location:"),
                data[i].venue.city + ", " + data[i].venue.country
              );
              console.log(
                chalk.blue("Date:"),
                moment(data[i].datetime, "YYYY/MM/DD").format()
              );
              console.log(
                chalk.yellow("-----------------------------------------")
              );
            }
            else break;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      break;
    case "spotify-this-song":
      if (query === "") query = "All the Small Things";
      spotify.search({ type: "track", query: query }, function(err, response) {
        if (err) {
          return console.log("Error occurred: " + err);
        }

        let data = response.tracks.items[0];
        console.log(chalk.blue("Artist(s):"), data.album.artists[0].name);
        console.log(chalk.blue("Song:"), data.name);
        console.log(chalk.blue("Link:"), data.external_urls.spotify);
        console.log(chalk.blue("Album:"), data.album.name);
      });
      break;
    case "movie-this":
      if (query === "") query = "Mr. Nobody";
      let params = {
        apiKey: "trilogy",
        title: query
      };

      omdb.get(params, function(err, data) {
        if (err) throw err;
        console.log(chalk.blue("Title:"), data.Title);
        console.log(chalk.blue("Year:"), data.Year);
        console.log(chalk.blue("IMDB Rating:"), data.imdbRating);
        console.log(chalk.blue("Country:"), data.Country);
        console.log(chalk.blue("Language:"), data.Language);
        console.log(chalk.blue("Plot:"), data.Plot);
        console.log(chalk.blue("Actors:"), data.Actors);
        console.log(chalk.yellow("-----------------------------------------"));
      });
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "UTF-8", function(err, data) {
        if (err) throw err;
        let arr = data.split(",");
        action = arr[0];
        query = arr[1];
        search();
      });
      break;
    default:
      break;
  }
}

search();
