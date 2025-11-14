import { useState } from 'react';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="project-card">
      <div className="project-image-container">
        {project.images && project.images.length > 0 ? (
          <>
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="project-image"
            />
            {project.images.length > 1 && (
              <>
                <button className="image-nav prev" onClick={prevImage}>
                  ‹
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  ›
                </button>
                <div className="image-indicators">
                  {project.images.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="project-image-placeholder">
            <span>Aucune image</span>
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span className={`project-type ${project.type}`}>
            {project.type === 'academic' ? 'Académique' :
             project.type === 'personal' ? 'Personnel' :
             'Entreprise'}
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        {project.technologies && (
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.date && (
          <p className="project-date">{project.date}</p>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Voir le projet →
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
