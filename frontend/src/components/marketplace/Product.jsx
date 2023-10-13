/*
filename: Product.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import ProductCard from "./ProductCard";
import "./Product.css"
import ProductImage from "../../assets/product-image.jpg"
import {Link} from "react-router-dom";

// This component displays individual product details wrapped inside a ProductCard
function Product({id, title, price, image}) {
    console.log(image)
    return (
        // Using the ProductCard component as a wrapper
        <ProductCard>
            {/* Link to the detailed product page using the product's ID */}
            <Link to={"/product/" + id}>
                {/* Container for the product image */}
                <div className="product-image">
                    {(image!==null && image!==undefined) && <img alt="product" src={image} />}
                    {(image===null || image===undefined) && <img alt="product" src={ProductImage} />}
                    
                </div>

                {/* Container for the product's information */}
                <div className="product-information">
                    <h2>{title}</h2>
                    <p className="product-price">{price} ETH</p>
                </div>
            </Link>
        </ProductCard>
    );
}

// Export the Product component for use in other parts of the application
export default Product;