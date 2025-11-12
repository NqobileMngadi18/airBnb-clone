import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleClose();
    navigate("/login");
  };

  const handleReservationsClick = () => {
    handleClose();
    navigate("/reservations");
  };

  const handleLogoutClick = () => {
    handleClose();
    logout();
    navigate("/");
  };

  const handleCreateListingClick = () => {
    handleClose();
    navigate("/create-listing");
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuIcon />
        <AccountCircleRoundedIcon />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "white",
            minWidth: "200px",
            borderRadius: "12px",
            boxShadow: "0 8px 28px rgba(0, 0, 0, 0.12)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
            marginTop: "8px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user ? (
          <>
            <MenuItem onClick={handleReservationsClick} className="menu-items">
              View Reservations
            </MenuItem>
            <div
              style={{
                height: "1px",
                backgroundColor: "#ebebeb",
                width: "100%",
              }}
            />
            <MenuItem onClick={handleCreateListingClick} className="menu-items">
              Create Listing
            </MenuItem>
            <div
              style={{
                height: "1px",
                backgroundColor: "#ebebeb",
                width: "100%",
              }}
            />
            <MenuItem onClick={handleLogoutClick} className="menu-items">
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLoginClick} className="menu-items">
            Login
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
