// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import AllProperties from "./pages/AllProperties";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import MyRatings from "./pages/MyRatings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/PropertyDetails";
import UpdateProperty from "./pages/UpdateProperty";

// 🆕 Blogs pages
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const location = useLocation();

  // Navbar & Footer hide only on real 404
  const is404Page = !(
    location.pathname === "/" ||
    location.pathname.startsWith("/all-properties") ||
    location.pathname.startsWith("/add-property") ||
    location.pathname.startsWith("/my-properties") ||
    location.pathname.startsWith("/my-ratings") ||
    location.pathname.startsWith("/property/") ||
    location.pathname.startsWith("/blogs") || // 🆕 added
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/about") ||
    location.pathname.startsWith("/update-property")
  );

  return (
    <ThemeProvider>
      {!is404Page && <Navbar />}

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-properties" element={<AllProperties />} />

        {/* 🆕 Blogs Routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="/add-property"
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-properties"
          element={
            <PrivateRoute>
              <MyProperties />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-property/:id"
          element={
            <PrivateRoute>
              <UpdateProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-ratings"
          element={
            <PrivateRoute>
              <MyRatings />
            </PrivateRoute>
          }
        />

        <Route
          path="/property/:id"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!is404Page && <Footer />}
    </ThemeProvider>
  );
}

export default App;
