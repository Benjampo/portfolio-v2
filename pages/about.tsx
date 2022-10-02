import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Card from '../components/Card';

import Socials from '../data/Socials';
import Techs from './../data/Techs';
import Studies from './../data/Studies';
import Works from './../data/Works';

import Mail from './../assets/images/mail.png';
import Resume from './../assets/images/resume.png';
import Profile from './../assets/icons/yes.png';

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
            exit={{ opacity: 0 }}
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
            <Card className=" col-start-1 col-end-3 xl:box xl:col-start-3 xl:col-end-5 xl:row-start-1 xl:row-end-3 block flex flex-col-reverse md:flex-row">
                <div className="px-5">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h2 className="font-normal text-2xl whitespace-nowrap">
                                My name is Benjamin
                            </h2>
                            <h3 className="font-normal text-xl whitespace-nowrap text-gray-400">
                                I’m a front-end developper
                            </h3>
                        </div>
                        <div className="h-full w-1/3 ">
                            <figure className="rounded-full   ">
                                <Image src={Profile} />
                            </figure>
                        </div>
                    </div>

                    <p className="font-normal  ">
                        Front-end Developer applications oriented . 23 years old, I am passionate
                        about creating and implementing solutions that make users lives easier.{' '}
                        <span className="block mb-2" />I started my journey as a Front-end Developer
                        in 2017, while studying at CPNV in Switzerland. In 2020 I did a bootcamp of
                        coding to improve my backend skills.
                        <span className="block mb-2" /> After that I started a new job at maven
                        while doing little projects for other teams and clients.
                    </p>
                </div>
            </Card>
            <Card className="col-start-1 col-end-3 xl:box xl:col-start-1 xl:col-end-3 ">
                <h2 className="text-xl font-medium xl:text-3xl">Currently working</h2>
                <a
                    className="text-gray-300 font-bold hover:text-blue-400 text-6xl xl:text-8xl transition-all hover:font-black"
                    href="https://maven.ch/fr"
                    target="_blank"
                    rel="noreferrer">
                    @maven
                </a>
            </Card>

            <Card
                id="my-stack"
                className="col-start-1 col-end-3 xl:box xl:col-start-3 xl:col-end-5">
                <h2 className="text-xl font-medium mb-3 xl:text-3xl">Tech stack</h2>
                <ul className="  flex flex-wrap gap-2">
                    {Techs.map((tech, index) => (
                        <li
                            key={index}
                            className="border cursor-pointer rounded-full px-4 py-1 w-fit hover:bg-black hover:text-white hover:scale-110 transition-all">
                            <a href={tech.url} rel="noreferrer" target="_blank">
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
                <motion.figure whileHover={{ scale: 1.2 }} className="cursor-pointer">
                    <Image src={Resume} alt="Resume button" width={60} height={60} />
                </motion.figure>

                <h2 className="text-xl font-medium whitespace-nowrap xl:text-2xl xl:mt-1">
                    Get my resume
                </h2>
            </Card>
            <Link className="xl:box xl:row-start-4 xl:col-start-2" href="/contact">
                <Card
                    className="flex flex-col items-center gap-1 justify-between xl:justify-center"
                    id="contact-card">
                    <motion.figure whileHover={{ scale: 1.2 }} className="cursor-pointer">
                        <Image src={Mail} alt="Mail button" width={60} height={60} />
                    </motion.figure>
                    <h2 className="text-xl font-medium xl:text-2xl xl:mt-1">Drop me a line</h2>
                </Card>
            </Link>

            <Card
                id="my-socials"
                className="col-start-1 col-end-3 flex flex-row-reverse items-center justify-around xl:box xl:row-start-3 xl:col-start-2 xl:flex-col xl:justify-center">
                <ul className="flex flex-row justify-center gap-5 ">
                    {Socials.map((social, index) => (
                        <motion.li
                            className="cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                            key={index}>
                            <Image alt={social.label} src={social.icon} width={48} />
                        </motion.li>
                    ))}
                </ul>
                <h2 className="text-xl font-medium xl:text-2xl">Follow me</h2>
            </Card>
        </motion.section>
    );
}

export default About;
