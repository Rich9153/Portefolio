import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import './Projects.css';

function ProjectGallery({ project, labels }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = project.images || [];

  if (images.length === 0) return null;

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % images.length);
  };

  return (
    <div className="project-gallery">
      <div className="project-image-stage">
        <img
          src={images[activeImage]}
          alt={`${project.title} - ${labels.image} ${activeImage + 1}`}
          loading="lazy"
        />
        {images.length > 1 && (
          <div className="gallery-navigation">
            <button type="button" onClick={showPrevious} aria-label={labels.previousImage}>←</button>
            <span>{activeImage + 1} / {images.length}</span>
            <button type="button" onClick={showNext} aria-label={labels.nextImage}>→</button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="project-thumbnails" role="group" aria-label={labels.gallery}>
          {images.map((image, imageIndex) => (
            <button
              type="button"
              key={image}
              className={imageIndex === activeImage ? 'active' : ''}
              onClick={() => setActiveImage(imageIndex)}
              aria-label={`${labels.showImage} ${imageIndex + 1}`}
              aria-pressed={imageIndex === activeImage}
            >
              <img src={image} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
                  <article
                    key={project.title}
                    className={`project-link-card ${project.images?.length ? 'has-images' : ''} scroll-animate scroll-delay-${(index % 5) + 1}`}
                  >
                    <ProjectGallery project={project} labels={t.projects.gallery} />
                    <div className="project-card-top"><span className="project-number">0{index + 1}</span><span className="project-kind">{project.kind}</span></div>
                    <h3 className="project-link-title">{project.title}</h3>
                    <p className="project-link-description">{project.description}</p>
                    <div className="project-technologies">{project.technologies?.map((technology) => <span key={technology}>{technology}</span>)}</div>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link-arrow">
                        {t.projects.openProject} ↗
                      </a>
                    ) : (
                      <span className="project-link-arrow project-course-label">{project.label || t.projects.courseProject}</span>
                    )}
                  </article>
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
