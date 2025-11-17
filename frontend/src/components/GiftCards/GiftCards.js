import React from 'react';
import './GiftCards.css';

const GiftCards = () => {
    return (
        <div className="gift-cards">
            <div className="gift-cards-text">
                <h1>Shop Airbnb <br/> gift cards</h1>
                <button>Learn more</button>
            </div>
            <div className="gift-cards-images">
                <img src='https://ml5u6r2vr7de.i.optimole.com/cb:aeZg.3180f/w:1600/h:1025/q:mauto/f:avif/https://fantasticostudio.co/wp-content/uploads/2022/09/airbnb_laura_niubo_giftcards.png' alt="Gift card 1" />
            </div>
        </div>
    );
};

export default GiftCards;
