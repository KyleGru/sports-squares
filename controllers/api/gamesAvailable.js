
const router = require("express").Router();
const { GameDates } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const dateData = await GameDates.findAll();
    res.status(200).json(dateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:date', async (req, res) => {

const dateData = req.params.date
console.log(dateData);
  let sportsAPI = `https://replay.sportsdata.io/api/v3/nfl/stats/json/scoresbydate/${dateData}?key=990e10adf1584c46a239ce3489ebc9c7`;
  console.log('Date API: ', sportsAPI)
  fetch(sportsAPI).then(function(response) {
    return response.json();
}).then(function(data) {
    res.json(data);
 })
})

router.post('/', async (req, res) => {
  // create a new list of games by date
  try {
    const dateData = await GameDates.create({
      date: req.body.date
    });
    res.status(200).json(dateData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  

module.exports = router