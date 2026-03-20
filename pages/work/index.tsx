import { motion, useMotionValue, useSpring } from 'framer-motion';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef, useState } from 'react';
import Projects from '../../data/projects';

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const imgY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const [hoveredProject, setHoveredProject] = useState<any>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left + 24);
    mouseY.set(e.clientY - rect.top - 140);
  };

  return (
    <motion.section>
      <Head>
        <title>Benjamin Porchet | Work</title>
      </Head>

      <div className='flex items-baseline justify-between mb-12'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className='font-bold text-5xl md:text-7xl tracking-tight'
        >
          Work
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-sm text-[#1a1a2e]/40'
        >
          {Projects.length} projects
        </motion.span>
      </div>

      <div ref={containerRef} onMouseMove={handleMouseMove} className='relative'>
        {/* Floating image preview */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          animate={{ opacity: hoveredProject ? 1 : 0, scale: hoveredProject ? 1 : 0.9 }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          className='absolute z-30 w-[280px] md:w-[360px] h-[180px] md:h-[220px] rounded-2xl overflow-hidden shadow-2xl pointer-events-none hidden md:block'
        >
          {hoveredProject && (
            <Image
              layout='fill'
              objectFit='cover'
              src={hoveredProject.coverSrc}
              alt={hoveredProject.title}
              placeholder='blur'
            />
          )}
        </motion.div>

        {/* Project list */}
        <ul className='flex flex-col'>
          {Projects.map((project: any, index) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/work/${project.id}`}>
                <div
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group flex items-center justify-between py-6 md:py-8 cursor-pointer transition-colors duration-300 ${index < Projects.length - 1 ? 'border-b border-[#1a1a2e]/[0.06] hover:border-[#1a1a2e]/20' : ''}`}
                >
                  <div className='flex items-baseline gap-4 md:gap-6'>
                    <span className='text-xs text-[#1a1a2e]/25 font-medium tabular-nums w-6'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className='text-xl md:text-3xl font-semibold text-[#1a1a2e]/80 group-hover:text-[#1a1a2e] transition-colors duration-300'>
                      {project.title}
                    </span>
                    <span className='text-xs uppercase tracking-[0.15em] text-[#1a1a2e]/30 hidden md:inline'>
                      {project.subtitle}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='hidden md:flex gap-2'>
                      {project.tech.slice(0, 3).map((t: string) => (
                        <span key={t} className='text-[0.6rem] uppercase tracking-wider text-[#1a1a2e]/25 group-hover:text-[#1a1a2e]/50 transition-colors duration-300'>
                          {t}
                        </span>
                      ))}
                    </div>
                    <svg className='w-4 h-4 text-[#1a1a2e]/20 group-hover:text-[#1a1a2e]/60 transform group-hover:translate-x-1 transition-all duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

export default Index;
