import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import './About.css';

function About() {
  const { t } = useLanguage();

  // Animation au scroll
  useScrollAnimationMultiple('.scroll-animate');

  return (
    <div className="about page-shell">
      <div className="about-container">
        <div className="about-header scroll-animate">
          <p className="page-eyebrow">{t.about.eyebrow}</p>
          <h1 className="page-title">{t.about.title}</h1>
          <p className="page-lead">{t.about.lead}</p>
        </div>

        <div className="about-content">
          <div className="about-image-section scroll-animate">
            <img src="/images/babbelimage.jpeg" alt={t.about.profileAlt} className="profile-image" />
            <div className="portrait-caption"><span>{t.about.basedIn}</span><strong>Toulouse, France</strong></div>
          </div>

          <div className="about-text">
            <h2 className="section-subtitle scroll-animate">{t.about.whoAmI}</h2>
            <p className="about-paragraph scroll-animate">
              {t.about.whoAmIText}
            </p>

            <h2 className="section-subtitle scroll-animate">{t.about.skills}</h2>
            <div className="skills-grid">
              <div className="skill-category scroll-animate scroll-delay-1">
                <h3>{t.about.skillCategories.languages}</h3>
                <ul>
                  <li>Python</li>
                  <li>Java</li>
                  <li>C</li>
                  <li>C++</li>
                  <li>SQL</li>
                  <li>Go</li>
                </ul>
              </div>
              <div className="skill-category scroll-animate scroll-delay-2">
                <h3>{t.about.skillCategories.frontend}</h3>
                <ul>
                  <li>React / Vue.js</li>
                  <li>HTML5 / CSS3</li>
                  <li>JavaScript / TypeScript</li>
                </ul>
              </div>
              <div className="skill-category scroll-animate scroll-delay-3">
                <h3>{t.about.skillCategories.backend}</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>API REST</li>
                </ul>
              </div>
              <div className="skill-category scroll-animate scroll-delay-4">
                <h3>{t.about.skillCategories.database}</h3>
                <ul>
                  <li>MariaDB</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="skill-category scroll-animate scroll-delay-5">
                <h3>{t.about.skillCategories.tools}</h3>
                <ul>
                  <li>Git / GitHub</li>
                  <li>Docker</li>
                  <li>VS Code</li>
                  <li>Eclipse</li>
                  <li>Power BI</li>
                  <li>Postman</li>
                </ul>
              </div>
            </div>

            <h2 className="section-subtitle scroll-animate">{t.about.interests}</h2>
            <p className="about-paragraph scroll-animate">
              {t.about.interestsText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
