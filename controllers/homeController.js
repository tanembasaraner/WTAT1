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
exports.showPackages = (req, res) => {
 res.render("packages", {
 offeredPackages: packages
 });
};
