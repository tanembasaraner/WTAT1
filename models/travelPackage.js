const mongoose = require("mongoose"),
travelPackSchema = mongoose.Schema({
country: String,
price: Number,
 dates: String,
  });
module.exports = mongoose.model("TravelPackage", travelPackSchema);
