import React from 'react';
import Projects from '../../data/projects';
import ProjectCard from '../../components/ProjectCard';

function Index() {
    return (
        <section>
            <h1 className="font-bold text-6xl text-center my-6 ">Work</h1>
            <ul className="grid md:grid-flow-col md:grid-cols-4  md:grid-rows-4 gap-4 md:grid-flow-row ">
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
            </ul>
        </section>
    );
}

export default Index;
