import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef } from 'react';
import { useTranslation } from '../lib/i18n';
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

function EditorialCard({
  project,
  index,
  height = 'h-[22rem] md:h-[38rem]',
}: {
  project: any;
  index: number;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const { t, locale } = useTranslation();

  const context = locale === 'fr' && project.context_fr ? project.context_fr : project.context;
  const subtitle = locale === 'fr' && project.subtitle_fr ? project.subtitle_fr : project.subtitle;

  return (
    <Link href={`/work/${project.id}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className={`editorial-card group relative ${height} w-full`}
      >
        {/* Image */}
        <motion.div className='absolute inset-0' style={{ y: imgY }}>
          <div className='absolute inset-[-15%] card-image'>
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

        {/* Overlay */}
        <div className='card-overlay absolute inset-0 z-10' />


        {/* Content */}
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className='editorial-tag'>{subtitle}</span>
            {project.tech?.slice(0, 2).map((t: string) => (
              <span key={t} className='editorial-tag hidden md:inline-block'>{t}</span>
            ))}
          </div>
          <h3 className='card-title text-white text-3xl md:text-5xl tracking-tight'>
            {project.title}
          </h3>
          <p className='text-white/50 text-sm md:text-base max-w-lg leading-relaxed line-clamp-2'>
            {context}
          </p>

          {/* Hover arrow */}
          <motion.div
            className='flex items-center gap-2 text-white/0 group-hover:text-white/70 transition-colors duration-500 mt-1'
          >
            <span className='text-xs uppercase tracking-widest font-medium'>{t('home.viewProject')}</span>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='translate-x-0 group-hover:translate-x-1 transition-transform duration-500'>
              <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

const Home: NextPage = () => {
  const { t } = useTranslation();

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
            <SplitText text={t('home.hello')} delay={0.4} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='mt-4 text-lg md:text-xl text-foreground/60 font-light'
          >
            {t('home.subtitle')}
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
            className='w-[1px] h-12 bg-foreground/20 mx-auto'
          />
        </motion.div>
      </section>

      {/* Selected Work — Editorial Layout */}
      <section className='mt-8'>
        {/* Section Header */}
        <div className='mb-6'>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='text-4xl md:text-6xl tracking-tight font-bold'
          >
            {t('home.selectedWork')}
          </motion.h2>
        </div>

        <div className='mb-12' />

        {/* Row 1 — Featured hero card */}
        <EditorialCard
          project={Projects[0]}
          index={0}
          height='h-[24rem] md:h-[44rem]'
        />

        {/* Row 2 — Asymmetric duo */}
        <div className='grid md:grid-cols-5 gap-4 mt-4'>
          <div className='md:col-span-3'>
            <EditorialCard
              project={Projects[1]}
              index={1}
              height='h-[20rem] md:h-[34rem]'
            />
          </div>
          <div className='md:col-span-2'>
            <EditorialCard
              project={Projects[2]}
              index={2}
              height='h-[20rem] md:h-[34rem]'
            />
          </div>
        </div>

        {/* Row 3 — Wide card */}
        <div className='mt-4'>
          <EditorialCard
            project={Projects[3]}
            index={3}
            height='h-[20rem] md:h-[30rem]'
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='flex justify-center mt-16'
        >
          <Link href='/work'>
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className='inline-flex items-center gap-3 glass-btn text-foreground text-sm font-medium px-10 py-4 rounded-full cursor-pointer'
            >
              {t('home.viewAll')}
              <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </motion.section>
  );
};

export default Home;
