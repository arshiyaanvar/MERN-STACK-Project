import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import AddProperty from './components/AddProperty';

function App() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookedProperty, setBookedProperty] = useState(null);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [message, setMessage] = useState('');
  const propertyDetailsRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/properties')
      .then((response) => setProperties(response.data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    if (propertyDetailsRef.current) {
      propertyDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  const handleBookProperty = (propertyId) => {
    axios
      .post(`http://localhost:5001/api/properties/book/${propertyId}`)
      .then((response) => {
        setBookedProperty(response.data);
        setMessage('Property booked successfully!');
      })
      .catch((error) => console.error('Booking failed:', error));
  };

  const handleDeleteProperty = (propertyId) => {
    axios
      .delete(`http://localhost:5001/api/properties/${propertyId}`)
      .then((response) => {
        setProperties(properties.filter(property => property._id !== propertyId));
        setMessage('Property deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
        setMessage('Failed to delete property.');
      });
  };

  const handleAddPropertySuccess = () => {
    setMessage('Property added successfully!');
    setShowAddPropertyForm(false);
  };

  return (
    <div className="App">
      <h1>Home Rental Application</h1>

    
      <button
        className="add-property-btn"
        onClick={() => setShowAddPropertyForm(!showAddPropertyForm)}
      >
        {showAddPropertyForm ? 'Cancel' : 'Add New Property'}
      </button>

      
      {showAddPropertyForm && <AddProperty onSuccess={handleAddPropertySuccess} />}

      
      {message && <div className="message">{message}</div>}

      
      <PropertyList
        properties={properties}
        onSelectProperty={handleSelectProperty}
        onDeleteProperty={handleDeleteProperty}  
      />

      
      {selectedProperty && (
        <div className="property-details-container" ref={propertyDetailsRef}>
          <PropertyDetails
            property={selectedProperty}
            onBook={handleBookProperty}
          />
          <button className="close-details-btn" onClick={handleCloseDetails}>
            Close Details
          </button>
        </div>
      )}

      {/* Booking Confirmation */}
      {bookedProperty && (
        <div className="booking-status">
          <h3>Booking Confirmation:</h3>
          <p>Property "{bookedProperty.title}" has been successfully booked!</p>
        </div>
      )}
    </div>
  );
}

export default App;
