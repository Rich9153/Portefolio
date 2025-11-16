import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './ProjectModal.css';

function ProjectModal({ category, projects, onClose }) {
  const { t } = useLanguage();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProject = projects[currentProjectIndex];

  const nextProject = () => {
    setDirection(1);
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentProject.images && currentProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }
  };

  const prevImage = () => {
    if (currentProject.images && currentProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
    }
  };

  // Variants pour l'animation de transition entre projets
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2 className="modal-category-title">
            {t.projects.types[category]}
          </h2>
          <p className="modal-project-count">
            Projet {currentProjectIndex + 1} / {projects.length}
          </p>
        </div>

        <div className="modal-body">
          {/* Navigation entre projets */}
          {projects.length > 1 && (
            <>
              <button className="project-nav prev" onClick={prevProject}>‹</button>
              <button className="project-nav next" onClick={nextProject}>›</button>
            </>
          )}

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProjectIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="project-detail"
            >
              <h3 className="project-detail-title">{currentProject.title}</h3>

              {/* Images du projet */}
              {currentProject.images && currentProject.images.length > 0 ? (
                <div className="project-detail-images">
                  <div className="image-display">
                    <img
                      src={currentProject.images[currentImageIndex]}
                      alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
                    />
                    {currentProject.images.length > 1 && (
                      <>
                        <button className="image-nav-btn prev" onClick={prevImage}>‹</button>
                        <button className="image-nav-btn next" onClick={nextImage}>›</button>
                        <div className="image-dots">
                          {currentProject.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                              onClick={() => setCurrentImageIndex(idx)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <span>{t.projects.noImage}</span>
                </div>
              )}

              {/* Description du projet */}
              <div className="project-detail-description">
                <h4>Description</h4>
                <p>{currentProject.description}</p>
              </div>

              {/* Technologies utilisées */}
              {currentProject.technologies && currentProject.technologies.length > 0 && (
                <div className="project-detail-technologies">
                  <h4>Technologies</h4>
                  <div className="tech-tags">
                    {currentProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lien du projet */}
              {currentProject.link && (
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-link"
                >
                  {t.projects.viewProject} →
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
