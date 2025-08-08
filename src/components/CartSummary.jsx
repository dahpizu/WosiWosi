import React from "react";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { cartItems } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const minimumOrder = 10000;
  const amountRemaining = minimumOrder - totalPrice;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div>
        Total: <strong>₦{totalPrice.toLocaleString()}</strong>
      </div>
      {totalPrice < minimumOrder ? (
        <div style={{ color: "red" }}>
          Add ₦{amountRemaining.toLocaleString()} more to checkout
        </div>
      ) : (
        <div style={{ color: "green" }}>You can proceed to checkout</div>
      )}
    </div>
  );
}

export default CartSummary;
