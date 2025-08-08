// src/components/Grocery.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import localGovVendors from "../data/localGovVendors"; // Your data source
import "../css/Grocery.css"; // Optional styling
import { useCart } from "../context/CartContext";

function Grocery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Flatten all groceries from all LGAs
  const allGroceries = Object.values(localGovVendors).flatMap(
    (lga) => lga.groceries || []
  );

  // Find grocery store by id across all LGAs
  const grocery = allGroceries.find((g) => g.id === parseInt(id));

  const [quantities, setQuantities] = useState({});
  const [showGoToCart, setShowGoToCart] = useState(false);

  const minimumOrder = 2500;

  if (!grocery) return <p>Grocery store not found.</p>;

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const itemWithStore = {
      ...item,
      storeName: grocery.name,
      quantity,
    };

    addToCart(itemWithStore);
    setShowGoToCart(true);
  };

  // Group grocery items by type
  const groupedMenu = (grocery.menu || []).reduce((groups, item) => {
    const type = item.type || "Others";
    if (!groups[type]) groups[type] = [];
    groups[type].push(item);
    return groups;
  }, {});

  // Calculate total price in cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const amountRemaining = minimumOrder - totalPrice;

  return (
    <div className="grocery-container">
      <h1>{grocery.name}</h1>
      <img
        src={grocery.image || "/images/fallback-grocery.jpg"}
        alt={grocery.name}
      />

      <h2>Items</h2>
      {Object.keys(groupedMenu).map((type) => (
        <div key={type} className="menu-group">
          <h3>{type}</h3>
          <ul className="menu-list">
            {groupedMenu[type].map((item) => (
              <li key={item.id} className="menu-item">
                <div>
                  <strong>{item.name}</strong> - ₦{item.price}
                </div>

                <div className="menu-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{quantities[item.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {showGoToCart && (
        <div className="cart-summary-container">
          <p>
            <strong>Total in Cart:</strong> ₦{totalPrice.toLocaleString()}
          </p>
          {totalPrice < minimumOrder ? (
            <p style={{ color: "red", marginBottom: "10px" }}>
              Add ₦{amountRemaining.toLocaleString()} more to reach the minimum
              order amount of ₦{minimumOrder.toLocaleString()}.
            </p>
          ) : (
            <p style={{ color: "green", marginBottom: "10px" }}>
              You have met the minimum order amount.
            </p>
          )}
          <button
            className="go-to-cart-button"
            onClick={() => navigate("/cart")}
            disabled={totalPrice < minimumOrder}
            style={{
              cursor: totalPrice < minimumOrder ? "not-allowed" : "pointer",
              backgroundColor: totalPrice < minimumOrder ? "#ccc" : "#28a745",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Go to Cart 🛒
          </button>
        </div>
      )}
    </div>
  );
}

export default Grocery;
