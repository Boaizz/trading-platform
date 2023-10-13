/*
filename: ProductForm.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/

// Importing required components and hooks
import Input from "../common/Input";
import "./ProductForm.css"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useCookies} from "react-cookie";
// ProductForm component definition
function ProductForm() {
    const [errMsg, setErrMsg] = useState("");
    const [cookies, setCookie] = useCookies(["user"]);
    // Hook to navigate between routes
    const navigate = useNavigate();

    // Reference to the image input element
    const imageInputRef = useRef(null);

    // State to store the uploaded file's URL
    const [file, setFile] = useState();

    // Handler function for file upload
    function handleUpload(event) {
        // Create a URL for the uploaded file
        let url = URL.createObjectURL(event.target.files[0]);
        // Update the file state with the new URL
        setFile(url);
        console.log(url);
    }
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const formData = new FormData();
         // Append all other fields
        formData.append("name", evt.target.name.value);
        formData.append("price", evt.target.price.value);
        formData.append("description", evt.target.description.value);
        formData.append("category", evt.target.category.value);

        // Append the image
        if (evt.target.image.files[0]) {
            formData.append("image", evt.target.image.files[0]);
        }        const config = {
            headers: { Authorization: `Bearer ${cookies.jwt_token}`, 
            'Content-Type': 'multipart/form-data'
        }
        };
        axios.post("http://localhost:8000/api/assets/",formData, config).then(res => {
            console.log(res)
            navigate(`/product/${res.data.data.digital_asset.asset_id}`)
        }).catch(err => {
            console.log(err);
            // console.log(err.response.data.message);
            if(err.response ? true: false)
            {
                setErrMsg(err.response.data.message)
            }
            else{
                setErrMsg(err.message)
            }
        });
    }
    return (
        <form onSubmit={handleSubmit} method="POST" className="product-form">
            {/* Display the uploaded image if available */}
            {file ? <img onClick={() => imageInputRef.current.click()} className="image-input" src={file} alt="preview" /> : ""}
            {/* Image input field */}
            <Input ref={imageInputRef} onChange={handleUpload} className={"image-input" + (file ? " hide" : "")} type="file" name="image" label="Upload a file" />

            {/* Text input fields for product details */}
            <div className="text-input">
                <Input type="text" name="name" label="Name" required />
                <Input type="text" name="description" label="Description" required/>
                <Input type="number" name="price" label="Price" required/>
                <Input type="text" name="category" label="Category" required/>
                {errMsg !== "" && <p className="error-notice">{errMsg}</p>}
                {/* Submit button to navigate to the marketplace */}
                <button  type="submit" name="sell-button">Sell</button>
            </div>
        </form>
    );
}

// Export the ProductForm component
export default ProductForm;
