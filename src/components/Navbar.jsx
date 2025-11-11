import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const Avatar = () => {
    if (user?.photoURL)
      return <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="avatar" />;

    const initials = (user?.displayName || user?.email || '')
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
        {initials}
      </div>
    );
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'All Properties', to: '/all-properties' },
    { name: 'Add Property', to: '/add-property' },
    { name: 'My Properties', to: '/my-properties' },
    { name: 'My Ratings', to: '/my-ratings' },
  ];

  return (
    <nav className="bg-black shadow-md py-2 px-8 lg:px-10">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="text-3xl text-green-600 font-bold btn btn-ghost normal-case"
          >
            🏡HomeNest
          </button>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-green-600 text-black'
                    : 'text-white hover:bg-green-600 hover:text-black transition-colors duration-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-2">
          {!user ? (
            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 text-white font-semibold text-lg bg-green-500 rounded-lg hover:bg-black transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-5 py-2 text-white font-semibold text-lg bg-green-500 rounded-lg hover:bg-black transition-colors duration-300"
              >
                Signup
              </button>
            </div>
          ) : (
            <>
              {/* LG and above: avatar + logout inline */}
              <div className="hidden lg:flex items-center gap-2">
                <Avatar />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white font-semibold bg-green-500 rounded-lg text-lg hover:bg-red-500 transition-colors duration-300"
                >
                  Log out
                </button>
              </div>

              {/* MD only: avatar + dropdown */}
              <div className="hidden md:flex lg:hidden relative" ref={ddRef}>
                <button
                  onClick={() => setDdOpen(!ddOpen)}
                  className="btn btn-ghost btn-circle avatar p-0"
                >
                  <Avatar />
                </button>
                {ddOpen && (
                  <ul className="absolute right-0 mt-2 w-52 bg-black shadow-lg rounded-md py-2 z-50">
                    <li className="px-4 py-1 font-medium text-white">{user.displayName || 'No Name'}</li>
                    <li className="px-4 py-1 text-xs text-gray-400 break-words">{user.email}</li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-red-500 transition-colors duration-300"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="btn btn-ghost p-2 text-white">
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 border-t border-gray-700 bg-black">
          <ul className="flex flex-col p-2 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-500 hover:text-black transition-colors duration-300"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {!user ? (
              <div className="flex gap-2 px-2 pt-2">
                <button
                  onClick={() => { navigate('/login'); setMobileOpen(false); }}
                  className="flex-1 px-4 py-2 text-white font-semibold text-xl bg-green-500 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setMobileOpen(false); }}
                  className="flex-1 px-4 py-2 text-white font-semibold text-xl bg-green-500 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="px-2 pt-2">
                <div className="flex items-center gap-2">
                  <Avatar />
                  <div>
                    <div className="text-sm font-medium text-white">{user.displayName || 'No name'}</div>
                    <div className="text-xs text-gray-400 break-words">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="mt-2 w-full bg-green-500 text-lg text-white py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                >
                  Log out
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
