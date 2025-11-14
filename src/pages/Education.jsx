import './Education.css';

function Education() {
  // Exemple de données - à personnaliser
  const educationData = [
    {
      id: 1,
      degree: "Master en Informatique",
      school: "Université / École",
      location: "Ville, Pays",
      period: "2022 - 2024",
      description: "Spécialisation en développement logiciel et intelligence artificielle.",
      achievements: [
        "Mention Très Bien",
        "Projet de fin d'études sur...",
        "Stage en entreprise"
      ]
    },
    {
      id: 2,
      degree: "Licence en Informatique",
      school: "Université / École",
      location: "Ville, Pays",
      period: "2019 - 2022",
      description: "Formation générale en informatique et programmation.",
      achievements: [
        "Major de promotion",
        "Participation à des hackathons",
        "Projet tuteuré"
      ]
    },
    {
      id: 3,
      degree: "Baccalauréat Scientifique",
      school: "Lycée",
      location: "Ville, Pays",
      period: "2018 - 2019",
      description: "Spécialité Mathématiques et Sciences de l'Ingénieur.",
      achievements: [
        "Mention Bien",
        "Option Informatique et Sciences du Numérique"
      ]
    }
  ];

  return (
    <div className="education">
      <div className="education-container">
        <div className="education-header">
          <h1 className="page-title">Parcours Académique</h1>
          <div className="title-underline"></div>
        </div>

        <div className="timeline">
          {educationData.map((item, index) => (
            <div key={item.id} className="timeline-item" data-index={index}>
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                {index !== educationData.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
              <div className="timeline-content">
                <span className="timeline-period">{item.period}</span>
                <h2 className="degree-title">{item.degree}</h2>
                <h3 className="school-name">{item.school}</h3>
                <p className="school-location">{item.location}</p>
                <p className="degree-description">{item.description}</p>
                {item.achievements && item.achievements.length > 0 && (
                  <div className="achievements">
                    <h4>Points forts :</h4>
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

        <div className="certifications-section">
          <h2 className="section-title">Certifications & Formations</h2>
          <div className="certifications-grid">
            <div className="certification-card">
              <h3>Certification 1</h3>
              <p>Organisme - Année</p>
            </div>
            <div className="certification-card">
              <h3>Certification 2</h3>
              <p>Organisme - Année</p>
            </div>
            <div className="certification-card">
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
