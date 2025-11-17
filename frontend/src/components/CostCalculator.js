import React, { useState } from 'react';
import './CostCalculator.css';

function CostCalculator({basePrice = 100, onReserve, requiresLogin = false }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate nights when dates change
  React.useEffect(() => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNights(nightsDiff > 0 ? nightsDiff : 0);
    }
  }, [checkIn, checkOut]);

  // Calculate costs
  const subtotal = basePrice * nights;
  const weeklyDiscount = nights >= 7 ? (subtotal * 10 / 100) : 0; // 10% weekly discount
  const discountedSubtotal = subtotal - weeklyDiscount;
  const cleaningFee = 50;
  const serviceFee = Math.round(discountedSubtotal * 0.14); // ~14% service fee
  const occupancyTaxes = 30;
  const total = discountedSubtotal + cleaningFee + serviceFee + occupancyTaxes;

  const handleReservation = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Please select valid check-in and check-out dates.');
      return;
    }

    if (onReserve) {
      onReserve({
        checkIn,
        checkOut,
        guests,
        nights,
        basePrice,
        weeklyDiscount,
        cleaningFee,
        serviceFee,
        occupancyTaxes,
        total
      });
    }
  };

  return (
    <div className="cost-calculator">
      <div className="booking-form">
        <div className="date-inputs">
          <div className="date-input">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="date-input">
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="guests-input">
          <label>Guests</label>
          <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4 guests</option>
            <option value={5}>5 guests</option>
            <option value={6}>6 guests</option>
          </select>
        </div>

        <button
          className={`reserve-button ${requiresLogin ? 'requires-login' : ''}`}
          onClick={handleReservation}
          disabled={!checkIn || !checkOut || nights <= 0}
        >
          {requiresLogin ? 'Login to Reserve' : nights > 0 ? `Reserve for ${nights} night${nights > 1 ? 's' : ''}` : 'Reserve'}
        </button>

        {requiresLogin && (
          <p className="login-notice">
            You'll need to log in to make a reservation
          </p>
        )}
      </div>

      {nights > 0 && (
        <div className="cost-breakdown">
          <div className="cost-item" onClick={() => setShowBreakdown(!showBreakdown)}>
            <span>${basePrice} x {nights} nights</span>
            <span>${subtotal}</span>
          </div>

          {weeklyDiscount > 0 && (
            <div className="cost-item discount">
              <span>Weekly discount</span>
              <span>-${weeklyDiscount}</span>
            </div>
          )}

          {showBreakdown && (
            <>
              <div className="cost-item">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="cost-item">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="cost-item">
                <span>Occupancy taxes</span>
                <span>${occupancyTaxes}</span>
              </div>
            </>
          )}

          <div className="cost-item total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {!showBreakdown && (
            <button
              className="show-breakdown"
              onClick={() => setShowBreakdown(true)}
            >
              Show price breakdown
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CostCalculator;
