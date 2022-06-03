const mongoose = require("mongoose");
const travelPackSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  dates: {
    type: Number,
    min: [2022, "Only packages starting in 2022 are available"],
    max: 2025
  }
});
module.exports = mongoose.model("TravelPackage", travelPackSchema);