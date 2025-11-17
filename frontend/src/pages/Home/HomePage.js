import React from "react";
import Header from "../../components/Header";   // since you export default from index.js
import Footer from "../../components/Footer";   // same here
import HeroBanner from "../../components/HeroBanner";
import "./HomePage.css";
import Discover from "../../components/Discover";
import InspirationGetaways from "../../components/InspirationGetaways";
import GiftCards from "../../components/GiftCards";
import NextTrip from "../../components/NextTrip";

function HomePage() {
  return (
    <div className="home-page">
       <header>
           <Header />
           <HeroBanner />
       </header>
        <main>
            <NextTrip />
            <Discover />
            <GiftCards />
            <InspirationGetaways />
        </main>
        <Footer />
    </div>
  );
}

export default HomePage;
