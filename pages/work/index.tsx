import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef } from 'react';
import Projects from '../../data/projects';

function WorkCard({ project, index, featured = false }: { project: any; index: number; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [featured ? 80 : 50, featured ? -80 : -50]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.5), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.id}`}>
        <article className='group cursor-pointer'>
          <div
            ref={ref}
            className='relative image-card overflow-hidden'
          >
            <figure className={`relative w-full overflow-hidden ${featured ? 'h-[20rem] md:h-[44rem]' : 'h-[14rem] md:h-[28rem]'}`}>
              <motion.div className='absolute inset-[-20%]' style={{ y: imgY }}>
                <div className='absolute inset-0 transition-transform duration-[1s] ease-out group-hover:scale-[1.03]'>
                    <Image
                      layout='fill'
                      objectFit='cover'
                      src={project.coverSrc}
                      alt={project.title}
                      placeholder='blur'
                      priority={index < 3}
                    />
                  </div>
                </motion.div>

                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10' />

                {/* Info on hover */}
                <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {project.tech?.slice(0, 4).map((t: string) => (
                      <span key={t} className='text-[10px] uppercase tracking-wider text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5'>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={`font-semibold text-white ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                    {project.title}
                  </h3>
                  <p className='text-sm text-white/60 mt-1'>{project.subtitle}</p>
                </div>
              </figure>
          </div>

          {/* Title always visible below card */}
          <div className='mt-4 flex items-baseline justify-between'>
            <h3 className='text-sm font-semibold text-[#1a1a2e]/80 group-hover:text-[#1a1a2e] transition-colors duration-300'>
              {project.title}
            </h3>
            <span className='text-xs text-[#1a1a2e]/40'>
              {project.subtitle}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function Index() {
  const featured = Projects[0];
  const rest = Projects.slice(1);

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

      {/* Featured project — full width */}
      <div className='mb-12'>
        <WorkCard project={featured} index={0} featured />
      </div>

      {/* Rest — 2-column grid */}
      <div className='grid md:grid-cols-2 gap-8'>
        {rest.map((project: any, index: number) => (
          <WorkCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>
    </motion.section>
  );
}

export default Index;
