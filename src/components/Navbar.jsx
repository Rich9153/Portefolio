import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Portfolio
        </Link>
        <div className="nav-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {t.nav.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                {t.nav.about}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/education" className="nav-link">
                {t.nav.education}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">
                {t.nav.projects}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
