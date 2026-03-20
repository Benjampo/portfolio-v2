import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef } from 'react';
import Projects from '../data/projects';
import benjampo from './../assets/benjampo_gif.gif';

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className='inline-block'
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className='perspective-container'>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className='rounded-[22px] overflow-hidden inline-block'
      >
        <Image src={benjampo} priority alt='Benjamin' />
      </motion.div>
    </div>
  );
}

function ProjectItem({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const isEven = index % 2 === 0;

  return (
    <motion.li ref={ref} className='relative'>
      <Link href={`/work/${project.id}`}>
        <article className={`group relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center`}>
          {/* Image with parallax */}
          <div className='w-full md:w-[62%] relative z-10'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className='image-card cursor-pointer relative overflow-hidden'
            >
              <figure className='relative w-full h-[14rem] md:h-[28rem] overflow-hidden'>
                <motion.div className='absolute inset-0' style={{ y: imgY }}>
                  <div className='absolute inset-[-15%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]'>
                    <Image
                      layout='fill'
                      objectFit='cover'
                      src={project.coverSrc}
                      priority={index === 0}
                      alt={project.title}
                      placeholder='blur'
                    />
                  </div>
                </motion.div>
                <div className='absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
              </figure>
            </motion.div>
          </div>

          {/* Project info */}
          <div className={`w-full md:w-[38%] relative z-10 flex flex-col gap-4 ${isEven ? 'md:pl-2' : 'md:pr-2'}`}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className='flex flex-col gap-3'
            >
              <span className='font-bold text-3xl md:text-4xl text-[#1a1a2e]/90 leading-tight'>
                {project.title}
              </span>
              <span className='text-xs uppercase tracking-[0.2em] text-[#1a1a2e]/40 font-medium'>
                {project.subtitle}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className='text-sm text-[#1a1a2e]/50 leading-relaxed line-clamp-3 hidden md:block'
            >
              {project.context}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className='flex flex-wrap gap-2 mt-1'
            >
              {project.tech.slice(0, 4).map((t: string) => (
                <span key={t} className='text-[0.65rem] uppercase tracking-wider text-[#1a1a2e]/35 border border-[#1a1a2e]/10 rounded-full px-3 py-1 transition-colors duration-300 group-hover:text-[#1a1a2e]/60 group-hover:border-[#1a1a2e]/25'>
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              viewport={{ once: true }}
              className='inline-flex items-center gap-2 text-xs font-medium text-[#1a1a2e]/30 group-hover:text-[#1a1a2e]/70 transition-all duration-500 mt-2'
            >
              <span className='group-hover:tracking-wider transition-all duration-500'>View project</span>
              <svg className='w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </motion.span>
          </div>
        </article>
      </Link>
    </motion.li>
  );
}

const Home: NextPage = () => {
  return (
    <motion.section className='flex flex-col'>
      <Head>
        <title>Benjamin Porchet | Full-stack Developer</title>
      </Head>

      {/* Hero */}
      <section className='min-h-[65vh] flex flex-col justify-center items-center gap-8 mb-16'>
        <HeroImage />
        <div className='text-center overflow-hidden'>
          <h1 className='font-bold text-6xl md:text-8xl tracking-tight'>
            <SplitText text='Hello' delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='mt-4 text-lg md:text-xl text-[#1a1a2e]/60 font-light'
          >
            I'm Benjamin, Full-Stack developer
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
          className='mt-12'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className='w-[1px] h-12 bg-[#1a1a2e]/20 mx-auto'
          />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className='mt-8 relative'>
        {/* Section heading with editorial flair */}
        <div className='flex items-center gap-6 mb-20'>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className='h-[1px] w-16 bg-[#1a1a2e]/20 origin-left'
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className='text-sm font-semibold uppercase tracking-[0.15em] text-[#1a1a2e]/70'
          >
            Selected Work
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className='h-[1px] flex-1 bg-[#1a1a2e]/10 origin-left'
          />
        </div>

        <ul className='flex flex-col gap-28 md:gap-36'>
          {Projects.filter((_, i) => i < 4).map((project: any, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='flex justify-center mt-28'
        >
          <Link href='/work'>
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='group/btn inline-flex items-center gap-3 glass-card text-[#1a1a2e] text-sm font-medium px-10 py-5 rounded-full cursor-pointer'
            >
              <span>View all projects</span>
              <svg className='w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </motion.section>
  );
};

export default Home;
