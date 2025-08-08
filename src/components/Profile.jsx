import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import lagosLGAs from "../data/LagosLGAs";
import "../css/Profile.css";

function Profile() {
  const { user, updateUserAddress } = useAuth();

  const normalizeLGAKey = (key) => {
    return key
      ? key
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")
      : "";
  };

  // Normalize user localGovernment at initialization
  const [selectedLGA, setSelectedLGA] = useState(
    normalizeLGAKey(user?.localGovernment) || ""
  );
  const [selectedTown, setSelectedTown] = useState(user?.address || ""); // note change to user.address
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const handleLGAChange = (e) => {
    const value = e.target.value;
    setSelectedLGA(value);
    setSelectedTown("");
  };

  const handleTownChange = (e) => {
    setSelectedTown(e.target.value);
  };

  const saveAddress = () => {
    if (!selectedLGA || !selectedTown) {
      setSaveMessage("Please select both LGA and town.");
      return;
    }

    const lgaOriginalKey = Object.keys(lagosLGAs).find(
      (lga) => normalizeLGAKey(lga) === selectedLGA
    );

    updateUserAddress({
      localGovernment: lgaOriginalKey,
      address: selectedTown,
    });

    setSaveMessage("Address updated successfully!");
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <section>
        <h3>Address</h3>
        <label>
          Local Government Area:
          <select value={selectedLGA} onChange={handleLGAChange}>
            <option value="">Select LGA</option>
            {Object.keys(lagosLGAs).map((lga) => (
              <option key={lga} value={normalizeLGAKey(lga)}>
                {lga}
              </option>
            ))}
          </select>
        </label>

        <label>
          Town:
          <select
            value={selectedTown}
            onChange={handleTownChange}
            disabled={!selectedLGA}
          >
            <option value="">Select Town</option>
            {selectedLGA &&
              lagosLGAs[
                Object.keys(lagosLGAs).find(
                  (lga) => normalizeLGAKey(lga) === selectedLGA
                )
              ].map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
          </select>
        </label>

        <button
          onClick={saveAddress}
          disabled={!selectedLGA || !selectedTown}
          style={{ marginLeft: "8px" }}
        >
          Save
        </button>
        {saveMessage && <p>{saveMessage}</p>}
      </section>

      <section>
        <h3>Email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </section>

      <section>
        <h3>Change Password</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <button
          onClick={() => {
            if (password.length < 6) {
              setPasswordMessage("Password must be at least 6 characters.");
              return;
            }
            if (password !== confirmPassword) {
              setPasswordMessage("Passwords do not match.");
              return;
            }
            setPasswordMessage("Password updated successfully!");
          }}
        >
          Update Password
        </button>
        {passwordMessage && <p>{passwordMessage}</p>}
      </section>
    </div>
  );
}

export default Profile;
