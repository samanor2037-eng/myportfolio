import React from 'react';

export default function Navbar({ personalInfo }) {
  const logoName = personalInfo?.name ? personalInfo.name.split(' ').slice(0, 2).join(' ').toUpperCase() : 'SALAH ALI';

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">{logoName}</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
