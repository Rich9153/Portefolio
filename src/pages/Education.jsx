import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import CardMatrixBackground from '../components/CardMatrixBackground';
import './Education.css';

function Education() {
  const { t } = useLanguage();

  // Animation au scroll
  useScrollAnimationMultiple('.scroll-animate');

  const educationData = t.education.items;

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

      </div>
    </div>
  );
}

export default Education;
