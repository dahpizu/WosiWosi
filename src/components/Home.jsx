import React from "react";
import { Link, useLocation } from "react-router-dom";
import localGovVendors from "../data/localGovVendors";
import "../css/Home.css";

const categories = [
  { name: "Food", key: "food", emoji: "🍔" },
  { name: "Grocery", key: "grocery", emoji: "🛒" },
  { name: "Pharmacy", key: "pharmacy", emoji: "💊" },
  { name: "Dessert", key: "dessert", emoji: "🍰" },
];

// Helper to get random n items from array
function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Home() {
  const location = useLocation();
  const searchQuery = (new URLSearchParams(location.search).get("q") || "")
    .trim()
    .toLowerCase();

  // Flatten data for each category from all LGAs
  const allRestaurants = Object.values(localGovVendors).flatMap(
    (lga) => lga.restaurants || []
  );
  const allGroceries = Object.values(localGovVendors).flatMap(
    (lga) => lga.groceries || []
  );
  const allPharmacies = Object.values(localGovVendors).flatMap(
    (lga) => lga.pharmacies || []
  );
  const allDesserts = Object.values(localGovVendors).flatMap(
    (lga) => lga.desserts || []
  );

  // Filter restaurants by search query
  const matchedRestaurants = allRestaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery);
    const cuisineMatch = restaurant.cuisine
      ?.toLowerCase()
      .includes(searchQuery);
    const menuMatch = restaurant.menu?.some((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    return nameMatch || cuisineMatch || menuMatch;
  });

  // Filter groceries by search query
  const matchedGroceries = allGroceries.filter((store) => {
    const nameMatch = store.name.toLowerCase().includes(searchQuery);
    const menuMatch = store.menu?.some((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    return nameMatch || menuMatch;
  });

  // Filter pharmacies by search query
  const matchedPharmacies = allPharmacies.filter((store) => {
    const nameMatch = store.name.toLowerCase().includes(searchQuery);
    const menuMatch = store.menu?.some((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    return nameMatch || menuMatch;
  });

  // Filter desserts by search query
  const matchedDesserts = allDesserts.filter((store) => {
    const nameMatch = store.name.toLowerCase().includes(searchQuery);
    const menuMatch = store.menu?.some((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    return nameMatch || menuMatch;
  });

  // Show random or matched results based on search query
  const restaurantsToShow = searchQuery
    ? matchedRestaurants
    : getRandomItems(allRestaurants, 6);

  const groceriesToShow = searchQuery
    ? matchedGroceries
    : getRandomItems(allGroceries, 4);

  const pharmaciesToShow = searchQuery
    ? matchedPharmacies
    : getRandomItems(allPharmacies, 4);

  const dessertsToShow = searchQuery
    ? matchedDesserts
    : getRandomItems(allDesserts, 4);

  return (
    <div className="home-container">
      <h1 className="Logoname">WosiWosi</h1>
      <h2 className="LogoQuote">
        Everything you need in Nigeria, delivered in minutes.
      </h2>

      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              to={`/category/${cat.key}`}
              key={cat.key}
              className="category-card"
              aria-label={`Browse ${cat.name} category`}
            >
              <div className="emoji">{cat.emoji}</div>
              <div>{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section className="restaurant-section">
        <h2>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Nearby Restaurants"}
        </h2>
        <div className="restaurant-grid">
          {restaurantsToShow.length > 0 ? (
            restaurantsToShow.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <Link to={`/restaurant/${restaurant.id}`}>
                  <img
                    src={restaurant.image || "/images/fallback-restaurant.jpg"}
                    alt={restaurant.name}
                  />
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.cuisine}</p>
                  <p>
                    ⭐ {restaurant.rating || "N/A"} •{" "}
                    {restaurant.deliveryTime || "N/A"}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p>No restaurants match your search.</p>
          )}
        </div>
        {!searchQuery && (
          <div className="see-more-container">
            <Link to="/restaurants" className="see-more-link">
              See more restaurants →
            </Link>
          </div>
        )}
      </section>

      {/* Groceries */}
      <section className="grocery-section">
        <h2>Groceries</h2>
        <div className="grocery-grid">
          {groceriesToShow.length > 0 ? (
            groceriesToShow.map((store) => (
              <div key={store.id} className="grocery-card">
                <Link to={`/grocery/${store.id}`}>
                  <img
                    src={store.image || "/images/fallback-grocery.jpg"}
                    alt={store.name}
                  />
                  <h3>{store.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No groceries found.</p>
          )}
        </div>
      </section>

      {/* Pharmacies */}
      <section className="pharmacy-section">
        <h2>Pharmacies</h2>
        <div className="pharmacy-grid">
          {pharmaciesToShow.length > 0 ? (
            pharmaciesToShow.map((store) => (
              <div key={store.id} className="pharmacy-card">
                <Link to={`/pharmacy/${store.id}`}>
                  <img
                    src={store.image || "/images/fallback-pharmacy.jpg"}
                    alt={store.name}
                  />
                  <h3>{store.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No pharmacies found.</p>
          )}
        </div>
      </section>

      {/* Desserts */}
      <section className="dessert-section">
        <h2>Desserts</h2>
        <div className="dessert-grid">
          {dessertsToShow.length > 0 ? (
            dessertsToShow.map((store) => (
              <div key={store.id} className="dessert-card">
                <Link to={`/dessert/${store.id}`}>
                  <img
                    src={store.image || "/images/fallback-dessert.jpg"}
                    alt={store.name}
                  />
                  <h3>{store.name}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No dessert shops found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
