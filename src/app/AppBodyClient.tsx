
"use client";

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/layout/TopNavbar';
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from 'react';

export default function AppBodyClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  let themeSpecificClass = ''; // Default to projects theme

  if (pathname === '/') {
    themeSpecificClass = 'theme-home';
  } else if (pathname.startsWith('/projects')) {
    themeSpecificClass = 'theme-projects';
  }
  // Add more conditions if other top-level pages need specific themes

  const bodyClassName = `antialiased bg-background text-foreground ${themeSpecificClass} flex flex-col min-h-screen`;
  // Adjusted mainContentPaddingTop as mobile navbar is no longer taller due to time display
  const mainContentPaddingTop = "pt-20"; 

  return (
    <body className={bodyClassName}>
      <TopNavbar />
      <main className={`flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto ${mainContentPaddingTop}`}>
          {children}
      </main>
      <Toaster />
      <footer className="py-4 px-4 sm:px-8 md:px-12 text-center text-muted-foreground text-sm font-mono border-t-2 border-border">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4">
            {currentYear !== null ? (
              <p>&copy; {currentYear} Alex Zewebrand. All rights reserved.</p>
            ) : (
              <p>&copy; Alex Zewebrand. All rights reserved.</p> 
            )}
        </div>
      </footer>
    </body>
  );
}
