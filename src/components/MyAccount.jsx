import React from "react";
import { Link } from "react-router-dom";
import "../css/MyAccount.css";

function MyAccount() {
  return (
    <div className="my-account-container">
      <div className="my-account-header">
        <Link to="/profile" className="profile-link" title="View Profile">
          {/* Inline SVG account icon with floaty animation */}
          <svg
            className="icon-float"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Account"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
          </svg>
          <span>My Account</span>
        </Link>
      </div>

      <section className="my-account-section">
        <h2>
          <Link to="/orders">Orders</Link>
        </h2>
      </section>

      <section className="my-account-section">
        <h2>Refer a Friend</h2>
        <p>
          Share your referral link:{" "}
          <a
            href="https://wosiwosi.com/referral?code=XYZ123"
            target="_blank"
            rel="noreferrer"
          >
            https://wosiwosi.com/referral?code=XYZ123
          </a>
        </p>
      </section>

      <section className="my-account-section">
        <h2>Get Help</h2>
        <p>
          Visit <Link to="/help">Help Center</Link> or{" "}
          <Link to="/chat">Chat with us live</Link>.
        </p>
      </section>

      <section className="my-account-section">
        <h2>About the App</h2>
        <p>
          WosiWosi helps you order meals from your favorite restaurants easily!
          Our platform connects you with a wide variety of local eateries,
          provision stores, bakeries, and pharmacies — so you can get everything
          you need all in one place. Craving fresh meals, delicious cakes, or
          essential groceries? We’ve got you covered! With lightning-fast
          delivery within minutes, WosiWosi ensures your orders arrive hot,
          fresh, and right when you need them. We’re passionate about supporting
          local businesses and bringing convenience, quality, and care straight
          to your doorstep. Experience seamless ordering, reliable service, and
          a community that truly values your satisfaction and wellbeing.
        </p>
      </section>

      <section className="my-account-section">
        <h2>Chat with Live Bot</h2>
        <button
          className="chat-button"
          onClick={() => alert("Starting chat...")}
          aria-label="Start chat"
        >
          {/* Inline SVG chat icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
          </svg>
          Start Chat
        </button>
      </section>
    </div>
  );
}

export default MyAccount;
