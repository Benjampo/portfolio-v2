import greubel from '../assets/images/projects/greubel/greub_fold.png';
import greubel2 from '../assets/images/projects/greubel/greub1.png';
import greubel3 from '../assets/images/projects/greubel/greub2.png';

import yc from '../assets/images/projects/yc/yc.png';
import yc2 from '../assets/images/projects/yc/yc-2.png';
import yc3 from '../assets/images/projects/yc/yc-3.png';

import olla from '../assets/images/projects/olla/olla1.png';
import olla2 from '../assets/images/projects/olla/olla2.png';
import olla3 from '../assets/images/projects/olla/olla3.png';

import wb from '../assets/images/projects/wb/wb.png';
import wb2 from '../assets/images/projects/wb/wb2.png';
import wb3 from '../assets/images/projects/wb/wb3.png';

import kodo from '../assets/images/projects/kodo/kodo1.png';
import kodo2 from '../assets/images/projects/kodo/kodo2.png';
import kodo3 from '../assets/images/projects/kodo/kodo3.png';

import latent from '../assets/images/projects/latent/latent.png';
import latent2 from '../assets/images/projects/latent/latent2.png';
import latent3 from '../assets/images/projects/latent/latent3.png';

import port from '../assets/images/projects/portfolio/port.png';
import port2 from '../assets/images/projects/portfolio/port2.png';
import port3 from '../assets/images/projects/portfolio/port3.png';

import data from '../assets/images/projects/data/data1.png';
import data2 from '../assets/images/projects/data/data2.png';
import data3 from '../assets/images/projects/data/data3.png';

import form from '../assets/images/projects/form/form1.png';
import form2 from '../assets/images/projects/form/form2.png';
import form3 from '../assets/images/projects/form/form3.png';

import wbx from '../assets/images/projects/wbx/wbx1.png';
import wbx2 from '../assets/images/projects/wbx/wbx2.png';
import wbx3 from '../assets/images/projects/wbx/wbx3.png';

const Projects = [
    {
        id: 'greubel-forsey',
        title: 'Greubel Forsey',
        coverSrc: greubel,
        secSrc: greubel2,
        thirdSrc: greubel3,
        url: 'https://www.greubelforsey.com/en',
        subtitle: 'Brand Website',
        context:
            'Website made while working at maven. Most of the website was already mounted, i mainly did all the js animations and helped on the SCSS on a few pages',
        tasks: ['GSAP animations', 'SCSS and a part of Twig', 'Webiste updates and maintenance'],
        tech: ['HTML', 'SCSS', 'GSAP', 'Jquery', 'Grav CMS']
    },
    {
        id: 'kodomo',
        title: 'Kodomo',
        coverSrc: kodo,
        secSrc: kodo2,
        thirdSrc: kodo3,
        url: 'https://kodomo-altrngo.herokuapp.com/',
        subtitle: 'Web app',
        context:
            'Web app made in two weeks with my colleagues from LeWagon. ' +
            'The purpose was to create an application to track all kind of data about your child. ' +
            'Because of the time and the learning proccess, we did not made the desktop version of it.',
        tasks: ['HTML and CSS Implementation', 'Design of the App', 'Back-end features'],
        tech: ['Ruby', 'Ruby on Rails', 'Bootstrap', 'CSS']
    },
    {
        id: 'weebox-landing',
        title: 'Weebox',
        coverSrc: wb,
        secSrc: wb2,
        thirdSrc: wb3,
        info: 'Website still on validation by the content team, so no public URL for now',
        subtitle: 'Brand Website',
        context: 'Website to promote the E-commerce platform weebox',
        tasks: [
            'Integration in SCSS and HTML',
            'Js animations using GSAP',
            'Grav CMS backoffice implementation'
        ],
        tech: ['HTML', 'SCSS', 'GSAP', 'Grav CMS', 'Grav CMS']
    },
    {
        id: 'weebox',
        title: 'Weebox',
        coverSrc: wbx,
        secSrc: wbx2,
        thirdSrc: wbx3,
        subtitle: 'Web App',
        context: 'Web app used to manage e-commerce products, orders, clients',
        tasks: [
            'Creation of reusable components logic',
            'Components styling',
            'Components implementation'
        ],
        tech: ['VueJS', 'Laravel', 'PHP']
    },
    {
        id: 'project-submission',
        title: 'Project submission platform',
        coverSrc: form3,
        secSrc: form2,
        thirdSrc: form,
        subtitle: 'Web app',
        context:
            'Web app made for an university allowing interns to submit projects and for admin to manage the submissions. For privacy reasons, UI and names have been changed on screenshots',
        tasks: [
            'Creation of front-end interactions',
            'Creation of reusable components',
            'Laravel CRUD features'
        ],
        tech: ['VueJS', 'Laravel', 'SCSS', 'WordPress']
    },
    {
        id: 'data-management-platform',
        title: 'Data management Platform',
        coverSrc: data,
        secSrc: data2,
        thirdSrc: data3,
        subtitle: 'Web app',
        context:
            'Web app made for an international company allowing employees to search, edit, save and export data. For privacy reasons, UI and names have been changed on screenshots',
        tasks: [
            'Creation of components',
            'Creation of unit tests',
            'Integration of UI',
            'Creation of Front-end Logic'
        ],
        tech: ['ReactJs', 'SCSS', 'Webpack']
    },
    {
        id: 'ollabotanicals',
        title: 'Olla Botanicals',
        coverSrc: olla,
        secSrc: olla2,
        thirdSrc: olla3,
        url: 'https://ollabotanicals.com/fr',
        subtitle: 'Brand Website',
        context:
            'Website made while working at maven. The purpose was to showcase product of a cosmetic brand to the public.',
        tasks: ['JS animations', 'UI Integration', 'Back-office with Grav CMS'],
        tech: ['HTML', 'SCSS', 'GSAP', 'Jquery', 'Grav CMS']
    },
    {
        id: 'personnal-portfolio',
        title: 'Personnal Portfolio',
        coverSrc: port,
        secSrc: port2,
        thirdSrc: port3,
        url: 'https://www.benjampo.ch',
        subtitle: 'Personnal Website',
        context: 'Reealisation of my personnal website to showcase my work and skills',
        tasks: ['UI creation', 'UI integrations'],
        tech: ['ReactJS', 'NextJS']
    },
    {
        id: 'latent',
        title: 'Latent',
        coverSrc: latent,
        secSrc: latent2,
        thirdSrc: latent3,
        subtitle: 'Brand Website',
        context: 'Chat app made by a ECAL student',
        tasks: ['Helping on VueJs Integration', 'Imporving styling', 'Adding features'],
        tech: ['VueJS', 'SCSS']
    },
    {
        id: 'yoga-center',
        title: 'Yoga Center',
        coverSrc: yc,
        secSrc: yc2,
        thirdSrc: yc3,
        url: 'https://yogacenter.ch/',
        subtitle: 'Brand Website',
        context:
            'Website made while working at YantraConnection. The purpose was to showcase the brand with a simple website',
        tasks: ['Integration in Wordpress', 'SCSS and styling', 'Webiste updates and maintenance'],
        tech: ['HTML', 'SCSS', 'Wordpress']
    }
];

export default Projects;
