import { useLanguage } from '../contexts/LanguageContext';
import './CategoryCard.css';

function CategoryCard({ category, projects, onVisualize }) {
  const { t } = useLanguage();

  return (
    <div className="category-card">
      <div className="category-header">
        <h2 className="category-title">{t.projects.types[category]}</h2>
        <span className={`category-badge ${category}`}>
          {projects.length} {projects.length > 1 ? 'projets' : 'projet'}
        </span>
      </div>

      <div className="category-content">
        <h3 className="projects-list-title">Liste des projets :</h3>
        <ul className="projects-list">
          {projects.map((project, index) => (
            <li key={index} className="project-item">
              <span className="project-bullet">▸</span>
              <span className="project-name">{project.title}</span>
            </li>
          ))}
        </ul>

        <button className="visualize-btn" onClick={() => onVisualize(category, projects)}>
          <span className="btn-icon">👁</span>
          Visualiser les projets
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
