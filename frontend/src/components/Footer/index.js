import "./footer.css";
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    const handleLinkClick = (linkName) => {
        console.log(`${linkName} link clicked`);
        // In a real app, these would navigate to actual pages
    };

    return (
        <div className="footer">
            <div className="footer-content">
                {/* Main Footer Links Section */}
                <div className="footer-links-section">
                    <div className="footer-column">
                        <h3>Support</h3>
                        <ul>
                            <li><button onClick={() => handleLinkClick('Help Center')}>Help Center</button></li>
                            <li><button onClick={() => handleLinkClick('AirCover')}>AirCover</button></li>
                            <li><button onClick={() => handleLinkClick('Anti-discrimination')}>Anti-discrimination</button></li>
                            <li><button onClick={() => handleLinkClick('Disability support')}>Disability support</button></li>
                            <li><button onClick={() => handleLinkClick('Cancellation options')}>Cancellation options</button></li>
                            <li><button onClick={() => handleLinkClick('Report neighborhood concern')}>Report neighborhood concern</button></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Hosting</h3>
                        <ul>
                            <li><button onClick={() => handleLinkClick('Airbnb your home')}>Airbnb your home</button></li>
                            <li><button onClick={() => handleLinkClick('AirCover for Hosts')}>AirCover for Hosts</button></li>
                            <li><button onClick={() => handleLinkClick('Hosting resources')}>Hosting resources</button></li>
                            <li><button onClick={() => handleLinkClick('Community forum')}>Community forum</button></li>
                            <li><button onClick={() => handleLinkClick('Hosting responsibly')}>Hosting responsibly</button></li>
                            <li><button onClick={() => handleLinkClick('Join a free Hosting class')}>Join a free Hosting class</button></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Airbnb</h3>
                        <ul>
                            <li><button onClick={() => handleLinkClick('Newsroom')}>Newsroom</button></li>
                            <li><button onClick={() => handleLinkClick('New features')}>New features</button></li>
                            <li><button onClick={() => handleLinkClick('Careers')}>Careers</button></li>
                            <li><button onClick={() => handleLinkClick('Investors')}>Investors</button></li>
                            <li><button onClick={() => handleLinkClick('Gift cards')}>Gift cards</button></li>
                            <li><button onClick={() => handleLinkClick('Airbnb.org emergency stays')}>Airbnb.org emergency stays</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="footer-bottom">
                    <div className="footer-items1">
                        <div className="footer-copyright">
                            <CopyrightIcon sx={{ fontSize: "1rem" }} />
                            <p>2024 Airbnb, Inc.</p>
                        </div>
                        <div className="footer-links">
                            <button onClick={() => handleLinkClick('Privacy')}>Privacy</button>
                            <button onClick={() => handleLinkClick('Terms')}>Terms</button>
                            <button onClick={() => handleLinkClick('Sitemap')}>Sitemap</button>
                            <button onClick={() => handleLinkClick('Company details')}>Company details</button>
                        </div>
                    </div>

                    <div className="footer-items2">
                        <div className="language-selector">
                            <LanguageIcon sx={{ fontSize: "1.1rem" }} />
                            <span>English (US)</span>
                        </div>

                        <div className="currency-selector">
                            <AttachMoneyIcon sx={{ fontSize: "1.1rem" }} />
                            <span>USD</span>
                        </div>

                        <div className="social-icons">
                            <div className="social-icon" onClick={() => handleLinkClick('Facebook')}>
                                <FacebookIcon sx={{ fontSize: "1rem" }} />
                            </div>
                            <div className="social-icon" onClick={() => handleLinkClick('Twitter')}>
                                <XIcon sx={{ fontSize: "1rem" }} />
                            </div>
                            <div className="social-icon" onClick={() => handleLinkClick('Instagram')}>
                                <InstagramIcon sx={{ fontSize: "1rem" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;