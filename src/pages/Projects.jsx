import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CategoryCard from '../components/CategoryCard';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

function Projects() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Données d'exemple - à personnaliser
  const projectsData = {
    academic: [
      {
        title: "Projet Académique 1",
        description: "Description détaillée du projet académique réalisé pendant mes études. Ce projet visait à développer une application complète en utilisant les dernières technologies web.",
        technologies: ["React", "Node.js", "MongoDB"],
        images: [
          // Ajoutez vos chemins d'images ici
          // "/images/academic1-1.jpg",
          // "/images/academic1-2.jpg"
        ],
        link: ""
      },
      {
        title: "Projet Académique 2",
        description: "Deuxième projet académique axé sur le développement d'une application mobile avec une architecture moderne.",
        technologies: ["React Native", "Firebase", "Redux"],
        images: [],
        link: ""
      },
      {
        title: "Projet Académique 3",
        description: "Projet de groupe réalisé dans le cadre du cursus universitaire, impliquant la création d'un système de gestion.",
        technologies: ["Vue.js", "Express", "PostgreSQL"],
        images: [],
        link: ""
      }
    ],
    personal: [
      {
        title: "Projet Personnel 1",
        description: "Projet personnel développé pour apprendre et expérimenter avec de nouvelles technologies. Application web moderne avec interface utilisateur intuitive.",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        images: [],
        link: ""
      },
      {
        title: "Projet Personnel 2",
        description: "Application développée pour résoudre un problème personnel, utilisant des technologies modernes de développement web.",
        technologies: ["Next.js", "TypeScript", "Prisma"],
        images: [],
        link: ""
      }
    ],
    company: [
      {
        title: "Projet en Entreprise 1",
        description: "Mission réalisée en entreprise pendant mon stage. Développement d'une application web complète pour la gestion interne de l'entreprise.",
        technologies: ["Angular", "Java", "PostgreSQL"],
        images: [],
        link: ""
      },
      {
        title: "Projet en Entreprise 2",
        description: "Projet professionnel réalisé en collaboration avec l'équipe de développement. Mise en place d'une architecture microservices.",
        technologies: ["React", "Spring Boot", "Docker", "Kubernetes"],
        images: [],
        link: ""
      }
    ]
  };

  const handleVisualize = (category, projects) => {
    setSelectedCategory(category);
    setSelectedProjects(projects);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedProjects([]);
  };

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="page-title">{t.projects.title}</h1>
          <div className="title-underline"></div>
          <p className="projects-subtitle">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="categories-grid">
          {Object.keys(projectsData).map((category) => (
            <CategoryCard
              key={category}
              category={category}
              projects={projectsData[category]}
              onVisualize={handleVisualize}
            />
          ))}
        </div>
      </div>

      {selectedCategory && (
        <ProjectModal
          category={selectedCategory}
          projects={selectedProjects}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Projects;
