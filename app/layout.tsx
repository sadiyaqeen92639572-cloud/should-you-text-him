import type {Metadata} from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const SITE_URL = 'https://textorwait.com'

export const metadata: Metadata = {
  title: 'Should I Text Him? Instant Yes or No for Ex, Crush, Goodnight & Ghosting',
  description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer for exes, crushes, goodnight texts, and late-night doubts.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Should I Text Him? Instant Yes or No',
    description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer — no therapy needed.',
    url: SITE_URL,
    siteName: 'Should I Text Him?',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Should I Text Him? Instant Yes or No',
    description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer — no therapy needed.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Should I Text Him?',
  legalName: 'Gesmine-Invest Limited',
  url: SITE_URL,
  identifier: { '@type': 'PropertyValue', propertyID: 'UK Company Number', value: '14120136' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hardy House, 269 Poynders Gardens',
    addressLocality: 'London',
    postalCode: 'SW4 8PQ',
    addressCountry: 'GB',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F4F4F1] text-black overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
