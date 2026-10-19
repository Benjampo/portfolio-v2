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

import esfSuisse from '../public/projects/esf-suisse/esf-home.webp';
import esfSuisse2 from '../public/projects/esf-suisse/esf-join.webp';
import esfSuisse3 from '../public/projects/esf-suisse/esf-stages.webp';

const Projects = [
  {
    id: 'esf-suisse',
    title: 'ESF Suisse',
    coverSrc: esfSuisse,
    secSrc: esfSuisse2,
    thirdSrc: esfSuisse3,
    screenshotTrimBottom: 100,
    url: 'https://www.esf-suisse.org/',
    subtitle: 'Nonprofit Website',
    subtitle_fr: 'Site associatif',
    context:
      'End-to-end website created for Enseignants Sans Frontières Suisse on a tight nonprofit budget. I guided the client from early ideation and content structure through visual design, React development and launch, with a Kirby CMS that keeps day-to-day publishing simple.',
    context_fr:
      "Site conçu de A à Z pour Enseignants Sans Frontières Suisse avec un budget associatif serré. J'ai accompagné le client de l'idéation et de la structuration des contenus jusqu'au design, au développement React et à la mise en ligne, avec un CMS Kirby simple à administrer au quotidien.",
    tasks: [
      'Client workshops, ideation and content structure',
      'UX/UI design and responsive React development',
      'Kirby CMS architecture and implementation',
      'Launch and client handover',
    ],
    tasks_fr: [
      'Ateliers client, idéation et structuration des contenus',
      'Design UX/UI et développement React responsive',
      'Architecture et implémentation du CMS Kirby',
      'Mise en ligne et accompagnement du client',
    ],
    tech: ['ReactJS', 'SCSS', 'PHP', 'Kirby CMS'],
  },
  {
    id: 'quanthome-platform',
    title: 'Quanthome Platform',
    coverSrc: qhPlatform,
    secSrc: qhPlatform2,
    thirdSrc: qhPlatform3,
    url: 'https://quanthome.com/products/quanthome-data',
    subtitle: 'Web App',
    subtitle_fr: 'Application Web',
    context:
      'Full-stack development of a real estate analytics platform. Worked on all aspects of the application from frontend to backend, including infrastructure and deployment.',
    context_fr:
      "Développement full-stack d'une plateforme d'analyse immobilière. Travail sur tous les aspects de l'application, du frontend au backend, y compris l'infrastructure et le déploiement.",
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
      "Implémentation du système d'emails",
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
    url: 'https://quanthome.com/products/quanthome-ai',
    subtitle: 'Web App',
    subtitle_fr: 'Application Web',
    context:
      'Frontend development and integration for an AI-powered analytics tool. Focused on creating an intuitive user interface for complex AI features.',
    context_fr:
      "Développement frontend et intégration pour un outil d'analyse propulsé par l'IA. Focus sur la création d'une interface utilisateur intuitive pour des fonctionnalités d'IA complexes.",
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
    info: 'The website has since been redesigned by another team.',
    info_fr: 'Le site a depuis été refait par une autre équipe.',
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Website made while working at maven. Most of the website was already mounted, i mainly did all the js animations and helped on the SCSS on a few pages',
    context_fr:
      "Site réalisé chez Maven. La majeure partie du site était déjà montée, j'ai principalement réalisé toutes les animations JS et aidé sur le SCSS de quelques pages.",
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
      "En raison du temps et du processus d'apprentissage, nous n'avons pas fait la version desktop.",
    tasks: [
      'HTML and CSS Implementation',
      'Design of the App',
      'Back-end features',
    ],
    tasks_fr: [
      'Implémentation HTML et CSS',
      "Design de l'application",
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
    info: 'The original website is no longer reliably available.',
    info_fr: "Le site d'origine n'est plus disponible de manière fiable.",
    subtitle: 'Brand Website',
    subtitle_fr: 'Site vitrine',
    context:
      'Website made while working at maven. The purpose was to showcase product of a cosmetic brand to the public.',
    context_fr:
      "Site réalisé chez Maven. Le but était de présenter les produits d'une marque de cosmétiques au public.",
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
      "Application web réalisée pour une université permettant aux stagiaires de soumettre des projets et aux administrateurs de gérer les soumissions. Pour des raisons de confidentialité, l'UI et les noms ont été modifiés sur les captures d'écran.",
    tasks: [
      'Creation of front-end interactions',
      'Creation of reusable components',
      'Laravel CRUD features',
    ],
    tasks_fr: [
      "Création d'interactions front-end",
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
    context_fr: 'Site web pour promouvoir la plateforme e-commerce Weebox.',
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
      "Application web réalisée pour une entreprise internationale permettant aux employés de rechercher, modifier, sauvegarder et exporter des données. Pour des raisons de confidentialité, l'UI et les noms ont été modifiés sur les captures d'écran.",
    tasks: [
      'Creation of components',
      'Creation of unit tests',
      'Integration of UI',
      'Creation of Front-end Logic',
    ],
    tasks_fr: [
      'Création de composants',
      'Création de tests unitaires',
      "Intégration de l'UI",
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
      "Application de chat réalisée par un étudiant de l'ECAL. A remporté un prix ECAL et est actuellement exposée à plateforme10 à Lausanne.",
    tasks: [
      'Helping on VueJs Integration',
      'Imporving styling',
      'Adding features',
    ],
    tasks_fr: [
      "Aide à l'intégration VueJS",
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

const projectStories = {
  'esf-suisse': {
    en: {
      briefTitle: 'Giving a nonprofit a clear, manageable digital home',
      contributionTitle: 'From the first workshop to a Kirby-powered launch',
      contributionIntro:
        'I stayed involved across the whole journey: structuring the content with the client, shaping the interface, building the responsive site and making publishing straightforward for the team.',
      resultTitle: 'A complete site the association can run day to day',
      resultText:
        'The public site brings the association, its field work and its reports into one coherent experience, backed by a CMS designed for simple day-to-day publishing.',
    },
    fr: {
      briefTitle:
        'Donner à une association un espace numérique clair et autonome',
      contributionTitle: 'Des premiers ateliers à une mise en ligne sous Kirby',
      contributionIntro:
        "J'ai accompagné tout le parcours : structuration des contenus avec le client, conception de l'interface, développement responsive et mise en place d'une publication simple pour l'équipe.",
      resultTitle: "Un site complet que l'association peut gérer au quotidien",
      resultText:
        "Le site public réunit l'association, ses actions sur le terrain et ses rapports dans une expérience cohérente, soutenue par un CMS pensé pour une publication simple au quotidien.",
    },
  },
  'quanthome-platform': {
    en: {
      briefTitle: 'Making complex real-estate data explorable',
      contributionTitle: 'Working across product, infrastructure and delivery',
      contributionIntro:
        'My role crossed the full stack: interface integration, application features, authentication, permissions, email flows, data operations and the infrastructure needed to deploy them.',
      resultTitle: 'One analytics platform, from interface to deployment',
      resultText:
        'The platform brings real-estate data and analytical tools into a single workspace, with the product foundations needed to support users securely in production.',
    },
    fr: {
      briefTitle:
        'Rendre des données immobilières complexes faciles à explorer',
      contributionTitle:
        "Intervenir sur le produit, l'infrastructure et la livraison",
      contributionIntro:
        "Mon rôle couvrait toute la stack : intégration de l'interface, fonctionnalités applicatives, authentification, permissions, emails, opérations sur les données et infrastructure de déploiement.",
      resultTitle: "Une plateforme d'analyse, de l'interface au déploiement",
      resultText:
        "La plateforme réunit données immobilières et outils d'analyse dans un même espace de travail, avec les fondations nécessaires pour accompagner les utilisateurs en production de manière sécurisée.",
    },
  },
  'quanthome-ai': {
    en: {
      briefTitle: 'Making advanced AI analysis feel approachable',
      contributionTitle: 'Designing the interface around complex AI workflows',
      contributionIntro:
        'I focused on the frontend layer: translating dense AI capabilities into components and interactions that make the product easier to understand and navigate.',
      resultTitle: 'A clearer path from a question to an analysis',
      resultText:
        'The resulting interface gives complex AI features a structured, usable home while keeping the focus on the user’s question and the analysis it produces.',
    },
    fr: {
      briefTitle: "Rendre l'analyse par IA avancée plus accessible",
      contributionTitle:
        "Concevoir l'interface autour de workflows IA complexes",
      contributionIntro:
        'Je me suis concentré sur le frontend : traduire des capacités IA denses en composants et interactions qui rendent le produit plus simple à comprendre et à parcourir.',
      resultTitle: 'Un chemin plus clair entre une question et son analyse',
      resultText:
        "L'interface donne une structure utilisable à des fonctionnalités IA complexes, tout en gardant l'attention sur la question de l'utilisateur et l'analyse produite.",
    },
  },
  'greubel-forsey': {
    en: {
      briefTitle: 'Supporting a luxury website already in motion',
      contributionTitle:
        'Adding movement without disturbing the visual identity',
      contributionIntro:
        'The core site was already established. My contribution concentrated on GSAP animation, targeted SCSS work and ongoing updates that respected the existing art direction.',
      resultTitle:
        'A more expressive experience through carefully placed motion',
      resultText:
        'The finished work reinforces the site’s visual character through animation and polish while preserving the foundation created by the wider team.',
    },
    fr: {
      briefTitle: 'Contribuer à un site de luxe déjà bien établi',
      contributionTitle:
        "Ajouter du mouvement sans perturber l'identité visuelle",
      contributionIntro:
        "Le socle du site existait déjà. Ma contribution s'est concentrée sur les animations GSAP, des interventions SCSS ciblées et les mises à jour, dans le respect de la direction artistique en place.",
      resultTitle:
        'Une expérience plus expressive grâce à un mouvement maîtrisé',
      resultText:
        "Le travail final renforce le caractère visuel du site par l'animation et les finitions, tout en préservant les fondations réalisées par l'équipe.",
    },
  },
  kodomo: {
    en: {
      briefTitle: 'Tracking a child’s daily data in one place',
      contributionTitle: 'Designing and building within a two-week sprint',
      contributionIntro:
        'Working with my Le Wagon teammates, I moved between product design, HTML/CSS implementation and backend features to turn the idea into a focused mobile experience.',
      resultTitle: 'A mobile-first prototype shaped by a tight deadline',
      resultText:
        'The project delivered a working mobile experience in two weeks. The limited timeframe kept the scope focused and left the desktop version outside the prototype.',
    },
    fr: {
      briefTitle: "Réunir le suivi quotidien d'un enfant au même endroit",
      contributionTitle: 'Concevoir et développer en deux semaines',
      contributionIntro:
        "Avec mes coéquipiers du Wagon, j'ai alterné entre design produit, intégration HTML/CSS et fonctionnalités backend pour transformer l'idée en une expérience mobile ciblée.",
      resultTitle: 'Un prototype mobile façonné par un délai serré',
      resultText:
        'Le projet a abouti à une expérience mobile fonctionnelle en deux semaines. Le temps limité a imposé un périmètre ciblé, sans version desktop pour ce prototype.',
    },
  },
  ollabotanicals: {
    en: {
      briefTitle: 'Bringing a cosmetics brand and its products online',
      contributionTitle: 'Pairing precise integration with expressive motion',
      contributionIntro:
        'At Maven, I translated the interface into production, added JavaScript animation and connected the experience to a Grav CMS for content management.',
      resultTitle: 'A product-led brand experience backed by a CMS',
      resultText:
        'The finished website presents the brand and its cosmetic range through a polished public interface that remains manageable behind the scenes.',
    },
    fr: {
      briefTitle:
        'Mettre en scène une marque cosmétique et ses produits en ligne',
      contributionTitle:
        'Associer une intégration précise à des animations expressives',
      contributionIntro:
        "Chez Maven, j'ai intégré l'interface en production, ajouté les animations JavaScript et relié l'expérience à un CMS Grav pour la gestion des contenus.",
      resultTitle:
        'Une expérience de marque centrée sur les produits et pilotée par CMS',
      resultText:
        'Le site final présente la marque et sa gamme cosmétique dans une interface publique soignée, tout en restant facile à administrer en coulisses.',
    },
  },
  'personnal-portfolio': {
    en: {
      briefTitle: 'Building a digital home for my work and skills',
      contributionTitle: 'Owning the interface from design to integration',
      contributionIntro:
        'This personal project gave me full responsibility for the visual direction and its implementation in React and Next.js.',
      resultTitle: 'A portfolio designed and built end to end',
      resultText:
        'The site brings my projects, experience and way of working together in one place—and continues to evolve alongside my practice.',
    },
    fr: {
      briefTitle: 'Créer un espace numérique pour mes projets et compétences',
      contributionTitle: "Porter l'interface du design jusqu'à l'intégration",
      contributionIntro:
        "Ce projet personnel m'a donné la responsabilité complète de la direction visuelle et de son implémentation avec React et Next.js.",
      resultTitle: 'Un portfolio conçu et développé de bout en bout',
      resultText:
        "Le site rassemble mes projets, mon expérience et ma manière de travailler au même endroit, et continue d'évoluer avec ma pratique.",
    },
  },
  'project-submission': {
    en: {
      briefTitle:
        'Simplifying project submissions for interns and administrators',
      contributionTitle: 'Connecting reusable UI with Laravel workflows',
      contributionIntro:
        'I built the frontend interactions and reusable components, then connected them to the CRUD operations that support submission and administration.',
      resultTitle: 'One flow for submitting and managing university projects',
      resultText:
        'The application supports both sides of the process in one interface. Names and visual details in the screenshots were changed to protect the original project’s privacy.',
    },
    fr: {
      briefTitle:
        'Simplifier les soumissions pour les stagiaires et les administrateurs',
      contributionTitle: 'Relier une UI réutilisable aux workflows Laravel',
      contributionIntro:
        "J'ai créé les interactions frontend et les composants réutilisables, puis je les ai reliés aux opérations CRUD nécessaires à la soumission et à l'administration.",
      resultTitle:
        'Un seul parcours pour soumettre et gérer les projets universitaires',
      resultText:
        "L'application accompagne les deux côtés du processus dans une même interface. Les noms et détails visuels des captures ont été modifiés pour préserver la confidentialité du projet original.",
    },
  },
  weebox: {
    en: {
      briefTitle: 'Bringing products, orders and customers into one workspace',
      contributionTitle: 'Building reusable components for daily operations',
      contributionIntro:
        'My work focused on the component system: defining reusable logic, styling the interface and implementing the pieces across the application.',
      resultTitle: 'A consistent interface for e-commerce management',
      resultText:
        'The application centralises the operational side of e-commerce in a component-driven interface designed around products, orders and customer data.',
    },
    fr: {
      briefTitle: 'Réunir produits, commandes et clients dans un même espace',
      contributionTitle:
        'Construire des composants réutilisables pour les opérations quotidiennes',
      contributionIntro:
        "Mon travail s'est concentré sur le système de composants : logique réutilisable, stylisation de l'interface et implémentation dans l'ensemble de l'application.",
      resultTitle: "Une interface cohérente pour la gestion d'un e-commerce",
      resultText:
        "L'application centralise les opérations e-commerce dans une interface construite par composants autour des produits, des commandes et des données clients.",
    },
  },
  'weebox-landing': {
    en: {
      briefTitle: 'Explaining an e-commerce platform through its brand website',
      contributionTitle:
        'Combining responsive integration, motion and CMS editing',
      contributionIntro:
        'I implemented the pages in HTML and SCSS, added GSAP animation and configured the Grav back office that supports ongoing content updates.',
      resultTitle: 'A marketing site built to introduce the platform',
      resultText:
        'The public website gives Weebox a dedicated place to explain its e-commerce offer through a branded, animated experience.',
    },
    fr: {
      briefTitle:
        'Présenter une plateforme e-commerce à travers son site de marque',
      contributionTitle:
        'Combiner intégration responsive, mouvement et édition par CMS',
      contributionIntro:
        "J'ai intégré les pages en HTML et SCSS, ajouté les animations GSAP et configuré le back-office Grav qui permet de faire évoluer les contenus.",
      resultTitle: 'Un site marketing conçu pour présenter la plateforme',
      resultText:
        'Le site public offre à Weebox un espace dédié pour expliquer son offre e-commerce dans une expérience de marque animée.',
    },
  },
  'data-management-platform': {
    en: {
      briefTitle: 'Making business data easier to find and act on',
      contributionTitle:
        'Building tested components around data-heavy workflows',
      contributionIntro:
        'I created the frontend logic and interface components, integrated the UI and added unit tests around the experience used to search, edit, save and export data.',
      resultTitle: 'A working interface for search, editing and export',
      resultText:
        'The application gives employees one place to work with company data. The interface and names shown here were changed to protect the original project’s privacy.',
    },
    fr: {
      briefTitle:
        'Rendre les données métier plus faciles à trouver et à exploiter',
      contributionTitle:
        'Construire des composants testés autour de workflows riches en données',
      contributionIntro:
        "J'ai créé la logique frontend et les composants d'interface, intégré l'UI et ajouté des tests unitaires autour des parcours de recherche, modification, sauvegarde et export.",
      resultTitle:
        'Une interface de travail pour rechercher, modifier et exporter',
      resultText:
        "L'application donne aux employés un seul espace pour travailler avec les données de l'entreprise. L'interface et les noms visibles ici ont été modifiés pour préserver la confidentialité du projet original.",
    },
  },
  latent: {
    en: {
      briefTitle: 'Supporting an award-winning conversational artwork',
      contributionTitle:
        'Refining the Vue experience and extending its features',
      contributionIntro:
        'I joined the project to support the Vue integration, improve the visual finish and add features around the student’s original concept.',
      resultTitle: 'A polished digital piece ready for exhibition',
      resultText:
        'The completed project went on to receive an ECAL award and be exhibited at Plateforme 10 in Lausanne.',
    },
    fr: {
      briefTitle: 'Accompagner une œuvre conversationnelle primée',
      contributionTitle:
        "Affiner l'expérience Vue et étendre ses fonctionnalités",
      contributionIntro:
        "J'ai rejoint le projet pour soutenir l'intégration Vue, améliorer les finitions visuelles et ajouter des fonctionnalités autour du concept original de l'étudiant.",
      resultTitle: "Une pièce numérique soignée, prête pour l'exposition",
      resultText:
        'Le projet final a remporté un prix ECAL et a été exposé à Plateforme 10 à Lausanne.',
    },
  },
  'yoga-center': {
    en: {
      briefTitle: 'Giving the studio a simple, welcoming online presence',
      contributionTitle: 'Integrating and maintaining the WordPress experience',
      contributionIntro:
        'At YantraConnection, I handled the WordPress integration, SCSS styling and the updates needed to keep the website current.',
      resultTitle: 'A straightforward showcase for the Yoga Center brand',
      resultText:
        'The finished site gives the studio a focused public presence where visitors can discover the brand and its offering.',
    },
    fr: {
      briefTitle:
        'Offrir au studio une présence en ligne simple et accueillante',
      contributionTitle: "Intégrer et maintenir l'expérience WordPress",
      contributionIntro:
        "Chez YantraConnection, j'ai pris en charge l'intégration WordPress, le style SCSS et les mises à jour nécessaires pour garder le site actuel.",
      resultTitle: 'Une vitrine claire pour la marque Yoga Center',
      resultText:
        'Le site final offre au studio une présence publique ciblée où les visiteurs peuvent découvrir la marque et son offre.',
    },
  },
};

export default Projects.map(project => ({
  ...project,
  caseStudy: projectStories[project.id],
}));
