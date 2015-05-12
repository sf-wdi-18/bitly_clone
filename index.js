var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path");

var app = express();
var views = path.join(process.cwd(), "views");

app.use(bodyParser.urlencoded({extended: true}));

// start an array of urls
var urls = [];

// send index.html
app.get("/", function (req, res) {
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});


app.post("/urls", function (req, res) {
  var newUrl = req.body.url;
  // should check newUrl starts
  //  with `https` or `http before
  //  pushing into urls array
  urls.push(newUrl);
  var index = urls.length - 1;
  res.send("View your url at localhost:3000/urls/" + index );
});

app.get("/urls/:index", function (req, res) {
  var index = req.params.index;
  var url = urls[index];
  res.redirect(url);
});


// bonus route to view all urls
app.get("/urls", function (req, res) {
  res.send("all your urls" + urls.join(","))
});

app.listen(3000, function () {
  console.log("GO TO localhost:3000");
});
