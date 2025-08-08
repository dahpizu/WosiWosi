import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h2>WosiWosi</h2>
          <p>Delivering groceries and meals swiftly across Lagos.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/restaurants">Restaurants</a>
            </li>
            <li>
              <a href="/grocery">Groceries</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>+234 812 345 6789</p>
          <p>support@wosiwosi.ng</p>
          <p>Lagos, Nigeria</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} WosiWosi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
