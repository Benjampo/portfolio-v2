import React from 'react';
import ProjectCard from '../components/ProjectCard';
import Card from '../components/Card';
import Socials from '../data/Socials';
import Image from 'next/image';
import Mail from './../assets/images/mail.png';
import Resume from './../assets/images/resume.png';
import Techs from './../data/Techs';
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
                    <h2>Currently working</h2>
                    <a href="https://maven.ch/fr" target="_blank">
                        @maven
                    </a>
                </Card>
                <Card id="my-resume">
                    <Image src={Resume} />
                    <h2>Get my resume</h2>
                </Card>
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
                <Card id="contact-card">
                    <Image src={Mail} />
                    <h2>Drop me a line</h2>
                </Card>
                <Card id="my-stack">
                    <h2>Tech stack</h2>
                    <ul>
                        {Techs.map((tech) => (
                            <li>{tech.label}</li>
                        ))}
                    </ul>
                </Card>
                <Card id="work">
                    <h2>Tech stac</h2>
                </Card>
            </div>
        </section>
    );
}

export default About;
