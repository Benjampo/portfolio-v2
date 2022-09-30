import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <main className="relative pt-12 mt-12 md:mt-24 mb-16 min-h-screen px-5 md:px-64 md:max-w-screen-2xl  md:mx-auto">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}

export default MyApp;
