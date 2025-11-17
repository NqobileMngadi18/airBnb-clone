import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalReservations: 0,
    monthlyRevenue: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);

  // Move sample data into useCallback to fix dependency warning
  const getSampleData = useCallback(() => {
    const sampleStats = {
      totalListings: 12,
      activeListings: 10,
      totalReservations: 45,
      monthlyRevenue: 15420
    };

    const sampleListings = [
      {
        id: 1,
        title: "Modern Apartment in Manhattan",
        location: "New York, NY",
        price: 320,
        status: "active",
        image: "/images/hotel-1.jpeg"
      },
      {
        id: 2,
        title: "Cozy Room in Montmartre",
        location: "Paris, France",
        price: 150,
        status: "active",
        image: "/images/hotel-2.jpeg"
      },
      {
        id: 3,
        title: "Victorian House in Camden",
        location: "London, UK",
        price: 450,
        status: "inactive",
        image: "/images/hotel-3.jpeg"
      }
    ];

    const sampleReservations = [
      {
        id: 1,
        guest: "John Smith",
        property: "Modern Apartment in Manhattan",
        checkIn: "2024-03-15",
        checkOut: "2024-03-20",
        status: "confirmed",
        total: 1600
      },
      {
        id: 2,
        guest: "Marie Dubois",
        property: "Cozy Room in Montmartre",
        checkIn: "2024-03-18",
        checkOut: "2024-03-22",
        status: "pending",
        total: 600
      }
    ];

    return { sampleStats, sampleListings, sampleReservations };
  }, []);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      const { sampleStats, sampleListings, sampleReservations } = getSampleData();
      setStats(sampleStats);
      setRecentListings(sampleListings);
      setRecentReservations(sampleReservations);
    }, 1000);
  }, [getSampleData]);

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening with your properties.</p>
          </div>

          <div className="dashboard-actions">
            <Link to="/create-listing" className="action-btn">
              + Add New Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalListings}</div>
            <div className="stat-label">Total Listings</div>
            <div className="stat-change positive">+2 this month</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.activeListings}</div>
            <div className="stat-label">Active Listings</div>
            <div className="stat-change positive">+1 this week</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{stats.totalReservations}</div>
            <div className="stat-label">Total Reservations</div>
            <div className="stat-change positive">+8 this month</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">${stats.monthlyRevenue.toLocaleString()}</div>
            <div className="stat-label">Monthly Revenue</div>
            <div className="stat-change positive">+12% vs last month</div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Listings</h2>
            <Link to="/listings" className="view-all-link">View All</Link>
          </div>

          <div className="listings-grid">
            {recentListings.map(listing => (
              <div key={listing.id} className="listing-card">
                <img src={listing.image} alt={listing.title} className="listing-image" />
                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-location">{listing.location}</p>
                  <div className="listing-price">${listing.price}/night</div>
                  <div className="listing-actions">
                    <Link to={`/update-listing/${listing.id}`} className="listing-btn">
                      Edit
                    </Link>
                    <button className="listing-btn danger">Delete</button>
                  </div>
                  <span className={`status-badge ${listing.status}`}>
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Reservations</h2>
            <Link to="/reservations" className="view-all-link">View All</Link>
          </div>

          <div className="dashboard-table">
            <div className="table-header">
              <h3 className="table-title">Latest Bookings</h3>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Property</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td>{reservation.guest}</td>
                      <td>{reservation.property}</td>
                      <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>
                      <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${reservation.status}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td>${reservation.total}</td>
                      <td>
                        <button className="action-button primary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/create-listing" className="quick-action-card">
              <div className="quick-action-icon">🏠</div>
              <h3>Add New Listing</h3>
              <p>Create a new property listing</p>
            </Link>

            <Link to="/reservations" className="quick-action-card">
              <div className="quick-action-icon">📅</div>
              <h3>Manage Reservations</h3>
              <p>View and manage bookings</p>
            </Link>

            <div className="quick-action-card">
              <div className="quick-action-icon">📊</div>
              <h3>View Analytics</h3>
              <p>Check performance metrics</p>
            </div>

            <div className="quick-action-card">
              <div className="quick-action-icon">💬</div>
              <h3>Guest Messages</h3>
              <p>Communicate with guests</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
