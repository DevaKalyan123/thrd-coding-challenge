import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Import Navbar component
import "./Products.css"; // Assuming you have the appropriate CSS file

const Products = ({ user, products, purchaseHistory }) => {
    const [personalizedProducts, setPersonalizedProducts] = useState([]);
    const [showProductHistory, setShowProductHistory] = useState(false); // State to toggle history view
    const [selectedProduct, setSelectedProduct] = useState(null); // State to show product details

    useEffect(() => {
        const userCategories = purchaseHistory
            .filter((h) => h.Username === user.Username)
            .map((h) => h.Category);

        const notPurchased = products
            .filter((p) => !userCategories.includes(p.Category))
            .sort((a, b) => a.ProductName.localeCompare(b.ProductName));

        const purchased = products
            .filter((p) => userCategories.includes(p.Category))
            .sort((a, b) => a.ProductName.localeCompare(b.ProductName));

        setPersonalizedProducts([...notPurchased, ...purchased]);
    }, [user, products, purchaseHistory]);

    const handleAddToCart = (product) => {
        alert(`Added ${product.ProductName} to the cart.`);
    };

    const handleBuyNow = (product) => {
        alert(`Buying ${product.ProductName} now.`);
    };

    const handleProductHistoryClick = (product) => {
        setSelectedProduct(product); // Set selected product to show details
    };

    const getCategoryImage = (category) => {
        const imageMap = {
            Electronics: "https://via.placeholder.com/300x200?text=Electronics",
            Fashion: "https://via.placeholder.com/300x200?text=Fashion",
            Books: "https://via.placeholder.com/300x200?text=Books",
            "Home Decor": "https://via.placeholder.com/300x200?text=Home+Decor",
            Toys: "https://via.placeholder.com/300x200?text=Toys",
            Sports: "https://via.placeholder.com/300x200?text=Sports",
            Gadgets: "https://via.placeholder.com/300x200?text=Gadgets",
            Groceries: "https://via.placeholder.com/300x200?text=Groceries",
            Furniture: "https://via.placeholder.com/300x200?text=Furniture",
            "Beauty Products": "https://via.placeholder.com/300x200?text=Beauty+Products",
        };

        return imageMap[category] || "https://via.placeholder.com/300x200?text=Default+Image";
    };

    const toggleProductHistory = () => {
        setShowProductHistory(!showProductHistory); // Toggle product history visibility
    };

    return (
        <div>
            {/* Navbar Component */}
            <Navbar />

            {/* Animated Bubbles */}
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-5"></div>
            <div className="circle circle-6"></div>

            <div className="products-page">
                <h2 className="welcome-message">Hi {user.Username}!</h2>

                {/* Product History Button */}
                <button
                    className="action-button"
                    onClick={toggleProductHistory}
                >
                    {showProductHistory ? "Hide Product History" : "Show Product History"}
                </button>

                {/* Show Product History if toggled */}
                {showProductHistory && (
                    <div className="product-history">
                        <h3>Your Product History</h3>
                        <div className="product-list">
                            {purchaseHistory
                                .filter((history) => history.Username === user.Username)
                                .map((history) => {
                                    const product = products.find(
                                        (p) => p.ProductID === history.ProductID
                                    );
                                    if (product) {
                                        return (
                                            <div
                                                className="product-card"
                                                key={product.ProductID}
                                                onClick={() => handleProductHistoryClick(product)}
                                            >
                                                <img
                                                    src={
                                                        product.ImageURL && product.ImageURL.trim()
                                                            ? product.ImageURL
                                                            : getCategoryImage(product.Category)
                                                    }
                                                    alt={product.ProductName || "Product Image"}
                                                    className="product-image"
                                                />
                                                <div className="product-info">
                                                    <h3 className="product-name">{product.ProductName}</h3>
                                                    <p className="product-category">Category: {product.Category}</p>
                                                    <p className="product-price">Price: ₹{product.Price}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                        </div>
                    </div>
                )}

                {/* Show Product Details */}
                {selectedProduct && (
                    <div className="product-details">
                        <h3>Product Details</h3>
                        <img
                            src={
                                selectedProduct.ImageURL && selectedProduct.ImageURL.trim()
                                    ? selectedProduct.ImageURL
                                    : getCategoryImage(selectedProduct.Category)
                            }
                            alt={selectedProduct.ProductName || "Product Image"}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3 className="product-name">{selectedProduct.ProductName}</h3>
                            <p className="product-category">Category: {selectedProduct.Category}</p>
                            <p className="product-price">Price: ₹{selectedProduct.Price}</p>
                            <p>{selectedProduct.Description}</p>
                        </div>
                    </div>
                )}

                {/* Personalized Products List */}
                <div className="product-list">
                    {personalizedProducts.length > 0 ? (
                        personalizedProducts.map((product) => (
                            <div className="product-card" key={product.ProductID}>
                                <img
                                    src={
                                        product.ImageURL && product.ImageURL.trim()
                                            ? product.ImageURL
                                            : getCategoryImage(product.Category)
                                    }
                                    alt={product.ProductName || "Product Image"}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h3 className="product-name">{product.ProductName}</h3>
                                    <p className="product-category">Category: {product.Category}</p>
                                    <p className="product-price">Price: ₹{product.Price}</p>
                                    <div className="product-actions">
                                        <button
                                            className="action-button add-to-cart"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="action-button buy-now"
                                            onClick={() => handleBuyNow(product)}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
