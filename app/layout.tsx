import type {Metadata} from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Should I Text Him? Instant Yes or No for Ex, Crush, Goodnight & Ghosting',
  description: 'Should I text him first, after no contact, or after being ghosted? Get a fast yes or no answer for exes, crushes, goodnight texts, and late-night doubts.',
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
