/*
* File name: CheckoutForm.jsx
* Author: Dang Khanh Toan Nguyen
* StudentID: 103797499
* Last date modified: 03/09/2023
* */
import Input from "../common/Input";
import "./CheckoutForm.css";
import Button from "../common/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
function CheckoutForm({opened, setCheckoutForm,product}) {
    const [errMsg,setErrMsg] = useState("");
    const [successMsg,setSuccessMsg] = useState("");
    const [cookies, setCookie] = useCookies(["user"]);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const config = {
        headers: { Authorization: `Bearer ${cookies.jwt_token}`
    }
    };
    const handlePurchase = async (evt)=>{
        evt.preventDefault();
        if(!isDisabled){
            try {
                // Fetch user's balance first
                
                const response = await axios.get("http://localhost:8000/api/users/balance",config);
                const userBalance = response.data.data.balance;
                // Check if userBalance is sufficient for purchase. This assumes product.price is available.
                if (userBalance >= product.price) {
                    // Make the purchase request if balance is sufficient
                    console.log(`http://localhost:8000/api/assets/${product.asset_id}/purchase`, config)
                    const purchaseResponse = await axios.post(`http://localhost:8000/api/assets/${product.asset_id}/purchase`,{} ,config);
                    setErrMsg("");
                    setSuccessMsg("You successfully purchased the item!");
                    setIsDisabled(true)
                    console.log(purchaseResponse);
                } else {
                    setErrMsg("Insufficient balance for the purchase.");
                }
            } catch (err) {
                console.log("Error:", err);
                if(err.response ? true: false)
                {
                    setErrMsg(err.response.data.message)
                }
                else{
                    setErrMsg(err.message)
                }
            }    
        }
        
    }
    const handleCancel = ()=>{
        if(successMsg!=""){
            navigate("/history")
        }
        else{
            setCheckoutForm(false); 
            setErrMsg(""); 
            setSuccessMsg("");
        }
    }
    return opened ? (
        <div className="checkout-form">
            <form className="checkout">
                <h2>Confirm to Buy This Asset</h2>
                <Input  type="text" readOnly={true} value={product.name}  name="first-name" label="Asset Name"/>
                <Input type="text"  readOnly value ={`${product.price} ETH`}  name="last-name" label="Price"/>
                <Input type="text" readOnly value={product.description} name="address" label="Description"/>
                {errMsg !== "" && <div className="error-notice">{errMsg}</div>}
                {successMsg !== "" && <div className="succes-notice">{successMsg}</div>}

                <div>
                    <Button onClick={handleCancel} className="cancel-button">Cancel</Button>
                    <Button onClick={handlePurchase} disable={isDisabled} className="purchase-button" >Purchase</Button>
                </div>
            </form>

        </div>
    ): "";
}

export default CheckoutForm;