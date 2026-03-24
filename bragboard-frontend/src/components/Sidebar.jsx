import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ user: initialUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(initialUser);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(initialUser);
    }
  }, [initialUser, location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;
  const isAdmin = user.is_admin === true || user.role === 'admin';

  return (
    <>
      {/* 📱 Mobile Top Bar - only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          BragBoard 🚀
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 📱 Mobile Overlay - only shows on mobile when open */}
      <div
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          md:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col z-50 border-r border-gray-800
        transition-transform duration-300 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 text-2xl font-black border-b border-gray-800 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          BragBoard 🚀
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-indigo-600/10 text-indigo-400 font-bold'
                : 'hover:bg-gray-800 text-gray-400'
            }`}
          >
            <span className="text-xl">🏠</span> Home Feed
          </Link>

          {isAdmin && (
            <div className="pt-6">
              <p className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
                Admin Control
              </p>
              <Link
                to="/admin"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive('/admin')
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">📊</span> Admin Dashboard
              </Link>
            </div>
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="mb-4 px-3 py-3 bg-gray-800/30 rounded-2xl border border-gray-700/30">
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter mb-1">
              {isAdmin ? 'SYSTEM ADMIN' : 'EMPLOYEE'}
            </p>
            <p className="font-bold text-sm truncate text-gray-200">{user.name}</p>
            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white p-3 rounded-xl font-bold transition-all duration-300 group"
          >
            <span className="group-hover:translate-x-1 transition-transform">Logout</span> 🚪
          </button>
        </div>
      </div>

      {/* 📱 Spacer for mobile top bar */}
      <div className="md:hidden h-14" />
    </>
  );
};

export default Sidebar;