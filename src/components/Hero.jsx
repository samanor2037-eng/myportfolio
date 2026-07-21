import React, { useState } from 'react';

export default function Hero({ personalInfo }) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'SA';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="home" style={{ paddingTop: '1rem' }}>
      <div className="container hero">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-code"></i> &nbsp; {personalInfo?.badge}
            </div>
            <h1>{personalInfo?.name}</h1>
            <div className="hero-tagline">{personalInfo?.tagline}</div>
            <p className="hero-desc">{personalInfo?.description}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary">
                <i className="fas fa-arrow-right"></i> Explore Work
              </a>
              <a href="#contact" className="btn-outline-light">Let's Connect</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-img-wrapper" id="imageWrapper">
              {imageError ? (
                <div className="placeholder-avatar">
                  <span>{getInitials(personalInfo?.name)}</span>
                </div>
              ) : (
                <img 
                  src={`/${personalInfo?.profileImage}`} 
                  alt={personalInfo?.name || "Salah Ali"} 
                  className="profile-img" 
                  id="profileImg" 
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
