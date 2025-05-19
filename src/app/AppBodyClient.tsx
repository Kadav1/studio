
"use client";

import { usePathname } from 'next/navigation';
import TopNavbar from '@/components/layout/TopNavbar';
import { Toaster } from "@/components/ui/toaster";

export default function AppBodyClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  let themeSpecificClass = 'theme-projects'; // Default to projects theme

  if (pathname === '/') {
    themeSpecificClass = 'theme-home';
  } else if (pathname.startsWith('/projects')) {
    themeSpecificClass = 'theme-projects';
  }
  // Add more conditions if other top-level pages need specific themes

  const bodyClassName = `antialiased bg-background text-foreground ${themeSpecificClass}`;

  return (
    <body className={bodyClassName}>
      <TopNavbar />
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto pt-20 md:pt-24">
          {children}
      </main>
      <Toaster />
    </body>
  );
}
