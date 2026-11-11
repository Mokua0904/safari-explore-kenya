import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../Pages/Home";
import Tours from "./../Pages/Tour";
import TourDetails from "./../Pages/TourDetails";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";
import SearchResult from "./../Pages/SearchResultList";
import ThankYou from "./../Pages/ThankYou";
import About from "./../Pages/About";
import Hotels from "./../Pages/Hotels";
import Transport from "./../Pages/Transport";
import Shop from "./../Pages/Shop";
import HotelBooking from "./../Pages/HotelBooking";
import TransportBooking from "./../Pages/TransportBooking";
import ProductCheckout from "./../Pages/ProductCheckout";
import BecomeVendor from "./../Pages/BecomeVendor";
import VendorDashboard from "../Pages/VendorDashboard";
import Account from "./../Pages/Account";
import AdminVendors from "./../Pages/AdminVendors";

import ProtectedRoute from "../Component/ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours/search" element={<SearchResult />} />
      <Route path="/about" element={<About />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/transport" element={<Transport />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/become-vendor" element={<BecomeVendor />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/hotel-booking"
        element={<ProtectedRoute><HotelBooking /></ProtectedRoute>}
      />
      <Route
        path="/transport-booking"
        element={<ProtectedRoute><TransportBooking /></ProtectedRoute>}
      />
      <Route
        path="/product-checkout"
        element={<ProtectedRoute><ProductCheckout /></ProtectedRoute>}
      />
      <Route
        path="/thank-you"
        element={<ProtectedRoute><ThankYou /></ProtectedRoute>}
      />
      <Route
        path="/vendor-dashboard"
        element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>}
      />
      <Route
        path="/account"
        element={<ProtectedRoute><Account /></ProtectedRoute>}
      />
      <Route
        path="/admin/vendors"
        element={<ProtectedRoute><AdminVendors /></ProtectedRoute>}
      />
    </Routes>
  );
};

export default Routers;