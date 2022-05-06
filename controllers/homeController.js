"use strict";

exports.sendReqParam = (req, res) => {
  let booking = req.params.booking;
  res.send(`This is the page for ${booking}`);
};
