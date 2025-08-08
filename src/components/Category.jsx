import React from "react";
import { useParams, Link } from "react-router-dom";
import localGovVendors from "../data/localGovVendors";

import { useAuth } from "../context/AuthContext";
import "../css/Category.css";

function Category() {
  const { key } = useParams();
  const { user } = useAuth();

  const userLGA = user?.localGovernment || "";

  const categoryKey = key ? key.toLowerCase() : "";

  // Helper: flatten all vendors across all LGAs for fallback
  const allVendors = Object.values(localGovVendors).flatMap((lgaData) => {
    return [
      ...(lgaData.restaurants || []),
      ...(lgaData.groceries || []),
      ...(lgaData.vendors || []),
    ];
  });

  // Get vendors from user LGA or fallback to all vendors
  const lgaVendors =
    userLGA && localGovVendors[userLGA]
      ? [
          ...(localGovVendors[userLGA].restaurants || []),
          ...(localGovVendors[userLGA].groceries || []),
          ...(localGovVendors[userLGA].vendors || []),
        ]
      : allVendors;

  // Filter vendors by category
  const filtered = lgaVendors.filter((vendor) => {
    const vendorCategory =
      vendor.category?.toLowerCase() || vendor.cuisine?.toLowerCase() || "";

    return vendorCategory === categoryKey;
  });

  // Helper to get correct route based on category
  const getVendorRoute = (vendor) => {
    const cat = vendor.category?.toLowerCase();
    if (cat === "food") return `/restaurant/${vendor.id}`;
    if (cat === "grocery") return `/grocery/${vendor.id}`;
    if (cat === "pharmacy") return `/pharmacy/${vendor.id}`;
    if (cat === "dessert") return `/dessert/${vendor.id}`;
    if (cat === "beverages") return `/beverages/${vendor.id}`;
    return `/vendor/${vendor.id}`;
  };

  return (
    <div className="category-page">
      <h2>
        {key ? key.charAt(0).toUpperCase() + key.slice(1) : "Category"} Vendors
      </h2>

      {filtered.length === 0 ? (
        <p>No vendors found for your location in this category.</p>
      ) : (
        <div className="vendor-list">
          {filtered.map((vendor) => (
            <Link
              key={vendor.id}
              to={getVendorRoute(vendor)}
              className="vendor-card"
            >
              <img
                src={vendor.image || "/images/fallback-vendor.jpg"}
                alt={vendor.name}
                width="100"
              />
              <h3>{vendor.name}</h3>
              <p>⭐ {vendor.rating}</p>
              <p>{vendor.category || vendor.cuisine}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
