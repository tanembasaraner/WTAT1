"use strict";


exports.showSignUp = (req, res) => {
 res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
 res.render("thanks");
};
var packages = [
 {
 title: "Event Driven Cakes",
 cost: 50
 },
 {
 title: "Asynchronous Artichoke",
 cost: 25
 },
 {
 title: "Object Oriented Orange Juice",
 cost: 10
 }
];
exports.showPackages = (req, res) => {
 res.render("packages", {
 offeredPackages: packages
 });
};
