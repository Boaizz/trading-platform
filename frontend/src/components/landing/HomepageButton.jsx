/*
filename: HomepageButton.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
// Importing necessary modules and components
import React from "react";
import "./HomepageButton.css"; // Importing the CSS styles for this component
import EthereumLogo from "../../assets/icon_ether.png"; // Importing the Ethereum logo image
import {Link} from "react-router-dom"; // Importing the Link component from react-router-dom for navigation

// HomepageButton component
const HomepageButton = () => {
    // Rendering the component
    return (
        <div className="ethereum-button-container"> {/* Main container for the Ethereum button */}
            <Link to="/marketplace"> {/* Link to the marketplace page */}
                <button className="ethereum-button"> {/* Ethereum sign-in button */}
                    <img className="icon-image" src={EthereumLogo} alt="Ethereum Logo" /> {/* Ethereum logo image */}
                    Sign in with Ethereum {/* Button text */}
                </button>
            </Link>
        </div>
    );
}

// Exporting the HomepageButton component for use in other parts of the application
export default HomepageButton;
