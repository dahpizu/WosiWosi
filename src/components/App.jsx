import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Checkout from "./Checkout.jsx";
import Success from "./Success.jsx";
import Cart from "./Cart.jsx";
import Home from "./Home.jsx";
import Restaurant from "./Restaurant.jsx";
import Header from "./Header.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Profile from "./Profile.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Category from "./Category.jsx";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import OrderHistory from "./OrderHistory.jsx";
import Footer from "./Footer.jsx";
import MyAccount from "./MyAccount.jsx";
import Grocery from "./Grocery.jsx";
import Pharmacy from "./Pharmacy.jsx";
import Dessert from "./Dessert.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/category/:key" element={<Category />} />

            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/success"
              element={
                <PrivateRoute>
                  <Success />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myaccount" element={<MyAccount />} />

            {/* Grocery route */}
            <Route path="/grocery/:id" element={<Grocery />} />

            {/* Pharmacy route */}
            <Route path="/pharmacy/:id" element={<Pharmacy />} />

            {/* Dessert route */}
            <Route path="/dessert/:id" element={<Dessert />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
