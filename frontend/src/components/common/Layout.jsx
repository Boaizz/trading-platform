/*
filename: Layout.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";
// This component serves as a layout wrapper for the application, 
// including the NavBar at the top and an Outlet to render child routes.
function Layout({authStatus, setAuthStatus}) {
    return (
        <>
            {/* Rendering the NavBar component */}
            <NavBar authStatus={authStatus} setAuthStatus={setAuthStatus}/>
            {/* Outlet is a placeholder where the child routes will be rendered */}
            <Outlet />
        </>
    );
}

// Export the Layout component for use in other parts of the application
export default Layout;