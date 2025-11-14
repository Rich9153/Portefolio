import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  // Données d'exemple - à personnaliser
  const projectsData = [
    {
      id: 1,
      title: "Projet Académique 1",
      type: "academic",
      description: "Description du projet académique réalisé pendant mes études. Ce projet visait à...",
      technologies: ["React", "Node.js", "MongoDB"],
      date: "2024",
      images: [
        // Ajoutez vos chemins d'images ici
        // "/images/project1-1.jpg",
        // "/images/project1-2.jpg"
      ],
      link: ""
    },
    {
      id: 2,
      title: "Projet Personnel",
      type: "personal",
      description: "Projet personnel développé pour apprendre et expérimenter avec de nouvelles technologies...",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      date: "2023",
      images: [],
      link: ""
    },
    {
      id: 3,
      title: "Projet en Entreprise",
      type: "company",
      description: "Mission réalisée en entreprise pendant mon stage/alternance. Développement d'une application...",
      technologies: ["Angular", "Java", "PostgreSQL"],
      date: "2023",
      images: [],
      link: ""
    }
  ];

  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(project => project.type === filter);

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="page-title">Mes Projets</h1>
          <div className="title-underline"></div>
          <p className="projects-subtitle">
            Découvrez mes réalisations académiques, personnelles et professionnelles
          </p>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button
            className={`filter-btn ${filter === 'academic' ? 'active' : ''}`}
            onClick={() => setFilter('academic')}
          >
            Académiques
          </button>
          <button
            className={`filter-btn ${filter === 'personal' ? 'active' : ''}`}
            onClick={() => setFilter('personal')}
          >
            Personnels
          </button>
          <button
            className={`filter-btn ${filter === 'company' ? 'active' : ''}`}
            onClick={() => setFilter('company')}
          >
            Entreprise
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="no-projects">
              <p>Aucun projet dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
