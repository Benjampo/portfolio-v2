import greubel2 from '../public/projects/greubel/greub1.png';
import greubel3 from '../public/projects/greubel/greub2.png';
import greubel from '../public/projects/greubel/greub_fold.png';

import yc2 from '../public/projects/yc/yc-2.png';
import yc3 from '../public/projects/yc/yc-3.png';
import yc from '../public/projects/yc/yc.png';

import olla from '../public/projects/olla/olla1.png';
import olla2 from '../public/projects/olla/olla2.png';
import olla3 from '../public/projects/olla/olla3.png';

import wb from '../public/projects/wb/wb.png';
import wb2 from '../public/projects/wb/wb2.png';
import wb3 from '../public/projects/wb/wb3.png';

import kodo from '../public/projects/kodo/kodo1.png';
import kodo2 from '../public/projects/kodo/kodo2.png';
import kodo3 from '../public/projects/kodo/kodo3.png';

import latent4 from '../public/projects/latent/latent.png';
import latent5 from '../public/projects/latent/latent2.png';
import latent6 from '../public/projects/latent/latent3.png';

import port from '../public/projects/portfolio/port.png';
import port2 from '../public/projects/portfolio/port2.png';
import port3 from '../public/projects/portfolio/port3.png';

import data from '../public/projects/data/data1.png';
import data2 from '../public/projects/data/data2.png';
import data3 from '../public/projects/data/data3.png';

import form from '../public/projects/form/form1.png';
import form2 from '../public/projects/form/form2.png';
import form3 from '../public/projects/form/form3.png';

import wbx from '../public/projects/wbx/wbx1.png';
import wbx2 from '../public/projects/wbx/wbx2.png';
import wbx3 from '../public/projects/wbx/wbx3.png';

import qhPlatform from '../public/projects/quanthome-platform/qh-platform1.png';
import qhPlatform2 from '../public/projects/quanthome-platform/qh-platform2.png';
import qhPlatform3 from '../public/projects/quanthome-platform/qh-platform3.png';

import qhAi from '../public/projects/quanthome-ai/qh-ai1.png';
import qhAi2 from '../public/projects/quanthome-ai/qh-ai2.png';
import qhAi3 from '../public/projects/quanthome-ai/qh-ai3.png';

const Projects = [
  {
    id: 'quanthome-platform',
    title: 'Quanthome Platform',
    coverSrc: qhPlatform,
    secSrc: qhPlatform2,
    thirdSrc: qhPlatform3,
    url: 'https://quanthome.com/products/platform',
    subtitle: 'Web App',
    subtitle_fr: 'Application Web',
    context:
      'Full-stack development of a real estate analytics platform. Worked on all aspects of the application from frontend to backend, including infrastructure and deployment.',
    context_fr:
      'Développement full-stack d\'une plateforme d\'analyse immobilière. Travail sur tous les aspects de l\'application, du frontend au backend, y compris l\'infrastructure et le déploiement.',
    tasks: [
      'Full-stack development',
      'Frontend integration',
      'Email system implementation',
      'Authentication and permissions',
      'Resource operations (CRUD)',
      'Deployment and Docker configuration',
    ],
    tasks_fr: [
      'Développement full-stack',
      'Intégration frontend',
      'Implémentation du système d\'emails',
      'Authentification et permissions',
      'Opérations sur les ressources (CRUD)',
      'Déploiement et configuration Docker',
    ],
    tech: ['ReactJS', 'TypeScript', 'NodeJS', 'Docker', 'PostgreSQL'],
  },
  {
    id: 'quanthome-ai',
    title: 'Quanthome AI',
    coverSrc: qhAi,
    secSrc: qhAi2,
    thirdSrc: qhAi3,
    url: 'https://quanthome.com/products/qai',
    subtitle: 'Web App',
    subtitle_fr: 'Application Web',
    context:
      'Frontend development and integration for an AI-powered analytics tool. Focused on creating an intuitive user interface for complex AI features.',
    context_fr:
      'Développement frontend et intégration pour un outil d\'analyse propulsé par l\'IA. Focus sur la création d\'une interface utilisateur intuitive pour des fonctionnalités d\'IA complexes.',
    tasks: [
      'Frontend development',
      'UI/UX integration',
      'Component implementation',
    ],
    tasks_fr: [
      'Développement frontend',
      'Intégration UI/UX',
      'Implémentation de composants',
    ],
    tech: ['ReactJS', 'TypeScript', 'SCSS'],
  },
  {
    id: 'greubel-forsey',
    title: 'Greubel Forsey',
    coverSrc: greubel,
    secSrc: greubel2,
    thirdSrc: greubel3,
    url: 'https://www.greubelforsey.com/en',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Website made while working at maven. Most of the website was already mounted, i mainly did all the js animations and helped on the SCSS on a few pages',
    context_fr:
      'Site réalisé chez Maven. La majeure partie du site était déjà montée, j\'ai principalement réalisé toutes les animations JS et aidé sur le SCSS de quelques pages.',
    tasks: [
      'GSAP animations',
      'SCSS and a part of Twig',
      'Webiste updates and maintenance',
    ],
    tasks_fr: [
      'Animations GSAP',
      'SCSS et une partie du Twig',
      'Mises à jour et maintenance du site',
    ],
    tech: ['HTML', 'SCSS', 'GSAP', 'Jquery', 'Grav CMS'],
  },
  {
    id: 'kodomo',
    title: 'Kodomo',
    coverSrc: kodo,
    secSrc: kodo2,
    thirdSrc: kodo3,
    info: 'No public link for this project',
    info_fr: 'Pas de lien public pour ce projet',
    subtitle: 'Web app',
    subtitle_fr: 'Application Web',
    context:
      'Web app made in two weeks with my colleagues from LeWagon. ' +
      'The purpose was to create an application to track all kind of data about your child. ' +
      'Because of the time and the learning proccess, we did not made the desktop version of it.',
    context_fr:
      'Application web réalisée en deux semaines avec mes collègues du Wagon. ' +
      'Le but était de créer une application pour suivre toutes sortes de données sur votre enfant. ' +
      'En raison du temps et du processus d\'apprentissage, nous n\'avons pas fait la version desktop.',
    tasks: [
      'HTML and CSS Implementation',
      'Design of the App',
      'Back-end features',
    ],
    tasks_fr: [
      'Implémentation HTML et CSS',
      'Design de l\'application',
      'Fonctionnalités back-end',
    ],
    tech: ['Ruby', 'Ruby on Rails', 'Bootstrap', 'CSS'],
  },
  {
    id: 'ollabotanicals',
    title: 'Olla Botanicals',
    coverSrc: olla,
    secSrc: olla2,
    thirdSrc: olla3,
    url: 'https://ollabotanicals.com/fr',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Website made while working at maven. The purpose was to showcase product of a cosmetic brand to the public.',
    context_fr:
      'Site réalisé chez Maven. Le but était de présenter les produits d\'une marque de cosmétiques au public.',
    tasks: ['JS animations', 'UI Integration', 'Back-office with Grav CMS'],
    tasks_fr: ['Animations JS', 'Intégration UI', 'Back-office avec Grav CMS'],
    tech: ['HTML', 'SCSS', 'GSAP', 'Jquery', 'Grav CMS'],
  },
  {
    id: 'personnal-portfolio',
    title: 'Personnal Portfolio',
    coverSrc: port,
    secSrc: port2,
    thirdSrc: port3,
    url: 'https://www.benjampo.ch',
    subtitle: 'Personnal Website',
    subtitle_fr: 'Site personnel',
    context:
      'Reealisation of my personnal website to showcase my work and skills',
    context_fr:
      'Réalisation de mon site personnel pour présenter mes projets et compétences.',
    tasks: ['UI creation', 'UI integrations'],
    tasks_fr: ['Création UI', 'Intégrations UI'],
    tech: ['ReactJS', 'NextJS'],
  },
  {
    id: 'project-submission',
    title: 'Project submission platform',
    coverSrc: form3,
    secSrc: form2,
    thirdSrc: form,
    subtitle: 'Web app',
    subtitle_fr: 'Application Web',
    info: 'No public link for this project',
    info_fr: 'Pas de lien public pour ce projet',
    context:
      'Web app made for an university allowing interns to submit projects and for admin to manage the submissions. For privacy reasons, UI and names have been changed on screenshots',
    context_fr:
      'Application web réalisée pour une université permettant aux stagiaires de soumettre des projets et aux administrateurs de gérer les soumissions. Pour des raisons de confidentialité, l\'UI et les noms ont été modifiés sur les captures d\'écran.',
    tasks: [
      'Creation of front-end interactions',
      'Creation of reusable components',
      'Laravel CRUD features',
    ],
    tasks_fr: [
      'Création d\'interactions front-end',
      'Création de composants réutilisables',
      'Fonctionnalités CRUD Laravel',
    ],
    tech: ['VueJS', 'Laravel', 'SCSS', 'WordPress'],
  },
  {
    id: 'weebox',
    title: 'Weebox',
    coverSrc: wbx,
    secSrc: wbx2,
    thirdSrc: wbx3,
    subtitle: 'Web App',
    subtitle_fr: 'Application Web',
    info: 'No public link for this project',
    info_fr: 'Pas de lien public pour ce projet',
    context: 'Web app used to manage e-commerce products, orders, clients',
    context_fr:
      'Application web de gestion de produits e-commerce, commandes et clients.',
    tasks: [
      'Creation of reusable components logic',
      'Components styling',
      'Components implementation',
    ],
    tasks_fr: [
      'Création de la logique des composants réutilisables',
      'Stylisation des composants',
      'Implémentation des composants',
    ],
    tech: ['VueJS', 'Laravel', 'PHP'],
  },
  {
    id: 'weebox-landing',
    title: 'Weebox',
    coverSrc: wb,
    secSrc: wb2,
    thirdSrc: wb3,
    url: 'https://www.weebox.ch',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context: 'Website to promote the E-commerce platform weebox',
    context_fr:
      'Site web pour promouvoir la plateforme e-commerce Weebox.',
    tasks: [
      'Integration in SCSS and HTML',
      'Js animations using GSAP',
      'Grav CMS backoffice implementation',
    ],
    tasks_fr: [
      'Intégration en SCSS et HTML',
      'Animations JS avec GSAP',
      'Implémentation du back-office Grav CMS',
    ],
    tech: ['HTML', 'SCSS', 'GSAP', 'Grav CMS', 'Grav CMS'],
  },
  {
    id: 'data-management-platform',
    title: 'Data management Platform',
    coverSrc: data,
    secSrc: data2,
    thirdSrc: data3,
    subtitle: 'Web app',
    subtitle_fr: 'Application Web',
    info: 'No public link for this project',
    info_fr: 'Pas de lien public pour ce projet',
    context:
      'Web app made for an international company allowing employees to search, edit, save and export data. For privacy reasons, UI and names have been changed on screenshots',
    context_fr:
      'Application web réalisée pour une entreprise internationale permettant aux employés de rechercher, modifier, sauvegarder et exporter des données. Pour des raisons de confidentialité, l\'UI et les noms ont été modifiés sur les captures d\'écran.',
    tasks: [
      'Creation of components',
      'Creation of unit tests',
      'Integration of UI',
      'Creation of Front-end Logic',
    ],
    tasks_fr: [
      'Création de composants',
      'Création de tests unitaires',
      'Intégration de l\'UI',
      'Création de la logique front-end',
    ],
    tech: ['ReactJs', 'SCSS', 'Webpack'],
  },

  {
    id: 'latent',
    title: 'Latent',
    coverSrc: latent4,
    secSrc: latent5,
    thirdSrc: latent6,
    url: 'https://ecal.ch/fr/feed/events/1673/exposition-du-prix-plateforme-10-x-ecal-melanie-fontaine-latent/',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Chat app made by a ECAL student. Won an ECAL award and is currently exposed at plateforme10 in Lausanne, switzerland',
    context_fr:
      'Application de chat réalisée par un étudiant de l\'ECAL. A remporté un prix ECAL et est actuellement exposée à plateforme10 à Lausanne.',
    tasks: [
      'Helping on VueJs Integration',
      'Imporving styling',
      'Adding features',
    ],
    tasks_fr: [
      'Aide à l\'intégration VueJS',
      'Amélioration du style',
      'Ajout de fonctionnalités',
    ],
    tech: ['VueJS', 'SCSS'],
  },
  {
    id: 'yoga-center',
    title: 'Yoga Center',
    coverSrc: yc,
    secSrc: yc2,
    thirdSrc: yc3,
    url: 'https://yogacenter.ch/',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Website made while working at YantraConnection. The purpose was to showcase the brand with a simple website',
    context_fr:
      'Site réalisé chez YantraConnection. Le but était de présenter la marque avec un site simple.',
    tasks: [
      'Integration in Wordpress',
      'SCSS and styling',
      'Webiste updates and maintenance',
    ],
    tasks_fr: [
      'Intégration dans WordPress',
      'SCSS et stylisation',
      'Mises à jour et maintenance du site',
    ],
    tech: ['HTML', 'SCSS', 'Wordpress'],
  },
];

export default Projects;
