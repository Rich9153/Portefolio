import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import CardMatrixBackground from '../components/CardMatrixBackground';
import './Education.css';

function Education() {
  const { t } = useLanguage();

  // Animation au scroll
  useScrollAnimationMultiple('.scroll-animate');

  const educationData = [
    {
      id: 1,
      degree: "Master ICE-LD (Ingénierie Continue des Ecosystèmes Logiciels et Données)",
      school: "Université Toulouse Jean Jaurès",
      location: "Toulouse, France",
      period: "2025 - Présent",
      description: "Master en cours axé sur l'ingénierie logicielle et la gestion des données.",
      achievements: [
        "En cours"
      ]
    },
    {
      id: 2,
      degree: "Licence MIASH (Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales)",
      school: "Université Toulouse Jean Jaurès",
      location: "Toulouse, France",
      period: "2022 - 2025",
      description: "Spécialisation en développement logiciel.",
      achievements: [
        "Projet de fin d'études sur l'ATS (Applicant Tracking System)",
        "Stage chez Solio Group"
      ]
    },
    {
      id: 3,
      degree: "Licence en Informatique de Gestion",
      school: "Université Lumière de Bujumbura",
      location: "Bujumbura, Burundi",
      period: "2020 - 2022",
      description: "Formation générale en informatique et gestion.",
      achievements: [
        "Projet tuteuré"
      ]
    },
    {
      id: 4,
      degree: "Baccalauréat Scientifique",
      school: "Lycée du Lac Tanganyika",
      location: "Bujumbura, Burundi",
      period: "2018 - 2019",
      description: "Section Scientifique Biologie Chimie et Science de la Terre.",
      achievements: [
        "Mention Bien"
      ]
    }
  ];

  return (
    <div className="education">
      <div className="education-container">
        <div className="education-header scroll-animate">
          <h1 className="page-title">{t.education.title}</h1>
          <div className="title-underline"></div>
        </div>

        <div className="timeline">
          {educationData.map((item, index) => (
            <div key={item.id} className={`timeline-item scroll-animate scroll-delay-${index + 1}`} data-index={index}>
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index !== educationData.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
              <div className="timeline-content">
                <CardMatrixBackground />
                <span className="timeline-period">{item.period}</span>
                <h2 className="degree-title">{item.degree}</h2>
                <h3 className="school-name">{item.school}</h3>
                <p className="school-location">{item.location}</p>
                <p className="degree-description">{item.description}</p>
                {item.achievements && item.achievements.length > 0 && (
                  <div className="achievements">
                    <h4>{t.education.achievements}</h4>
                    <ul>
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-section scroll-animate">
          <h2 className="section-title">{t.education.certifications}</h2>
          <div className="certifications-grid">
            <div className="certification-card scroll-animate scroll-delay-1">
              <h3>Certification 1</h3>
              <p>Organisme - Année</p>
            </div>
            <div className="certification-card scroll-animate scroll-delay-2">
              <h3>Certification 2</h3>
              <p>Organisme - Année</p>
            </div>
            <div className="certification-card scroll-animate scroll-delay-3">
              <h3>Formation en ligne</h3>
              <p>Plateforme - Année</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
