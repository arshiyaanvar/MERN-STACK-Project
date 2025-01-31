import React from 'react';

function PropertyList({ properties, onSelectProperty, onDeleteProperty }) {
  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        properties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Location:</strong> {property.location}</p>

            
            {property.booked && (
              <span className="booked-label">Booked</span>
            )}

            {!property.booked ? (
              <button onClick={() => onSelectProperty(property)}>View Details</button>
            ) : (
              <p>This property is already booked.</p>
            )}

            
            {!property.booked && (
              <button onClick={() => onDeleteProperty(property._id)}>Delete Property</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;
