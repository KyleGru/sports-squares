const router = require("express").Router();

const userRoutes = require("./user-routes");
const sportFetch = require("./sportFetch")

router.use("/users", userRoutes);
router.use("/sportFetch", sportFetch);



module.exports = router;
