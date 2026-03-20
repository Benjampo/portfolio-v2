import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import Router from 'next/router';
import { useRef } from 'react';
import Projects from '../../data/projects';

function ParallaxImage({ src, alt, className, speed = 0.15 }: { src: any; alt: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [speed * -200, speed * 200]);
  const y = useSpring(rawY, { stiffness: 100, damping: 25, mass: 0.6 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

  return (
    <div ref={ref} className={`rounded-[22px] overflow-hidden ${className || ''}`}
      style={{ boxShadow: '0 8px 40px rgba(100,160,220,0.1), 0 0 0 1px rgba(255,255,255,0.5)' }}
    >
      <div className='relative w-full h-full overflow-hidden'>
        <motion.div
          className='absolute'
          style={{
            top: '-20%', left: '-5%', right: '-5%', bottom: '-20%',
            y,
            scale,
            willChange: 'transform',
          }}
        >
          <Image
            priority
            layout='fill'
            src={src}
            objectFit='cover'
            alt={alt}
            placeholder='blur'
          />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectNav({ project }: { project: any }) {
  const currentIndex = Projects.findIndex((p: any) => p.id === project.id);
  const prevProject = currentIndex > 0 ? Projects[currentIndex - 1] : null;
  const nextProject = currentIndex < Projects.length - 1 ? Projects[currentIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='border-t border-black/[0.06] pt-12 mt-20'
    >
      <span className='text-[11px] uppercase tracking-[0.2em] text-black/40 font-semibold block mb-6'>More work</span>
      <div className='flex justify-between items-center'>
        {prevProject ? (
          <Link href={`/work/${prevProject.id}`}>
            <motion.span
              whileHover={{ x: -4 }}
              className='text-lg font-semibold text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors duration-300 cursor-pointer flex items-center gap-3'
            >
              <ArrowLeftIcon className='w-4 h-4' />
              {prevProject.title}
            </motion.span>
          </Link>
        ) : <div />}
        {nextProject ? (
          <Link href={`/work/${nextProject.id}`}>
            <motion.span
              whileHover={{ x: 4 }}
              className='text-lg font-semibold text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors duration-300 cursor-pointer flex items-center gap-3'
            >
              {nextProject.title}
              <ArrowLeftIcon className='w-4 h-4 rotate-180' />
            </motion.span>
          </Link>
        ) : <div />}
      </div>
    </motion.div>
  );
}

export function Project({ data }: any) {
  const project = data[0];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>{project.title} | Benjamin Porchet</title>
      </Head>

      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        className='mb-10 text-black/40 hover:text-black transition-colors cursor-pointer flex items-center gap-2 text-sm'
        onClick={() => Router.back()}
      >
        <ArrowLeftIcon className='w-4 h-4' />
        <span>Back</span>
      </motion.button>

      {/* Hero image — full bleed */}
      <ParallaxImage
        src={project.coverSrc}
        alt={`Main image of ${project.title}`}
        className='h-[18rem] md:h-[48rem] -mx-6 md:-mx-16 xl:-mx-24'
        speed={0.2}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className='mt-10 md:mt-14 max-w-3xl'
      >
        <span className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'>
          {project.subtitle}
        </span>
        <h1 className='font-bold text-3xl md:text-5xl tracking-tight mt-4'>
          {project.title}
        </h1>
        <div className='flex flex-wrap gap-2 mt-5'>
          {project.tech.map((tech: string, index: number) => (
            <span className='pill pointer-events-none text-xs' key={index}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className='grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 mt-16 md:mt-20 max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'>Context</span>
          <p className='text-black/60 text-base md:text-lg leading-relaxed mt-4'>{project.context}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className='text-[11px] uppercase tracking-[0.2em] text-black/45 font-semibold'>What I did</span>
          <ul className='mt-4 space-y-2.5'>
            {project.tasks.map((task: string, index: number) => (
              <li className='flex items-start gap-3 text-black/60 text-base md:text-lg' key={index}>
                <span className='mt-2.5 w-1 h-1 rounded-full bg-black/30 flex-shrink-0' />
                {task}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Secondary images */}
      <div className='grid md:grid-cols-2 gap-6 mt-16 md:mt-24'>
        <ParallaxImage
          src={project.secSrc}
          alt={`Second image of ${project.title}`}
          className='h-[14rem] md:h-[32rem]'
          speed={0.12}
        />
        <ParallaxImage
          src={project.thirdSrc}
          alt={`Third image of ${project.title}`}
          className='h-[14rem] md:h-[32rem]'
          speed={0.18}
        />
      </div>

      {/* Info (if no URL) */}
      {project.info && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='text-center text-black/40 text-sm mt-10'
        >
          {project.info}
        </motion.p>
      )}

      {/* Visit website CTA */}
      {project.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='flex justify-center mt-16 md:mt-20'
        >
          <motion.a
            href={project.url}
            target='_blank'
            rel='noreferrer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-block glass-card text-[#1a1a2e] text-sm font-medium px-8 py-4 rounded-full cursor-pointer'
          >
            Visit website
          </motion.a>
        </motion.div>
      )}

      {/* Prev / Next navigation */}
      <ProjectNav project={project} />
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
