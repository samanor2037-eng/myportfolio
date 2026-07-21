import React from 'react';

export default function About({ about }) {
  const getEducationIcon = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('school')) return 'fas fa-school';
    if (lower.includes('university') || lower.includes('bsc')) return 'fas fa-university';
    if (lower.includes('institute') || lower.includes('computer')) return 'fas fa-laptop-code';
    if (lower.includes('english') || lower.includes('diploma') || lower.includes('online')) return 'fas fa-language';
    return 'fas fa-graduation-cap';
  };

  const getQualityEmoji = (quality) => {
    const lower = quality.toLowerCase();
    if (lower.includes('solution')) return '🧠';
    if (lower.includes('team') || lower.includes('player')) return '🤝';
    if (lower.includes('focus')) return '⏳';
    if (lower.includes('profession')) return '💼';
    return '⭐';
  };

  return (
    <>
      <section id="about">
        <div className="container">
          <div className="section-header">
            <h2>About Me</h2>
          </div>
          <div className="about-cards">
            {about?.education && (
              <div className="card-glass">
                <h3><i className="fas fa-graduation-cap"></i> {about.education.title}</h3>
                <p>{about.education.summary}</p>
                {about.education.items.map((item, idx) => (
                  <div key={idx} className="info-row">
                    <i className={getEducationIcon(item)}></i> {item}
                  </div>
                ))}
              </div>
            )}
            {about?.professional && (
              <div className="card-glass">
                <h3><i className="fas fa-medal"></i> {about.professional.title}</h3>
                <p>{about.professional.summary}</p>
                <div className="qualities-flex" style={{ justifyContent: 'flex-start', marginTop: '0.8rem' }}>
                  {about.professional.qualities.map((quality, idx) => (
                    <span key={idx} className="quality-badge">
                      {getQualityEmoji(quality)} {quality}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {about?.workEthic && (
        <section id="qualities" style={{ borderBottom: 'none', paddingTop: '0' }}>
          <div className="container">
            <div className="card-glass" style={{ background: '#f6fafe', textAlign: 'center' }}>
              <h3><i className="fas fa-heart" style={{ color: '#2c5f8a' }}></i> {about.workEthic.title}</h3>
              <p style={{ maxWidth: '700px', margin: '0 auto' }}>{about.workEthic.summary}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
