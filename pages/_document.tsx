import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='description'
            content="Full-stack Developer specialized in front-end. Passionate about creating and implementing solutions that make users lives easier."
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='./../public/favicon_io/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='./../public/favicon_io/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='./../public/favicon_io/favicon.ico'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='./../public/favicon_io/favicon-16x16.png'
          />
          <link rel='icon' href='./../public/favicon_io/favicon.ico' />
          <link rel='manifest' href='./../public/favicon_io/site.webmanifest' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
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
