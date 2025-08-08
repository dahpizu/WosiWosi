// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../css/OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(savedOrders.reverse()); // Show latest orders first
  }, []);

  const handleReorder = (items) => {
    items.forEach((item) => {
      addToCart(item);
    });
    alert("Items added back to cart!");
  };

  return (
    <div className="order-history-page">
      <h1>Your Order History</h1>

      {orders.length === 0 ? (
        <p className="empty-message">You have no previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order on {order.date}</h3>

            {order.items[0]?.restaurantName && (
              <p className="restaurant-name">
                <strong>From:</strong> {order.items[0].restaurantName}
              </p>
            )}

            <p className="delivery-info">
              Delivered to: {order.address?.homeAddress}, {order.address?.area},{" "}
              {order.address?.lga} | Phone: {order.address?.phone}
            </p>

            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} — ₦{item.price * item.quantity}
                </li>
              ))}
            </ul>

            <p className="order-total">
              <strong>Total:</strong> ₦{order.total}
            </p>

            <button
              className="reorder-button"
              onClick={() => handleReorder(order.items)}
            >
              Reorder
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
