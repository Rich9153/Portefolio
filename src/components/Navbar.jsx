import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ['/', t.nav.home],
    ['/about', t.nav.about],
    ['/education', t.nav.education],
    ['/projects', t.nav.projects],
    ['/contact', t.nav.contact]
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">UB</span>
          <span className="logo-copy">Ulrich Babbel<small>Portfolio</small></span>
        </Link>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}>
          <span /><span />
        </button>
        <div className={`nav-right ${menuOpen ? 'is-open' : ''}`} id="main-navigation">
          <ul className="nav-menu">
            {navItems.map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink to={to} end={to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
