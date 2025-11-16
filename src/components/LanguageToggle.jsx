import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label="Change language"
    >
      <span className={`lang-option ${language === 'fr' ? 'active' : ''}`}>FR</span>
      <span className="separator">/</span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
    </button>
  );
}

export default LanguageToggle;
