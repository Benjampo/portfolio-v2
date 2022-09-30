import React from 'react';
import ProjectCard from '../components/ProjectCard';
import Card from '../components/Card';
import Socials from '../data/Socials';
import Image from 'next/image';
import Mail from './../assets/images/mail.png';
import Resume from './../assets/images/resume.png';
import Techs from './../data/Techs';
import Studies from './../data/Studies';
import Works from './../data/Works';
import Link from 'next/link';
import { motion } from 'framer-motion';
function About() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,

            transition: {
                delay: 0.25,
                staggerChildren: 0.05
            }
        }
    };
    const item = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="grid overflow-hidden grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-5">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.1 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-6xl col-start-1 col-end-3 text-center grid-snap-2 my-6 xl:box xl:col-start-1 xl:col-end-3 xl:text-left xl:text-9xl">
                About
            </motion.h1>
            <Card className=" col-start-1 col-end-3 xl:box xl:col-start-3 xl:col-end-5 xl:row-start-1 xl:row-end-3">
                <h2 className="font-medium text-xl">My name is Benjamin</h2>
                <h3 className="font-medium text-gray-400">I’m a front-end developper</h3>
                <p className="font-normal  mt-2">
                    Front-end web developer applications oriented . 23 years old, I am passionate
                    about creating and implementing solutions that make users' lives easier.
                </p>
            </Card>
            <Card className="col-start-1 col-end-3 xl:box xl:col-start-1 xl:col-end-3 ">
                <h2 className="text-xl font-medium xl:text-3xl">Currently working</h2>
                <a
                    className="text-gray-300 font-bold hover:text-blue-400 text-6xl xl:text-8xl"
                    href="https://maven.ch/fr"
                    target="_blank">
                    @maven
                </a>
            </Card>

            <Card
                id="my-stack"
                className="col-start-1 col-end-3 xl:box xl:col-start-3 xl:col-end-5">
                <h2 className="text-xl font-medium mb-3 xl:text-3xl">Tech stack</h2>
                <ul className="flex flex-wrap gap-2">
                    {Techs.map((tech) => (
                        <li className="border rounded-full px-4 py-1 w-fit hover:bg-black hover:text-white">
                            <a href={tech.url} target="_blank">
                                {tech.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card
                className="col-start-1 col-end-3 xl:box xl:col-start-3 xl:col-end-5 xl:row-start-4 xl:row-end-7"
                id="work">
                <h2 className="font-medium text-2xl mb-2 xl:text-3xl">Work</h2>
                <ul className="flex flex-col gap-3">
                    {Works.map((work) => (
                        <li key={work.id}>
                            <h4 className="inline font-medium text-xl text-gray-400 mr-2">
                                {work.year}
                            </h4>

                            <h3 className=" inline text-xl font-medium">{work.title}</h3>
                            <p className="">{work.description}</p>
                        </li>
                    ))}
                </ul>
                <h2 className="font-medium text-2xl mb-2 mt-6">Studies</h2>
                <ul className="flex flex-col gap-1">
                    {Studies.map((study) => (
                        <li key={study.id}>
                            <h4 className="inline text-xl font-medium  text-gray-400 mr-2">
                                {study.year}
                            </h4>
                            <h3 className=" inline text-xl font-medium">{study.title}</h3>
                            <p className="mt-1">{study.description}</p>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card
                className="flex flex-col items-center gap-1 justify-between xl:box xl:row-start-3 xl:justify-center"
                id="my-resume">
                <Image src={Resume} width={60} height={60} />
                <h2 className="text-xl font-medium whitespace-nowrap xl:text-2xl xl:mt-1">
                    Get my resume
                </h2>
            </Card>
            <Link className="xl:box xl:row-start-4 xl:col-start-2" href="/contact">
                <Card
                    className="flex flex-col items-center gap-1 justify-between xl:justify-center"
                    id="contact-card">
                    <Image src={Mail} width={60} height={60} />
                    <h2 className="text-xl font-medium xl:text-2xl xl:mt-1">Drop me a line</h2>
                </Card>
            </Link>

            <Card
                id="my-socials"
                className="col-start-1 col-end-3 flex flex-row-reverse items-center justify-around xl:box xl:row-start-3 xl:col-start-2 xl:flex-col xl:justify-center">
                <ul className="flex flex-row justify-center gap-5 ">
                    {Socials.map((social, index) => (
                        <li key={index}>
                            <Image src={social.icon} width={48} />
                        </li>
                    ))}
                </ul>
                <h2 className="text-xl font-medium xl:text-2xl">Follow me</h2>
            </Card>
        </motion.section>
    );
}

export default About;
