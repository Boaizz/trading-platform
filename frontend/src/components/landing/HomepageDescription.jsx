/*
filename: HomepageDescription.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
import React from "react"; // Importing necessary modules and components
import "./HomepageDescription.css"; // Importing the CSS styles for this component

// HomepageDescription component
const HomepageDescription = () => {
    // Rendering the component
    return (
        <div className="content"> {/* Main container for the content */}
            <h1 className="intro">A decentralised trading platform </h1> {/* Main heading for the homepage */}
            <p className="description">Buy and sell your digital assets</p> {/* Description text for the homepage */}
        </div>
    );
}

// Exporting the HomepageDescription component for use in other parts of the application
export default HomepageDescription;

