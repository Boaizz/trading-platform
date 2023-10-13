/*
filename: HistoryTable.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/

import "./HistoryTable.css";
import { useState } from "react";
function HistoryTable({transactions}) {
    console.log(transactions)
    return (
        // Main container for the transaction history table
        <div className="table-container">
            <table>
                {/* Table header */}
                <thead>
                    <tr>
                        <th>Seller</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Transaction Hash</th>
                        <th>Status</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {
                        // Mapping over the transactionHistory array to render each transaction row
                        transactions.map((transaction) => {
                            return (
                                <tr>
                                    <td data-label="Seller">{transaction.seller_name}</td>
                                    <td data-label="Buyer">{transaction.buyer_name}</td>
                                    <td data-label="Date">{transaction.purchase_date}</td>
                                    <td data-label="Product">{transaction.asset_name}</td>
                                    <td data-label="Price">{transaction.asset_price} ETH</td>
                                    <td data-label="Transaction Hash">
                                        <input
                                            type="text"
                                            readOnly
                                            value={transaction.transaction_hash}
                                            className='hash-input'
                                        />
                                    </td>
                                    <td data-label="Status">
                                        <p className={"status status-valid"}>
                                            Valid
                                        </p>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

// Export the HistoryTable component for use in other parts of the application
export default HistoryTable;