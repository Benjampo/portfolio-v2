import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScreenshotFrame from '../components/ScreenshotFrame';
import type { TranslationKey } from '../data/translations';
import { useTranslation } from '../lib/i18n';
import Projects from '../data/projects';
import benjampo from './../assets/benjampo_gif.gif';

const rotatingStatementKeys = [
  'home.heroStatement.ai',
  'home.heroStatement.customer',
  'home.heroStatement.production',
] as const satisfies readonly TranslationKey[];

function RotatingStatement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { t, renderLocale } = useTranslation();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex(
        currentIndex => (currentIndex + 1) % rotatingStatementKeys.length
      );
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const activeStatement = t(rotatingStatementKeys[activeIndex]);

  return (
    <>
      <span className='sr-only'>{t('home.heroAccessible')}</span>
      <span
        aria-hidden='true'
        className='relative mt-1 block min-h-[2.2em] overflow-hidden text-foreground/55 sm:min-h-[2.2em] lg:min-h-[1.15em]'
      >
        <AnimatePresence initial={false} mode='wait'>
          <motion.span
            key={`${renderLocale}-${activeStatement}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: '55%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: '-55%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className='absolute inset-x-0 top-0 block'
          >
            {activeStatement}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouse = (event: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className='perspective-container'>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, scale: 0.6, rotateY: -30 }
        }
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className='inline-block w-64 overflow-hidden rounded-[22px] sm:w-72 md:w-80'
      >
        <Image src={benjampo} preload unoptimized alt='Benjamin Porchet' />
      </motion.div>
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className='flex min-h-[70svh] flex-col items-center justify-center pb-16 pt-8 text-center md:pb-24 md:pt-14'>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='relative'
      >
        <div className='absolute inset-[-2.5rem] -z-10 rounded-full bg-white/20 blur-3xl dark:bg-white/[0.03]' />
        <HeroImage />
      </motion.div>

      <div className='mt-7 w-full max-w-5xl'>
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className='text-balance text-3xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-4xl md:text-5xl'
        >
          <span className='block'>{t('home.heroLead')}</span>
          <RotatingStatement />
        </motion.h1>

        <motion.a
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          href='#selected-work'
          aria-label={t('home.scrollToWork')}
          className='mx-auto mt-7 flex h-10 w-6 items-start justify-center rounded-full border border-foreground/20 p-1.5 text-foreground/45 transition-colors duration-300 hover:border-foreground/45 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/50'
        >
          <motion.span
            aria-hidden='true'
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.35, 1, 0.35], y: [0, 10, 0] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className='h-1.5 w-1.5 rounded-full bg-current'
          />
        </motion.a>
      </div>
    </section>
  );
}

function EditorialCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t, renderLocale: locale } = useTranslation();

  const context =
    locale === 'fr' && project.context_fr
      ? project.context_fr
      : project.context;
  const subtitle =
    locale === 'fr' && project.subtitle_fr
      ? project.subtitle_fr
      : project.subtitle;

  return (
    <Link href={`/work/${project.id}`}>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true, margin: '-80px' }}
        className='editorial-card group w-full'
      >
        <div className='editorial-card__visual'>
          <div className='card-image w-full'>
            <ScreenshotFrame
              alt={`${project.title} interface preview`}
              className='screenshot-frame--card'
              priority={index === 0}
              sizes='(min-width: 768px) 44vw, 100vw'
              src={project.coverSrc}
              trimBottom={project.screenshotTrimBottom}
              uniform
            />
          </div>
        </div>

        <div className='editorial-card__content'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='editorial-tag'>{subtitle}</span>
            {project.tech?.slice(0, 2).map((t: string) => (
              <span key={t} className='editorial-tag hidden md:inline-block'>
                {t}
              </span>
            ))}
          </div>
          <h3 className='card-title text-2xl tracking-tight md:text-4xl'>
            {project.title}
          </h3>
          <p className='max-w-2xl text-sm leading-relaxed text-foreground/55 line-clamp-2 md:text-base'>
            {context}
          </p>

          <div className='mt-auto flex items-center gap-2 pt-1 text-foreground/40 transition-colors duration-500 group-hover:text-foreground'>
            <span className='text-xs uppercase tracking-widest font-medium'>
              {t('home.viewProject')}
            </span>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='translate-x-0 group-hover:translate-x-1 transition-transform duration-500'
            >
              <path
                d='M3 8h10M9 4l4 4-4 4'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <motion.section className='flex flex-col'>
      <Head>
        <title>
          Benjamin Porchet | Full-stack Engineer Building AI Products
        </title>
      </Head>

      <Hero />

      {/* Selected Work — Editorial Layout */}
      <section id='selected-work' className='scroll-mt-28 pt-8'>
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

        <div className='grid gap-x-8 gap-y-14 md:grid-cols-2'>
          {Projects.slice(0, 4).map((project: any, index: number) => (
            <EditorialCard project={project} index={index} key={project.id} />
          ))}
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
                <path
                  d='M3 8h10M9 4l4 4-4 4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </motion.section>
  );
};

export default Home;
