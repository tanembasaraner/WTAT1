const TravelPackage = require("../models/travelPackage");
httpStatus = require("http-status-codes");
module.exports = {
    index: (req, res, next) => {
        TravelPackage.find()
            .then(travelPackages => {
                res.locals.travelPackages = travelPackages;
                next();
            })
            .catch(error => {
                console.log(`Error fetching packages: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.travelPackages);
        } else {
            res.render("travelPackages/index");
        }
    },
    new: (req, res) => {
        res.render("travelPackages/new");
    },
    create: (req, res, next) => {
        let packageParams = {
            country: req.body.country,
            price: req.body.price,
            dates: req.body.dates
        };
        TravelPackage.create(packageParams)
            .then(travelPackages => {
                req.flash("success", `${travelPackages.country} package created successfully!`);
                res.locals.redirect = "/travelPackages";
                res.locals.travelPackage = travelPackages;
                next();
            })
            .catch(error => {
                console.log(`Error saving a package: ${error.message}`);
                res.locals.redirect = "/travelPackages/new";
                req.flash("error", `Failed to create a package because: ${error.message}.`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let travelPackageID = req.params.id;
        TravelPackage.findById(travelPackageID)
            .then(travelPackage => {
                res.locals.travelPackage = travelPackage;
                next();
            })
            .catch(error => {
                console.log(`Error fetching package by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("travelPackages/show");
    },
    edit: (req, res, next) => {
        let travelPackageID = req.params.id;
        TravelPackage.findById(travelPackageID)
            .then(travelPackage => {
                res.render("travelPackages/edit", {
                    travelPackage: travelPackage
                });
            })
            .catch(error => {
                console.log(`Error fetching package by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let travelPackageID = req.params.id,
            packageParams = {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            };

            TravelPackage.findByIdAndUpdate(travelPackageID, {
            $set: packageParams
        })
            .then(travelPackages => {
                res.locals.redirect = `/travelPackages/${travelPackageID}`;
                res.locals.travelPackage = travelPackage;
                next();
            })
            .catch(error => {
                console.log(`Error updating package by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let travelPackageID = req.params.id;
        TrevelPackage.findByIdAndRemove(packageId)
            .then(() => {
                res.locals.redirect = "/travelPackages";
                next();
            })
            .catch(error => {
                console.log(`Error deleting package by ID: ${error.message}`);
                next();
            });
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
    join: (req, res, next) => {
        let travelPackageID = req.params.id,
            currentUser = req.user;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    travelPackages: travelPackageID
                }
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    },
    filterUserTravelPackages: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {
            let mappedTravelPackages = res.locals.travelPackages.map(travelPackage => {
                let userJoined = currentUser.travelPackages.some(userTravelPackage => {
                    return userTravelPackage.equals(travelPackage._id);
                });
                return Object.assign(travelPackage.toObject(), { joined: userJoined });
            });
            res.locals.travelPackages = mappedTravelPackages;
            next();
        } else {
            next();
        }
    }
};