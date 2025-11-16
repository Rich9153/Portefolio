import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
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
          <img src="/images/babbelimage.jpeg" alt="Babbel" className="hero-image" />
        </div>
      </div>

      <div className="quick-links">
        <Link to="/about" className="quick-link-card">
          <h3>{t.home.aboutCard.title}</h3>
          <p>{t.home.aboutCard.description}</p>
        </Link>
        <Link to="/education" className="quick-link-card">
          <h3>{t.home.educationCard.title}</h3>
          <p>{t.home.educationCard.description}</p>
        </Link>
        <Link to="/projects" className="quick-link-card">
          <h3>{t.home.projectsCard.title}</h3>
          <p>{t.home.projectsCard.description}</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
