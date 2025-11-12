import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './ReservationsPage.css';

// Hoisted sample reservations to avoid recreating array causing lint dependency warnings
// const response = await fetch('http://localhost:5000/api/reservations');
const SAMPLE_RESERVATIONS = [
  {
    id: 1,
    guest: { name: "John Smith", email: "john.smith@email.com", avatar: "JS" },
    property: { title: "Modern Apartment in Manhattan", image: "/src/assets/hotels/hotel-1.jpeg", location: "New York, NY" },
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    guests: 2,
    nights: 5,
    status: "confirmed",
    total: 1600,
    basePrice: 320,
    cleaningFee: 50,
    serviceFee: 50,
    createdAt: "2024-02-28T10:30:00Z"
  },
  {
    id: 2,
    guest: { name: "Marie Dubois", email: "marie.dubois@email.com", avatar: "MD" },
    property: { title: "Cozy Room in Montmartre", image: "/src/assets/hotels/hotel-2.jpeg", location: "Paris, France" },
    checkIn: "2024-03-18",
    checkOut: "2024-03-22",
    guests: 1,
    nights: 4,
    status: "pending",
    total: 600,
    basePrice: 150,
    cleaningFee: 25,
    serviceFee: 25,
    createdAt: "2024-03-01T14:15:00Z"
  },
  {
    id: 3,
    guest: { name: "Carlos Rodriguez", email: "carlos.rodriguez@email.com", avatar: "CR" },
    property: { title: "Victorian House in Camden", image: "/src/assets/hotels/hotel-3.jpeg", location: "London, UK" },
    checkIn: "2024-02-10",
    checkOut: "2024-02-17",
    guests: 4,
    nights: 7,
    status: "completed",
    total: 3150,
    basePrice: 450,
    cleaningFee: 75,
    serviceFee: 75,
    createdAt: "2024-01-25T09:45:00Z"
  },
  {
    id: 4,
    guest: { name: "Anna Johnson", email: "anna.johnson@email.com", avatar: "AJ" },
    property: { title: "Beach House in Malibu", image: "/src/assets/hotels/hotel-4.jpeg", location: "Malibu, CA" },
    checkIn: "2024-04-01",
    checkOut: "2024-04-05",
    guests: 6,
    nights: 4,
    status: "cancelled",
    total: 2400,
    basePrice: 600,
    cleaningFee: 100,
    serviceFee: 100,
    createdAt: "2024-03-10T16:20:00Z"
  }
];

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setReservations(SAMPLE_RESERVATIONS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter reservations based on status and search term
  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    const matchesSearch = reservation.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.property.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    revenue: reservations.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.total, 0)
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      // Simulate API call
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setReservations(prev =>
          prev.map(r => r.id === reservationId ? { ...r, status: newStatus } : r)
        );
        alert(`Reservation ${newStatus} successfully!`);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Error updating reservation status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'confirmed';
      case 'pending': return 'pending';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return 'pending';
    }
  };

  if (loading) {
    return (
      <div className="reservations-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading reservations...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <Header />

      <div className="reservations-header">
        <div className="reservations-header-content">
          <h1 className="reservations-title">Reservations</h1>
          <p className="reservations-subtitle">Manage your property bookings and guest communications</p>
        </div>
      </div>

      <div className="reservations-filters">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({stats.total})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('confirmed')}
          >
            Confirmed ({stats.confirmed})
          </button>
          <button
            className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search by guest name or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="reservations-content">
        {/* Stats Overview */}
        <div className="reservations-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Bookings</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{stats.confirmed}</div>
            <div className="stat-label">Confirmed</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">${stats.revenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="reservations-table-container">
          <div className="table-header">
            <h2 className="table-title">All Reservations</h2>
          </div>

          <div className="table-responsive">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Property</th>
                  <th>Dates</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-reservations">
                      <div className="empty-reservations">
                        <div className="empty-icon">📋</div>
                        <h3 className="empty-title">No reservations found</h3>
                        <p className="empty-description">
                          {searchTerm || filterStatus !== 'all'
                            ? 'Try adjusting your filters or search terms'
                            : 'Your reservations will appear here once guests start booking your properties'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td>
                        <div className="guest-info">
                          <div className="guest-avatar">{reservation.guest.avatar}</div>
                          <div className="guest-details">
                            <h4>{reservation.guest.name}</h4>
                            <p>{reservation.guest.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="property-info">
                          <img
                            src={reservation.property.image}
                            alt={reservation.property.title}
                            className="property-image"
                          />
                          <div className="property-details">
                            <h4>{reservation.property.title}</h4>
                            <p>{reservation.property.location}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dates-info">
                          <div>{formatDate(reservation.checkIn)}</div>
                          <div className="date-separator">→</div>
                          <div>{formatDate(reservation.checkOut)}</div>
                          <div className="nights-count">{reservation.nights} nights</div>
                        </div>
                      </td>
                      <td>{reservation.guests}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="total-amount">${reservation.total.toLocaleString()}</td>
                      <td>
                        <div className="reservation-actions">
                          {reservation.status === 'pending' && (
                            <>
                              <button
                                className="action-button primary"
                                onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                              >
                                Accept
                              </button>
                              <button
                                className="action-button danger"
                                onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {reservation.status === 'confirmed' && (
                            <button
                              className="action-button"
                              onClick={() => alert('Message guest functionality would go here')}
                            >
                              Message
                            </button>
                          )}
                          <button
                            className="action-button"
                            onClick={() => alert(`Viewing details for reservation ${reservation.id}`)}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ReservationsPage;
