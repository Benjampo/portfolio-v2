import React from 'react';
import Image from 'next/image';
import benjampo from '../assets/images/benjampo.png';
import Link from 'next/link';
type CardProps = {
    span: string;
    row: string;
    project: {
        id: string;
        coverSrc: string;
        title: string;
        subtitle: string;
    };
};

function ProjectCard({ project, span, row }: CardProps) {
    return (
        <li
            className={` w-full h-48 bg-white rounded-xl border-blue-200 border-2 p-4 cursor-pointer my-shadow ${span} ${row} `}>
            <Link key={project.id} href={`/projects/${project.id}`}>
                <article className="h-full flex flex-col">
                    <Image src={project.coverSrc} />
                    <h1 className="font-medium text-base">{project.title}</h1>
                    <span className="text-gray-400 text-base">{project.subtitle}</span>
                </article>
            </Link>
        </li>
    );
}

export default ProjectCard;
