/*
filename: LoginPage.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
// Importing necessary modules and components
import React, { useState, useEffect } from "react";  // Combined the React and useState imports
import { useNavigate } from "react-router-dom";
import Introduction from "./Introduction";
import LoginSection from "./LoginSection";
import Register from "./Register";
import "./LoginPage.css";
import cards from "../../assets/cards.png";
import { useCookies} from "react-cookie";


/**
 * LoginPage Component
 * This component renders the login page which includes an introduction, login form, and registration form.
 */
const LoginPage = ({authStatus, setAuthStatus}) => {
    // State to manage the active button (authentication or register)
    const [activeButton, setActiveButton] = useState("authentication");
    const [cookies, setCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const isAuthenticated = () => {
        return cookies.jwt_token ? true : false;
    };
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/marketplace");  // Redirect to the dashboard or desired page
        }
    }, [cookies.jwt_token]);
    console.log(cookies.jwt_token);
    // Function to update the active form based on user interaction
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="login-page">
            <Introduction className="intro-login" activeButton={activeButton} handleButtonClick={handleButtonClick}/> 
            <div className="cards"><img src={cards} alt="Card visuals" /></div>  
            {/* Conditional rendering of either the Login or Register form based on activeButton state */}
            {activeButton === "authentication" && <LoginSection className="login-section" authStatus={authStatus} setAuthStatus={setAuthStatus}/>}
            {activeButton === "register" && <Register className="login-section"/>}
        </div>
    );
}

// Exporting the LoginPage component for use in other parts of the application
export default LoginPage;
