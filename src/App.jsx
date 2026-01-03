import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AllProperties from './pages/AllProperties';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import MyRatings from './pages/MyRatings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import PropertyDetails from './pages/PropertyDetails';
import { Toaster } from 'react-hot-toast';
import UpdateProperty from './pages/UpdateProperty';

function App() {
  const location = useLocation();

  
  const is404Page =
    !(
      location.pathname === '/' ||
      location.pathname.startsWith('/all-properties') ||
      location.pathname.startsWith('/add-property') ||
      location.pathname.startsWith('/my-properties') ||
      location.pathname.startsWith('/my-ratings') ||
      location.pathname.startsWith('/property/') ||
      location.pathname.startsWith('/login') ||
      location.pathname.startsWith('/register')||
      location.pathname.startsWith('/about')
    );

  return (
    <>
      {!is404Page && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-properties" element={<AllProperties />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!is404Page && <Footer />}
    </>
  );
}

export default App;