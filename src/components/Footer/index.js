import "./footer.css";
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return (
        <div className="footer">
            <div className='footer-items1'>
                <div className='footer-copyright'>
                    <CopyrightIcon sx={{ fontSize: "1rem", marginRight: "0.2rem" }} />
                    <p>2024 Airbnb, Inc.</p>
                </div>
                <div className='footer-links'>
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Sitemap</p>
                </div>
            </div>
            <div className='footer-items2'>
                <LanguageIcon sx={{ fontSize: "1.3rem", marginRight: "0.2rem" }} />
                <span>English</span>
                <AttachMoneyIcon sx={{ fontSize: "1.3rem", margin: "0 0.5rem" }} />
                <span>USD</span>
                <FacebookIcon sx={{ fontSize: "1.3rem", marginLeft: "0.5rem" }} />
                <XIcon sx={{ fontSize: "1.3rem", marginLeft: "0.5rem" }} />
                <InstagramIcon sx={{ fontSize: "1.3rem", marginLeft: "0.5rem" }} />
            </div>
        </div> )
}

export default Footer;