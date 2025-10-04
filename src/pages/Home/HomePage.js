import React from "react";
// import { useState } from "react";
// import { list, list2 } from "../../assets/cards-list";
// import Cards from "../../components/Cards";
// import Filter from "../../components/Filter";
import Header from "../../components/Header";   // since you export default from index.js
import Footer from "../../components/Footer";   // same here
import HeroBanner from "../../components/HeroBanner";
// import LocationCard from "../../components/LocationCard"
import "./HomePage.css";

function HomePage() {
    // const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="home-page">
        <Header />
        <HeroBanner />
        {/* <LocationCard /> */}
        <Footer />
    </div>
  );
}

export default HomePage;
