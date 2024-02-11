const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get('/', async(req, res) => {
     res.render('login')
})

module.exports = router;
