import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h1 className="page-title">À propos de moi</h1>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-image-section">
            <div className="profile-image-placeholder">
              <span>Photo de profil</span>
            </div>
          </div>

          <div className="about-text">
            <h2 className="section-subtitle">Qui suis-je ?</h2>
            <p className="about-paragraph">
              [Votre texte de présentation ici - Décrivez votre parcours, vos passions,
              vos objectifs professionnels et ce qui vous motive dans le développement.]
            </p>

            <h2 className="section-subtitle">Mes compétences</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React / Vue.js</li>
                  <li>HTML5 / CSS3</li>
                  <li>JavaScript / TypeScript</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Bases de données</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Outils</h3>
                <ul>
                  <li>Git / GitHub</li>
                  <li>Docker</li>
                  <li>VS Code</li>
                </ul>
              </div>
            </div>

            <h2 className="section-subtitle">Mes intérêts</h2>
            <p className="about-paragraph">
              [Décrivez vos centres d'intérêt, vos hobbies, et comment ils influencent
              votre approche du développement.]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
