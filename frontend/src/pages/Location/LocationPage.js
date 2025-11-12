import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import './LocationPage.css';

const locationDisplayNames = {
  'newyork': 'New York',
  'paris': 'Paris',
  'tokyo': 'Tokyo',
  'capetown': 'Cape Town',
  'thailand': 'Thailand',
  'all': 'All Locations'
};

function LocationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const locationParam = searchParams.get('location') || 'all';
  const displayLocation = locationDisplayNames[locationParam] || 'All Locations';

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construct API URL with location filter if not 'all'
        let apiUrl = '/accommodations';
        if (locationParam !== 'all') {
          apiUrl += `?location=${locationParam}`;
        }

        const response = await axios.get(apiUrl);
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
        // Allow viewing even if API fails - show error but don't block access
        setError('Unable to load listings at the moment.');
        setListings([]); // Show empty state instead of blocking
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [locationParam]);

  if (loading) {
    return (
      <div className="location-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding amazing places to stay...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="location-page">
        <Header />
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="location-page">
      <Header />

      <div className="location-content">
        <div className="location-header">
          <h1>Stays in {displayLocation}</h1>
          <p>{listings.length} {listings.length === 1 ? 'place' : 'places'} to stay</p>
        </div>

        <div className="location-filters">
          <div className="filter-tabs">
            <button className="filter-tab active">All</button>
            <button className="filter-tab">Entire place</button>
            <button className="filter-tab">Private room</button>
            <button className="filter-tab">Shared room</button>
          </div>

          <div className="filter-controls">
            <select className="filter-select">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Guest Rating</option>
            </select>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="no-listings">
            <h3>No accommodations found</h3>
            <p>Try selecting a different location or check back later.</p>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map(listing => (
              <div key={listing._id} className="listing-card" onClick={() => navigate(`/location-details/${listing._id}`)}>
                <div className="listing-image-container">
                  <img
                    src={listing.images && listing.images[0] ? listing.images[0] : '/images/hotel-1.jpeg'}
                    alt={listing.title}
                    className="listing-image"
                    onError={(e) => {
                      e.target.src = '/images/hotel-1.jpeg';
                    }}
                  />
                  <button className="favorite-btn">♡</button>
                </div>

                <div className="listing-info">
                  <div className="listing-header">
                    <div className="listing-type">Entire place</div>
                    <div className="listing-rating">
                      ★ 4.5 (New)
                    </div>
                  </div>

                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-location">{locationDisplayNames[listing.location] || listing.location}</p>

                  <div className="listing-details">
                    <span>4 guests</span>
                    <span>•</span>
                    <span>2 bedrooms</span>
                    <span>•</span>
                    <span>2 bathrooms</span>
                  </div>

                  <div className="listing-amenities">
                    <span className="amenity-tag">wifi</span>
                    <span className="amenity-tag">kitchen</span>
                    <span className="amenity-tag">parking</span>
                  </div>

                  <div className="listing-price">
                    <span className="price">${listing.price}</span>
                    <span className="price-period">night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default LocationPage;
