const router = require("express").Router();
require('dotenv').config();

router.get('/', async (req, res) => {

  const dateData = req.params.date
  console.log(dateData);
    let sportsAPI = `https://replay.sportsdata.io/api/metadata?key=ded08fb6624a44c5a6a515e75badd0f7`;
    console.log(sportsAPI)
    fetch(sportsAPI).then(function(response) {
      return response.json();
  }).then(function(data) {
      res.json(data);
   })
  })

  module.exports = router