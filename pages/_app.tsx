import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Header />
      <Toaster />
      <AnimatePresence
        mode={'wait'}
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.main
          key={router.route}
          initial='initial'
          animate='animate'
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
          className='relative md:px-48 xl:px-24  mt-12 md:mt-24   px-5 pt-8 pb-16  md:max-w-screen-2xl lg:mx-auto'
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default MyApp;
