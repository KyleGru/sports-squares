
const router = require("express").Router();

let sportsAPI = 'https://replay.sportsdata.io/api/v3/nfl/stats/json/boxscorebyscoreidv3/18401?key=df6589421f9c434db10cf32fc544ccbe';

router.get('/', (req, res) => {
  fetch(sportsAPI).then(function(response) {
    return response.json();
}).then(function(data) {
    res.json(data);
 })
})
  

module.exports = router