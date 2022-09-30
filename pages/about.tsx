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
function About() {
    return (
        <section>
            <h1 className="font-bold text-6xl text-center my-6 ">About</h1>
            <div className="grid gap-5">
                <Card>
                    <h2>My name is Benjamin</h2>
                    <h3>I’m a front-end developper</h3>
                    <p>
                        . Bla bla bla blblablalbalbalbaablaba. MKSDMKBMVBMSBSDb fsdmgdfmgkmfd
                        MDVKMSDKLVDMS fsdf fsf sf dsf sd fs sf BKDSMKBDMKDS. Bla bla
                        blablblablalbalbalbaablaba. MKSDMKBMVBMSBSDb. MDVKMSDKLVDMS BKDSMKBDMKDS
                    </p>
                </Card>
                <Card>
                    <h2 className="text-black font-medium">Currently working</h2>
                    <a
                        className="text-gray-300 font-bold hover:text-blue-400 text-6xl"
                        href="https://maven.ch/fr"
                        target="_blank">
                        @maven
                    </a>
                </Card>
                <div className="flex gap-5">
                    <Card
                        className="flex flex-col items-center gap-1 justify-between"
                        id="my-resume">
                        <Image className="mt-1" src={Resume} width={100} height={100} />
                        <h2>Get my resume</h2>
                    </Card>
                    <Link href="/contact">
                        <Card
                            className="flex flex-col items-center gap-1 justify-between"
                            id="contact-card">
                            <Image src={Mail} width={128} height={128} />
                            <h2>Drop me a line</h2>
                        </Card>
                    </Link>
                </div>
                <Card id="my-socials">
                    <ul className="flex flex-row justify-center gap-5">
                        {Socials.map((social) => (
                            <li>
                                <Image src={social.icon} />
                            </li>
                        ))}
                    </ul>
                    <h2>Follow me</h2>
                </Card>
                <Card id="my-stack">
                    <h2>Tech stack</h2>
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
                <Card id="work">
                    <h2 className="font-medium text-2xl mb-2">Work</h2>
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
            </div>
        </section>
    );
}

export default About;
