// import logo from "../../assets/logo/longlogo2.png";
// import SearchIcon from '@mui/icons-material/Search';
// import BasicMenu from "./ProfileMenu";
// import LanguageIcon from '@mui/icons-material/Search'
// import Header from "../../components/Header";
import { useEffect, useState } from "react";

function Listings() {
    const [listings, setListings] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/listings")
            .then(response => response.json())
            .then(data => setListings(data));
    }, []);

    return (
        <div>
            <h1>Listings</h1>
            {listings.map(listing => (
                <div key={listing._id}>
                    <h2>{listing.title}</h2>
                    <p>{listing.description}</p>
                    <p>{listing.price}</p>
                    {listing.imgSrc && <img src={listing.image} alt={listing.title} width={"200"} />}
                </div>
            ))}
        </div>
    );
}

export default Listings;