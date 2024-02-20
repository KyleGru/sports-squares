const router = require("express").Router();
require('dotenv').config();

router.get('/', async (req, res) => {

  const dateData = req.params.date
  console.log(dateData);
    let sportsAPI = `https://replay.sportsdata.io/api/metadata?key=6d8a662f1d3048e2be5b0d69225f55dc`;
    console.log(sportsAPI)
    fetch(sportsAPI).then(function(response) {
      return response.json();
  }).then(function(data) {
      res.json(data);
   })
  })

  module.exports = router