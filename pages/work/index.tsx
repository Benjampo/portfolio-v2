import React from 'react';
import Projects from '../../data/projects';
import ProjectCard from '../../components/ProjectCard';
import { motion } from 'framer-motion';
function Index() {
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
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                transition={{ delay: 0.1 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-6xl text-center grid-snap-2 my-6 xl:box xl:col-start-1 xl:col-end-3 xl:text-left xl:text-9xl">
                Work
            </motion.h1>
            <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="grid  lg:grid-cols-2  lg:grid-rows-2 gap-12">
                {Projects.map((project: any, index: number) => (
                    <motion.li
                        className="cursor-pointer"
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}>
                        <h1 className="text-gray-400 text-base font-normal">{project.title}</h1>
                        <h2 className="text-gray-300 text-base font-normal mb-4">
                            {project.subtitle}
                        </h2>
                        <ProjectCard row={''} span={'box'} key={project.id} project={project} />
                    </motion.li>
                ))}
            </motion.ul>
        </motion.section>
    );
}

export default Index;
