import herobanner from "../assets/logo/herobanner.jpg"

function HeroBanner() {
    return (
        <div className="hero-banner">
            <img src={herobanner} alt="herobanner" className="herobanner" />
            <div className="hero-banner-text">
                <h1>Not sure where to go? Perfect.</h1>
                <button><p>I'm flexible</p></button>
            </div>  
        </div>
    );
}

export default HeroBanner;