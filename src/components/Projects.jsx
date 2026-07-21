import React from 'react';

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Key Systems Built</h2>
        </div>
        <div className="projects-grid">
          {projects?.map((project, idx) => (
            <div key={idx} className="project-item">
              <div className="project-icon">
                <i className={project.icon}></i>
              </div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
