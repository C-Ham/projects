const fetch = require("node-fetch");
const resource_path = "https://www.wcoforever.com/anime/adventure-time"
const episode_test = "https://www.wcoforever.com/adventure-time-season-5-episode-26-wizards-only-fools"
var re = new RegExp("(?<=<div class=\"cat-eps\">)(.*?)(?=<\/a><\/div>)", "gs");
var unicode_dash = new RegExp("&#8211;", "g")
var unicode_quote = new RegExp("&#8217;", "g")
var unicode_ampersand = new RegExp("&#038;", "g")
var title = new RegExp("(?<=class=\"sonra\">)(.*)");
var source = new RegExp("(?<=<a href=\")(.*?)(?=\")");

var currentTitle;
var episodeList = {};

//Sanitize the title content, and sort into a key/value pair dictionary
function titleSort(htmlContent) {
    do {
        //Pull the current unsanitized title from the site content
        currentTitle = re.exec(htmlContent);

        //Check that the title exists
        if (currentTitle) { 
            currentTitle = currentTitle[0];

            //Regex the title from the site content
            let keyPair = JSON.stringify(title.exec(currentTitle)[0]);
            //Fix unicode translation errors 
            keyPair = keyPair.replace(unicode_dash, "-")
            keyPair = keyPair.replace(unicode_quote, "'")
            keyPair = keyPair.replace(unicode_ampersand, "&")
            //Regex title URL from the site content
            let valuePair = JSON.stringify(source.exec(currentTitle)[0]);
            
            //Add the sanitized title and URL to dictionary
            episodeList[keyPair] = valuePair;
        }
    } while (currentTitle)
}

//Get the video player for the specified episode (input should be a URL of type string)
async function getVideoPlayer(episode) {
    const response = await fetch(episode);
    const site_data = await response.text();
    console.log(site_data);
}

//Fetch site content from resource URL, then dump unsanitized title data
fetch(resource_path)
.then((response) => response.text())
.then((text) => titleSort(text))

getVideoPlayer(episode_test);