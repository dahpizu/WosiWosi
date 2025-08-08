import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import localGovVendors from "../data/localGovVendors"; // adjust path if needed
import "../css/Restaurant.css";
import { useCart } from "../context/CartContext";

function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locationHook = useLocation();

  // Flatten all restaurants from all LGAs
  const allRestaurants = Object.values(localGovVendors).flatMap(
    (lga) => lga.restaurants || []
  );

  // Find the restaurant by ID
  const restaurant = allRestaurants.find((r) => r.id === parseInt(id));

  const { addToCart, cartItems } = useCart();

  const [quantities, setQuantities] = useState({});
  const [showGoToCart, setShowGoToCart] = useState(false);

  const minimumOrder = 2500;

  if (!restaurant) return <p>Restaurant not found.</p>;

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const itemWithRestaurant = {
      ...item,
      restaurantName: restaurant.name,
      quantity,
    };

    addToCart(itemWithRestaurant);
    setShowGoToCart(true);
  };

  // Group menu items by type
  const groupedMenu = (restaurant.menu || []).reduce((groups, item) => {
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
    <div className="restaurant-container">
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine}</p>
      <img
        src={restaurant.image || "/images/fallback-restaurant.jpg"}
        alt={restaurant.name}
      />

      <h2>Menu</h2>

      {Object.keys(groupedMenu).map((type) => (
        <div key={type} className="menu-group">
          <h3>{type}</h3>
          <ul className="menu-list">
            {groupedMenu[type].map((item) => (
              <li key={item.id} className="menu-item">
                <div>
                  <strong>{item.name}</strong> - ₦{item.price}
                  {item.description && <p>{item.description}</p>}
                </div>

                <div className="menu-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="minusSign"
                  >
                    -
                  </button>
                  <span>{quantities[item.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="additionsign"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="AddToCart"
                  >
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

export default Restaurant;
