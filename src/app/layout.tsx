
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import TopNavbar from '@/components/layout/TopNavbar';
import { Toaster } from "@/components/ui/toaster";


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
    template: '%s | BruteFolio',
    default: 'BruteFolio - A Brutalist Portfolio',
  },
  description: 'Explore a unique brutalist-inspired portfolio showcasing innovative web projects and design experiments. Built with Next.js and Tailwind CSS.',
  keywords: ['brutalist design', 'portfolio', 'web developer', 'Next.js', 'Tailwind CSS', 'UI/UX', 'frontend developer', 'projects'],
  authors: [{ name: 'Your Name' }], // Replace 'Your Name'
  creator: 'Your Name', // Replace 'Your Name'
  openGraph: {
    title: 'BruteFolio - A Brutalist Portfolio',
    description: 'A unique brutalist-inspired portfolio showcasing innovative web projects.',
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com', // Replace with your actual domain
    siteName: 'BruteFolio',
    // images: [ // Optionally, add a default OG image
    //   {
    //     url: 'https://yourwebsite.com/og-image.png', // Replace with your actual OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: 'BruteFolio Homepage',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BruteFolio - A Brutalist Portfolio',
    description: 'A unique brutalist-inspired portfolio showcasing innovative web projects.',
    // site: '@yourTwitterHandle', // Replace with your Twitter handle
    // creator: '@yourTwitterHandle', // Replace with your Twitter handle
    // images: ['https://yourwebsite.com/twitter-image.png'], // Replace with your actual Twitter image URL
  },
  robots: { // Optional: good for SEO
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
  // icons: { // Optional: Add favicon links
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <TopNavbar />
        <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto pt-20 md:pt-24">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
