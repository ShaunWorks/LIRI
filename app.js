require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let chalk = require("chalk");
//var spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let query = process.argv.slice[3].join("-");

switch (action) {
    case "concert-this":
        axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`)
            .then(function (response) {
                let data = (response.data);
                for (i = 0; i < 10; i++) {
                    console.log(chalk.blue("Event", i + 1));
                    console.log(chalk.blue("Venue:"), data[i].venue.name);
                    console.log(chalk.blue("Location:"), data[i].venue.city + ", " + data[i].venue.country);
                    console.log(chalk.blue("Date:"), moment(data[i].datetime, "YYYY/MM/DD").format());
                    console.log(chalk.yellow("////////////////////////////////////////////"))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`)
            .then(function (response) {
                let data = (response.data);
                for (i = 0; i < 10; i++) {
                    console.log(chalk.blue("Movie:"), data.name);
                    console.log(chalk.blue("Year:"), data.year);
                    console.log(chalk.blue("Rating:"), data[i].venue.city + ", " + data[i].venue.country);
                    console.log(chalk.blue("Date:"), moment(data[i].datetime, "YYYY/MM/DD").format());
                    console.log(chalk.yellow("////////////////////////////////////////////"))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
                break;
    case "do-what-it-says":
        break;
    default:
        break;
}