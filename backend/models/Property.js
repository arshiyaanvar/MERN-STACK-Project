const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  booked: { type: Boolean, default: false },
  user: { type: String, default: "" } // Store the user's name when booked
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
