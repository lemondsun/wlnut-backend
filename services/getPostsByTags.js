const axios = require('axios');

//route 2
//this function makes the 'get' call using axios
//and returns JSON object based on user tag params
const getPostsByTags = (req, res) => {

  //list of tags submitted by user
  let tags = req.params.tags.split(',');
  let promises = [];
 //the data from the api calls 
  let multipleResponses = {posts:[]};
 
  // check amount of tags 
  //if only one tag push resp to multipleResponses.posts
  if (tags.length === 1) {
    promises.push(
      axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags}`)
        .then(resp => {
          //in order to avoid nested arrays, map the resp and push each individual element
          resp.data.posts.map((element) => multipleResponses.posts.push(element))
        })
        .catch(err => {
          // Handle Error Here
          console.log(err);
        }));
  } else {
    //if they're multiple tags
    for (let i = 0; i < tags.length; i++){
      //push the response from the first tag to multipleResponses.posts
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
        //get the data from the api for each of the following tags
        //loop through the data and push each element to multipleResponses if element is not in multipleResponses already
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

  Promise.all(promises).then(() => res.status(200).send(multipleResponses));
};

module.exports = getPostsByTags;