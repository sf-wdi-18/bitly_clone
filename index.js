// require all the necessary modules
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  views = path.join(process.cwd(), "views"),
  randomString = require("randomstring");

app.use(bodyParser.urlencoded({extended: true}));

// store the submitted URLs
// in an array
// var urls = [];
// in an object
var urls = {};

// GET home.html
app.get("/", function (req, res) {
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});

// POST a new URL
app.post("/urls", function (req, res) {
  // we might need this
  var homePathErr = path.join(views, "home_error.html");
  // get the submitted URL from the form input with name='url'
  var newUrl = req.body.url;
  // if user enters a url without the protocol, prompt to try again
  if (newUrl.slice(0,7) === 'http://' || newUrl.slice(0,8) === 'https://') {
    // the key for the submitted URL will be a random string
    var urlString = randomString.generate();
    // add to the url object
    urls[urlString] = newUrl;
    // or push it into an array and capture its index
    // urls.push(newUrl);
    // var index = urls.length - 1;
    res.send("View your url at localhost:3000/urls/" + urlString);
    // res.send("View your url at localhost:3000/urls/" + index);
  }
  else
    res.sendFile(homePathErr);
});

// GET the URL redirect
app.get("/urls/:index", function (req, res) {
  var index = req.params.index;
  // the following line works whether :index is an integer and
  // you're indexing an array, OR :index is a random string and
  // you're looking up an object property
  var url = urls[index];
  res.redirect(url);
});

// set up the server to listen on port 3000
app.listen(3000, function () {
  console.log("GO TO localhost:3000");
});
