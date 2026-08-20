import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import brickonLogo from "../assets/brickon-logo.png";

export const Footer = ({ onOpenProjectModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Updated to use paths for React Router
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/projects', label: 'Projects' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer id="main-footer" className="bg-white text-[#1A1A1A] border-t border-gray-200 relative mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-gray-200">
          
          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-35 h-10 flex items-center justify-center">
                  <img
                    src={brickonLogo}
                    alt="BRICKON CONSTRUCTION"
                    className="h-95 w-323 object-contain"
                  />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-light max-w-sm leading-relaxed">
              Building quality spaces with craftsmanship, care and confidence since 2018. Specializing in luxury residential estates, commercial landmarks, and turnkey civil engineering.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9F8F6] border border-gray-200 text-gray-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C35A3E]" />
                <span>ISO 9001:2015 Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9F8F6] border border-gray-200 text-gray-700">
                <span>10-Yr Structural Warranty</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Updated for React Router) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A]">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={scrollToTop} 
                    className="hover:text-[#C35A3E] transition-colors cursor-pointer text-left font-medium text-xs uppercase tracking-wider block w-fit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A]">Direct Contact</h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C35A3E] shrink-0 mt-0.5" />
                <span>{companyInfo.contact.address}, {companyInfo.contact.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C35A3E] shrink-0" />
                <span>{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C35A3E] shrink-0" />
                <span>{companyInfo.contact.email}</span>
              </div>
            </div>
            <div className="pt-2">
              <button 
                onClick={onOpenProjectModal} 
                className="w-full py-3 bg-[#C35A3E] hover:bg-[#b04f35] text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
              >
                Start Your Project
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>© {new Date().getFullYear()} BRICKON CONSTRUCTION   All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Privacy & Terms</span>
            <span>|</span>
            <span className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Structural Safety Code</span>
            <span>|</span>
            <button onClick={scrollToTop} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#1A1A1A] transition-colors ml-2 cursor-pointer font-semibold uppercase tracking-wider text-[10px]" title="Back to top">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C35A3E]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};