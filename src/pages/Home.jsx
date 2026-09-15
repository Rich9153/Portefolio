import { Link } from 'react-router-dom';
// import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import './Home.css';

function Home() {
  const { t } = useLanguage();

  // Animation au scroll pour les cartes
  useScrollAnimationMultiple('.scroll-animate');

  /* ============== ANCIEN CODE VIDÉO COMMENTÉ ==============
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  ============== FIN ANCIEN CODE VIDÉO COMMENTÉ ============== */

  return (
    <div className="home page-shell">
      <section className="hero-section">
        <div className="hero-content scroll-animate">
          <p className="hero-eyebrow">{t.home.eyebrow}</p>
          <div className="availability-pill">
            <span className="availability-dot" aria-hidden="true" />
            {t.home.availability}
          </div>
          <h1 className="hero-title">
            {t.home.title}<br /><span className="highlight">{t.home.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
          <p className="hero-intro">{t.home.intro}</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              {t.home.viewProjects} <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              {t.home.contactMe}
            </Link>
            <a
              href="/CV-Ulrich-Babbel-Mbonihankuye.pdf"
              className="btn btn-cv"
              download
            >
              {t.home.downloadCV} <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-stack" aria-label={t.home.stackLabel}>
            <span className="stack-label">{t.home.stackLabel}</span>
            <div className="stack-list">
              {t.home.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </div>
        <aside className="hero-profile scroll-animate scroll-delay-1">
          <div className="portrait-frame">
            <img src="/images/portrait-ulrich.png" alt={t.home.profileAlt} className="profile-image" />
          </div>
          <div className="profile-signal signal-one"><span>{t.home.currentLabel}</span><strong>{t.home.currentValue}</strong></div>
          <div className="profile-signal signal-two"><span>{t.home.focusLabel}</span><strong>{t.home.focusValue}</strong></div>
        </aside>
      </section>

      <section className="quick-links" aria-label="Portfolio">
        <Link to="/about" className="quick-link-card scroll-animate scroll-delay-1">
          <span className="card-index">01</span>
          <h3>{t.home.aboutCard.title}</h3>
          <p>{t.home.aboutCard.description}</p>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link to="/education" className="quick-link-card scroll-animate scroll-delay-2">
          <span className="card-index">02</span>
          <h3>{t.home.educationCard.title}</h3>
          <p>{t.home.educationCard.description}</p>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link to="/projects" className="quick-link-card scroll-animate scroll-delay-3">
          <span className="card-index">03</span>
          <h3>{t.home.projectsCard.title}</h3>
          <p>{t.home.projectsCard.description}</p>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}

export default Home;
