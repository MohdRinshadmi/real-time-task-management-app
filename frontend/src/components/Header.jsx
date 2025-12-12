import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="z-50 border-b border-gray-100 mx-10 bg-white" style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}>


      <nav className="relative max-w-7xl mx-auto flex items-center px-10 py-4" style={{ minHeight: 64 }}>
        {/* Left: Logo Section (absolute left) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-xl text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-4.435.75.75 0 00-.215-.995c-2.783-2.071-6.602-2.227-9.458-.456l.002.003.002.002a7.117 7.117 0 014.843 4.777z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              CollabNow
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 mx-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-[14px] font-semibold transition-colors duration-200"
              style={{ color: '#444' }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA Button (absolute right) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
          <button className="bg-black hover:bg-gray-800 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Register
          </button>
        </div>

        {/* Mobile Menu Button (Visible only on small screens) */}
        <button className="md:hidden text-gray-500 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>

      </nav>
    </header>
  );
};

export default Header;