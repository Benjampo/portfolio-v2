import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Toaster />
            <main className="relative md:px-48 xl:px-24  mt-12 md:mt-24   px-5 pt-8 pb-16  md:max-w-screen-2xl lg:mx-auto">
                <AnimatePresence
                    mode={'wait'}
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}>
                    <Component {...pageProps} />
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}

export default MyApp;
