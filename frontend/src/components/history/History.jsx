/*
filename: History.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import HistoryTable from "./HistoryTable";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Error404 from "../../assets/error-404.png";
import axios from "axios";
import "./History.css";
// This component serves as a wrapper for displaying the transaction history
function History() {
    const [transaction, setTransaction] = useState([]);
    const [cookies, setCookie] = useCookies(["user"]);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = () => {
        return cookies.jwt_token ? true : false;
    };
    const [authStatus, setAuthStatus] = useState(isAuthenticated());
    useEffect(()=>{
        if(isAuthenticated())
        {
            const config = {
                headers: { Authorization: `Bearer ${cookies.jwt_token}`
            }
            };
            axios.get("http://localhost:8000/api/users/profile/transactions", config)
                .then(response => {
                    setTransaction(response.data.data.transactions);
                    console.log(response.data.data.transactions)
                })
                .catch(err => {
                    console.log(err);
                    if(err.response ? true: false)
                    {
                        setErrMsg(err.response.data.message)
                    }
                    else{
                       
                        setErrMsg(err.message)
                    }
                });    
        }
    },[])
    if(!authStatus){
        return (
            <div className="center-screen">
                <h1>You need to login to access this page!</h1>
                <button onClick={()=>{navigate("/login")}}>Login</button>
            </div>
        )
    }
    if(errMsg !==""){
        console.log(errMsg)
        return <div className="center-screen">
        <img src={Error404} alt="" />
        <h1>{errMsg}</h1>
        </div>;    
        }
    return (
        // Main container for the transaction history section
        <div className="history">
            {/* Title for the transaction history section */}
            <h1>Transaction History</h1>
            {/* Rendering the HistoryTable component to display the list of transactions */}
             <HistoryTable transactions={transaction}/>
        </div>
    );
}

// Export the History component for use in other parts of the application
export default History;