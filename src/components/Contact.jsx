import React, { useState } from 'react';

export default function Contact({ contact, location }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [alertMsg, setAlertMsg] = useState('');
  const [showForm, setShowForm] = useState(false); // Collapsed by default to prevent stacking clutter

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setAlertMsg('Please fill in all fields.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setAlertMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setAlertMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
      setAlertMsg('Server connection failed. Please check if the backend is running.');
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-modern">
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Collaborate With Me</h3>
          <p style={{ marginTop: '0.5rem' }}>Looking for a reliable system developer or IT consultant? Let’s build something impactful.</p>
          
          <div className="contact-links">
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="contact-link">
                <i className="fas fa-envelope"></i> 
                <span className="link-full-text">{contact.email}</span>
                <span className="link-short-text">Email</span>
              </a>
            )}
            {contact?.phone && (
              <a href={contact.whatsappUrl} className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-phone-alt"></i> 
                <span className="link-full-text">{contact.phone}</span>
                <span className="link-short-text">WhatsApp</span>
              </a>
            )}
            {contact?.facebookUrl && (
              <a href={contact.facebookUrl} className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i> 
                <span className="link-full-text">Salah Ali Samanor</span>
                <span className="link-short-text">Facebook</span>
              </a>
            )}
            {contact?.linkedinUrl && (
              <a href={contact.linkedinUrl} className="contact-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> 
                <span className="link-full-text">Salah Ali Samanor</span>
                <span className="link-short-text">LinkedIn</span>
              </a>
            )}
          </div>
          
          <button 
            onClick={toggleForm} 
            className={showForm ? "btn-primary active-toggle" : "btn-primary"} 
            style={{ marginTop: '0.5rem' }}
          >
            <i className={showForm ? "fas fa-times" : "fas fa-paper-plane"}></i> {showForm ? "Close Message Form" : "Send Direct Message"}
          </button>

          {/* Dynamic Collapsible Message Form */}
          {showForm && (
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              <h4>Send a Message</h4>

              {status === 'success' && (
                <div className="form-alert success">
                  <i className="fas fa-check-circle"></i> {alertMsg}
                </div>
              )}

              {status === 'error' && (
                <div className="form-alert error">
                  <i className="fas fa-exclamation-circle"></i> {alertMsg}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={status === 'submitting'}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={status === 'submitting'}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message here..."
                  disabled={status === 'submitting'}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', borderRadius: '12px' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          )}

          <p style={{ fontSize: '0.75rem', marginTop: '2.5rem', color: '#6b8cae' }}>
            📍 {location}
          </p>
        </div>
      </div>
    </section>
  );
}
