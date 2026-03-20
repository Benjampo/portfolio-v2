import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

const springConfig = { stiffness: 30, damping: 40, mass: 1.5 };
const blobSpring = (s: number) => ({ stiffness: s, damping: 35, mass: 2 });

function MeshBackground() {
  // Orb parallax springs
  const x1 = useSpring(useMotionValue(0), springConfig);
  const y1 = useSpring(useMotionValue(0), springConfig);
  const x2 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 20 });
  const y2 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 20 });
  const x3 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 25 });
  const y3 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 25 });
  const x4 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 15 });
  const y4 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 15 });
  const x5 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 22 });
  const y5 = useSpring(useMotionValue(0), { ...springConfig, stiffness: 22 });

  // Metaball blob springs — each declared individually (hooks rules)
  const bx1 = useSpring(useMotionValue(0), blobSpring(18));
  const by1 = useSpring(useMotionValue(0), blobSpring(18));
  const bx2 = useSpring(useMotionValue(0), blobSpring(12));
  const by2 = useSpring(useMotionValue(0), blobSpring(12));
  const bx3 = useSpring(useMotionValue(0), blobSpring(25));
  const by3 = useSpring(useMotionValue(0), blobSpring(25));
  const bx4 = useSpring(useMotionValue(0), blobSpring(10));
  const by4 = useSpring(useMotionValue(0), blobSpring(10));
  const bx5 = useSpring(useMotionValue(0), blobSpring(15));
  const by5 = useSpring(useMotionValue(0), blobSpring(15));
  const bx6 = useSpring(useMotionValue(0), blobSpring(22));
  const by6 = useSpring(useMotionValue(0), blobSpring(22));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      // Orb parallax
      x1.set(cx * 60);  y1.set(cy * 45);
      x2.set(cx * -50); y2.set(cy * 60);
      x3.set(cx * 70);  y3.set(cy * -35);
      x4.set(cx * -45); y4.set(cy * -55);
      x5.set(cx * 35);  y5.set(cy * 50);

      // Metaball blobs — opposing directions so they split apart
      bx1.set(cx * 120);  by1.set(cy * 90);
      bx2.set(cx * -100); by2.set(cy * 130);
      bx3.set(cx * 80);   by3.set(cy * -110);
      bx4.set(cx * -140); by4.set(cy * -70);
      bx5.set(cx * 60);   by5.set(cy * 100);
      bx6.set(cx * -90);  by6.set(cy * -120);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, bx1, by1, bx2, by2, bx3, by3, bx4, by4, bx5, by5, bx6, by6]);

  return (
    <div className='mesh-bg'>
      {/* SVG goo filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id='goo'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='30' result='blur' />
            <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9' result='goo' />
            <feComposite in='SourceGraphic' in2='goo' operator='atop' />
          </filter>
        </defs>
      </svg>
      {/* Metaball blobs */}
      <div className='meta-container'>
        <motion.div className='meta-blob meta-blob-1' style={{ x: bx1, y: by1 }} />
        <motion.div className='meta-blob meta-blob-2' style={{ x: bx2, y: by2 }} />
        <motion.div className='meta-blob meta-blob-3' style={{ x: bx3, y: by3 }} />
        <motion.div className='meta-blob meta-blob-4' style={{ x: bx4, y: by4 }} />
        <motion.div className='meta-blob meta-blob-5' style={{ x: bx5, y: by5 }} />
        <motion.div className='meta-blob meta-blob-6' style={{ x: bx6, y: by6 }} />
      </div>
      <motion.div className='mesh-orb mesh-orb-1' style={{ x: x1, y: y1 }} />
      <motion.div className='mesh-orb mesh-orb-2' style={{ x: x2, y: y2 }} />
      <motion.div className='mesh-orb mesh-orb-3' style={{ x: x3, y: y3 }} />
      <motion.div className='mesh-orb mesh-orb-4' style={{ x: x4, y: y4 }} />
      <motion.div className='mesh-orb mesh-orb-5' style={{ x: x5, y: y5 }} />
    </div>
  );
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className='noise-overlay'>
      <MeshBackground />
      <div className='relative z-10'>
        <Header />
        <Toaster />
        <AnimatePresence
          mode='wait'
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.main
            key={router.route}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className='relative px-6 md:px-16 xl:px-24 mt-16 md:mt-28 pt-8 pb-24 max-w-[1400px] mx-auto'
          >
            <Component {...pageProps} />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
