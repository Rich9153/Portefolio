import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
import './Projects.css';

function ProjectGallery({ project, labels }) {
  const [activeView, setActiveView] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const image = project.galleryImage;
  const viewCount = 4;

  if (!image) return null;

  const showPrevious = () => setActiveView((current) => (current - 1 + viewCount) % viewCount);
  const showNext = () => setActiveView((current) => (current + 1) % viewCount);

  return (
    <div className="project-gallery">
      <div className={`project-image-stage ${isLoaded ? 'is-loaded' : 'is-loading'}`}>
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={activeView}
            src={image}
            className={activeView === 0 ? 'gallery-overview-image' : 'gallery-panel-image'}
            style={activeView === 0 ? undefined : { '--panel-offset': `-${(activeView - 1) * 33.333}%` }}
            alt={`${project.title} - ${labels.image} ${activeView + 1}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="gallery-navigation">
          <button type="button" onClick={showPrevious} aria-label={labels.previousImage}>←</button>
          <span>{activeView + 1} / {viewCount}</span>
          <button type="button" onClick={showNext} aria-label={labels.nextImage}>→</button>
        </div>
      </div>
      <div className="project-thumbnails" role="group" aria-label={labels.gallery}>
        {[0, 1, 2, 3].map((view) => (
          <button
            type="button"
            key={view}
            className={view === activeView ? 'active' : ''}
            onClick={() => setActiveView(view)}
            aria-label={`${labels.showImage} ${view + 1}`}
            aria-pressed={view === activeView}
          >
            <span
              className={view === 0 ? 'thumbnail-overview' : 'thumbnail-panel'}
              style={{ backgroundImage: `url(${image})`, '--thumbnail-position': `${(view - 1) * 50}%` }}
            />
          </button>
        ))}
      </div>
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
                    className={`project-link-card ${project.galleryImage ? 'has-images' : ''} scroll-animate scroll-delay-${(index % 5) + 1}`}
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
