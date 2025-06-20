
"use client";

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/layout/TopNavbar';
import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from '@/components/ScrollToTopButton'; // Import the new component
import { useEffect, useState } from 'react';

export default function AppBodyClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  let themeSpecificClass = ''; 

  if (pathname === '/') {
    themeSpecificClass = 'theme-home';
  } else if (pathname.startsWith('/projects')) {
    themeSpecificClass = 'theme-projects';
  }
  

  const bodyClassName = `antialiased bg-background text-foreground ${themeSpecificClass} flex flex-col min-h-screen`;
  
  const mainContentPaddingTop = "pt-20"; 

  return (
    <body className={bodyClassName}>
      <TopNavbar />
      <main className={`flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto ${mainContentPaddingTop}`}>
          {children}
      </main>
      <Toaster />
      <ScrollToTopButton /> {/* Add the scroll to top button here */}
      <footer className="py-4 px-4 sm:px-8 md:px-12 text-center text-muted-foreground text-sm font-mono border-t-2 border-border print:hidden">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4">
           <p>
            <a 
              href="https://github.com/Kadav1/masstaden" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent transition-colors"
            >
              måsstaden
            </a>
            {' © '}{currentYear || '2025'}{' by '}
            <a 
              href="https://creativecommons.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent transition-colors"
            >
              Alexander Zewebrand
            </a>
            {' is licensed under '}
            <a 
              href="https://creativecommons.org/licenses/by/4.0/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-accent transition-colors"
              style={{display: 'inline-block'}}
            >
              Creative Commons Attribution 4.0 International
              <img
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                alt="Creative Commons License icon"
                style={{ display: 'inline-block', verticalAlign: 'middle', height: '1em', marginLeft: '3px', width: '1em' }}
              />
              <img
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                alt="Attribution icon"
                style={{ display: 'inline-block', verticalAlign: 'middle', height: '1em', marginLeft: '3px', width: '1em' }}
              />
            </a>
          </p>
        </div>
      </footer>
    </body>
  );
}
