import React from 'react';

function LocationCard({ location, onClick }) {
  return (
    <div className="location-card" onClick={onClick}>
      <img src={location.image} alt={location.name} className="location-image" />
      <div className="location-info">
        <h3 className="location-name">{location.name}</h3>
        <p className="location-distance">{location.distance}</p>
      </div>
    </div>
  );
}

export default LocationCard;
