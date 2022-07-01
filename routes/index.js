"use strict";


const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    travelPackageRoutes = require("./travelPackageRoutes"),
    subscriberRoutes = require("./subscriberRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/travelPackages", travelPackageRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;