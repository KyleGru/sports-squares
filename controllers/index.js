const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get('/', async(req, res) => {
     res.render('game')
})

module.exports = router;
