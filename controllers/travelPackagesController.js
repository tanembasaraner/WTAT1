const Package = require("../models/travelPackage");
module.exports = {
    index: (req, res, next) => {
        Package.find()
            .then(packages => {
                res.locals.packages = packages;
                next();
            })
            .catch(error => {
                console.log(`Error fetching packages: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        if (req.query.format === "json") {
        res.json(res.locals.packages);
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
        Package.create(packageParams)
        .then(package => {
            req.flash("success", `${package.country} package created successfully!`);
            res.locals.redirect = "/travelPackages";
            res.locals.package = package;
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
        let packageId = req.params.id;
        Package.findById(packageId)
            .then(package => {
                res.locals.package = package;
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
        let packageId = req.params.id;
        Package.findById(packageId)
            .then(package => {
                res.render("travelPackages/edit", {
                    package: package
                });
            })
            .catch(error => {
                console.log(`Error fetching package by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let packageId = req.params.id,
            packageParams = {
                country: req.body.country,
                price: req.body.price,
                dates: req.body.dates
            };
            Package.findByIdAndUpdate(packageId, {
            $set: packageParams
        })
            .then(package => {
                res.locals.redirect = `/travelPackages/${packageId}`;
                res.locals.package = package;
                next();
            })
            .catch(error => {
                console.log(`Error updating package by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let packageId = req.params.id;
        Package.findByIdAndRemove(packageId)
            .then(() => {
                res.locals.redirect = "/travelPackages";
                next();
            })
            .catch(error => {
                console.log(`Error deleting package by ID: ${error.message}`);
                next();
            });
    }
};