const prompt = require('prompt-sync')({sigint: true});
const resource_path =
  "https://www.easypacelearning.com/english-books/the-big-list-of-a-to-z-of-words/473-word-list-a-with-brief-definitions";
const fetch = require("node-fetch");
var resource_content = "";
//Regex expression to strip each word definition from resource content text
var re = new RegExp("(?<=<p><strong>)(.*?)(?=</p>)", "g");
//Unparsed word definition line with HTML tags
var currentWord;
//Parsed dict with key/value pairs for word/defs
var wordList = {};
var word;

function decodeWords(content) {
  do {
    //Populate the wordList with regexed definitions
    currentWord = re.exec(content);
    if (currentWord) {
      currentWord = JSON.stringify(currentWord[0]);
      let plainText = currentWord.split(" </strong>");

      //Make sure no values are undefined
      if (plainText[0] && plainText[1]) {
        
        //Split up word/definition, and remove trailing quotes with slice
        let keyPair = plainText[0].slice(1);
        let valuePair = plainText[1].slice(0, -1);

        //Add key/value pairs to dictionary
        wordList[keyPair] = valuePair;
      }
      
    }
  } while (currentWord);
  //wordList dict is now fully populated
}

function userInput() {
    while(true) {
    word = prompt("Enter a word for its definition: ")
    console.log(wordList[word])
    }
}

fetch(resource_path)
  .then((response) => response.text())
  .then((text) => (resource_content = text))
  .then(() => decodeWords(resource_content))
  .then(() => userInput())