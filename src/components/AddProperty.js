import React, { useState } from "react";
import axios from "axios";

function AddProperty() {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    booked: false 
  });

  const [successMessage, setSuccessMessage] = useState(""); 

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/properties", property)
      .then(() => {
        setSuccessMessage("Property added successfully!"); // Show success message
        setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        alert("Failed to add property.");
      });
  };

  return (
    <div>
      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
