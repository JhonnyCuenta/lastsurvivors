import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import './transmission.css';
import { SiteShell } from '@/components/site-shell';

const headingFont = Barlow_Condensed({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const bodyFont = IBM_Plex_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const monoFont = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://last-survivors-portal.vercel.app'),
  title: {
    default: 'Last Survivors — Réseau de transmission',
    template: '%s | Last Survivors',
  },
  description:
    'Réseau public des survivants : statut FiveM, transmissions, opérations et services joueur.',
  openGraph: {
    title: 'Last Survivors — Réseau de transmission',
    description: 'Le dernier relais humain. État FiveM, alertes publiques et opérations.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/media/transmission-social.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/media/transmission-social.webp'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/media/transmission-hero.avif" type="image/avif" />
        <meta name="theme-color" content="#0A0908" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
