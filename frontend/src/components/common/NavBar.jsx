/*
filename: NavBar.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import Logo from "../../assets/logo.png";
import FilterIcon from "../../assets/filter.svg"
import "./NavBar.css"
import Filter from "./Filter";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { useCookies} from "react-cookie";
import axios from "axios";
function NavBar({authStatus, setAuthStatus}) {
    const [isFilterClicked, setFilterClicked] = useState(false); // State for handling filter click
    const [isMenuActive,setMenuActive] = useState(false); // State for handling mobile menu activation
    const [bgColor, setBgColor] = useState('transparent');  // State for handling navbar background color on scroll
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [searchValue, setSearchValue] = useState("");
    const isAuthenticated = () => {
        return cookies.jwt_token ? true : false;
    };
    // const [authStatus, setAuthStatus] = useState(isAuthenticated());
    const navigate = useNavigate();
    // useEffect(() => {
    //     setAuthStatus(isAuthenticated());
    // }, [cookies.jwt_token]);
    
    const HandleLogout = (evt) => {
        evt.preventDefault();
        removeCookie('jwt_token', { path: '/' });
        setAuthStatus(false);  // Update authStatus after logout
        navigate("/login");
    }

    useEffect(() => { // useEffect hook to add a scroll event listener
        const handleScroll = () => {
            if (window.scrollY > 50) { // Change navbar background color based on scroll position
                setBgColor('rgba(45,34,65,0.7)');
            } else {
                setBgColor('transparent');
            }
        };

        // Adding the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handleSearch = () => {
        
        // Assuming your API endpoint looks something like this
        
            navigate(`/marketplace?name=${searchValue}`);  // Navigate to Marketplace after setting the search value
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();  // Execute the search when Enter is pressed
        }
    };
    return (
        <>
            <header>
                 {/* Main navbar container */}
                <div className="navbar" style={{ backgroundColor: bgColor }}>
                    <Link to="/marketplace"><img src={Logo}  alt="Website logo"/></Link> {/* Logo */}
                    <input 
                        placeholder="Search digital assets" 
                        className="search-input" 
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}  // Update searchValue state when input changes
                        onKeyPress={handleKeyPress}
                    />
                    

                    <img onClick={() => setFilterClicked(true)} className="filter-icon" src={FilterIcon} alt="" /> {/* Filter icon */}

                    <nav className="links"> {/* Navigation links for desktop */}
                        {!authStatus && <Link to="/login">Login</Link>}
                        {authStatus && <Link onClick={HandleLogout}>Logout</Link>}
                        <Link to="/marketplace">Market</Link>
                        <Link to="/history">History</Link>
                        <Link to="/create-product">Sell a product</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/profile">Profile</Link>
                    </nav>
                     {/* Hamburger menu button for mobile */}
                    <button onClick={(event) => setMenuActive(!isMenuActive)} className={"hamburger" + (isMenuActive ? " is-active": "")}>
                        <div className="bar"></div>
                    </button>

                </div>
            </header>
            {/* Navigation links for mobile */}
            <nav className={"mobile-navbar" + (isMenuActive ? " is-active" : "")}>
                {!authStatus && <Link onClick={() => setMenuActive(false)} to="/login">Login</Link>}
                {authStatus && <Link onClick={(e) => { setMenuActive(false); HandleLogout(e); }}>Logout</Link>}
                <Link onClick={() => setMenuActive(false)} to="/marketplace">Market</Link>
                <Link onClick={() => setMenuActive(false)} to="/history">History</Link>
                <Link onClick={() => setMenuActive(false)} to="/create-product">Sell a product</Link>
                <Link onClick={() => setMenuActive(false)} to="/cart">Cart</Link>
            </nav>
           <Filter clicked={isFilterClicked} setFilter={setFilterClicked} /> {/* Filter component */}
        </>

    )
}

export default NavBar;