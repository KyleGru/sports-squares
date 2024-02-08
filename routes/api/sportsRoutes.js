

// let sportsAPI = ''

// function getScores() {
//   let sportsAPI = 'https://replay.sportsdata.io/api/v3/nfl/pbp/json/playbyplay/18401?key=578baa9fb5a74579836eba8e448bca6b';

//   fetch(sportsAPI).then(function(response) {
//     return response.json();
// }).then(function(data) {
//     console.log('Data', data);
// })
// }

// getScores();

const router = require('express').Router();

router.get('https://replay.sportsdata.io/api/v3/nfl/pbp/json/playbyplay/18401?key=578baa9fb5a74579836eba8e448bca6b', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

module.exports = router;
