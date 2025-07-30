import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="  Front-end Developer applications oriented . 23 years old, I am passionate
                        about creating and implementing solutions that make users lives easier.{' '}
                        I started my journey as a Front-end Developer
                        in 2017, while studying at CPNV in Switzerland. In 2020 I did a bootcamp of
                        coding to improve my backend skills.
                        After that I started a new job at maven
                        while doing little projects for other teams and clients."
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="./../public/favicon_io/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="./../public/favicon_io/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="./../public/favicon_io/favicon.ico"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="./../public/favicon_io/favicon-16x16.png"
                    />
                    <link rel="icon" href="./../public/favicon_io/favicon.ico" />
                    <link rel="manifest" href="./../public/favicon_io/site.webmanifest" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

                    <noscript>
                        <link
                            href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
                            rel="stylesheet"
                        />
                    </noscript>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
