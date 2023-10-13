/*
filename: ProductList.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import Product from "./Product";

import "./ProductList.css";
// Takes a prop 'productList' which is an array of product objects
function ProductList({productList}) {
    return (
        // Main container for the list of products
        <div className="product-list">
            {/* Mapping over the productList array to render each Product component */}
            {productList.map((product) => (
                // The Product component is rendered for each product in the list
                // Props like 'id', 'title', 'seller', and 'price' are passed to each Product component
                <Product key={product.asset_id} id={product.asset_id} title={product.name} image={product.image_name}  price={product.price} />
            ))}
        </div>
    );
}

// Export the ProductList component
export default ProductList;