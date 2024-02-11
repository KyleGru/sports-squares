const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.get('/', async(req, res) => {
     res.render('login')
})

module.exports = router;
