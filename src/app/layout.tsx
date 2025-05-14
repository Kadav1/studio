
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
  title: 'BruteFolio',
  description: 'A Brutalist Portfolio Website',
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
