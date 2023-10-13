/*
filename: Register.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
// Importing necessary libraries and modules
import React, { useState } from "react";
import "./LoginSection.css";
import { useNavigate } from "react-router-dom";
import {CookiesProvide, useCookies} from "react-cookie";
import axios from 'axios';

/**
 * Register Component
 * 
 * This component provides a user interface for registering an account in the application.
 * It contains input fields for the username, password, and password confirmation, 
 * as well as a button to submit the registration form.
 */
const Register = () => {
    // Hook from react-router for programmatic navigation
    const navigate = useNavigate();

    // State to manage form data
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errMsg, setErrMsg] = useState("");   
    const [successMsg, setSuccessMsg] = useState("");

    /**
     * Handle input changes and update the formData state.
     * 
     * @param {Object} evt - The event object from the input field.
     */
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    /**
     * Handle the form submission.
     * For the purpose of this example, it redirects the user to the marketplace after registration.
     */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSuccessMsg("");
       
        if(evt.target.password.value == evt.target.confirmPassword.value)
        {
            setErrMsg("");
            axios.post("http://localhost:8000/api/auth/register/",{
                "first_name": evt.target.firstname.value,
                "last_name": evt.target.lastname.value,
                "email": evt.target.email.value, 
                "password": evt.target.password.value,
            }).then(res => {
                console.log(res)
                setSuccessMsg("Register Successfully!")
            }).catch(err => {
                console.log(err);
                setErrMsg(err.response.data.message);
            });
        }
        else{
            setErrMsg("Passwords do not match")
        }

    };

    return (
        <form method="POST" onSubmit={handleSubmit} className="form-container" id="register-form">
            <h2>Account Register</h2>
            <label className="label-form" htmlFor="firstname">First Name</label>
            <input className="ipt-form"
                type="text"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                name="firstname"
                id="firstname"
            />
            <label className="label-form" htmlFor="lastname">Last Name</label>
            <input className="ipt-form"
                type="text"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                name="lastname"
                id="lastname"
            />
            {/* Username Input */}
            <label className="label-form" htmlFor="email">Email</label>
            <input className="ipt-form"
                type="text"
                placeholder="email@xyz.com"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="email"
            />
            {/* Password Input */}
            <label className="label-form" htmlFor="password">Password</label>
            <input className="ipt-form"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
            />
            {/* Confirm Password Input */}
            <label className="label-form" htmlFor="confirmPassword">Confirm Password</label>
            <input className="ipt-form"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                name="confirmPassword"
            />
            {successMsg !== "" && <p className="success-notice">{successMsg} Please <a href="">login</a></p>}
            {errMsg !== "" && <p className="error-notice">{errMsg}</p>}
            {/* Registration Button */}
            <button type="submit" className="btn-submit" >Register Account</button>
        </form>
    );
}

export default Register;
