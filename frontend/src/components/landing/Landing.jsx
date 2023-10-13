/*
filename: Landing.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
// Importing necessary modules and components
import React from "react";
import "./Landing.css"; // Importing the CSS styles for this component
import HomepageDescription from "./HomepageDescription"; // Importing the description component for the homepage
import HomepageButton from "./HomepageButton"; // Importing the button component for the homepage

// Login component
const Login = () => {
    // Rendering the component
    return (
        <div className="homepage"> {/* Main container for the homepage */}
            <div> {/* Inner container */}
                <HomepageDescription/> {/* Displaying the description component */}
                <HomepageButton/> {/* Displaying the button component */}
            </div>
        </div>
    );
}

// Exporting the Login component for use in other parts of the application
export default Login;