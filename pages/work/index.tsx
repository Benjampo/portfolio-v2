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
        <section>
            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                transition={{ delay: 0.1 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-6xl text-center my-6 ">
                Work
            </motion.h1>
            <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-flow-col md:grid-cols-4  md:grid-rows-4 gap-4 md:grid-flow-row ">
                {Projects.map((project: any, index) =>
                    [1, 2, 6, 4].includes(index) ? (
                        <ProjectCard
                            row={''}
                            span={'md:col-span-2'}
                            key={project.id}
                            project={project}
                        />
                    ) : (
                        <ProjectCard row={''} span={''} key={project.id} project={project} />
                    )
                )}
            </motion.ul>
        </section>
    );
}

export default Index;
