import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllProperties from './pages/AllProperties';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import MyRatings from './pages/MyRatings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
     
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-properties" element={<AllProperties />} />
        <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
        <Route path="/my-properties" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
        <Route path="/my-ratings" element={<PrivateRoute><MyRatings /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
