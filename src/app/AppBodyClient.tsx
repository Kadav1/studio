
"use client";

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/layout/TopNavbar';
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from 'react';

export default function AppBodyClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());

    // Update time every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  let themeSpecificClass = 'theme-projects'; // Default to projects theme

  if (pathname === '/') {
    themeSpecificClass = 'theme-home';
  } else if (pathname.startsWith('/projects')) {
    themeSpecificClass = 'theme-projects';
  }
  // Add more conditions if other top-level pages need specific themes

  const bodyClassName = `antialiased bg-background text-foreground ${themeSpecificClass} flex flex-col min-h-screen`;

  return (
    <body className={bodyClassName}>
      <TopNavbar />
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto pt-20 md:pt-24">
          {children}
      </main>
      <Toaster />
      <footer className="py-4 px-4 sm:px-8 md:px-12 text-center text-muted-foreground text-sm font-mono border-t-2 border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p>
            {currentYear !== null ? (
              <span>&copy; {currentYear} Alex Zewebrand. All rights reserved.</span>
            ) : (
              <span>&copy; Alex Zewebrand. All rights reserved.</span>
            )}
          </p>
          {currentTime !== null ? (
            <p className="mt-2 sm:mt-0">Local Time: {currentTime}</p>
          ) : (
            <p className="mt-2 sm:mt-0">Loading time...</p>
          )}
        </div>
      </footer>
    </body>
  );
}
