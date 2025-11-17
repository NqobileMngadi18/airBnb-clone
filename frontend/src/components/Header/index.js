import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
import BasicMenu from "./ProfileMenu";
import LocationDropdown from "../LocationDropdown/LocationDropdown";
import DatePickerDropdown from "../DatePickerDropdown/DatePickerDropdown";
import GuestSelector from "../GuestSelector/GuestSelector";
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import longlogo2 from "../../assets/logo/longlogo2.png";

function Header() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = React.useState(false);

  // Date picker states
  const [selectedCheckIn, setSelectedCheckIn] = React.useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = React.useState(null);
  const [isCheckInDropdownOpen, setIsCheckInDropdownOpen] = React.useState(false);
  const [isCheckOutDropdownOpen, setIsCheckOutDropdownOpen] = React.useState(false);

  // Guest selector states
  const [selectedGuests, setSelectedGuests] = React.useState(1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = React.useState(false);

  const handleLocationSelect = (location) => {
    console.log('Header - Location selected:', location);
    setSelectedLocation(location);
    // Navigate based on location selection
    if (location.value === 'all') {
      navigate('/all-locations'); // Navigate to dedicated All Locations page
    } else {
      navigate(`/locations?location=${location.value}`); // Show filtered locations
    }
  };

  const handleLocationDropdownToggle = () => {
    console.log('Header - Toggle clicked, current state:', isLocationDropdownOpen);
    // Close other dropdowns when opening location dropdown
    setIsCheckInDropdownOpen(false);
    setIsCheckOutDropdownOpen(false);
    setIsGuestDropdownOpen(false);
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
  };

  const handleDateSelect = (date, type) => {
    console.log('Header - Date selected:', date, 'type:', type);

    if (type === 'checkin') {
      setSelectedCheckIn(date);
      // If check-out is before new check-in, clear it
      if (selectedCheckOut && date >= selectedCheckOut) {
        setSelectedCheckOut(null);
      }
      setIsCheckInDropdownOpen(false);
      setIsCheckOutDropdownOpen(true);
    } else {
      setSelectedCheckOut(date);
      // Close check-out dropdown
      setIsCheckOutDropdownOpen(false);
    }
  };

  const handleCheckInDropdownToggle = () => {
    // Close other dropdowns when opening check-in dropdown
    setIsLocationDropdownOpen(false);
    setIsCheckOutDropdownOpen(false);
    setIsGuestDropdownOpen(false);
    setIsCheckInDropdownOpen(!isCheckInDropdownOpen);
  };

  const handleCheckOutDropdownToggle = () => {
    // Close other dropdowns when opening check-out dropdown
    setIsLocationDropdownOpen(false);
    setIsCheckInDropdownOpen(false);
    setIsGuestDropdownOpen(false);
    setIsCheckOutDropdownOpen(!isCheckOutDropdownOpen);
  };

  const handleGuestSelect = (guestCount) => {
    console.log('Header - Guests selected:', guestCount);
    setSelectedGuests(guestCount);
  };

  const handleGuestDropdownToggle = () => {
    // Close other dropdowns when opening guest dropdown
    setIsLocationDropdownOpen(false);
    setIsCheckInDropdownOpen(false);
    setIsCheckOutDropdownOpen(false);
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
  };

  const handleSearchClick = () => {
    // Allow search without login - navigate based on selected location
    const locationParam = selectedLocation && selectedLocation.value !== 'all'
      ? `?location=${selectedLocation.value}`
      : '';
    navigate(`/locations${locationParam}`);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSearchItemClick = () => {
    // Allow browsing search items without login
    // Login will be required only when trying to make reservations
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleStaysClick = () => {
    // Allow browsing stays without login
    navigate('/locations');
  };

  const handleExperiencesClick = () => {
    // Allow browsing experiences without login
    navigate('/locations?type=experiences');
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.location-dropdown-container') &&
          !event.target.closest('.date-picker-container') &&
          !event.target.closest('.guest-selector-container')) {
        setIsLocationDropdownOpen(false);
        setIsCheckInDropdownOpen(false);
        setIsCheckOutDropdownOpen(false);
        setIsGuestDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log('Header render - isLocationDropdownOpen:', isLocationDropdownOpen, 'selectedLocation:', selectedLocation);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-link">
          <img
            src={longlogo2}
            alt="Airbnb"
            className="navbar-logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />

          <div className="nav-center">
            <div className="link" onClick={handleStaysClick}>
              <p>Place to stay</p>
            </div>
            <div className="link" onClick={handleStaysClick}>
              <p>Experience</p>
            </div>
            <div className="link" onClick={handleExperiencesClick}>
              <p>Online Experiences</p>
            </div>
          </div>

          <div className="profile-container">
            <div className="airbnb-your-home">Airbnb your home</div>
            <div className="globe-div">
              <LanguageIcon sx={{ fontSize: "1.3rem" }} />
            </div>
            <div className="profile-div">
              <BasicMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <LocationDropdown
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          isOpen={isLocationDropdownOpen}
          onToggle={handleLocationDropdownToggle}
        />

        <DatePickerDropdown
          selectedCheckIn={selectedCheckIn}
          selectedCheckOut={selectedCheckOut}
          onDateSelect={handleDateSelect}
          isOpen={isCheckInDropdownOpen}
          onToggle={handleCheckInDropdownToggle}
          type="checkin"
        />

        <DatePickerDropdown
          selectedCheckIn={selectedCheckIn}
          selectedCheckOut={selectedCheckOut}
          onDateSelect={handleDateSelect}
          isOpen={isCheckOutDropdownOpen}
          onToggle={handleCheckOutDropdownToggle}
          type="checkout"
        />

        <GuestSelector
          selectedGuests={selectedGuests}
          onGuestSelect={handleGuestSelect}
          isOpen={isGuestDropdownOpen}
          onToggle={handleGuestDropdownToggle}
        />

        <button className="search-button" onClick={handleSearchClick}>
          <SearchIcon className="search-icon" />
        </button>
      </div>
    </>
  );
}

export default Header;
