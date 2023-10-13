/*
* File name: Filter.jsx
* Author: Dang Khanh Toan Nguyen
* StudentID: 103797499
* Last date modified: 03/09/2023
* */

import "./Filter.css"
import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import Select from 'react-select'
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*
* Filters allow users to refine and customize their searches, making it easier to find the specific Ethereum assets they are interested in.
* Users can filter assets by category, price range, and date. It utilizes a dropdown menu, sliders, and a date picker to allow users to input filter criteria.
* This component is integrated into the Marketplace Page and Navigation Bar.
* */

function Filter({clicked,setFilter}) {
    // State for date range picker
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [category, setCategory] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    // Handle date pickle
    function onChange1(date, dateString) {
        setDate1(date);
    }

    function onChange2(date, dateString) {
        setDate2(date);
    }
    // State for price range slider
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(100);
    // Handle slider input and price selection
    function handleSliderInput(event) {
        const val = event.target.value;
        event.target.style.background = `linear-gradient(to right, #615DFA ${val}%, white ${val}%)`;

    }
    function handleMinSlider(event) {
        handleSliderInput(event);
        setMinPrice(event.target.value);
    }

    function handleMaxSlider(event) {
        handleSliderInput(event);
        setMaxPrice(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const baseURL = "http://localhost:8000/api/assets";
        const queryParams = [];

        if (minPrice > 0) {
            queryParams.push(`min=${minPrice}`);
        }
    
        if (maxPrice > 0) {
            queryParams.push(`max=${maxPrice}`);
        }
        let today = new Date();
        if (date1!== null && date1.toISOString().split('T')[0] !== today.toISOString().split('T')[0]) {
            queryParams.push(`start=${date1.toISOString().split('T')[0]}`);
        }

        if (date2!== null && date2.toISOString().split('T')[0] !== today.toISOString().split('T')[0]) {
            queryParams.push(`end=${date2.toISOString().split('T')[0]}`);
        }

        if (category !== "") {
            queryParams.push(`category=${category}`);
        }

        const queryString = queryParams.join('&');
        // Make the API call with axios
        if(queryString == "")
        {
            setErrMsg("Need to choose at least 1 feature to filter")
        }
        else{
            axios.get(`${baseURL}?${queryString}`)
            // axios.get("http://localhost:8000/api/assets?name=test&min=2&max=20&start=2020-02-03&end=2023-10-06&category=fish")
                .then((response) => {
                    console.log(response.data);
                    handleCancelSort();
                    navigate(`/marketplace?${queryString}`)
                    // setData(response.data.data.digital_assets);
                })
                .catch((err) => {
                    console.log(err);
                    if(err.response ? true: false)
                    {
                        setErrMsg(err.response.data.message)
                    }
                    else{
                        setErrMsg(err.message)
                    }
                    // console.error("Error fetching data:", error.response.data);
                });    
        }
        // setFilter(false); // Close filter after API call
    };
    const handleCancelSort= ()=>{
        setMinPrice(0);
        setMaxPrice(100);
        setErrMsg("");
        setFilter(false);
    }
    // Return filter popup if clicked
    return clicked ? (
        <form onSubmit={handleSubmit} className="filter-popup">
            <div className="filter-container">
                <div className="filter">
                    <h2>Filter</h2>
                    <div className="filter-item-container">
                        <h3>Price</h3>
                        <div className="slider-container">
                            <label htmlFor="min-price">Min</label>
                            <input defaultValue="0"  type="range" name="min-price" id="min-price" onInput={handleMinSlider} style={{background: `linear-gradient(to right, #615DFA ${minPrice}%, white ${minPrice}%)`}}/>
                            <p>{minPrice} ETH</p>
                        </div>

                        <div className="slider-container">
                            <label htmlFor="max-price">Max</label>
                            <input defaultValue="100"  type="range" name="max-price" id="max-price" onInput={handleMaxSlider}  style={{background: `linear-gradient(to right, #615DFA ${maxPrice}%, white ${maxPrice}%)`}}/>
                            <p>{maxPrice} ETH</p>
                        </div>

                    </div>

                    <div  className="filter-item-container">
                        <h3>Date</h3>
                        <div  className="datepicker-container">
                            <DatePicker onChange={onChange1}/>
                            <p>To</p>
                            <DatePicker onChange={onChange2}/>
                        </div>
                    </div>

                    <div  className="filter-item-container">
                        <h3>Category</h3>
                        <div  className="category-container">
                            <p>Product Category: </p>
                            <input className="category-input"
                                type="text" 
                                value={category} 
                                onChange={e => setCategory(e.target.value)} 
                                placeholder="Category"
                            />
                        </div>
                    </div>
                    {errMsg !== "" && <p className="error-notice">{errMsg}</p>}
                    <div className="buttons">
                        <Button type="submit">Search</Button>
                        <Button onClick={handleCancelSort} className="cancel-button" >Cancel</Button>
                    </div>


                </div>

            </div>
        </form>
    ) : ''; // Return empty if it's not clicked
}

export default Filter;