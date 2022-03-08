//this function will return the {success:true} object
//route 1
const testPing = (req, res) => {
  res.send({
    "success": true
  });
}
module.exports = testPing;