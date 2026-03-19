import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef } from 'react';

import Socials from '../data/Socials';
import Studies from './../data/Studies';
import Techs from './../data/Techs';
import Works from './../data/Works';

import Head from 'next/head';
import Profile from './../assets/icons/yes.png';

function ProfileImage() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

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
        initial={{ opacity: 0, scale: 0.7, rotateY: -25 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className='rounded-full overflow-hidden inline-block'
      >
        <Image src={Profile} alt='Benjamin Porchet' width={120} height={120} />
      </motion.div>
    </div>
  );
}

function TimelineItem({ year, title, description, type, location, index }: {
  year: string; title: string; description: string; type?: string; location?: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      className='group pb-12 border-l border-black/[0.06] pl-8 relative'
    >
      {/* Dot */}
      <div className='absolute left-0 top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-black/10 group-hover:bg-black group-hover:scale-150 transition-all duration-500' />
      <div className='flex items-center gap-3 flex-wrap'>
        <span className='text-[11px] font-semibold text-black/20 tabular-nums tracking-wider'>{year}</span>
        {type && (
          <span className='text-[10px] uppercase tracking-wider text-black/20 border border-black/[0.06] rounded-full px-2.5 py-0.5'>
            {type}
          </span>
        )}
        {location && (
          <span className='text-[10px] text-black/15'>{location}</span>
        )}
      </div>
      <h3 className='text-xl font-semibold mt-2'>{title}</h3>
      <p className='text-sm text-black/35 mt-2 leading-relaxed max-w-lg'>{description}</p>
    </motion.div>
  );
}

function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  return (
    <motion.section
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Benjamin Porchet | About</title>
      </Head>

      {/* ── Hero ── */}
      <div className='min-h-[50vh] flex flex-col justify-center items-center text-center mb-24'>
        <ProfileImage />

        <motion.h1
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className='font-bold text-7xl md:text-[10rem] leading-none tracking-tight mt-6'
        >
          About
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='mt-4 flex items-center gap-3 flex-wrap justify-center'
        >
          <span className='text-base text-black/35 font-light'>Software Developer</span>
          <span className='w-1 h-1 rounded-full bg-black/10' />
          <span className='text-base text-black/35 font-light'>Lausanne, Switzerland</span>
        </motion.div>
      </div>

      {/* ── Bio ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='max-w-2xl mx-auto mb-32'
      >
        <p className='text-lg md:text-xl text-black/40 leading-[1.9] font-light'>
          Graduated in Software Development from the Centre professionnel du Nord vaudois,
          I am currently working as a software developer at Jobtrek, where I contribute to building
          tools that support young people in their professional integration.
        </p>
        <p className='text-lg md:text-xl text-black/40 leading-[1.9] font-light mt-6'>
          Through additional training at Le Wagon and 3 years as a full-stack engineer at Quanthome,
          I have built strong skills in React, Node.js, Python, and cloud services. Bilingual in French
          and English, I am committed to creating innovative technological solutions tailored to users' needs.
        </p>
      </motion.div>

      {/* ── Currently at ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='text-center mb-32'
      >
        <span className='text-[11px] uppercase tracking-[0.25em] text-black/15 font-semibold'>Currently at</span>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='block font-bold text-7xl md:text-9xl mt-4 hover:opacity-25 transition-opacity duration-500 cursor-pointer tracking-tight'
          href='https://www.jobtrek.ch/'
          target='_blank'
          rel='noreferrer'
        >
          jobtrek
        </motion.a>
        <p className='text-sm text-black/20 mt-4 max-w-sm mx-auto leading-relaxed'>
          A foundation helping young people in difficulty find their path through professional integration.
        </p>
      </motion.div>

      {/* ── Stack ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='mb-32'
      >
        <span className='text-[11px] uppercase tracking-[0.25em] text-black/15 font-semibold block mb-8'>Stack</span>
        <ul className='flex flex-wrap gap-2.5'>
          {Techs.map((tech, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.025, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94 }}
            >
              <a href={tech.url} rel='noreferrer' target='_blank' className='pill block cursor-pointer'>
                {tech.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* ── Divider ── */}
      <div className='w-12 h-[1px] bg-black/[0.06] mx-auto mb-32' />

      {/* ── Timeline ── */}
      <div className='grid md:grid-cols-2 gap-x-20 gap-y-0 mb-32'>
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-[11px] uppercase tracking-[0.25em] text-black/15 font-semibold block mb-10'
          >
            Experience
          </motion.span>
          {Works.map((work, i) => (
            <TimelineItem
              key={work.id + work.year}
              year={work.year}
              title={work.title}
              description={work.description}
              type={work.type}
              location={work.location}
              index={i}
            />
          ))}
        </div>

        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-[11px] uppercase tracking-[0.25em] text-black/15 font-semibold block mb-10'
          >
            Education
          </motion.span>
          {Studies.map((study, i) => (
            <TimelineItem
              key={study.id}
              year={study.year}
              title={study.title}
              description={study.description}
              index={i}
            />
          ))}

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-[11px] uppercase tracking-[0.25em] text-black/15 font-semibold block mt-6 mb-8'
          >
            Languages
          </motion.span>
          <div className='flex gap-8'>
            {[
              { lang: 'French', level: 'Native' },
              { lang: 'English', level: 'Professional' },
              { lang: 'German', level: 'Limited' },
            ].map((item, i) => (
              <motion.div
                key={item.lang}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className='text-sm font-semibold block'>{item.lang}</span>
                <span className='text-[11px] text-black/20'>{item.level}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className='flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-black/[0.06]'
      >
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          target='_blank'
          href='/static/BenjaminPorchet_CV_EN.pdf'
          download
          className='bg-black text-white text-sm font-medium px-7 py-3.5 rounded-full inline-flex items-center gap-2'
        >
          Download resume
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' /><polyline points='7 10 12 15 17 10' /><line x1='12' y1='15' x2='12' y2='3' />
          </svg>
        </motion.a>

        <ul className='flex items-center gap-6'>
          {Socials.map((social, index) => (
            <motion.li whileHover={{ scale: 1.2, y: -3 }} key={index}>
              <a href={social.url} target='_blank' rel='noreferrer' className='opacity-25 hover:opacity-100 transition-opacity duration-300'>
                <Image alt={social.label} src={social.icon} width={22} />
              </a>
            </motion.li>
          ))}
        </ul>

        <Link href='/contact'>
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='text-sm font-medium text-black/25 hover:text-black transition-colors duration-300 cursor-pointer'
          >
            Get in touch &rarr;
          </motion.span>
        </Link>
      </motion.div>
    </motion.section>
  );
}

export default About;
