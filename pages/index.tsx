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
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.li ref={ref} style={{ scale: containerScale }}>
      <Link href={`/work/${project.id}`}>
        <article className='group flex flex-col md:flex-row gap-6 items-start'>
          <div className='md:w-1/6 pt-2 flex flex-col gap-1'>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className='text-xs font-semibold uppercase tracking-wider text-black/30'
            >
              {project.title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className='text-xs text-black/20 hidden md:block'
            >
              {project.subtitle}
            </motion.span>
          </div>
          <div className='perspective-container md:w-5/6'>
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouse}
              onMouseLeave={() => { mx.set(0); my.set(0); }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-100px' }}
              className='image-card cursor-pointer'
            >
              <figure className='relative w-full h-[16rem] md:h-[42rem] overflow-hidden'>
                <motion.div className='absolute inset-0' style={{ y: imgY }}>
                  <div className='absolute inset-[-20%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]'>
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
              </figure>
            </motion.div>
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

      <section className='min-h-[75vh] flex flex-col justify-center items-center gap-8'>
        <HeroImage />
        <div className='text-center overflow-hidden'>
          <h1 className='font-bold text-6xl md:text-8xl tracking-tight'>
            <SplitText text='Hello' delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='mt-4 text-lg md:text-xl text-black/40 font-light'
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
            className='w-[1px] h-12 bg-black/20 mx-auto'
          />
        </motion.div>
      </section>

      <section className='mt-16'>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='text-[11px] font-semibold uppercase tracking-[0.2em] text-black/25 block mb-16'
        >
          Selected Work
        </motion.span>
        <ul className='flex flex-col gap-24'>
          {Projects.filter((_, i) => i < 4).map((project: any, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='flex justify-center mt-20'
        >
          <Link href='/work'>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block bg-black text-white text-sm font-medium px-8 py-4 rounded-full cursor-pointer'
            >
              View all projects
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </motion.section>
  );
};

export default Home;
