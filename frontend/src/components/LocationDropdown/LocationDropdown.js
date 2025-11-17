import React from 'react';
import './LocationDropdown.css';

const locations = [
  { id: 'all', name: 'All Locations', value: 'all' },
  { id: 'newyork', name: 'New York', value: 'newyork' },
  { id: 'paris', name: 'Paris', value: 'paris' },
  { id: 'tokyo', name: 'Tokyo', value: 'tokyo' },
  { id: 'capetown', name: 'Cape Town', value: 'capetown' },
  { id: 'thailand', name: 'Thailand', value: 'thailand' }
];

const LocationDropdown = ({ selectedLocation, onLocationSelect, isOpen, onToggle }) => {
  const handleLocationClick = (location) => {
    onLocationSelect(location);
    onToggle(); // Close dropdown after selection
  };

  const handleToggle = () => {
    onToggle();
  };

  return (
    <div className="location-dropdown-container">
      <div className="search-item location-search-item" onClick={handleToggle}>
        <p className="search-item-text1">Where</p>
        <p className="search-item-text2">
          {selectedLocation ? selectedLocation.name : "Select a location"}
        </p>
      </div>

      {isOpen && (
        <div className="location-dropdown">
          <div className="location-dropdown-header">
            <h3>Select a destination</h3>
          </div>
          <div className="location-options">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-option ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="location-info">
                  <span className="location-name">{location.name}</span>
                  {location.id === 'all' && (
                    <span className="location-description">View all available properties</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
