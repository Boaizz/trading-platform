/*
* File name: CheckoutForm.jsx
* Author: Dang Khanh Toan Nguyen
* StudentID: 103797499
* Last date modified: 03/09/2023
* */
import Input from "../common/Input";
import "./DepositForm.css";
import Button from "../common/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useState} from "react";

function DepositForm({opened, setDepositForm}) {
    const [errMsg,setErrMsg] = useState("");
    const [successMsg,setSuccessMsg] = useState("");
    const [cookies, setCookie] = useCookies(["user"]);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount,setAmount] = useState(0);
    const [cardholderName, setCardholderName] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${cookies.jwt_token}`
    }
    };
    const resetAll = ()=>{
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
        setCardholderName("");
        setAmount("");

    }
    const handleDeposit = (evt)=>{
        evt.preventDefault();
        axios.put("http://localhost:8000/api/users/balance",{
            "amount": amount,
            "card_number": cardNumber,
            "card_holder": cardholderName,
            "expiry_date": expiryDate,
            "cvv": cvv
            },config).then(res=>{
                console.log(res);
                setErrMsg("");
                setSuccessMsg("You successfully depositted");
                resetAll();
            })
            .catch(err=>{
                console.log(err)
                if(err.response ? true: false)
                {
                    setErrMsg(err.response.data.message)
                }
                else{
                    setErrMsg(err.message)
                }
            })
    }
    return opened ? (
        <div className="checkout-form">
            <form className="checkout">
                <h2 className="header-deposit">Input Your Card to Deposit</h2>
                <div className="wrapper-ipt">
                    <label className="label-ipt" htmlFor="card-number">Card Number</label><br/>
                    <input className="deposit-ipt"  type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="xxxx xxxx xxxx xxxx"  name="card-number" label="Card Number"/>
                </div>

                <div className="wrapper-ipt">
                    <label className="label-ipt" htmlFor="card-holder">Card Holder</label><br/>
                    <input className="deposit-ipt" type="text" value={cardholderName} onChange={e => setCardholderName(e.target.value)}  placeholder="Cardholder Name"   name="card-holder" label=" Holder"/>
                </div>
                <div  className="row">
                    <div className="wrapper-ipt half">
                        <label className="label-ipt" htmlFor="expiry-date">Expiry Date</label><br/>
                        <input className="deposit-ipt" type="text" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder="MM-YYYY" name="expiry-date" label="Expiry Date"/>
                    </div>

                    <div className="wrapper-ipt half">
                        <label className="label-ipt" htmlFor="cvv">CVV</label><br/>
                        <input className="deposit-ipt" type="text" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" name="cvv" label="CVV"/>
                    </div>
                </div>

                <div className="wrapper-ipt">
                    <label className="label-ipt" htmlFor="amount">Amount</label><br/>
                    <input className="deposit-ipt" type="number" value={amount} onChange={e => setAmount(e.target.value)} name="amount" label="Amount"/>
                </div>
                {errMsg !== "" && <div className="error-notice">{errMsg}</div>}
                {successMsg !== "" && <div className="succes-notice">{successMsg}</div>}
                <div>
                    <Button onClick={handleDeposit} className="purchase-button" >Deposit</Button>
                    <Button onClick={() => {setDepositForm(false); setErrMsg(""); setSuccessMsg("")}} className="cancel-button">Cancel</Button>
                </div>
            </form>

        </div>
    ): "";
}

export default DepositForm;