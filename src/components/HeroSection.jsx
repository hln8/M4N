import React from 'react';
import './HeroSection.css'; // Ensure this path is correct
import oscarsImage from '../assets/oscars2.png'; // Import the image


const HeroSection = () => {
    return (
        <div className="container">
            <img src={oscarsImage} alt="Oscar Background" />
            <div className="hero-text">
                <h1>Oscar Awards</h1>
                <p>Celebrating the Best in Cinema</p>
            </div>
        </div>
    );
};

export default HeroSection;