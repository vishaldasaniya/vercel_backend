const mongoose = require("mongoose");

const prizeSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  count: { type: Number, default: 1 },    
  isLimited: { type: Boolean, default: true } 
});

const Prize = mongoose.model("Prize", prizeSchema);


module.exports = Prize;