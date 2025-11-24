import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navClasses = ({ isActive }) =>
    `font-medium text-base transition-colors whitespace-nowrap hover:text-brand-500 ${
      isActive ? 'text-brand-500 font-semibold' : 'text-slate-600'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <NavLink to="/" className="flex items-center gap-2">
               <img src="https://www.eparivartan.com/images/logo.svg" alt="eParivartan" className="h-10 w-auto object-contain" />
            </NavLink>
          </div>

          {/* Desktop Menu - Visible only on Large screens (lg:flex) */}
          <div className="hidden lg:flex space-x-8 items-center font-heading">
            <NavLink to="/" className={navClasses}>Home</NavLink>
            <NavLink to="/why-join" className={navClasses}>Why Join</NavLink>
            <NavLink to="/culture" className={navClasses}>Culture</NavLink>
            <NavLink to="/process" className={navClasses}>Process</NavLink>
            <NavLink to="/positions" className={navClasses}>Open Positions</NavLink>
            
            <NavLink 
              to="/positions" 
              className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-md font-bold transition-all shadow-md hover:shadow-brand-500/30 hover:-translate-y-0.5 text-sm tracking-wide whitespace-nowrap"
            >
              APPLY NOW
            </NavLink>
          </div>

          {/* Mobile/Tablet Button - Visible up to Large screens (lg:hidden) */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-brand-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-fade-in-up font-heading">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
            <NavLink to="/" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-500 hover:bg-brand-50">Home</NavLink>
            <NavLink to="/why-join" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-500 hover:bg-brand-50">Why Join</NavLink>
            <NavLink to="/culture" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-500 hover:bg-brand-50">Culture</NavLink>
            <NavLink to="/process" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-500 hover:bg-brand-50">Process</NavLink>
            <NavLink to="/positions" className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-brand-500 hover:bg-brand-50">Open Positions</NavLink>
            <NavLink to="/positions" className="block w-full text-center mt-6 bg-brand-500 hover:bg-brand-600 text-white px-5 py-4 rounded-md font-bold shadow-lg">APPLY NOW</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;