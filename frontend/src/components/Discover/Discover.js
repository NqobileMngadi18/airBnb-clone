import React from 'react';
import './Discover.css';
import { Typography } from '@mui/material';
const Discover = () => {
    return (
        <div className="discover">
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
                Discover Airbnb experiences
            </Typography>
            <div className="discover-options">
                <div className="option">
                    <div id='overlay'></div>
                    <img src="https://www.travelstart.co.za/blog/wp-content/uploads/2018/11/sunset-cableway.jpg" alt="Things to do on your trip" />
                    <div className="option-text">
                        <h2>Things to do <br/> on your trip</h2>
                        <button>Experiences</button>
                    </div>
                </div>

                <div className="option">
                    <div id='overlay'></div>
                    <img src="https://imagedelivery.net/0LMYosKeo5o-LXOCjdKUuA/tourscanner.com/2022/06/The-Cape-Wheel-Cape-Town.jpg/w=9999" alt="Things to do from home" />
                    <div className="option-text">
                        <h2>Things to do<br/> from home</h2>
                        <button> Online Experiences</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discover;
