import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />

            <main className="relative pt-12 mt-12 md:mt-24 mb-16 min-h-screen px-5 lg:px-64 md:max-w-screen-2xl  lg:mx-auto">
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
