"use strict";


exports.showSignUp = (req, res) => {
    res.render("login");
};
exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};
var packages = [
    {
        title: "Greece",
        cost: 500
    },
    {
        title: "Thailand",
        cost: 2500
    },
    {
        title: "Turkey",
        cost: 1000
    }
];

module.exports = {
    showPackages: (req, res) => {
        res.render("packages", {
            offeredCourses: packages
        });
    },
    getSubscriptionPage: (req, res) => {
        res.render("contact");
    },
    index: (req, res) => {
        res.render("index");
    },
    logRequestPaths: (req, res, next) => {
        console.log(`request made to: ${req.url}`);
        next();
    }
};        
