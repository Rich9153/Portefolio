import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    return savedLanguage === 'en' ? 'en' : 'fr';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const translations = {
    fr: {
      // Navbar
      nav: {
        home: 'Accueil',
        about: 'À propos',
        education: 'Parcours',
        projects: 'Projets',
        contact: 'Contact',
        changeLanguage: 'Passer le site en anglais',
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu'
      },
      // Home page
      home: {
        title: 'Ulrich Babbel',
        titleHighlight: 'Mbonihankuye',
        subtitle: 'Étudiant en Master ICE-LD · Développement logiciel, web et data',
        profileAlt: 'Portrait d’Ulrich Babbel Mbonihankuye',
        eyebrow: 'Ingénierie logicielle · Toulouse',
        availability: 'Disponible pour une alternance et des collaborations',
        intro: 'Je transforme des besoins complexes en expériences numériques fiables, lisibles et utiles — du modèle de données jusqu’à l’interface.',
        currentLabel: 'En ce moment',
        currentValue: 'Master ICE-LD',
        focusLabel: 'Ce que je construis',
        focusValue: 'Produits web & data',
        stackLabel: 'Technologies principales',
        stack: ['React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL'],
        viewProjects: 'Voir mes projets',
        contactMe: 'Me contacter',
        aboutCard: {
          title: 'À propos',
          description: 'Découvrez qui je suis et mon parcours'
        },
        educationCard: {
          title: 'Parcours académique',
          description: 'Mon cursus et mes formations'
        },
        projectsCard: {
          title: 'Projets',
          description: 'Mes réalisations académiques et personnelles'
        }
      },
      // About page
      about: {
        eyebrow: 'Profil & compétences',
        lead: 'Une approche complète du produit numérique, à la rencontre du logiciel, des données et des usages.',
        basedIn: 'Basé à',
        title: 'À propos de moi',
        whoAmI: 'Qui suis-je ?',
        whoAmIText: 'Originaire du Burundi, né au Bénin et installé en France depuis 2022, je suis étudiant en Master ICE-LD (Ingénierie Continue des Écosystèmes Logiciels et Données) à l\'Université Toulouse Jean Jaurès. Je conçois des applications web et logicielles en portant une attention particulière à la qualité du code, aux données et à l\'expérience utilisateur.',
        skills: 'Mes compétences',
        interests: 'Mes intérêts',
        interestsText: 'J\'aime tout ce qui touche à la musique : techno, afro-beat, l\'art (le dessin). Comme sport j\'aime faire de la natation, jouer au Rugby, et j\'ai un intérêt particulier pour tout ce qui est en rapport avec l\'évolution de la technologie.',
        profileAlt: 'Portrait d’Ulrich Babbel Mbonihankuye',
        skillCategories: {
          languages: 'Langages de programmation',
          frontend: 'Frontend',
          backend: 'Backend',
          database: 'Base de données',
          tools: 'Outils'
        }
      },
      // Education page
      education: {
        eyebrow: 'Formation',
        lead: 'Un parcours construit entre informatique, mathématiques appliquées, données et ingénierie logicielle.',
        title: 'Parcours Académique',
        achievements: 'Points forts :',
        certifications: 'Certifications & Formations',
        inProgress: 'En cours',
        items: [
          {
            id: 1,
            degree: 'Master ICE-LD (Ingénierie Continue des Écosystèmes Logiciels et Données)',
            school: 'Université Toulouse Jean Jaurès',
            location: 'Toulouse, France',
            period: '2025 - Présent',
            description: 'Master en cours axé sur l’ingénierie logicielle, les pratiques DevOps et la gestion des données.',
            achievements: ['Formation en cours']
          },
          {
            id: 2,
            degree: 'Licence MIASHS (Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales)',
            school: 'Université Toulouse Jean Jaurès',
            location: 'Toulouse, France',
            period: '2022 - 2025',
            description: 'Spécialisation en développement logiciel et analyse de données.',
            achievements: [
              'Projet de fin d’études sur un système de suivi des candidatures (ATS)',
              'Stage chez Solio Group'
            ]
          },
          {
            id: 3,
            degree: 'Licence en Informatique de Gestion',
            school: 'Université Lumière de Bujumbura',
            location: 'Bujumbura, Burundi',
            period: '2020 - 2022',
            description: 'Formation générale en informatique, développement et gestion.',
            achievements: ['Projet tutoré']
          },
          {
            id: 4,
            degree: 'Baccalauréat Scientifique',
            school: 'Lycée du Lac Tanganyika',
            location: 'Bujumbura, Burundi',
            period: '2018 - 2019',
            description: 'Section scientifique : biologie, chimie et sciences de la Terre.',
            achievements: ['Mention Bien']
          }
        ]
      },
      // Projects page
      projects: {
        eyebrow: 'Sélection de travaux',
        title: 'Mes Projets',
        subtitle: 'Découvrez mes réalisations académiques, personnelles et professionnelles',
        openProject: 'Découvrir le projet',
        categories: {
          academic: 'Projets académiques',
          personal: 'Projets personnels',
          company: 'Projets professionnels'
        },
        items: {
          academic: [
            {
              title: 'Projet Réseaux',
              url: 'https://github.com/Rich9153/Projet_Reseaux',
              description: 'Projet académique en langage C autour de la programmation réseau.',
              kind: 'Systèmes',
              technologies: ['C', 'Réseaux']
            },
            {
              title: 'Outils agiles — Master 1',
              url: 'https://github.com/Rich9153/cours-M1-agile-tools',
              description: 'Travaux pratiques Python autour des méthodes et outils agiles.',
              kind: 'Ingénierie',
              technologies: ['Python', 'Agile']
            }
          ],
          personal: [
            {
              title: 'Mon Blog',
              url: 'https://github.com/Rich9153/monblog',
              description: 'Blog moderne réalisé avec Next.js.',
              kind: 'Web',
              technologies: ['Next.js', 'React']
            },
            {
              title: 'Projet humanitaire',
              url: 'https://github.com/Rich9153/Projet-humanitaire',
              description: 'Projet web dédié à une initiative humanitaire.',
              kind: 'Impact',
              technologies: ['Web', 'UX']
            },
            {
              title: 'Portfolio',
              url: 'https://github.com/Rich9153/Portefolio',
              description: 'Ce portfolio bilingue construit avec React et Vite.',
              kind: 'Identité',
              technologies: ['React', 'Vite']
            }
          ],
          company: [
            {
              title: 'GEM e-Mobility',
              url: 'https://gem-emobility.com/',
              description: 'Plateforme présentant le déploiement de la première station de mobilité électrique au Burundi.',
              kind: 'Mobilité',
              technologies: ['JavaScript', 'Web']
            }
          ]
        },
        filters: {
          all: 'Tous',
          academic: 'Académiques',
          personal: 'Personnels',
          company: 'Entreprise'
        },
        noProjects: 'Aucun projet dans cette catégorie pour le moment.',
        viewProject: 'Voir le projet',
        noImage: 'Aucune image',
        types: {
          academic: 'Académique',
          personal: 'Personnel',
          company: 'Entreprise'
        }
      },
      // Contact page
      contact: {
        eyebrow: 'Parlons de votre projet',
        intro: 'Une opportunité, une collaboration ou simplement une idée à partager ? Écrivez-moi, je réponds dès que possible.',
        formLabel: 'Votre message',
        formTitle: 'Commençons une conversation.',
        title: 'Contactez-moi',
        subtitle: 'N\'hésitez pas à me contacter pour toute opportunité ou question',
        form: {
          name: 'Nom',
          namePlaceholder: 'Votre nom',
          email: 'Email',
          emailPlaceholder: 'votre.email@example.com',
          subject: 'Sujet',
          subjectPlaceholder: 'Sujet de votre message',
          message: 'Message',
          messagePlaceholder: 'Votre message...',
          send: 'Envoyer le message',
          sending: 'Envoi en cours…',
          success: 'Message envoyé avec succès.',
          error: 'Impossible d’envoyer le message. Réessayez ou contactez-moi directement par e-mail.',
          closeNotification: 'Fermer la notification',
          website: 'Site web'
        },
        info: {
          email: 'Email',
          phone: 'Téléphone',
          location: 'Localisation',
          socials: 'Réseaux sociaux'
        }
      },
      // Footer
      footer: {
        rights: 'Portfolio. Tous droits réservés.',
        tagline: 'Ingénierie logicielle · Web · Data'
      }
    },
    en: {
      // Navbar
      nav: {
        home: 'Home',
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        contact: 'Contact',
        changeLanguage: 'Switch the website to French',
        openMenu: 'Open menu',
        closeMenu: 'Close menu'
      },
      // Home page
      home: {
        title: 'Ulrich Babbel',
        titleHighlight: 'Mbonihankuye',
        subtitle: 'ICE-LD Master’s student · Software, web and data development',
        profileAlt: 'Portrait of Ulrich Babbel Mbonihankuye',
        eyebrow: 'Software engineering · Toulouse',
        availability: 'Open to work-study opportunities and collaborations',
        intro: 'I turn complex requirements into reliable, clear and useful digital experiences — from the data model to the interface.',
        currentLabel: 'Currently',
        currentValue: 'ICE-LD Master’s',
        focusLabel: 'What I build',
        focusValue: 'Web & data products',
        stackLabel: 'Core technologies',
        stack: ['React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL'],
        viewProjects: 'View my projects',
        contactMe: 'Contact me',
        aboutCard: {
          title: 'About',
          description: 'Discover who I am and my journey'
        },
        educationCard: {
          title: 'Academic Background',
          description: 'My curriculum and training'
        },
        projectsCard: {
          title: 'Projects',
          description: 'My academic and personal achievements'
        }
      },
      // About page
      about: {
        eyebrow: 'Profile & skills',
        lead: 'A complete approach to digital products, at the intersection of software, data and people.',
        basedIn: 'Based in',
        title: 'About Me',
        whoAmI: 'Who am I?',
        whoAmIText: 'Originally from Burundi, born in Benin and living in France since 2022, I am an ICE-LD Master’s student (Continuous Engineering of Software and Data Ecosystems) at Toulouse Jean Jaurès University. I build web and software applications with a strong focus on code quality, data and user experience.',
        skills: 'My Skills',
        interests: 'My Interests',
        interestsText: 'I love everything related to music: techno, afro-beat, art (drawing). As for sports, I enjoy swimming, playing Rugby, and I have a particular interest in everything related to the evolution of technology.',
        profileAlt: 'Portrait of Ulrich Babbel Mbonihankuye',
        skillCategories: {
          languages: 'Programming Languages',
          frontend: 'Frontend',
          backend: 'Backend',
          database: 'Database',
          tools: 'Tools'
        }
      },
      // Education page
      education: {
        eyebrow: 'Education',
        lead: 'A multidisciplinary path spanning computer science, applied mathematics, data and software engineering.',
        title: 'Academic Background',
        achievements: 'Highlights:',
        certifications: 'Certifications & Training',
        inProgress: 'In Progress',
        items: [
          {
            id: 1,
            degree: 'ICE-LD Master’s Degree (Continuous Engineering of Software and Data Ecosystems)',
            school: 'Toulouse Jean Jaurès University',
            location: 'Toulouse, France',
            period: '2025 - Present',
            description: 'Ongoing Master’s degree focused on software engineering, DevOps practices and data management.',
            achievements: ['Currently studying']
          },
          {
            id: 2,
            degree: 'MIASHS Bachelor’s Degree (Applied Mathematics and Computer Science for Social Sciences)',
            school: 'Toulouse Jean Jaurès University',
            location: 'Toulouse, France',
            period: '2022 - 2025',
            description: 'Specialisation in software development and data analysis.',
            achievements: [
              'Final-year project on an Applicant Tracking System (ATS)',
              'Internship at Solio Group'
            ]
          },
          {
            id: 3,
            degree: 'Bachelor’s Degree in Business Information Technology',
            school: 'Université Lumière de Bujumbura',
            location: 'Bujumbura, Burundi',
            period: '2020 - 2022',
            description: 'General education in computer science, software development and management.',
            achievements: ['Supervised academic project']
          },
          {
            id: 4,
            degree: 'Scientific Baccalaureate',
            school: 'Lycée du Lac Tanganyika',
            location: 'Bujumbura, Burundi',
            period: '2018 - 2019',
            description: 'Science curriculum focused on biology, chemistry and Earth science.',
            achievements: ['Graduated with honours']
          }
        ]
      },
      // Projects page
      projects: {
        eyebrow: 'Selected work',
        title: 'My Projects',
        subtitle: 'Discover my academic, personal and professional achievements',
        openProject: 'View project',
        categories: {
          academic: 'Academic projects',
          personal: 'Personal projects',
          company: 'Professional projects'
        },
        items: {
          academic: [
            {
              title: 'Network Programming Project',
              url: 'https://github.com/Rich9153/Projet_Reseaux',
              description: 'An academic C project focused on network programming.',
              kind: 'Systems',
              technologies: ['C', 'Networking']
            },
            {
              title: 'Agile Tools — Master’s Year 1',
              url: 'https://github.com/Rich9153/cours-M1-agile-tools',
              description: 'Python coursework exploring agile methods and development tools.',
              kind: 'Engineering',
              technologies: ['Python', 'Agile']
            }
          ],
          personal: [
            {
              title: 'My Blog',
              url: 'https://github.com/Rich9153/monblog',
              description: 'A modern blog built with Next.js.',
              kind: 'Web',
              technologies: ['Next.js', 'React']
            },
            {
              title: 'Humanitarian Project',
              url: 'https://github.com/Rich9153/Projet-humanitaire',
              description: 'A web project supporting a humanitarian initiative.',
              kind: 'Impact',
              technologies: ['Web', 'UX']
            },
            {
              title: 'Portfolio',
              url: 'https://github.com/Rich9153/Portefolio',
              description: 'This bilingual portfolio built with React and Vite.',
              kind: 'Identity',
              technologies: ['React', 'Vite']
            }
          ],
          company: [
            {
              title: 'GEM e-Mobility',
              url: 'https://gem-emobility.com/',
              description: 'A platform showcasing the deployment of Burundi’s first electric mobility station.',
              kind: 'Mobility',
              technologies: ['JavaScript', 'Web']
            }
          ]
        },
        filters: {
          all: 'All',
          academic: 'Academic',
          personal: 'Personal',
          company: 'Company'
        },
        noProjects: 'No projects in this category at the moment.',
        viewProject: 'View project',
        noImage: 'No image',
        types: {
          academic: 'Academic',
          personal: 'Personal',
          company: 'Company'
        }
      },
      // Contact page
      contact: {
        eyebrow: 'Let’s work together',
        intro: 'An opportunity, a collaboration or simply an idea to share? Send me a message and I will get back to you as soon as possible.',
        formLabel: 'Your message',
        formTitle: 'Let’s start a conversation.',
        title: 'Contact Me',
        subtitle: 'Feel free to contact me for any opportunity or question',
        form: {
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'your.email@example.com',
          subject: 'Subject',
          subjectPlaceholder: 'Subject of your message',
          message: 'Message',
          messagePlaceholder: 'Your message...',
          send: 'Send message',
          sending: 'Sending…',
          success: 'Message sent successfully.',
          error: 'Unable to send the message. Please try again or contact me directly by email.',
          closeNotification: 'Close notification',
          website: 'Website'
        },
        info: {
          email: 'Email',
          phone: 'Phone',
          location: 'Location',
          socials: 'Social Media'
        }
      },
      // Footer
      footer: {
        rights: 'Portfolio. All rights reserved.',
        tagline: 'Software engineering · Web · Data'
      }
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
