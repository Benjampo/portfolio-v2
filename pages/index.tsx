import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import benjampo from './../assets/images/benjampo.png';
import ProjectCard from '../components/ProjectCard';
import Projects from '../data/projects';
import Link from 'next/link';
import React from 'react';
const Home: NextPage = () => {
    return (
        <div className="px-0">
            <Head>
                <title>Benjampo</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section>
                <Image src={benjampo} />
                <span className="block m-auto font-bold text-5xl text-center">Hello World</span>
                <h1 className="font-semibold text-2xl text-center text-gray-400">
                    I’m Benjamin Front-End developper
                </h1>
            </section>
            <section>
                <ul className=" flex flex-col gap-10">
                    {Projects.filter((project, index) => {
                        return index < 4;
                    }).map((project: any, index) => (
                        <li className=" ">
                            <article className="flex flex-col md:flex-row">
                                <div className="md:w-1/3">
                                    <h1>{project.title}</h1>
                                    <h2>{project.subtitle}</h2>
                                </div>
                                <div className="w-full md:w-2/3 h-96  rounded-xl border-blue-200 border-2 p-4 my-shadow">
                                    <Image />
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
