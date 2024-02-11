const router = require("express").Router();

let gamesDate = 'https://replay.sportsdata.io/api/v3/nfl/stats/json/scoresbydate/2023-11-27?key=df6589421f9c434db10cf32fc544ccbe';

router.get('/', (req, res) => {
  fetch(gamesDate).then(function(response) {
    return response.json();
}).then(function(data) {
    res.json(data);
 })
})
  

module.exports = router