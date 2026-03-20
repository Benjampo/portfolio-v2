import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

function MeshBackground() {
  return (
    <div className='mesh-bg'>
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
