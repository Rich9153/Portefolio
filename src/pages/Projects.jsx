import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import './Projects.css';

function Projects() {
  const { t } = useLanguage();
  useScrollAnimationMultiple('.scroll-animate');

  const projectLinks = t.projects.items;
  const categoryNames = t.projects.categories;

  return (
    <div className="projects page-shell">
      <div className="projects-container">
        <div className="projects-header scroll-animate">
          <p className="page-eyebrow">{t.projects.eyebrow}</p>
          <h1 className="page-title">{t.projects.title}</h1>
          <p className="projects-subtitle">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="projects-links-container">
          {Object.keys(projectLinks).map((category, catIndex) => (
            <div key={category} className={`project-category-section scroll-animate scroll-delay-${catIndex + 1}`}>
              <h2 className="category-title">{categoryNames[category]}</h2>
              <div className="project-links-grid">
                {projectLinks[category].map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-link-card scroll-animate scroll-delay-${index + 1}`}
                  >
                    <div className="project-card-top"><span className="project-number">0{index + 1}</span><span className="project-kind">{project.kind}</span></div>
                    <h3 className="project-link-title">{project.title}</h3>
                    <p className="project-link-description">{project.description}</p>
                    <div className="project-technologies">{project.technologies?.map((technology) => <span key={technology}>{technology}</span>)}</div>
                    <span className="project-link-arrow">{t.projects.openProject} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Projects;
