import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Image from "next/legacy/image";
import Router from 'next/router';
import { useRef } from 'react';
import Projects from '../../data/projects';

function ParallaxImage({ src, alt, delay, className }: { src: any; alt: string; delay: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`image-card ${className || ''}`}
    >
      <figure className='relative w-full h-full overflow-hidden'>
        <motion.div className='absolute inset-[-20%]' style={{ y }}>
          <Image
            priority
            layout='fill'
            src={src}
            objectFit='cover'
            alt={alt}
            placeholder='blur'
          />
        </motion.div>
      </figure>
    </motion.div>
  );
}

export function Project({ data }: any) {
  const project = data[0];

  return (
    <motion.section className='my-4'>
      <Head>
        <title>{project.title} | Benjamin Porchet</title>
      </Head>

      <motion.button
        whileHover={{ scale: 1.05, x: -3 }}
        whileTap={{ scale: 0.9 }}
        className='mb-6 text-black/30 hover:text-black transition-colors cursor-pointer flex items-center gap-2 text-sm'
        onClick={() => Router.back()}
      >
        <ArrowLeftIcon className='w-4 h-4' />
        <span>Back</span>
      </motion.button>

      <div className='mb-10'>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'
        >
          {project.subtitle}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='font-bold text-4xl md:text-6xl tracking-tight mt-2 mb-4'
        >
          {project.title}
        </motion.h1>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='flex flex-wrap gap-2'
        >
          {project.tech.map((tech: string, index: number) => (
            <li className='pill pointer-events-none text-xs' key={index}>
              {tech}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <ParallaxImage
          src={project.coverSrc}
          alt={`Main image of ${project.title}`}
          delay={0.3}
          className='col-span-4 h-[16rem] md:h-[42rem]'
        />
        <ParallaxImage
          src={project.secSrc}
          alt={`Second image of ${project.title}`}
          delay={0.4}
          className='col-span-4 lg:col-span-2 h-[14rem] md:h-[30rem]'
        />
        <ParallaxImage
          src={project.thirdSrc}
          alt={`Third image of ${project.title}`}
          delay={0.5}
          className='col-span-4 lg:col-span-2 h-[14rem] md:h-[30rem]'
        />
      </div>

      {/* Content — no cards, just open layout */}
      <div className='md:flex gap-16 mt-16'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='md:w-1/2 mb-10'
        >
          <span className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'>Context</span>
          <p className='text-black/60 text-lg leading-relaxed mt-4'>{project.context}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='md:w-1/2 mb-10'
        >
          <span className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'>What I did</span>
          <ul className='mt-4 space-y-3'>
            {project.tasks.map((task: string, index: number) => (
              <li className='flex items-start gap-3 text-black/60 text-lg' key={index}>
                <span className='mt-2.5 w-1 h-1 rounded-full bg-black/30 flex-shrink-0' />
                {task}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className='flex w-full items-center justify-center mt-8 mb-8'>
        {project.url && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-black text-white text-sm font-medium px-8 py-4 rounded-full inline-block'
            href={project.url}
            target='_blank'
            rel='noreferrer'
          >
            Visit website
          </motion.a>
        )}
        {project.info && (
          <span className='text-black/45 text-lg'>{project.info}</span>
        )}
      </div>
    </motion.section>
  );
}

export async function getStaticPaths() {
  const paths = Projects.map(item => ({ params: { id: item.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const data = Projects.filter(item => item.id === params.id);
  return { props: { data } };
}

export default Project;
