import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Electricity Meter Checker - LESCO Bill Calculator',
  description: 'Professional LESCO Electricity Bill Calculator - Calculate your electricity bills instantly with accurate rates and detailed breakdowns',
  keywords: 'LESCO, electricity, meter, bill calculator, Pakistan, Lahore, electricity rates',
  authors: [{ name: 'Electricity Meter Checker' }],
  openGraph: {
    title: 'Electricity Meter Checker - LESCO Bill Calculator',
    description: 'Calculate your LESCO electricity bills instantly with accurate rates and detailed breakdowns',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electricity Meter Checker - LESCO Bill Calculator',
    description: 'Calculate your LESCO electricity bills instantly with accurate rates and detailed breakdowns',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#0F172A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
