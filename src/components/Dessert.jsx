import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import localGovVendors from "../data/localGovVendors";

import { useCart } from "../context/CartContext";

import "../css/Dessert.css";

function Dessert() {
  const { id } = useParams();
  const vendorId = parseInt(id, 10);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Flatten all vendors from all LGAs
  const allVendors = Object.values(localGovVendors).flatMap(
    (lga) => lga.vendors || []
  );

  const dessert = allVendors.find(
    (v) => v.id === vendorId && v.category === "dessert"
  );

  const [quantities, setQuantities] = useState({});
  const [showGoToCart, setShowGoToCart] = useState(false);

  const minimumOrder = 2500;

  if (!dessert) return <p>Dessert store not found.</p>;

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
      storeName: dessert.name,
      quantity,
    };

    addToCart(itemWithStore);
    setShowGoToCart(true);
  };

  const groupedMenu = (dessert.menu || []).reduce((groups, item) => {
    const type = item.type || "Others";
    if (!groups[type]) groups[type] = [];
    groups[type].push(item);
    return groups;
  }, {});

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const amountRemaining = minimumOrder - totalPrice;

  return (
    <div className="container">
      <h1>{dessert.name}</h1>
      <img className="store-image" src={dessert.image} alt={dessert.name} />

      <h2 className="section-title">Items</h2>
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
          >
            Go to Cart 🛒
          </button>
        </div>
      )}
    </div>
  );
}

export default Dessert;
