import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import brickonLogo from "../assets/brickon-logo.png";

export const Navbar = ({ onOpenProjectModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Gets the current URL path so we can highlight the active link
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/projects', label: 'Projects' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header id="main-navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3.5 shadow-sm' : 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="group text-left flex items-center space-x-2.5 focus:outline-none cursor-pointer">
<div className="flex items-center">
  <img
    src={brickonLogo}
    alt="BRICKON CONSTRUCTION"
    className="h-15 w- 5 object-contain"
  />
</div>

            </Link>
            
            <nav className="hidden md:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
              {navLinks.map((link) => {
                const isActive = activePath === link.path;
                return (
                  <Link key={link.path} to={link.path} className={`relative uppercase tracking-widest text-[11px] font-semibold transition-colors duration-200 py-1 cursor-pointer ${isActive ? 'text-[#C35A3E]' : 'text-gray-500 hover:text-[#1A1A1A]'}`}>
                    {link.label}
                    {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C35A3E]" />}
                  </Link>
                );
              })}
            </nav>
            
            <div className="flex items-center gap-3">
              <button onClick={onOpenProjectModal} className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C35A3E] transition-colors cursor-pointer">
                <span>Start Your Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-[#1A1A1A] bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-gray-200 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center">
  <img
    src={brickonLogo}
    alt="BRICKON CONSTRUCTION"
    className="h-10 w-auto object-contain"
  />
</div>
            
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activePath === link.path;
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-between ${isActive ? 'bg-[#C35A3E]/10 text-[#C35A3E] font-bold border-l-2 border-[#C35A3E]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#1A1A1A]'}`}>
                      <span>{link.label}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#C35A3E]' : 'text-gray-400'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <button onClick={() => { setMobileMenuOpen(false); onOpenProjectModal(); }} className="w-full py-3 bg-[#1A1A1A] hover:bg-[#C35A3E] text-white text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors">
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="bg-[#F9F8F6] p-3 text-xs text-gray-500 space-y-1.5 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#C35A3E]" />
                  <span>+91 98401 23456</span>
                </div>
                <div className="text-[11px] text-gray-400">Est. 2018 | Craftsmanship | Care | Confidence</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};