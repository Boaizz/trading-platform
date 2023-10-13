/*
File name: App.js
Author: Anh Tuan Doan
Student ID: 103526745
Last date modified: 02/09/2023
 */
// Importing required CSS and components for the App
import {Routes, Route} from "react-router-dom";
import Landing from "./components/landing/Landing";
import Detail from "./components/product-detail/Detail";
import LoginPage from './components/authentication/LoginPage';
import Marketplace from "./components/marketplace/Marketplace";
import History from "./components/history/History";
import Cart from "./components/cart/Cart";
import ProductCreation from "./components/product-creation/ProductCreation";
import Profile from "./components/profile/Profile";
import Layout from "./components/common/Layout";
import { useState } from "react";
import { useCookies} from "react-cookie";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const isAuthenticated = () => {
        return cookies.jwt_token ? true : false;
    };
  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  return (
    // Using the Routes component to define the routing for the application
    <Routes>
        <Route path="/" element={<Landing/>} />
         {/* Using the Layout component to wrap multiple routes */}
        <Route element={<Layout authStatus={authStatus} setAuthStatus={setAuthStatus}/>}>
            <Route path="/marketplace" element={<Marketplace/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/create-product" element={<ProductCreation/>} />
            <Route path="/product/:id" element={<Detail/>} />
            <Route path="/login" element={<LoginPage authStatus={authStatus} setAuthStatus={setAuthStatus}/>} />
            <Route path="/profile" element={<Profile/>} />
        </Route>
    </Routes>
  );
}

export default App;
