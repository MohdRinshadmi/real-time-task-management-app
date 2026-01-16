import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon, LogoIcon, MenuIcon } from '../../assets/svgIcon/headerIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="border-b border-gray-100 w-[90%] max-w-[1200px] mx-auto bg-white mt-3.5 rounded-[60px]">
      <nav className="relative mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 min-h-[64px]">
        {/* Left: Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-xl text-white">
              <LogoIcon />
            </div>
            <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
              CollabNow
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[14px] font-semibold transition-colors duration-200 hover:text-blue-600 text-[#444]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link to="/register" className="hidden sm:block bg-black hover:bg-gray-800 text-white text-sm font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Register
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-[14px] font-semibold py-2 transition-colors duration-200 hover:text-blue-600 text-[#444]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/register"
              className="sm:hidden block w-full text-center bg-black hover:bg-gray-800 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;