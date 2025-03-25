import Head from "next/head";

const SEO = ({
  title = "Augustin Briolon • Portfolio Développeur Web Front-End 🚀",
  description = "Portfolio d'Augustin Briolon. Développeur web de passion et spécialisé en front-end, je transforme vos idées en sites performants.",
  image = "/ogimage.webp",
  url = "https://august1.dev/",
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="#1a1a1a" name="msapplication-TileColor" />
      <meta content="#f1f1f1" name="theme-color" />
      <title>{title}</title>

      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        content="black-translucent"
        name="apple-mobile-web-app-status-bar-style"
      />
      <meta content={description} name="description" />
      <meta
        content="augustin, briolon, portfolio, développeur, web, front-end"
        name="keyword"
      />
      <meta content="notranslate" name="google" />

      {/* OGTAGS */}
      <meta
        content="Augustin Briolon - Portfolio Développeur Web Front-End"
        property="og:site_name"
      />
      <meta content={title} property="og:title" />
      <meta content="fr_FR" property="og:locale" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={url} property="og:url" />
      <meta property="og:bsite" />

      {/* TWITTER CARDS  */}
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="@AugustinBriolon" property="twitter:creator" />
      <meta
        content="Augustin Briolon - Portfolio Développeur Web Front-End"
        property="twitter:title"
      />
      <meta content={description} property="twitter:description" />
      <meta content={image} property="twitter:image" />
      <meta content={url} property="twitter:url" />
      <meta content="@AugustinBriolon" property="twitter:site" />
      <meta content="august1.dev" property="twitter:domain" />

      {/* FONT */}
      <link
        as="font"
        crossOrigin="anonymous"
        fetchPriority="high"
        href="/fonts/satoshi/Satoshi-Variable.woff2"
        rel="preload"
        type="font/woff2"
      />

      {/* FAVICON */}
      <link
        href="/favicon/favicon-96x96.png"
        rel="icon"
        sizes="96x96"
        type="image/png"
      />
      <link href="/favicon/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <link
        href="/favicon/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link href="/favicon/site.webmanifest" rel="manifest" />

      {/* SEO */}
      <link href={url} rel="canonical" />
    </Head>
  );
};

export default SEO;
