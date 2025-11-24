import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed responsive grid alignment: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">

          {/* Brand */}
          <div className="col-span-1 flex flex-col items-start">
            <Link to="/" className="block mb-6 hover:opacity-90 transition-opacity">
                 <img src="https://www.eparivartan.com/images/logo.svg" alt="eParivartan" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-base leading-relaxed mb-6 text-slate-600 font-light text-left">
              Vision-Perfect Concepts. Pixel-Perfect Designs. We build digital experiences that matter.
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Parivartan Software & Multimedia Pvt. Ltd.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="lg:pl-8">
            <h3 className="text-slate-900 font-bold text-lg mb-6 font-heading">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/story" className="text-slate-600 hover:text-brand-500 transition-colors">Our Story</Link></li>
              <li><Link to="/why-join" className="text-slate-600 hover:text-brand-500 transition-colors">Why Join</Link></li>
              <li><Link to="/culture" className="text-slate-600 hover:text-brand-500 transition-colors">Our Culture</Link></li>
              <li><Link to="/positions" className="text-slate-600 hover:text-brand-500 transition-colors">Open Positions</Link></li>
            </ul>
          </div>

           {/* Quick Links 2 */}
           <div>
            <h3 className="text-slate-900 font-bold text-lg mb-6 font-heading">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-brand-500 transition-colors">Equal Opportunity</a></li>
              <li><a href="#" className="text-slate-600 hover:text-brand-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-brand-500 transition-colors">Accessibility</a></li>
              <li><a href="#" className="text-slate-600 hover:text-brand-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
             <h3 className="text-slate-900 font-bold text-lg mb-6 font-heading">Connect</h3>
             <div className="flex space-x-4">
                <a href="#" className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all duration-300 group" aria-label="LinkedIn">
                    <Linkedin size={20} className="text-[#0A66C2] group-hover:scale-110 transition-transform"/>
                </a>
                <a href="#" className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all duration-300 group" aria-label="Facebook">
                    <Facebook size={20} className="text-[#1877F2] group-hover:scale-110 transition-transform"/>
                </a>
                <a href="#" className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all duration-300 group" aria-label="Instagram">
                    {/* Brand color #E1306C */}
                    <Instagram size={20} className="text-[#E1306C] group-hover:scale-110 transition-transform"/>
                </a>
                <a href="#" className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all duration-300 group" aria-label="YouTube">
                    <Youtube size={20} className="text-[#FF0000] group-hover:scale-110 transition-transform"/>
                </a>
             </div>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
            <p className="text-center md:text-left">© 2025 Parivartan Software & Multimedia Pvt. Ltd. All rights reserved.</p>
            <p className="text-center md:text-right">Concept & Design By eParivartan </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;