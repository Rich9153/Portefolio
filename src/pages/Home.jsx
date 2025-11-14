import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bienvenue sur mon <span className="highlight">Portfolio</span>
          </h1>
          <p className="hero-subtitle">
            Développeur passionné par la création de solutions innovantes
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              Voir mes projets
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Me contacter
            </Link>
          </div>
        </div>
        <div className="hero-animation">
          <div className="circle-animation"></div>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/about" className="quick-link-card">
          <h3>À propos</h3>
          <p>Découvrez qui je suis et mon parcours</p>
        </Link>
        <Link to="/education" className="quick-link-card">
          <h3>Parcours académique</h3>
          <p>Mon cursus et mes formations</p>
        </Link>
        <Link to="/projects" className="quick-link-card">
          <h3>Projets</h3>
          <p>Mes réalisations académiques et personnelles</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
