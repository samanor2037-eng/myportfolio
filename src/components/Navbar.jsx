import React, { useState } from 'react';

export default function Navbar({ personalInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const logoName = personalInfo?.name 
    ? personalInfo.name.split(' ').slice(0, 2).join(' ').toUpperCase() 
    : 'SALAH ALI';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="logo-wrapper">
              <img src="/logo.png" alt="Samanor Dev Logo" className="logo-img" />
              <span className="logo-text">Samanor Dev</span>
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
              <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            {/* Navigation Links */}
            <ul className={isOpen ? "nav-links open" : "nav-links"}>
              <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
              <li><a href="#about" onClick={handleLinkClick}>About</a></li>
              <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
              <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
              <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
              <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
            </ul>
          </nav>
        </div>
        {/* Mobile Menu Backdrop Blur Overlay (moved inside header for proper stacking context) */}
        <div className={isOpen ? "menu-overlay open" : "menu-overlay"} onClick={toggleMenu}></div>
      </header>
    </>
  );
}
