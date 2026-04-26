import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="description" content="Professional LESCO Electricity Meter Calculator - Calculate your electricity bills instantly with accurate rates and detailed breakdowns" />
        <meta name="keywords" content="LESCO, electricity, meter, bill calculator, Pakistan, Lahore, electricity rates" />
        <meta name="author" content="Electricity Meter Checker" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Electricity Meter Checker - LESCO Bill Calculator" />
        <meta property="og:description" content="Calculate your LESCO electricity bills instantly with accurate rates and detailed breakdowns" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Electricity Meter Checker - LESCO Bill Calculator" />
        <meta property="twitter:description" content="Calculate your LESCO electricity bills instantly with accurate rates and detailed breakdowns" />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
