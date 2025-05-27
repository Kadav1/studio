
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdHome, MdWork, MdWidgets } from 'react-icons/md'; // Material Design Icons
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: MdHome, ariaLabel: 'Go to Home page' },
  { href: '/projects', label: 'Projects', icon: MdWork, ariaLabel: 'Go to Projects page' },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background text-foreground border-b-2 border-border shadow-md">
      <nav className="relative container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="måsstaden - Go to homepage">
          <MdWidgets className="h-8 w-8 text-accent group-hover:animate-pulse" />
          <h1 className="text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">
            Alex Zewebrand
          </h1>
        </Link>

        {/* Center: Nav Links (Absolutely Positioned) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.ariaLabel}
                className={cn(
                  'flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 hover:bg-accent hover:text-accent-foreground transition-colors duration-150 group rounded-sm',
                  'text-xs sm:text-sm font-bold uppercase tracking-wider',
                  pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                )}
              >
                <item.icon className={cn(
                  'h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-150',
                  pathname === item.href ? 'text-accent-foreground' : 'text-accent group-hover:text-accent-foreground'
                )} aria-hidden="true" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Time Display (Desktop) */}
        {currentTime !== null && (
          <div className="text-xs sm:text-sm font-mono text-muted-foreground hidden md:block">
            {currentTime}
          </div>
        )}
      </nav>
      
      {/* Mobile time display, below main nav items */}
      {currentTime !== null && (
        <div className="md:hidden text-center text-xs font-mono text-muted-foreground pb-1 border-t border-border">
          {currentTime}
        </div>
      )}
    </header>
  );
}
