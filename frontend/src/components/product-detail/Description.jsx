/*
filename: Description.jsx
Author: Gia Hung Tran
StudentId: 103509199
last date modified: 03/09/2023
*/
// React component for the product description section
import React, {useEffect, useState} from "react";
import "./Description.css";
import {Link} from "react-router-dom";
import Button from "../common/Button";
import CheckoutForm from "./CheckoutForm";
import { useCookies } from "react-cookie";
import axios from "axios";
// Description component receives product details as props
const Description = ({product,id,owner_id,date, name, price, category, seller, description = "lorem"}) => {
    const [checkoutForm, setCheckoutForm] = useState(false);
    const [checkUser,setCheckUser] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);
    const isAuthenticated = () => {
        return cookies.jwt_token ? true : false;
    };
    const [authStatus, setAuthStatus] = useState(isAuthenticated());
    useEffect(()=>{
        console.log(1)
        if(isAuthenticated())
    {
        const config = {
            headers: { Authorization: `Bearer ${cookies.jwt_token}`
        }
        };
        axios.get("http://localhost:8000/api/users/profile", config)
        .then(res=>{
            let current_id = res.data.data.user.user_id;
            if(current_id != owner_id){
                setCheckUser(true);
            }
        })
    }
    },[checkoutForm])
    
    return (
        // Main container for the product description
        <div className="wrapper-description">
             {/* Container for product name and price */}
            <div className="container-brief">
                <div className="item-name"> {name} ({category}) </div>
                <div className="item-price"> {price} ETH</div>
            </div>
             {/* Product description and seller details */}
            <div className="item-description"> 
                <div className="item-owner">Seller: {seller}</div>
                <div className="item-owner">Created Date: {date}</div>
                {description} 
            </div>
             {/* Buy button container */}
             {authStatus && checkUser &&  <div className="container-button">
                <Button onClick={() => setCheckoutForm(true)}>Buy</Button>
            </div>}
           
            <CheckoutForm setCheckoutForm={setCheckoutForm} product={product} opened={checkoutForm}/>
        </div>
    );
}

export default Description;
