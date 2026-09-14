import { Link } from 'react-router-dom';
// import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import CardMatrixBackground from '../components/CardMatrixBackground';
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
    <div className="home">
      <div className="hero-section">
        <div className="hero-content scroll-animate">
          <h1 className="hero-title">
            {t.home.title} <span className="highlight">{t.home.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle">
            {t.home.subtitle}
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              {t.home.viewProjects}
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              {t.home.contactMe}
            </Link>
          </div>
        </div>
        <div className="hero-animation">
          <div className="floating-bubble scroll-animate">
            <img src="/images/babbelimage.jpeg" alt={t.home.profileAlt} className="profile-image" />
          </div>

          {/* ============== ANCIEN CODE VIDÉO COMMENTÉ ==============
          <video
            ref={videoRef}
            src="/videos/profile-video.mp4"
            className="hero-video"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            loop
            muted
            playsInline
          />
          ============== FIN ANCIEN CODE VIDÉO COMMENTÉ ============== */}
        </div>
      </div>

      <div className="quick-links">
        <Link to="/about" className="quick-link-card scroll-animate scroll-delay-1">
          <CardMatrixBackground />
          <h3>{t.home.aboutCard.title}</h3>
          <p>{t.home.aboutCard.description}</p>
        </Link>
        <Link to="/education" className="quick-link-card scroll-animate scroll-delay-2">
          <CardMatrixBackground />
          <h3>{t.home.educationCard.title}</h3>
          <p>{t.home.educationCard.description}</p>
        </Link>
        <Link to="/projects" className="quick-link-card scroll-animate scroll-delay-3">
          <CardMatrixBackground />
          <h3>{t.home.projectsCard.title}</h3>
          <p>{t.home.projectsCard.description}</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
