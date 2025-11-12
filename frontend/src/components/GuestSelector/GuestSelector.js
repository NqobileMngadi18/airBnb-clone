import React, { useState } from 'react';
import './GuestSelector.css';

const GuestSelector = ({
  selectedGuests,
  onGuestSelect,
  isOpen,
  onToggle
}) => {
  const [guestCount, setGuestCount] = useState(selectedGuests || 1);

  const handleGuestChange = (operation) => {
    let newCount;

    if (operation === 'increment') {
      newCount = Math.min(guestCount + 1, 16); // Max 16 guests
    } else {
      newCount = Math.max(guestCount - 1, 1); // Min 1 guest
    }

    setGuestCount(newCount);
    onGuestSelect(newCount);
  };

  const getDisplayText = () => {
    if (guestCount === 1) {
      return '1 guest';
    } else {
      return `${guestCount} guests`;
    }
  };

  return (
    <div className="guest-selector-container">
      <div className="search-item guest-search-item" onClick={onToggle}>
        <p className="search-item-text1">Who</p>
        <p className="search-item-text2">{getDisplayText()}</p>
      </div>

      {isOpen && (
        <div className="guest-selector-dropdown">
          <div className="guest-selector-header">
            <h3>Add guests</h3>
          </div>

          <div className="guest-options">
            <div className="guest-option">
              <div className="guest-info">
                <div className="guest-label">Guests</div>
              </div>
              <div className="guest-controls">
                <button
                  className="guest-btn"
                  onClick={() => handleGuestChange('decrement')}
                  disabled={guestCount <= 1}
                >
                  −
                </button>
                <span className="guest-count">{guestCount}</span>
                <button
                  className="guest-btn"
                  onClick={() => handleGuestChange('increment')}
                  disabled={guestCount >= 16}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
