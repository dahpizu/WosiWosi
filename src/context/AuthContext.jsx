import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const adminUsername = "admin";
  const adminPassword = "admin123";

  const signup = (username, password) => {
    // Basic signup with admin check
    const isAdmin = username.toLowerCase() === adminUsername.toLowerCase();
    const newUser = { username, isAdmin };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const signin = (username, password) => {
    // Admin login check
    if (username === adminUsername && password === adminPassword) {
      const loggedInUser = { username, isAdmin: true };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }

    // Dummy user login example (replace with your real logic)
    const demoUserPassword = "userpass";
    if (password === demoUserPassword) {
      const loggedInUser = { username, isAdmin: false };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }

    // If invalid credentials, throw error to be caught in SignIn.jsx
    throw new Error("Invalid username or password");
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // NEW: Update user address (including local government)
  const updateUserAddress = (addressData) => {
    if (!user) return;
    // Merge old user data with updated address
    const updatedUser = {
      ...user,
      address: addressData.address || user.address || "",
      localGovernment:
        addressData.localGovernment || user.localGovernment || "",
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
        updateUserAddress, // provide this function to context consumers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
