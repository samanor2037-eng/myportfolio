import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-triangle fa-3x" style={{ color: '#991b1b', marginBottom: '1rem' }}></i>
        <h2>Failed to Load Portfolio</h2>
        <p style={{ margin: '0.5rem 0 1.5rem', color: '#4b5563' }}>{error}</p>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          <i className="fas fa-redo"></i> Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-container">
        <h2>No Portfolio Data Available</h2>
      </div>
    );
  }

  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <Navbar personalInfo={data.personalInfo} />
      <main>
        <Hero personalInfo={data.personalInfo} />
        <About about={data.about} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Contact contact={data.contact} location={data.personalInfo?.location} />
      </main>
      <Footer name={data.personalInfo?.name} tagline={data.personalInfo?.tagline} />
    </>
  );
}

export default App;
