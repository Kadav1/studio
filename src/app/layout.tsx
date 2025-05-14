import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import AppSidebar from '@/components/layout/AppSidebar';
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
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 ml-64 p-4 sm:p-8 md:p-12 overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
