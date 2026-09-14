import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // 'fr' ou 'en'

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
        contact: 'Contact'
      },
      // Home page
      home: {
        title: 'Ulrich Babbel',
        titleHighlight: 'Mbonihankuye',
        subtitle: 'Étudiant en Master ICE-LD · Développement logiciel, web et data',
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
        title: 'À propos de moi',
        whoAmI: 'Qui suis-je ?',
        whoAmIText: 'Originaire du Burundi, né au Bénin et installé en France depuis 2022, je suis étudiant en Master ICE-LD (Ingénierie Continue des Écosystèmes Logiciels et Données) à l\'Université Toulouse Jean Jaurès. Je conçois des applications web et logicielles en portant une attention particulière à la qualité du code, aux données et à l\'expérience utilisateur.',
        skills: 'Mes compétences',
        interests: 'Mes intérêts',
        interestsText: 'J\'aime tout ce qui touche à la musique : techno, afro-beat, l\'art (le dessin). Comme sport j\'aime faire de la natation, jouer au Rugby, et j\'ai un intérêt particulier pour tout ce qui est en rapport avec l\'évolution de la technologie.',
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
        title: 'Parcours Académique',
        achievements: 'Points forts :',
        certifications: 'Certifications & Formations',
        inProgress: 'En cours'
      },
      // Projects page
      projects: {
        title: 'Mes Projets',
        subtitle: 'Découvrez mes réalisations académiques, personnelles et professionnelles',
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
          success: 'Message envoyé ! (fonctionnalité à implémenter)'
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
        rights: 'Mon Portfolio. Tous droits réservés.'
      }
    },
    en: {
      // Navbar
      nav: {
        home: 'Home',
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        contact: 'Contact'
      },
      // Home page
      home: {
        title: 'Ulrich Babbel',
        titleHighlight: 'Mbonihankuye',
        subtitle: 'ICE-LD Master’s student · Software, web and data development',
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
        title: 'About Me',
        whoAmI: 'Who am I?',
        whoAmIText: 'Originally from Burundi, born in Benin and living in France since 2022, I am an ICE-LD Master’s student (Continuous Engineering of Software and Data Ecosystems) at Toulouse Jean Jaurès University. I build web and software applications with a strong focus on code quality, data and user experience.',
        skills: 'My Skills',
        interests: 'My Interests',
        interestsText: 'I love everything related to music: techno, afro-beat, art (drawing). As for sports, I enjoy swimming, playing Rugby, and I have a particular interest in everything related to the evolution of technology.',
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
        title: 'Academic Background',
        achievements: 'Highlights:',
        certifications: 'Certifications & Training',
        inProgress: 'In Progress'
      },
      // Projects page
      projects: {
        title: 'My Projects',
        subtitle: 'Discover my academic, personal and professional achievements',
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
          success: 'Message sent! (feature to be implemented)'
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
        rights: 'My Portfolio. All rights reserved.'
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
