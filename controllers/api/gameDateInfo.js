const router = require("express").Router();

router.get('/', async (req, res) => {

  const dateData = req.params.date
  console.log(dateData);
    let sportsAPI = `https://replay.sportsdata.io/api/metadata?key=ace8a9e3cd5b45e58e5670908b12cd03`;
    console.log(sportsAPI)
    fetch(sportsAPI).then(function(response) {
      return response.json();
  }).then(function(data) {
      res.json(data);
   })
  })

  module.exports = router