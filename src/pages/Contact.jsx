import { useState } from 'react';
// import emailjs from '@emailjs/browser'; // Ancien système commenté
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import CardMatrixBackground from '../components/CardMatrixBackground';
import './Contact.css';

// URL de l'API Vercel Serverless
const API_URL = '/api/contact';

function Contact() {
  const { t, language } = useLanguage();

  // Animation au scroll
  useScrollAnimationMultiple('.scroll-animate');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: language
        }),
      });

      const data = await response.json().catch(() => ({ success: false }));

      if (response.ok && data.success) {
        showNotification('success', data.message || t.contact.form.success);

        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: ''
        });
      } else {
        showNotification('error', data.message || t.contact.form.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      showNotification('error', t.contact.form.error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ============== ANCIEN CODE EMAILJS COMMENTÉ ==============
  const handleSubmitOld = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Configuration EmailJS
      const serviceId = 'service_dixcc8f';
      const templateId = 'template_9ba67fy';
      const publicKey = 'YWBBY0I0goBlgaZt8';

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
  ============== FIN ANCIEN CODE EMAILJS COMMENTÉ ============== */

  return (
    <div className="contact">
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? '✓' : '✕'}
          </span>
          <span className="notification-message">{notification.message}</span>
          <button
            className="notification-close"
            onClick={() => setNotification({ show: false, type: '', message: '' })}
            aria-label={t.contact.form.closeNotification}
          >
            ×
          </button>
        </div>
      )}

      <div className="contact-container">
        <div className="contact-header scroll-animate">
          <h1 className="page-title">{t.contact.title}</h1>
          <div className="title-underline"></div>
          <p className="contact-subtitle">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card scroll-animate scroll-delay-1">
              <CardMatrixBackground />
              <div className="info-icon">📧</div>
              <h3>{t.contact.info.email}</h3>
              <p>
                <a href="mailto:ulrichbab09@gmail.com" className="email-link">
                  ulrichbab09@gmail.com
                </a>
              </p>
            </div>

            <div className="info-card scroll-animate scroll-delay-2">
              <CardMatrixBackground />
              <div className="info-icon">📱</div>
              <h3>{t.contact.info.phone}</h3>
              <p>+33 6 35 67 02 68</p>
            </div>

            <div className="info-card scroll-animate scroll-delay-3">
              <CardMatrixBackground />
              <div className="info-icon">📍</div>
              <h3>{t.contact.info.location}</h3>
              <p>Toulouse, France</p>
            </div>

            <div className="social-links scroll-animate scroll-delay-4">
              <CardMatrixBackground />
              <h3>{t.contact.info.socials}</h3>
              <div className="social-icons">
                <a href="https://github.com/Rich9153" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/ulrich-babbel-mbonihankuye-798a752b1/" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form scroll-animate scroll-delay-2" onSubmit={handleSubmit}>
            <CardMatrixBackground />
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="website">{t.contact.form.website}</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
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
              {isLoading ? t.contact.form.sending : t.contact.form.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
