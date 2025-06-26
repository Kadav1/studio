
import type {Metadata} from 'next';
import { Suspense } from 'react';
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsentBanner from '@/components/shared/CookieConsentBanner';
import { ThemeProvider } from "next-themes";
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Alex Zewebrand - Full-Stack Developer & Digital Artist',
    template: '%s | Alex Zewebrand Portfolio',
  },
  description: 'The personal portfolio of Alex Zewebrand, a full-stack developer and digital artist specializing in Next.js, Genkit AI, and Framer Motion. Explore projects, artwork, and blog posts.',
  openGraph: {
    title: 'Alex Zewebrand - Full-Stack Developer & Digital Artist',
    description: 'Explore the portfolio of Alex Zewebrand, showcasing web development projects, digital art, and technical blog posts.',
    type: 'website',
    locale: 'en_US',
    url: 'https://alexzewebrand.com',
    siteName: 'Alex Zewebrand Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Zewebrand - Full-Stack Developer & Digital Artist',
    description: 'The personal portfolio of Alex Zewebrand, a full-stack developer and digital artist specializing in Next.js, Genkit AI, and Framer Motion.',
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        {/* Font links are now handled by next/font */}
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <CookieConsentBanner />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
