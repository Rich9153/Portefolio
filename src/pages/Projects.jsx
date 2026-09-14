// import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimationMultiple } from '../hooks/useScrollAnimation';
// import CategoryCard from '../components/CategoryCard';
// import ProjectModal from '../components/ProjectModal';
import './Projects.css';

function Projects() {
  const { t } = useLanguage();
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedProjects, setSelectedProjects] = useState([]);

  // Animation au scroll
  useScrollAnimationMultiple('.scroll-animate');

  // Liens vers les sites dédiés des projets
  const projectLinks = {
    academic: [
      {
        title: "Projet Réseaux",
        url: "https://github.com/Rich9153/Projet_Reseaux",
        description: "Projet académique en langage C autour de la programmation réseau."
      },
      {
        title: "Outils agiles — Master 1",
        url: "https://github.com/Rich9153/cours-M1-agile-tools",
        description: "Travaux pratiques Python autour des méthodes et outils agiles."
      }
    ],
    personal: [
      {
        title: "Mon Blog",
        url: "https://github.com/Rich9153/monblog",
        description: "Blog moderne réalisé avec Next.js."
      },
      {
        title: "Projet humanitaire",
        url: "https://github.com/Rich9153/Projet-humanitaire",
        description: "Projet web dédié à une initiative humanitaire."
      },
      {
        title: "Portfolio",
        url: "https://github.com/Rich9153/Portefolio",
        description: "Ce portfolio bilingue construit avec React et Vite."
      }
    ],
    company: [
      {
        title: "GEM e-Mobility",
        url: "https://gem-emobility.com/",
        description: "Plateforme présentant le déploiement de la première station de mobilité électrique au Burundi."
      }
    ]
  };

  const categoryNames = {
    academic: t.projects.categories?.academic || "Projets Académiques",
    personal: t.projects.categories?.personal || "Projets Personnels",
    company: t.projects.categories?.company || "Projets en Entreprise"
  };

  /* ============== ANCIEN CODE COMMENTÉ ==============
  // Données d'exemple - à personnaliser
  const projectsData = {
    academic: [
      {
        title: "Game of Trivia 'Music'",
        description: "Jeu développé en utilisant les technologies HTML5, CSS pour développer le front-end et JavaScript pour faire la liaison avec le back-end. Il s'agit d'un jeu reprenant le jeu télévisé 'Question pour un champion', où un utilisateur a une suite de questions. À chaque question il y a plusieurs choix possibles avec une seule bonne réponse. Ce jeu m'a permis de bien appréhender les concepts du développement web.",
        technologies: ["HTML5", "CSS", "JavaScript"],
        images: [
          "/images/trivia-1.png",
          "/images/trivia-2.png",
          "/images/trivia-3.png"
        ],
        link: ""
      },
      {
        title: "Organisation de la fête à l'université",
        description: "Projet développé avec l'outil de création d'interface interactif Tkinter. Le projet consistait à créer une interface pour un organisateur d'événement avec la capacité de voir les produits de consommation apportés à la fête par les participants eux-mêmes, et aussi de renvoyer des notifications aux participants vis-à-vis de leur apport pour la fête afin que tout le monde puisse être satisfait par la consommation et par le service.",
        technologies: ["Tkinter"],
        images: [
          "/images/fete-1.png",
          "/images/fete-2.png",
          "/images/fete-3.png"
        ],
        link: ""
      },
      {
        title: "Campus Explorer",
        description: "Connaissez-vous réellement votre université ? Il s'agit d'un jeu en ligne développé par un groupe de 5 étudiants, visant à faire visiter les étudiants de l'université en profondeur en s'amusant à faire une chasse aux endroits où ont été prises des images dans l'entièreté de l'université avec des indices pour leur permettre de trouver non pas facilement mais intuitivement l'endroit où a été prise l'image, avec la possibilité de proposer de nouveaux endroits à découvrir au sein de l'université, tout cela en étant connecté avec les identifiants de connexion à la plateforme de l'université.",
        technologies: ["HTML5", "CSS", "JavaScript", "PHP", "MariaDB", "Mailer.js", "Bootstrap", "Win-SCP"],
        images: [
          "/images/campus-1.png",
          "/images/campus-2.png",
          "/images/campus-3.png"
        ],
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
        title: "ATS (Applicant Tracking System)",
        description: "Projet réalisé pendant mon stage chez Solio Group, il s'agit d'un outil qui est utilisé pour le recrutement d'où son nom ATS. Application développée en ReactJS et incluant une multitude d'extensions.",
        technologies: ["ReactJS", "ExpressJS", "MailerJS", "Bootstrap", "Bcrypt"],
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
  ============== FIN ANCIEN CODE COMMENTÉ ============== */

  return (
    <div className="projects">
      <div className="projects-container">
        <div className="projects-header scroll-animate">
          <h1 className="page-title">{t.projects.title}</h1>
          <div className="title-underline"></div>
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
                    <h3 className="project-link-title">{project.title}</h3>
                    <p className="project-link-description">{project.description}</p>
                    <span className="project-link-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ============== ANCIEN CODE COMMENTÉ ==============
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
        ============== FIN ANCIEN CODE COMMENTÉ ============== */}
      </div>

      {/* ============== ANCIEN CODE COMMENTÉ ==============
      {selectedCategory && (
        <ProjectModal
          category={selectedCategory}
          projects={selectedProjects}
          onClose={closeModal}
        />
      )}
      ============== FIN ANCIEN CODE COMMENTÉ ============== */}
    </div>
  );
}

export default Projects;
