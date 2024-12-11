import Head from 'next/head';

const SEO = ({
  title = 'Augustin Briolon • Portfolio Développeur Web Front-End 🚀',
  description = "Portfolio d'Augustin Briolon. Développeur web de passion et spécialisé en front-end, je transforme vos idées en sites performants.",
  image = '/ogimage.webp',
  url = 'https://august1.dev/',
}) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='msapplication-TileColor' content='#1a1a1a' />
      <meta name='theme-color' content='#f1f1f1' />
      <title>{title}</title>
      <meta name='apple-mobile-web-app-title' content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name='description' content={description} />
      <meta
        name='keyword'
        content='augustin, briolon, portfolio, développeur, web, front-end'
      />
      <meta name='google' content='notranslate' />

      {/* OGTAGS */}
      <meta
        property='og:site_name'
        content='Augustin Briolon - Portfolio Développeur Web Front-End'
      />
      <meta property='og:title' content={title} />
      <meta property='og:locale' content='fr_FR' />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:bsite' />

      {/* TWITTER CARDS  */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:creator' content='@AugustinBriolon' />
      <meta
        property='twitter:title'
        content='Augustin Briolon - Portfolio Développeur Web Front-End'
      />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:site' content='@AugustinBriolon' />
      <meta property='twitter:domain' content='august1.dev' />

      {/* FONT */}
      <link
        rel='preload'
        as='font'
        href='/fonts/satoshi/Satoshi-Variable.woff2'
        type='font/woff2'
        crossOrigin='anonymous'
      />

      {/* FAVICON */}
      <link
        rel='icon'
        type='image/png'
        href='/favicon/favicon-96x96.png'
        sizes='96x96'
      />
      <link rel='icon' type='image/svg+xml' href='/favicon/favicon.svg' />
      <link rel='shortcut icon' href='/favicon/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-touch-icon.png'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />

      {/* SEO */}
      <link rel='canonical' href={url} />
    </Head>
  );
};

export default SEO;
