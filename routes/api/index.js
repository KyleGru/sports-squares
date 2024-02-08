const router = require('express').Router();

const sportsRoutes = require('./sportsRoutes');

router.use('/sportsRoutes', sportsRoutes);

module.exports = router;