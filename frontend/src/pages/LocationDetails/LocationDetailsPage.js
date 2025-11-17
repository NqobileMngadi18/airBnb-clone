import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CostCalculator from '../../components/CostCalculator';
import ImageGallery from '../../components/ImageGallery';
import './LocationDetailsPage.css';

const locationDisplayNames = {
  'newyork': 'New York, NY',
  'paris': 'Paris, France',
  'tokyo': 'Tokyo, Japan',
  'capetown': 'Cape Town, South Africa',
  'thailand': 'Thailand',
};

function LocationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/accommodations/${id}`);
        setListing(response.data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Unable to load property details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

    const handleReservationAttempt = async () => {
        if (!user) {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            navigate('/login');
        } else {
            try {
                // Example payload, adjust as needed
                const payload = {
                    accommodationId: '68e98847265bffa1c6fafde2',
                    startDate: '2024-05-20',
                    endDate: '2024-05-21',
                    user: user,
                    // Add other reservation details here
                };
                const token = localStorage.getItem('token');
                await axios.post('/reservations', payload,
                  { headers: { Authorization: `Bearer ${token}`}, }
                );
                // On success, redirect to confirmation page
                navigate('/reservation-success');
            } catch (error) {
                alert('Failed to create reservation. Please try again.');
            }
        }
    };


    if (loading) {
    return (
      <div className="location-details-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="location-details-page">
        <Header />
        <div className="error-container">
          <h2>Property not found</h2>
          <p>{error || "The property you're looking for doesn't exist."}</p>
          <button onClick={() => navigate('/locations')}>Browse Other Properties</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="location-details-page">
      <Header />

      <div className="details-content">
        {/* Property Header */}
        <div className="property-header">
          <h1 className="property-title">{listing.title}</h1>
          <div className="property-subtitle">
            <span className="property-rating">★ 4.5</span>
            <span className="property-reviews">(New listing)</span>
            <span className="property-location">
              {locationDisplayNames[listing.location] || listing.location}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery-container">
          <ImageGallery images={listing.images && listing.images.length > 0 ? listing.images : ['/images/hotel-1.jpeg']} />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-left">
            {/* Property Overview */}
            <div className="property-overview">
              <h2>Entire place hosted by {listing.owner?.name || 'Host'}</h2>
              <div className="property-specs">
                <span>4 guests</span>
                <span>•</span>
                <span>2 bedrooms</span>
                <span>•</span>
                <span>2 bathrooms</span>
              </div>
            </div>

            {/* Property Features */}
            <div className="property-features">
              <div className="feature-item">
                <div className="feature-icon">🧽</div>
                <div className="feature-content">
                  <h4>Enhanced Clean</h4>
                  <p>This host is committed to Airbnb's 5-step enhanced cleaning process.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🔑</div>
                <div className="feature-content">
                  <h4>Self check-in</h4>
                  <p>Check yourself in with the keypad.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="property-description">
              <h3>About this place</h3>
              <p>{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h3>What this place offers</h3>
              <div className="amenities-grid">
                <div className="amenity-item">
                  <span className="amenity-icon">📶</span>
                  <span>Wifi</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🍳</span>
                  <span>Kitchen</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🚗</span>
                  <span>Free parking</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🏊</span>
                  <span>Pool</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="booking-card">
              <div className="booking-header">
                <span className="price">${listing.price}</span>
                <span className="price-period">night</span>
              </div>

              <CostCalculator
                basePrice={listing.price}
                onReserve={handleReservationAttempt}
                requiresLogin={!user}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LocationDetailsPage;
