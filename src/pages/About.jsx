import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

function About() {
  const { t } = useLanguage();

  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1 className="page-title">{t.about.title}</h1>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-image-section">
            <img src="/images/babbelimage.jpeg" alt="Photo de profil" className="profile-image" />
          </div>

          <div className="about-text">
            <h2 className="section-subtitle">{t.about.whoAmI}</h2>
            <p className="about-paragraph">
              {t.about.whoAmIText}
            </p>

            <h2 className="section-subtitle">{t.about.skills}</h2>
            <div className="skills-grid">
              <div className="skill-category">
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
              <div className="skill-category">
                <h3>{t.about.skillCategories.frontend}</h3>
                <ul>
                  <li>React / Vue.js</li>
                  <li>HTML5 / CSS3</li>
                  <li>JavaScript / TypeScript</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>{t.about.skillCategories.backend}</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>API REST</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>{t.about.skillCategories.database}</h3>
                <ul>
                  <li>MariaDB</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>
              <div className="skill-category">
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

            <h2 className="section-subtitle">{t.about.interests}</h2>
            <p className="about-paragraph">
              {t.about.interestsText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
