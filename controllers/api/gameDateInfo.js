const router = require("express").Router();
require('dotenv').config();

router.get('/', async (req, res) => {

  const dateData = req.params.date
  console.log(dateData);
    let sportsAPI = `https://replay.sportsdata.io/api/metadata?key=7adc29eeb8e6409787faae5e3ef485d9`;
    console.log(sportsAPI)
    fetch(sportsAPI).then(function(response) {
      return response.json();
  }).then(function(data) {
      res.json(data);
   })
  })

  module.exports = router