/*
filename: ProductCard.jsx
Author: Anh Tuan Doan
StudentId: 103526745
last date modified: 03/09/2023
*/
import "./ProductCard.css"
// This component acts as a wrapper/container for its children elements
function ProductCard({children}) {
    return (
        // Main container for the product card
        <div className="product-card">
            {/* Rendering the children elements passed to the ProductCard component */}
            {children}
        </div>
    )
}

// Export the ProductCard component for use in other parts of the application
export default ProductCard;