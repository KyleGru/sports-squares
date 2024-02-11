const router = require("express").Router();

const userRoutes = require("./user-routes");
const sportFetch = require("./sportFetch")
const gamesAvailable = require("./gamesAvailable")

router.use("/users", userRoutes);
router.use("/sportFetch", sportFetch);
router.use("/gamesAvailable", gamesAvailable);



module.exports = router;
