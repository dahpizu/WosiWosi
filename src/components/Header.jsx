import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import localGovVendors from "../data/localGovVendors";
import "../css/Header.css";

function Header() {
  const { user, signout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Typing animation state
  const typingPhrases = [
    "Search for Foods...",
    "Search for Restaurants...",
    "Search for Items...",
    "Search for Canteen",
    "Search for Food Stuffs",
    "Search for Medicine",
    "Search for Electronics",
  ];
  const [placeholder, setPlaceholder] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[typingIndex];
    const delay = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTypingIndex((prev) => (prev + 1) % typingPhrases.length);
        return;
      }

      setPlaceholder(currentPhrase.substring(0, charIndex));
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  const allRestaurants = Object.values(localGovVendors).flatMap(
    (lga) => lga.restaurants || []
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();

    const matchedRestaurants = allRestaurants
      .filter((r) => r.name.toLowerCase().includes(lowerTerm))
      .map((r) => ({ type: "restaurant", name: r.name, id: r.id }));

    let matchedMenuItems = [];
    allRestaurants.forEach((r) => {
      (r.menu || []).forEach((item) => {
        if (item.name.toLowerCase().includes(lowerTerm)) {
          matchedMenuItems.push({
            type: "menu",
            name: item.name,
            restaurantName: r.name,
            restaurantId: r.id,
            itemId: item.id,
          });
        }
      });
    });

    const combined = [...matchedRestaurants, ...matchedMenuItems].slice(0, 10);
    setSuggestions(combined);
    setShowDropdown(combined.length > 0);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm("");
    setShowDropdown(false);
    if (suggestion.type === "restaurant") {
      navigate(`/restaurant/${suggestion.id}`);
    } else if (suggestion.type === "menu") {
      navigate(
        `/restaurant/${suggestion.restaurantId}?item=${encodeURIComponent(
          suggestion.name
        )}`
      );
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowDropdown(false);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        WosiWosi
      </Link>

      <form
        className="header-search"
        onSubmit={handleSearchSubmit}
        ref={searchRef}
      >
        <input
          type="text"
          className="typing-input"
          placeholder={placeholder || " "}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (suggestions.length) setShowDropdown(true);
          }}
          autoComplete="off"
        />
        <button type="submit">Search</button>

        {showDropdown && (
          <ul className="search-dropdown">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(s)}
              >
                {s.type === "restaurant" ? (
                  <strong>🏢 {s.name}</strong>
                ) : (
                  <>
                    🍽️ {s.name} — <em>{s.restaurantName}</em>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </form>

      <nav className="HeaderRightside">
        {user ? (
          <>
            <span className="user-email">
              Hello, {user.username || user.email}
            </span>
            <Link to="/orders" className="Orders">
              Orders
            </Link>
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/MyAccount" className="account-link">
              <MdAccountCircle />
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="SignIn">
              Sign In
            </Link>
            <Link to="/signup" className="SignOut">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
