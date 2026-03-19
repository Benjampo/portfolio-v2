import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRef } from 'react';

type CardProps = {
  span: string;
  row: string;
  project: {
    id: string;
    coverSrc: string;
    title: string;
    subtitle: string;
  };
};

function ProjectCard({ project }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 25,
  });
  const z = useSpring(0, { stiffness: 200, damping: 25 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    z.set(30);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    z.set(0);
  };

  return (
    <div className='perspective-container'>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, translateZ: z, transformStyle: 'preserve-3d' }}
      >
        <Link href={`/work/${project.id}`}>
          <article className='glass-image-card cursor-pointer group'>
            <figure className='relative w-full h-[16rem] md:h-[30rem] overflow-hidden'>
              <div className='absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105'>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src={project.coverSrc}
                  alt={`${project.title}`}
                  placeholder='blur'
                  priority={true}
                />
              </div>
            </figure>
          </article>
        </Link>
      </motion.div>
    </div>
  );
}

export default ProjectCard;
