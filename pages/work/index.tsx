import React from 'react';
import Projects from '../../data/projects';
import ProjectCard from '../../components/ProjectCard';

function Index() {
    const randomSpan = () => {
        return Math.floor(Math.random() * 3);
    };
    const randomRow = () => {
        return Math.floor(Math.random() * 2);
    };
    return (
        <section className="px-6">
            <ul
                className={
                    'grid md:grid-flow-col md:grid-cols-4 md:grid-rows-3  gap-3 md:grid-flow-row md:grid-auto-dense'
                }>
                <li className="md:col-span-2">
                    <h1>Work</h1>
                </li>
                {Projects.map((project) => (
                    <ProjectCard
                        span={`md:col-span-${randomSpan()}`}
                        key={project.id}
                        project={project}
                    />
                ))}
            </ul>
        </section>
    );
}

export default Index;
