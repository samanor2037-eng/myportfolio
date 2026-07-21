import React from 'react';

export default function Skills({ skills }) {
  const getConceptualEmoji = (skill) => {
    const lower = skill.toLowerCase();
    if (lower.includes('problem')) return '💡';
    if (lower.includes('architecture') || lower.includes('system')) return '🏗️';
    if (lower.includes('collaboration') || lower.includes('agile') || lower.includes('team')) return '🤝';
    return '✨';
  };

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <h2>Tech Arsenal & Skills</h2>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="skills-cloud">
            {skills?.technical?.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            {skills?.conceptual?.map((skill, idx) => (
              <span 
                key={idx} 
                className="skill-pill" 
                style={{ background: '#e0ebf9', margin: '0.5rem' }}
              >
                {getConceptualEmoji(skill)} {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
