var express = require("express");
var app = express();

let ping = require('./services/ping');
let getPostsByTags = require('./services/getPostsByTags');

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
  

//using the guide from https://expressjs.com/en/guide/routing.html I make my route with the app.get method below
//route 1
app.get('/api/ping', ping);
//route 2
app.get('/api/:tags', getPostsByTags);
//sends error message if no tags are presented in url
app.get('/api/', (req, res) => res.status(400).send({ "error": "Tags parameter is required" }));


