import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <main className="relative top-20 min-h-screen px-10 md:px-52">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}

export default MyApp;
