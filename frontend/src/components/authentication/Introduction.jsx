/*
filename: Introduction.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
import React from "react";
import "./Introduction.css"; // Importing the CSS styles for this component
import ButtonMode from "./ButtonMode"; // Component for the mode button (authentication/register)
/**
 * Introduction Component
 * This component renders the introduction section of the login page.
 * @param {Function} handleButtonClick - Function to handle button clicks.
 * @param {String} activeButton - Current active button (authentication/register).
 */
const Introduction = ({handleButtonClick,activeButton} ) =>{
    return(
        <div className="wrapper-intro">
             {/* Logo or Image for the login section */}
            <div className="img-login"></div>
            {/* Welcome text */}
            <div className="welcome">Welcome to</div>
             {/* Description of the platform */}
            <div className="platform-description">The <span className="gen">next-gen</span> trading platform </div>
            {/* Button to switch between authentication and registration modes */}
            <ButtonMode activeButton={activeButton} onButtonClick={handleButtonClick}/>
        </div>
    );
}
// Exporting the Introduction component for use in other parts of the application
export default Introduction;