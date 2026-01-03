
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiHome, FiGrid, FiPlus, FiFolder, FiStar, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const ddRef = useRef(null);

  /* ---------------- Dark Mode ---------------- */
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  /* ---------------- Click Outside ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  /* ---------------- Routes ---------------- */
  const publicLinks = [
    { name: 'Home', to: '/', icon: <FiHome /> },
    { name: 'All Properties', to: '/all-properties', icon: <FiGrid /> },
    { name: 'About', to: '/about', icon: <FiInfo /> },
  ];

  const privateLinks = [
    { name: 'Add Property', to: '/add-property', icon: <FiPlus /> },
    { name: 'My Properties', to: '/my-properties', icon: <FiFolder /> },
    { name: 'My Ratings', to: '/my-ratings', icon: <FiStar /> },
  ];

  /* ---------------- Avatar ---------------- */
  const Avatar = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }

    const letters = (user?.displayName || user?.email || 'U')
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold">
        {letters}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-green-700 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-yellow-400"
        >
          🏡 HomeNest
        </button>

        {/* Desktop / Tablet Menu */}
        <div className="hidden md:flex items-center gap-1 text-xs lg:gap-4 lg:text-sm">
          {[...publicLinks, ...(user ? privateLinks : [])].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 rounded transition whitespace-nowrap ${
                  isActive
                    ? 'bg-yellow-500 text-black'
                    : 'hover:bg-yellow-500 hover:text-black'
                }`
              }
            >
              <span className="text-sm lg:text-base">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button onClick={() => setDark(!dark)} className="p-1">
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Auth Section */}
          {!user ? (
            <div className="hidden md:flex gap-1 lg:gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-1 bg-green-600 rounded hover:bg-green-800 text-xs lg:text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 text-xs lg:text-sm"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="relative hidden md:flex" ref={ddRef}>
              <button onClick={() => setDdOpen(!ddOpen)}>
                <Avatar />
              </button>
              {ddOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg">
                  <div className="px-4 py-2 font-semibold">
                    {user.displayName || 'User'}
                  </div>
                  <div className="px-4 text-xs text-gray-500 break-words">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-700 dark:bg-gray-900 px-4 pb-4 space-y-2">
          {/* Mobile Profile */}
          {user && (
            <div className="flex items-center gap-2 py-2 border-b border-white/20">
              <Avatar />
              <div>
                <div className="text-sm font-semibold">{user.displayName || 'User'}</div>
                <div className="text-xs text-gray-300 break-words">{user.email}</div>
              </div>
            </div>
          )}

          {/* Links */}
          {[...publicLinks, ...(user ? privateLinks : [])].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded hover:bg-green-600 transition text-xs"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Mobile Auth */}
          {!user ? (
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                className="flex-1 bg-green-600 py-2 rounded text-xs"
              >
                Login
              </button>
              <button
                onClick={() => { navigate('/register'); setMobileOpen(false); }}
                className="flex-1 bg-yellow-500 py-2 rounded text-xs"
              >
                Signup
              </button>
            </div>
          ) : (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="w-full mt-2 bg-red-600 py-2 rounded text-xs"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
