import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { LanguageProvider } from '../lib/i18n';
import { ThemeProvider } from '../lib/theme';
import '../styles/globals.css';

function MeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Smooth lerp animation loop
    const animate = () => {
      const lerp = 0.04;
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * lerp;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', String(currentRef.current.x));
        containerRef.current.style.setProperty('--my', String(currentRef.current.y));
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className='mesh-bg' ref={containerRef}>
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
      {/* Metaball blobs — driven by CSS vars --mx/--my */}
      <div className='meta-container'>
        <div className='meta-blob meta-blob-1' />
        <div className='meta-blob meta-blob-2' />
        <div className='meta-blob meta-blob-3' />
        <div className='meta-blob meta-blob-4' />
        <div className='meta-blob meta-blob-5' />
        <div className='meta-blob meta-blob-6' />
      </div>
      {/* Orbs — also driven by CSS vars */}
      <div className='mesh-orb mesh-orb-1' />
      <div className='mesh-orb mesh-orb-2' />
      <div className='mesh-orb mesh-orb-3' />
      <div className='mesh-orb mesh-orb-4' />
      <div className='mesh-orb mesh-orb-5' />
    </div>
  );
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className='noise-overlay'>
          <MeshBackground />
          <div className='relative z-10'>
            <Header />
            <Toaster />
            <AnimatePresence
              mode='wait'
              initial={true}
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
