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
        res.render("packages/index");
    },
    new: (req, res) => {
        res.render("packages/new");
    },
    create: (req, res, next) => {
        let packageParams = {
            country: req.body.country,
            price: req.body.price,
            dates: req.body.dates
        };
        Package.create(packageParams)
            .then(packages => {
                res.locals.redirect = "/packages";
                res.locals.packages = packages;
                next();
            })
            .catch(error => {
                console.log(`Error saving package: ${error.message}`);
                next(error);
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
        res.render("packages/show");
    },
    edit: (req, res, next) => {
        let packageId = req.params.id;
        Package.findById(packageId)
            .then(package => {
                res.render("packages/edit", {
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
                res.locals.redirect = `/packages/${packageId}`;
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
                res.locals.redirect = "/packages";
                next();
            })
            .catch(error => {
                console.log(`Error deleting package by ID: ${error.message}`);
                next();
            });
    }
};