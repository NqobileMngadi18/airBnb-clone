import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import LocationPage from "./pages/Location/LocationPage";
import LocationDetailsPage from "./pages/LocationDetails/LocationDetailsPage";
import AllLocationsPage from "./pages/AllLocations/AllLocationsPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateListing from "./pages/Dashboard/Createlisting";
import Listings from "./pages/Dashboard/Listings";
import UpdateListing from "./pages/Dashboard/UpdateListing";
import ReservationsPage from "./pages/Reservations/ReservationsPage";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/all-locations" element={<AllLocationsPage />} />
          <Route path="/location-details/:id" element={<LocationDetailsPage />} />

          {/* Private/Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-listing"
            element={
              <PrivateRoute>
                <CreateListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <Listings />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <Listings />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-listing/:id"
            element={
              <PrivateRoute>
                <UpdateListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <PrivateRoute>
                <ReservationsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
