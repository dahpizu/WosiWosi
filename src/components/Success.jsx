// src/components/Success.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Success.css";

function Success() {
  const location = useLocation();
  const address = location.state?.address;
  const paymentMethod = location.state?.paymentMethod;

  return (
    <div className="success-container">
      <h1>🎉 Thank you for your order!</h1>
      {address ? (
        <div>
          <p>
            Your order will be delivered to: <br />
            {address.homeAddress}, {address.area}, {address.lga}, Lagos <br />
            Phone: {address.phone}
          </p>
          {paymentMethod === "Cash on Delivery" && (
            <p className="cash-reminder">
              💵 Please have the <strong>exact amount</strong> ready for the
              rider to avoid delays!
            </p>
          )}
        </div>
      ) : (
        <p>Your food is being prepared and will be delivered soon.</p>
      )}
      <Link to="/">
        <button className="home-btn">Back to Home</button>
      </Link>
    </div>
  );
}

export default Success;
