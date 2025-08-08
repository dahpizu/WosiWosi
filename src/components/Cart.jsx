import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css";

function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  // Cart subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const DELIVERY_FEE = 2000;
  const SERVICE_FEE = 1000;
  const MIN_ORDER_AMOUNT = 2500;

  // Total with fees
  const grandTotal = subtotal + DELIVERY_FEE + SERVICE_FEE;

  const handleCheckout = () => {
    if (subtotal < MIN_ORDER_AMOUNT) {
      alert(
        `Minimum order amount is ₦${MIN_ORDER_AMOUNT.toLocaleString()}. Please add more items.`
      );
      return;
    }
    navigate("/checkout");
  };

  const handleIncrease = (item) => {
    increaseQuantity(item.id);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      decreaseQuantity(item.id);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <strong>{item.name}</strong> from {item.restaurantName}
                </div>

                <div className="item-quantity">
                  <button onClick={() => handleDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>

                <div className="item-subtotal">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>

                <button
                  className="remove-button"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-fees">
            <p>
              <strong>Subtotal:</strong> ₦{subtotal.toLocaleString()}
            </p>
            <p>
              <strong>Delivery Fee:</strong> ₦{DELIVERY_FEE.toLocaleString()}
            </p>
            <p>
              <strong>Service Fee:</strong> ₦{SERVICE_FEE.toLocaleString()}
            </p>
            <p className="cart-total">
              <strong>Total:</strong> ₦{grandTotal.toLocaleString()}
            </p>
          </div>

          <div className="cart-actions">
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>

            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={subtotal < MIN_ORDER_AMOUNT}
            >
              Checkout
            </button>
          </div>

          {subtotal < MIN_ORDER_AMOUNT && (
            <p className="min-order-warning">
              Add ₦{(MIN_ORDER_AMOUNT - subtotal).toLocaleString()} more to
              proceed to checkout.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
