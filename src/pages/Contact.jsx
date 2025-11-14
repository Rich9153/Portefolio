import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pourrez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
    alert('Message envoyé ! (fonctionnalité à implémenter)');
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="page-title">Contactez-moi</h1>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            N'hésitez pas à me contacter pour toute opportunité ou question
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>votre.email@example.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Téléphone</h3>
              <p>+33 X XX XX XX XX</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Localisation</h3>
              <p>Ville, Pays</p>
            </div>

            <div className="social-links">
              <h3>Réseaux sociaux</h3>
              <div className="social-icons">
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span>
                </a>
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
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
                required
                placeholder="votre.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Sujet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
