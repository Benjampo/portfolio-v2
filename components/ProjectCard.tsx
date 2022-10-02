import React from 'react';
import Image from 'next/image';
import benjampo from '../assets/images/benjampo.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    const item = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0 }
    };
    return (
        <motion.div whileHover={{ scale: 1.02 }} variants={item}>
            <Link key={project.id} href={`/work/${project.id}`}>
                <article className=" relative w-full  h-[20rem] rounded-xl my-shadow overflow-hidden my-shadow">
                    <figure className=" h-96">
                        <Image
                            layout={'fill'}
                            objectFit={'cover'}
                            src={project.coverSrc}
                            alt={`${project.title} main image`}
                        />
                    </figure>
                    <div className="py-3">
                        <h1 className="font-medium text-base">{project.title}</h1>
                        <span className="text-gray-400 text-base">{project.subtitle}</span>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}

export default ProjectCard;
