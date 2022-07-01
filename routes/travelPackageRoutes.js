"use strict";

const router = require("express").Router(),
travelPackagesController = require("../controllers/travelPackagesController");

router.get("", travelPackagesController.index, travelPackagesController.indexView);
router.get("/new", travelPackagesController.new);
router.post("/create", travelPackagesController.create, travelPackagesController.redirectView);
router.get("/:id/edit", travelPackagesController.edit);
router.put("/:id/update", travelPackagesController.update, travelPackagesController.redirectView);
router.get("/:id", travelPackagesController.show, travelPackagesController.showView);
router.delete("/:id/delete", travelPackagesController.delete, travelPackagesController.redirectView);

module.exports = router;