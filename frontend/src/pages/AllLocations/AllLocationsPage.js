import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './AllLocationsPage.css';

const locationDisplayNames = {
  'newyork': 'New York',
  'paris': 'Paris',
  'tokyo': 'Tokyo',
  'capetown': 'Cape Town',
  'thailand': 'Thailand'
};

const locationDescriptions = {
  'newyork': 'The city that never sleeps, offering iconic skylines, world-class dining, and endless entertainment.',
  'paris': 'The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks.',
  'tokyo': 'A bustling metropolis blending traditional culture with cutting-edge technology and innovation.',
  'capetown': 'A stunning coastal city with breathtaking mountains, beautiful beaches, and rich history.',
  'thailand': 'Land of smiles offering tropical beaches, ancient temples, and incredible cuisine.'
};

function AllLocationsPage() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch accommodations for all locations
        const response = await axios.get('/accommodations');
        const accommodations = response.data;

        // Group accommodations by location
        const grouped = accommodations.reduce((acc, accommodation) => {
          const location = accommodation.location;
          if (!acc[location]) {
            acc[location] = [];
          }
          acc[location].push(accommodation);
          return acc;
        }, {});

        setLocationData(grouped);
      } catch (err) {
        console.error('Error fetching location data:', err);
        setError('Unable to load location data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const handleLocationClick = (locationKey) => {
    navigate(`/locations?location=${locationKey}`);
  };

  // eslint-disable-next-line no-unused-vars
  const getLocationStats = (accommodationsList) => {
    if (!accommodationsList || accommodationsList.length === 0) {
      return {
        totalProperties: 0,
        priceRange: { min: 0, max: 0 },
        averageRating: 0,
        totalReviews: 0
      };
    }

    const prices = accommodationsList.map(acc => acc.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Calculate average rating from actual accommodation data
    const totalRating = accommodationsList.reduce((sum, acc) => sum + (acc.ratings?.overall || 4.5), 0);
    const averageRating = Number((totalRating / accommodationsList.length).toFixed(1));

    // Sum up all review counts
    const totalReviews = accommodationsList.reduce((sum, acc) => sum + (acc.reviewCount || 0), 0);

    return {
      totalProperties: accommodationsList.length,
      priceRange: { min: minPrice, max: maxPrice },
      averageRating: averageRating,
      totalReviews: totalReviews
    };
  };

  if (loading) {
    return (
      <div className="all-locations-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing destinations...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-locations-page">
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
    <div className="all-locations-page">
      <Header />

      <div className="hero-section">
        <div className="hero-content">
          <h1>Explore Amazing Destinations</h1>
          <p>Discover unique stays in our most popular locations</p>
        </div>
      </div>

      <div className="locations-content">
        <div className="locations-grid">
          {Object.entries(locationData).map(([locationKey, accommodations]) => (
            <div
              key={locationKey}
              className="location-card"
              onClick={() => handleLocationClick(locationKey)}
            >
              <div className="location-image-container">
                {accommodations[0]?.images && accommodations[0].images[0] && (
                  <img
                    src={accommodations[0].images[0]}
                    alt={locationDisplayNames[locationKey]}
                    className="location-image"
                  />
                )}
                <div className="location-overlay">
                  <h2 className="location-name">{locationDisplayNames[locationKey]}</h2>
                </div>
              </div>

              <div className="location-info">
                <div className="property-type">
                  {accommodations[0]?.propertyType || "Entire home/apartment"}
                </div>

                <div className="location-stats">
                  <div className="stat-item">
                    <span className="stat-value">{accommodations[0]?.guests || 4}</span>
                    <span className="stat-label">guests</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{accommodations[0]?.bedrooms || 2}</span>
                    <span className="stat-label">bedrooms</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{accommodations[0]?.bathrooms || 2}</span>
                    <span className="stat-label">bathrooms</span>
                  </div>
                </div>

                <div className="amenities-list">
                  {accommodations[0]?.amenities?.wifi && (
                    <div className="amenity-item">
                      <span className="amenity-label">WiFi</span>
                    </div>
                  )}
                  {accommodations[0]?.amenities?.kitchen && (
                    <div className="amenity-item">
                      <span className="amenity-label">Kitchen</span>
                    </div>
                  )}
                  {accommodations[0]?.amenities?.freeParking && (
                    <div className="amenity-item">
                      <span className="amenity-label">Free parking</span>
                    </div>
                  )}
                </div>

                <div className="location-description">
                  <p>{locationDescriptions[locationKey]}</p>
                </div>

                <div className="ratings-section">
                  <div className="rating-score">
                    <span className="rating-value">
                      {accommodations[0]?.ratings?.overall.toFixed(1) || "4.5"}
                    </span>
                    <span className="rating-count">
                      ({accommodations[0]?.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="location-price">
                  ${accommodations[0]?.price || 0}
                  <span className="price-night"> / night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AllLocationsPage;
