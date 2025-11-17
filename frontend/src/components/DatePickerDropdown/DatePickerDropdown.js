import React, { useState } from 'react';
import './DatePickerDropdown.css';

const DatePickerDropdown = ({
  selectedCheckIn,
  selectedCheckOut,
  onDateSelect,
  isOpen,
  onToggle,
  type = 'checkin' // 'checkin' or 'checkout'
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = firstDayOfMonth.getDay(); // Day of week (0-6)
  const daysInMonth = lastDayOfMonth.getDate();

  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    // Don't allow selecting past dates
    if (selectedDate < today) return;

    // For checkout, don't allow selecting dates before check-in
    if (type === 'checkout' && selectedCheckIn && selectedDate <= new Date(selectedCheckIn)) {
      return;
    }

    onDateSelect(selectedDate, type);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    const today = new Date();

    // Don't allow going to months before current month
    if (newMonth.getFullYear() < today.getFullYear() ||
        (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() < today.getMonth())) {
      return;
    }

    setCurrentMonth(newMonth);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const checkInDate = selectedCheckIn ? new Date(selectedCheckIn) : null;
    const checkOutDate = selectedCheckOut ? new Date(selectedCheckOut) : null;

    return (checkInDate && date.getTime() === checkInDate.getTime()) ||
           (checkOutDate && date.getTime() === checkOutDate.getTime());
  };

  const isDateInRange = (day) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;

    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const checkIn = new Date(selectedCheckIn);
    const checkOut = new Date(selectedCheckOut);

    return date > checkIn && date < checkOut;
  };

  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    // Disable past dates
    if (date < today) return true;

    // For checkout, disable dates before or equal to check-in
    if (type === 'checkout' && selectedCheckIn) {
      return date <= new Date(selectedCheckIn);
    }

    return false;
  };

  // Create calendar grid
  const calendarDays = [];

  // Empty cells for days before month starts
  for (let i = 0; i < startDate; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isDisabled = isDateDisabled(day);
    const isSelected = isDateSelected(day);
    const isInRange = isDateInRange(day);

    calendarDays.push(
      <div
        key={day}
        className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
        onClick={() => !isDisabled && handleDateClick(day)}
      >
        {day}
      </div>
    );
  }

  const getDisplayText = () => {
    if (type === 'checkin') {
      return selectedCheckIn ? formatDate(new Date(selectedCheckIn)) : 'Add dates';
    } else {
      return selectedCheckOut ? formatDate(new Date(selectedCheckOut)) : 'Add dates';
    }
  };

  return (
    <div className="date-picker-container">
      <div className="search-item date-search-item" onClick={onToggle}>
        <p className="search-item-text1">{type === 'checkin' ? 'Check in' : 'Check out'}</p>
        <p className="search-item-text2">{getDisplayText()}</p>
      </div>

      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="calendar-header">
            <button className="month-nav" onClick={prevMonth}>‹</button>
            <h3>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
            <button className="month-nav" onClick={nextMonth}>›</button>
          </div>

          <div className="calendar">
            <div className="calendar-weekdays">
              {daysOfWeek.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {calendarDays}
            </div>
          </div>

          {selectedCheckIn && selectedCheckOut && (
            <div className="date-summary">
              <div className="selected-dates">
                <span className="date-range">
                  {formatDate(new Date(selectedCheckIn))} - {formatDate(new Date(selectedCheckOut))}
                </span>
                <span className="nights-count">
                  {Math.ceil((new Date(selectedCheckOut) - new Date(selectedCheckIn)) / (1000 * 60 * 60 * 24))} nights
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePickerDropdown;
