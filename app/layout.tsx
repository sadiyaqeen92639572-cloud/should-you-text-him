import type {Metadata} from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const SITE_URL = 'https://should-you-text-him.pages.dev'

export const metadata: Metadata = {
  title: 'Should I Text Him? Instant Yes or No for Ex, Crush, Goodnight & Ghosting',
  description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer for exes, crushes, goodnight texts, and late-night doubts.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Should I Text Him? Instant Yes or No',
    description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer — no therapy needed.',
    url: SITE_URL,
    siteName: 'Should I Text Him?',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Should I Text Him? Instant Yes or No',
    description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer — no therapy needed.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased bg-[#F4F4F1] text-black overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
