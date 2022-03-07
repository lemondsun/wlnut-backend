const axios = require('axios');
var express = require("express");
var app = express();


app.listen(3000, () => {
console.log("Server running on port 3000");
});
//this function will return the success true object
//route 1
const testPing = (req, res) => {
  res.send({
    "success": true
  })
}
//route 2
//this function makes the 'get' call using axios
//using the guide from https://expressjs.com/en/guide/routing.html I make my route with the app.get method
const getPostsByTags = (req, res) => {
  console.log(req.params.tags)
      axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${req.params.tags}`)
        .then(resp => {
          res.send(resp.data.posts)
      })
      .catch(err => {
        // Handle Error Here
        res.send(`error: ${err.response.data.error}`);
      });
};

app.get('/api/ping', testPing);

app.get('/api/:tags', getPostsByTags);