import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <Header />
            <Toaster />
            <Analytics />
            <AnimatePresence
                mode={'wait'}
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}>
                <motion.main
                    key={router.route}
                    initial="initial"
                    animate="animate"
                    variants={{
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        }
                    }}
                    className="relative md:px-48 xl:px-24  mt-12 md:mt-24   px-5 pt-8 pb-16  md:max-w-screen-2xl lg:mx-auto">
                    <Component {...pageProps} />
                </motion.main>
            </AnimatePresence>

            <Footer />
        </>
    );
}

export default MyApp;
