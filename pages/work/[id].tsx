import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import Head from 'next/head';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import ScreenshotFrame from '../../components/ScreenshotFrame';
import Projects from '../../data/projects';
import { useTranslation } from '../../lib/i18n';

const revealTransition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1] as const,
};

function ProjectVisual({
  alt,
  caption,
  priority = false,
  src,
  trimBottom,
}: {
  alt: string;
  caption: string;
  priority?: boolean;
  src: StaticImageData;
  trimBottom?: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={revealTransition}
      className='case-study-visual'
    >
      <ScreenshotFrame
        alt={alt}
        className='relative z-10'
        priority={priority}
        sizes='(min-width: 1400px) 1280px, 94vw'
        src={src}
        trimBottom={trimBottom}
        uniform
      />
      <figcaption className='case-study-caption'>{caption}</figcaption>
    </motion.figure>
  );
}

function ChapterCopy({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={revealTransition}
      className='case-study-chapter__copy'
    >
      <h2>{title}</h2>
      {children}
    </motion.div>
  );
}

function ProjectNav({ project }: { project: any }) {
  const currentIndex = Projects.findIndex(
    (item: any) => item.id === project.id
  );
  const previousProject = currentIndex > 0 ? Projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < Projects.length - 1 ? Projects[currentIndex + 1] : null;
  const { t } = useTranslation();

  return (
    <motion.nav
      aria-label={t('work.moreWork')}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='mt-24 border-t border-foreground/[0.08] pt-10'
    >
      <span className='mb-6 block text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/40'>
        {t('work.moreWork')}
      </span>
      <div className='grid grid-cols-2 gap-4'>
        {previousProject ? (
          <Link
            href={`/work/${previousProject.id}`}
            className='group flex min-w-0 items-center gap-3 text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground md:text-lg'
          >
            <ArrowLeftIcon className='h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1' />
            <span className='truncate'>{previousProject.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {nextProject ? (
          <Link
            href={`/work/${nextProject.id}`}
            className='group flex min-w-0 items-center justify-end gap-3 text-right text-sm font-semibold text-foreground/55 transition-colors hover:text-foreground md:text-lg'
          >
            <span className='truncate'>{nextProject.title}</span>
            <ArrowLeftIcon className='h-4 w-4 shrink-0 rotate-180 transition-transform group-hover:translate-x-1' />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </motion.nav>
  );
}

export function Project({ data }: any) {
  const project = data[0];
  const { t, renderLocale: locale } = useTranslation();

  const context =
    locale === 'fr' && project.context_fr
      ? project.context_fr
      : project.context;
  const subtitle =
    locale === 'fr' && project.subtitle_fr
      ? project.subtitle_fr
      : project.subtitle;
  const tasks =
    locale === 'fr' && project.tasks_fr ? project.tasks_fr : project.tasks;
  const info =
    locale === 'fr' && project.info_fr ? project.info_fr : project.info;
  const caseStudy = project.caseStudy[locale];

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>{`${project.title} | Benjamin Porchet`}</title>
        <meta name='description' content={context} />
      </Head>

      <Link
        href='/work'
        className='mb-12 inline-flex items-center gap-2 text-sm text-foreground/45 transition-colors hover:text-foreground'
      >
        <ArrowLeftIcon className='h-4 w-4' />
        <span>{t('work.back')}</span>
      </Link>

      <header className='case-study-header'>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition}
        >
          <span className='case-study-eyebrow'>{subtitle}</span>
          <h1 className='mt-4 max-w-5xl text-balance text-5xl font-bold leading-[0.96] tracking-[-0.055em] md:text-7xl lg:text-8xl'>
            {project.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...revealTransition, delay: 0.12 }}
          className='case-study-header__meta'
        >
          <p>{context}</p>
          <div>
            <span className='case-study-eyebrow'>{t('work.builtWith')}</span>
            <div className='mt-3 flex flex-wrap gap-2'>
              {project.tech.map((technology: string, index: number) => (
                <span
                  className='pill pointer-events-none text-xs'
                  key={`${technology}-${index}`}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      <ProjectVisual
        alt={`${project.title} — ${t('work.overview')}`}
        caption={t('work.overview')}
        priority
        src={project.coverSrc}
        trimBottom={project.screenshotTrimBottom}
      />

      <section className='case-study-chapter'>
        <ChapterCopy title={caseStudy.briefTitle}>
          <p>{context}</p>
        </ChapterCopy>
      </section>

      <ProjectVisual
        alt={`${project.title} — ${t('work.experienceDetail')}`}
        caption={t('work.experienceDetail')}
        src={project.secSrc}
        trimBottom={project.screenshotTrimBottom}
      />

      <section className='case-study-chapter case-study-chapter--work'>
        <ChapterCopy title={caseStudy.contributionTitle}>
          <p>{caseStudy.contributionIntro}</p>
        </ChapterCopy>

        <div className='case-study-workstreams'>
          {tasks.map((task: string, index: number) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...revealTransition, delay: index * 0.06 }}
              className='case-study-workstream'
              key={task}
            >
              <h3>{task}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <ProjectVisual
        alt={`${project.title} — ${t('work.finalView')}`}
        caption={t('work.finalView')}
        src={project.thirdSrc}
        trimBottom={project.screenshotTrimBottom}
      />

      <section className='case-study-outcome'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={revealTransition}
        >
          <h2>{caseStudy.resultTitle}</h2>
          <p>{caseStudy.resultText}</p>
          {info ? (
            <small className='case-study-availability'>{info}</small>
          ) : null}
        </motion.div>

        {project.url ? (
          <motion.a
            href={project.url}
            target='_blank'
            rel='noreferrer'
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className='glass-btn inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-foreground'
          >
            {t('work.visitWebsite')}
            <span aria-hidden='true'>↗</span>
          </motion.a>
        ) : null}
      </section>

      <ProjectNav project={project} />
    </motion.article>
  );
}

export function getStaticPaths() {
  const paths = Projects.map((item: any) => ({ params: { id: item.id } }));
  return { paths, fallback: false };
}

export function getStaticProps({ params }: any) {
  const data = Projects.filter((item: any) => item.id === params.id);
  return { props: { data } };
}

export default Project;
