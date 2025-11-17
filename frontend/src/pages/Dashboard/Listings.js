import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "../../components/Header";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(err => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div>
      <Header />
      <h1>Listings</h1>
      {listings.length === 0 ? (
        <p>No listings available</p>
      ) : (
        listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p>${listing.price}</p>

            {listing.image && (
              <img
                src={listing.image}
                alt={listing.title}
                width="200"
                style={{ borderRadius: "10px" }}
              />
            )}

            {/* Add this link to go to LocationDetailsPage */}
            <Link to={`/location-details/${listing._id}`}>
              <button style={{ marginTop: "10px" }}>View Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Listings;
