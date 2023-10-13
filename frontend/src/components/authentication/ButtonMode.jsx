/*
filename: ButtonMode.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
import React from "react";
import "./ButtonMode.css";
/**
 * ButtonMode Component
 * This component renders two buttons: Login and Register.
 * The active button is highlighted based on the activeButton prop.
 * @param {String} activeButton - Current active button (authentication/register).
 * @param {Function} onButtonClick - Function to handle button clicks.
 */
const ButtonMode = ({ activeButton, onButtonClick }) => {
    return (
        <div className="button-group">
            {/* Login Button - Highlighted if activeButton is 'authentication' */}
            <button className={`btn ${activeButton === 'authentication' ? 'active' : ''} login-btn`} onClick={() => onButtonClick('authentication')}>Login</button>
            
            {/* Register Button - Highlighted if activeButton is 'register' */}
            <button className={`btn ${activeButton === 'register' ? 'active' : ''} register-btn`} onClick={() => onButtonClick('register')}>Register</button>
       </div>
    );
}

// Exporting the ButtonMode component for use in other parts of the application
export default ButtonMode;