const Property = require('../models/Property');

exports.getAllProperties = async (req, res) => {
  try {
    const { location } = req.query; // Get location from query params

    let query = {};  // Default query to fetch all properties
    if (location) {
      // If location is provided, filter properties by location (case-insensitive)
      query.location = { $regex: location, $options: 'i' }; // 'i' for case-insensitive matching
    }

    const properties = await Property.find(query); // Get properties based on the query
    res.json(properties); // Send the properties back as the response
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties", error: err });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    if (!title || !description || !price || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProperty = new Property({ title, description, price, location });
    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: "Failed to add property", error: err });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id.replace(/[\n\r]/g, '').trim();

    const property = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(500).json({ message: "Failed to update property", error: err });
  }
};

exports.bookProperty = async (req, res) => {
  try {
    const propertyId = req.params.id.trim();
    const { user } = req.body;

    if (!user || user.trim() === "") {
      return res.status(400).json({ message: "User name is required to book a property." });
    }

    const property = await Property.findByIdAndUpdate(
      propertyId,
      { booked: true, user: user.trim() },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property booked successfully", property });
  } catch (err) {
    console.error("Error booking property:", err);
    res.status(500).json({ message: "Booking failed", error: err });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.booked) {
      return res.status(400).json({ message: "Cannot delete a booked property!" });
    }

    await property.deleteOne();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property", error });
  }
};
