import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Expertise', id: 'expertise' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Team', id: 'team' },
    { name: 'Team Gallery', id: 'team-gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative bg-black/95 backdrop-blur-sm border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900/50 to-black opacity-50"></div>

      <div className="relative container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-white">TEAM</span>
              <span className="text-red-500 ml-1 sm:ml-2">TECHNO</span>
            </div>
            <div className="hidden xl:block ml-3 w-6 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
          </div>

          {/* Desktop Navigation - only show on xl screens (1280px+) */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-3 py-2 text-white/90 hover:text-white font-medium text-sm uppercase tracking-wider transition-all duration-300 group"
                >
                  {item.name}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                  <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 bg-red-500/10 transition-opacity duration-300"></div>
                  {isActive && (
                    <div className="absolute inset-0 rounded bg-red-500/5 pointer-events-none"></div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Menu Toggle Button (For all non-desktop screens) */}
          <button
            className="xl:hidden w-10 h-10 flex items-center justify-center text-white hover:text-red-500 transition-colors duration-300 rounded-full hover:bg-zinc-800/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile and Tablet Menu Dropdown */}
        <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 pt-3 pb-2' : 'max-h-0 opacity-0 pt-0 pb-0'
        }`}>
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-zinc-800/50 font-medium text-sm uppercase tracking-wider transition-all duration-300 rounded-lg group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className={`w-1 h-4 bg-red-500 mr-3 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-red-500/5 pointer-events-none"></div>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
    </nav>
  );
}