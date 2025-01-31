import React, { useState } from "react";
import axios from "axios";

function PropertyDetails({ property, onBook }) {
  const [userName, setUserName] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  if (!property) return <p>Select a property to view details.</p>;

  const handleBooking = async () => {
    if (!userName.trim()) {
      alert("Please enter your name to book the property.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5001/api/properties/book/${property._id}`,
        { user: userName }
      );

      onBook(property._id, response.data.property); // Update UI with new booking data
      setSuccessMessage(`Property "${property.title}" has been booked successfully!`); // Show success message
      setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error booking property:", error);
      alert(error.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="property-details">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>

      {successMessage && <p>{successMessage}</p>} {/* Display success message */}

      {property.booked ? (
        <p>This property is already booked by <strong>{property.user || "someone"}</strong>!</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button onClick={handleBooking}>Book Property</button>
        </>
      )}
    </div>
  );
}

export default PropertyDetails;
