const mongoose = require("mongoose"),
agentSchema = mongoose.Schema({
  brand_name: String,
  email: String,
  });
module.exports = mongoose.model("Agent", agentSchema);
