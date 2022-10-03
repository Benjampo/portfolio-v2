import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="./../assets/favicon_io/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="./../assets/favicon_io/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="./../assets/favicon_io/favicon-16x16.png"
                    />
                    <link rel="icon" href="./../assets/favicon_io/favicon.ico" />
                    <link rel="manifest" href="./../assets/favicon_io/site.webmanifest" />
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
