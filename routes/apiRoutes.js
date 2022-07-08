"use strict";

const router = require("express").Router(),
  travelPackagesController = require("../controllers/travelPackagesController"),
  usersController = require("../controllers/usersController");

// router.use(usersController.verifyToken);
router.post("/login", usersController.apiAuthenticate);
router.use(usersController.verifyJWT);



router.get("/travelPackages/:id/join", travelPackagesController.join, travelPackagesController.respondJSON);
router.get(
  "/travelPackages",
  travelPackagesController.index,
  travelPackagesController.filterUserTravelPackages,
  travelPackagesController.respondJSON
);
router.use(travelPackagesController.errorJSON);

module.exports = router;