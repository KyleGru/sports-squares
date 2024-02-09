
const router = require("express").Router();

let sportsAPI = 'https://replay.sportsdata.io/api/v3/nfl/pbp/json/playbyplay/18401?key=578baa9fb5a74579836eba8e448bca6b';

router.get('/', (req, res) => {
  fetch(sportsAPI).then(function(response) {
    return response.json();
}).then(function(data) {
    res.json(data);
 })
})
  

module.exports = router