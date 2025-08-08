import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import lagosLGAs from "../data/LagosLGAs";

const DELIVERY_FEE = 1000;
const SERVICE_FEE = 500;
const MIN_ORDER_TOTAL = 2500;

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [tip, setTip] = useState(0);
  const [voucherInput, setVoucherInput] = useState("");
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = voucher === "SAVE500" ? 500 : 0;

  const total = subtotal + DELIVERY_FEE + SERVICE_FEE + Number(tip) - discount;

  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    if (voucherInput.trim().toUpperCase() === "SAVE500") {
      setVoucher("SAVE500");
      setVoucherApplied(true);
      alert("Voucher applied! You saved ₦500.");
    } else {
      setVoucher("");
      setVoucherApplied(false);
      alert("Invalid voucher code.");
    }
  };

  const handlePlaceOrder = () => {
    if (
      !selectedLGA ||
      !selectedArea ||
      !homeAddress ||
      !phone ||
      !paymentMethod
    ) {
      alert("Please fill in all required details.");
      return;
    }

    if (total < MIN_ORDER_TOTAL) {
      alert(
        `Minimum order amount is ₦${MIN_ORDER_TOTAL}. Please add more items.`
      );
      return;
    }

    const deliveryAddress = {
      lga: selectedLGA,
      area: selectedArea,
      homeAddress,
      phone,
    };

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      address: deliveryAddress,
      tip,
      paymentMethod,
      voucher,
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));

    clearCart();
    navigate("/success", {
      state: { address: deliveryAddress, paymentMethod, total },
    });
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* 1. Delivery Address */}
      <h2>Delivery Address 🚚</h2>
      <label htmlFor="lga">Local Government Area (LGA)</label>
      <select
        id="lga"
        value={selectedLGA}
        onChange={(e) => {
          setSelectedLGA(e.target.value);
          setSelectedArea("");
        }}
      >
        <option value="">-- Select LGA --</option>
        {Object.keys(lagosLGAs).map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>

      {selectedLGA && (
        <>
          <label htmlFor="area">Area/Neighborhood</label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">-- Select Area --</option>
            {lagosLGAs[selectedLGA].map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <label htmlFor="homeAddress">Home Address</label>
          <input
            id="homeAddress"
            type="text"
            placeholder="e.g. 14 Adeola St"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. 08012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </>
      )}

      {/* 2. Delivery Time Estimate */}
      <div className="delivery-time">🚴 Delivery arrives in 10–20 minutes</div>

      {/* 3. Tip the Rider */}
      <label htmlFor="tip">Tip Your Rider (₦) 🙌</label>
      <select id="tip" value={tip} onChange={(e) => setTip(e.target.value)}>
        <option value="0">No Tip</option>
        <option value="200">₦200</option>
        <option value="500">₦500</option>
        <option value="1000">₦1000</option>
      </select>

      {/* 4. Payment Method */}
      <h2>Payment Method 💳</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="Bank Transfer"
            checked={paymentMethod === "Bank Transfer"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Bank Transfer
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        {paymentMethod === "Bank Transfer" && (
          <div className="bank-info">
            <h3>Bank Transfer Details 🏦</h3>
            <p>
              <strong>Bank:</strong> Zenith Bank
            </p>
            <p>
              <strong>Account Number:</strong> 1234567890
            </p>
            <p>
              <strong>Account Name:</strong> WosiWosi Foods
            </p>
            <p>Make your transfer to confirm your order.</p>
          </div>
        )}

        {paymentMethod === "Cash on Delivery" && (
          <div className="cash-info">
            <h3>Cash Payment Note 💵</h3>
            <p>
              Please have the <strong>exact amount</strong> ready to avoid delay
              with change when the rider arrives.
            </p>
          </div>
        )}
      </div>

      {/* 5. Voucher Input */}
      <form onSubmit={handleVoucherSubmit}>
        <label htmlFor="voucher">Apply Voucher Code 🎟️</label>
        <input
          id="voucher"
          type="text"
          placeholder="e.g. SAVE500"
          value={voucherInput}
          onChange={(e) => setVoucherInput(e.target.value)}
          disabled={voucherApplied}
        />
        <button
          type="submit"
          disabled={voucherApplied}
          className="apply-voucher-btn"
        >
          {voucherApplied ? "Voucher Applied" : "Apply Voucher"}
        </button>
      </form>

      {/* 6. Payment Summary */}
      <h2>Payment Summary</h2>
      <ul>
        <li>Subtotal: ₦{subtotal}</li>
        <li>Delivery Fee: ₦{DELIVERY_FEE}</li>
        <li>Service Fee: ₦{SERVICE_FEE}</li>
        <li>Tip: ₦{tip}</li>
        {discount > 0 && <li>Discount: -₦{discount}</li>}
      </ul>
      <h3>Total: ₦{total}</h3>

      {/* 7. Place Order Button */}
      {total < MIN_ORDER_TOTAL ? (
        <>
          <p className="warning-text">
            🚫 Minimum order amount is ₦{MIN_ORDER_TOTAL}. Please add more
            items.
          </p>
          <button className="place-order-btn" disabled>
            Place Order
          </button>
        </>
      ) : (
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
}

export default Checkout;
