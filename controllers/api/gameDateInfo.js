const router = require("express").Router();
require('dotenv').config();

router.get('/', async (req, res) => {

  const dateData = req.params.date
  console.log(dateData);
    let sportsAPI = `https://replay.sportsdata.io/api/metadata?key=a2bdf7d742d940ea9f825aa39dcac3c5`;
    console.log(sportsAPI)
    fetch(sportsAPI).then(function(response) {
      return response.json();
  }).then(function(data) {
      res.json(data);
   })
  })

  module.exports = router