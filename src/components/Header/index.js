import * as React from "react";
import logo from "../../assets/logo/longlogo.webp";
import "./styles.css";
import BasicMenu from "./ProfileMenu";
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-link">
          <img src={logo} alt="longlogo" className="navbar-logo" />
          <div className="link">
            <p>Places to stay</p>
          </div>
          <div className="link">
            <p>Experience</p>
          </div>
          <div className="link">
            <p>Online Experience</p>
          </div>
          <div className="profile-container">
            <div className="airbnb-your-home">Become a host</div>
            <div className="globe-div">
              <LanguageIcon sx={{ fontSize: "1.3rem", marginLeft: "0.5rem" }} />
            </div>
            <div className="profile-div">
              <BasicMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="search-bar">
        <div className="search-item">
          <p className="search-item-text1">Location</p>
          <p className="search-item-text2">Select a location</p>
        </div>
        <div className="search-item">
          <p className="search-item-text1">Check In</p>
          <p className="search-item-text2">Add Dates</p>
        </div>
        <div className="search-item">
          <p className="search-item-text1">Check Out</p>
          <p className="search-item-text2">Add Dates</p>
        </div>
        <div className="search-item">
          <p className="search-item-text1">Guests</p>
          <p className="search-item-text2">Add Guests</p>
        </div>
        <button >
          <SearchIcon className="search-icon" sx={{ color: "white", backgroundColor: "#ff385c" }} />
        </button>
      </div>
    </>
  );
}

    

export default Header;

