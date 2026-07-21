import React from 'react';

export default function Experience({ experience }) {
  const getCompanyEmoji = (company) => {
    const name = company.toLowerCase();
    if (name.includes('marwaaz')) return '💻';
    if (name.includes('nootaayo')) return '⚖️';
    if (name.includes('municipality') || name.includes('baidoa')) return '🏛️';
    if (name.includes('ngo') || name.includes('private')) return '🌍';
    return '💼';
  };

  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <h2>Professional Journey</h2>
        </div>
        <div className="exp-grid">
          {experience?.map((exp, idx) => (
            <div key={idx} className="exp-item">
              <div className="exp-title">
                {getCompanyEmoji(exp.company)} {exp.title}
              </div>
              <div className="exp-meta">
                {exp.company} &middot; {exp.period}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
