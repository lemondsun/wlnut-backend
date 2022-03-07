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
  });
}
//route 2
//this function makes the 'get' call using axios
//using the guide from https://expressjs.com/en/guide/routing.html I make my route with the app.get method
const getPostsByTags = (req, res) => {

  //list of tags submitted by user
  let tags = req.params.tags.split(',');
  let promises = [];
  //if user submits multiple tags save them to this variable
  let multipleResponses = {posts:[]};
 
  // check amount of tags 
  //if only one tag push resp to multipleResponses array
  if (tags.length === 1) {
    promises.push(
      axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags}`)
        .then(resp => {
          resp.data.posts.map((element) => multipleResponses.posts.push(element))
        })
        .catch(err => {
          // Handle Error Here
          console.log(err);
        }));
      } else {
    for (let i = 0; i < tags.length; i++){
      //push the response from the first tag to multipleResponses
      if (i === 0) {
        promises.push(
          axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags[i]}`)
            .then(resp => {
              resp.data.posts.map((element)=> multipleResponses.posts.push(element))
            })
            .catch(err => {
              // Handle Error Here
              console.log(err)
            }))
      } else {
        //get the data from the api
        //loop through the data and push element to multipleResponses if element is not in multipleResponses already
        promises.push(
          axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags[i]}`)
            .then(resp => {
              resp.data.posts.map((element) => { multipleResponses.posts.includes(element) ? null : multipleResponses.posts.push(element) });
            })
            .catch(err => {
              // Handle Error Here
              console.log(err);
            }))
      };
    };
  };

  Promise.all(promises).then(() => res.status(400).send(multipleResponses));
};

app.get('/api/ping', testPing);

app.get('/api/:tags', getPostsByTags);
//sends error message if no tags are presented in url
app.get('/api/', (req, res) => res.send({ "error": "Tags parameter is required" }));
