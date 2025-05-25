"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="py-3 px-6 bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/team-techno-logo.jpg" alt="Team Techno Logo" width={180} height={40} className="h-10 w-auto" />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="text-white hover:text-red-500 transition-colors">About</a>
          <a href="#expertise" className="text-white hover:text-red-500 transition-colors">Expertise</a>
          <a href="#achievements" className="text-white hover:text-red-500 transition-colors">Achievements</a>
          <a href="#team" className="text-white hover:text-red-500 transition-colors">Team</a>
          <a href="#contact" className="text-white hover:text-red-500 transition-colors">Contact</a>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-zinc-900 p-4 md:hidden flex flex-col space-y-4 border-b border-zinc-800">
            <a 
              href="#about" 
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#expertise" 
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Expertise
            </a>
            <a 
              href="#achievements" 
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Achievements
            </a>
            <a 
              href="#team" 
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}