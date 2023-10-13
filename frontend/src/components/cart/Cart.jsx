/*
* File name: Cart.jsx
* Author: Dang Khanh Toan Nguyen
* StudentID: 103797499
* Last date modified: 03/09/2023
* */
import "./Cart1.css"
import ProductList from "../marketplace/ProductList";
import Button from "../common/Button";
// import CheckoutForm from "./CheckoutForm";
import {useState} from "react"
/*
* Cart.jsx Component
* This component allows users review and finalize their selected assets before confirming their purchases.
* It lists the Ethereum assets that users have added to their cart and displays the total price.
* Users can check out to complete their purchases.*/

// Define product list that user have added to cart
const productList = [
    {
        id: 1,
        title: "Product 1",
        seller: "Tuan Doan",
        price: 200
    },
    {
        id: 2,
        title: "Product 2",
        seller: "Tuan Doan",
        price: 200
    },
    {
        id: 3,
        title: "Product 3",
        seller: "Tuan Doan",
        price: 200
    },
    {
        id: 4,
        title: "Product 4",
        seller: "Tuan Doan",
        price: 200
    }
]
function Cart() {
    // State to control the visibility of the CheckoutForm component
    const [checkoutForm, setCheckoutForm] = useState(false);
    return (
        <div className="cart">
            <div className="cart-body">
                <h1>Your cart</h1>
                <ProductList productList={productList} />
                <h2>Total: 800 ETH</h2>
                <Button onClick={() => setCheckoutForm(true)}  className="checkout" >Checkout</Button>
            </div>
            {/* Render the CheckoutForm component conditionally based on state */}
            {/* <CheckoutForm setCheckoutForm={setCheckoutForm} opened={checkoutForm}/> */}
        </div>
    )
}

export default Cart;