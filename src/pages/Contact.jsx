import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Configuration EmailJS
      const serviceId = 'service_dixcc8f';
      const templateId = 'template_9ba67fy';
      const publicKey = 'yrUR__solN4WA2nY7';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'ulrichbab09@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      const successMessage = language === 'fr'
        ? 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
        : 'Message sent successfully! I will respond to you as soon as possible.';

      alert(successMessage);

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      const errorMessage = language === 'fr'
        ? 'Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement par email.'
        : 'Error sending message. Please try again or contact me directly by email.';

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="page-title">{t.contact.title}</h1>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>{t.contact.info.email}</h3>
              <p>ulrichbab09@gmail.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>{t.contact.info.phone}</h3>
              <p>+33 6 35 67 02 68</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>{t.contact.info.location}</h3>
              <p>275 Route De Seysses, Toulouse 31100</p>
            </div>

            <div className="social-links">
              <h3>{t.contact.info.socials}</h3>
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
              <label htmlFor="name">{t.contact.form.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.contact.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t.contact.form.subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t.contact.form.subjectPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.contact.form.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder={t.contact.form.messagePlaceholder}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (language === 'fr' ? 'Envoi en cours...' : 'Sending...') : t.contact.form.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
