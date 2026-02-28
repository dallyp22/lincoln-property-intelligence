import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE, AGENTS } from '@/lib/constants';
import { WebSiteJsonLd } from '@/components/seo/WebSiteJsonLd';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Lincoln Property Intelligence',
    default: 'Lincoln Property Intelligence | Data-Driven Real Estate Advisory',
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}/images/team/marion-shawndel-polivka.jpg`,
        width: 800,
        height: 600,
        alt: 'Marion & Shawndel Polivka — Lincoln Property Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-primary-900 min-h-screen flex flex-col">
        <WebSiteJsonLd />
        <PersonJsonLd
          name={AGENTS.marion.name}
          jobTitle={AGENTS.marion.title}
          phone={AGENTS.marion.phone}
          url={AGENTS.marion.website}
          description={AGENTS.marion.shortBio}
          image={`${SITE.url}/images/agents/marion-polivka.jpg`}
          sameAs={AGENTS.marion.directoryProfiles as unknown as string[]}
          knowsAbout={AGENTS.marion.credentials as unknown as string[]}
        />
        <PersonJsonLd
          name={AGENTS.shawndel.name}
          jobTitle={AGENTS.shawndel.title}
          phone={AGENTS.shawndel.phone}
          url={AGENTS.shawndel.website}
          description={AGENTS.shawndel.shortBio}
          image={`${SITE.url}/images/agents/shawndel-polivka.jpg`}
          sameAs={AGENTS.shawndel.directoryProfiles as unknown as string[]}
          knowsAbout={AGENTS.shawndel.credentials as unknown as string[]}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
