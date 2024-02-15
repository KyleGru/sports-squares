
const router = require("express").Router();
const { GameDates } = require('../../models')
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const dateData = await GameDates.findAll();
    res.status(200).json(dateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:sportdate', async (req, res) => {

const dateData = req.params.sportdate
console.log(dateData);
  let sportsAPI = `https://replay.sportsdata.io/api/v3/nfl/stats/json/scoresbydate/${dateData}?key=86df436dca9246d888a438b3ac7a19b8`;
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
      sportdate: req.body.date
    });
    console.log('date data', dateData);
    res.status(200).json(dateData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  

module.exports = router