import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

const springConfig = { stiffness: 30, damping: 40, mass: 1.5 };

function MeshBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  // Cursor glow position (smooth spring that trails behind the mouse)
  const glowX = useSpring(useMotionValue(50), { stiffness: 40, damping: 30, mass: 1 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 40, damping: 30, mass: 1 });

  // Build radial glow that follows cursor over the base gradient
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(ellipse 70% 60% at ${gx}% ${gy}%, rgba(140, 180, 255, 0.45) 0%, rgba(170, 200, 255, 0.25) 25%, rgba(200, 220, 255, 0.1) 50%, transparent 75%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(cx);
      mouseY.set(cy);

      // Orb parallax
      x1.set(cx * 60);  y1.set(cy * 45);
      x2.set(cx * -50); y2.set(cy * 60);
      x3.set(cx * 70);  y3.set(cy * -35);
      x4.set(cx * -45); y4.set(cy * -55);
      x5.set(cx * 35);  y5.set(cy * 50);

      // Cursor glow follows mouse position
      const pctX = (e.clientX / window.innerWidth) * 100;
      const pctY = (e.clientY / window.innerHeight) * 100;
      glowX.set(pctX);
      glowY.set(pctY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, glowX, glowY]);

  return (
    <div className='mesh-bg'>
      <motion.div className='mesh-glow' style={{ background: glowBg }} />
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
