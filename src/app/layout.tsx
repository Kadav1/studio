
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import AppBodyClient from './AppBodyClient'; // Import the new client component

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Alex Zewebrand',
    default: 'Alex Zewebrand - A måsstaden Portfolio',
  },
  description: 'Explore måsstaden, a brutalist-inspired portfolio by Alex Zewebrand showcasing innovative web projects and design experiments. Built with Next.js, Tailwind CSS, and Genkit.',
  keywords: ['måsstaden', 'brutalist design', 'portfolio', 'Alex Zewebrand', 'web developer', 'Next.js', 'Tailwind CSS', 'Genkit', 'UI/UX', 'frontend developer', 'projects'],
  authors: [{ name: 'Alex Zewebrand' }],
  creator: 'Alex Zewebrand',
  openGraph: {
    title: 'Alex Zewebrand - A måsstaden Portfolio',
    description: 'Explore måsstaden, a brutalist-inspired portfolio by Alex Zewebrand featuring innovative web projects.',
    type: 'website',
    locale: 'en_EU',
    url: 'https://alexzewebrand.com', // Replace with your actual domain
    siteName: 'Alex Zewebrand',
    // The opengraph-image.tsx will generate the default image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Zewebrand - A måsstaden Portfolio', // Consider making this consistent with OG
    description: 'Explore måsstaden, a brutalist-inspired portfolio by Alex Zewebrand featuring innovative web projects.',
    // Twitter images can also be specified here or rely on OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${robotoMono.className}`} suppressHydrationWarning>
      <AppBodyClient>{children}</AppBodyClient>
    </html>
  );
}
