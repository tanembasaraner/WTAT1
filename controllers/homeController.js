"use strict";

exports.sendReqParam = (req, res) => {
  let booking = req.params.booking;
  res.send(`This is the page for ${booking}`);
};
exports.respondWithName = (req, res) => {
//  let paramsName = req.params.myName;
  res.render("index", { name: paramsName });
};
