import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/SignIn.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signin(username, password); // signin throws error if invalid
      navigate("/"); // redirect after successful login
    } catch (err) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="SignInHeader">Sign In</h2>
      {error && (
        <p className="error-msg" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text" // Accept username or email (for admin, username)
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          className="EmailInput"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="PasswordInput"
        />
        <button type="submit" className="LoginBtn">
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
