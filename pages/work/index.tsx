import { motion } from 'framer-motion';
import Head from 'next/head';
import ProjectCard from '../../components/ProjectCard';
import Projects from '../../data/projects';

function Index() {
  return (
    <motion.section>
      <Head>
        <title>Benjamin Porchet | Work</title>
      </Head>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='font-bold text-7xl md:text-[11rem] leading-none tracking-tight mb-16'
      >
        Work
      </motion.h1>

      <motion.ul className='grid lg:grid-cols-2 gap-10'>
        {Projects.map((project: any, index: number) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className='mb-3'>
              <span className='text-xs font-semibold uppercase tracking-wider text-black/50'>
                {project.title}
              </span>
              <p className='text-[11px] text-black/40'>
                {project.subtitle}
              </p>
            </div>
            <ProjectCard row='' span='box' project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

export default Index;
