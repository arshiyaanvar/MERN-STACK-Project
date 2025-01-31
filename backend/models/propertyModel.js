const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
