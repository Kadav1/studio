
"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AppWindow, FileText, MessageSquare, Palette, Sparkles, Home as HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems: { key: string, href: string; label: string; icon: ReactNode }[] = [
  { key: "home", href: "#home", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
  { key: "projects", href: "/?tab=projects#showcase", label: "Projects", icon: <AppWindow className="h-4 w-4" /> },
  { key: "artworks", href: "/?tab=artworks#showcase", label: "Artworks", icon: <Palette className="h-4 w-4" /> },
  { key: "blog", href: "/?tab=blog#showcase", label: "Blog", icon: <FileText className="h-4 w-4" /> },
  { key: "ai-enhancer", href: "#ai-enhancer", label: "AI Review", icon: <Sparkles className="h-4 w-4" /> },
  { key: "contact", href: "#contact", label: "Contact", icon: <MessageSquare className="h-4 w-4" /> },
];

export default function Header() {
  const [activeKey, setActiveKey] = useState<string>(navItems[0]?.key || "home");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect determines the active nav item based on the URL
    const hash = window.location.hash;
    const tab = searchParams.get('tab');

    let currentKey = 'home';
    if (pathname === '/') {
        if (hash === '#showcase' && tab) {
            currentKey = tab;
        } else if (hash) {
            const item = navItems.find(item => item.href === hash);
            if (item) {
                currentKey = item.key;
            }
        }
    }
    
    const activeItem = navItems.find(item => item.key === currentKey);
    if(activeItem) {
        setActiveKey(activeItem.key);
    }
  }, [pathname, searchParams]);


  const handleNavMouseLeave = () => {
     // When mouse leaves, reset to the actual active tab based on URL
    const hash = window.location.hash;
    const tab = searchParams.get('tab');
    let currentKey = 'home';
     if (hash === '#showcase' && tab) {
      currentKey = tab;
    } else if (hash) {
      currentKey = hash.substring(1);
    }
    const activeItem = navItems.find(item => item.key === currentKey);
    if (activeItem) {
      setActiveKey(activeItem.key);
    }
  };


  return (
    <motion.header
        className="fixed bottom-4 left-0 right-0 z-50 flex justify-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
    >
      <div className="flex h-auto items-center justify-center rounded-full bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md border border-border/20 md:px-4">
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          <nav 
            className="flex items-center space-x-1 relative"
            onMouseLeave={handleNavMouseLeave}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setActiveKey(item.key)}
                onMouseEnter={() => setActiveKey(item.key)}
                className="relative px-3 py-1.5 rounded-full text-xs font-medium text-foreground hover:text-primary transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center space-x-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {activeKey === item.key && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10 -z-10 rounded-full"
                    layoutId="desktop-nav-highlight"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <ThemeToggleButton />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center space-x-2">
            <TooltipProvider>
                <nav className="flex items-center">
                {navItems.map((item) => (
                    <Tooltip key={item.key} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className={`rounded-full w-10 h-10 transition-colors ${activeKey === item.key ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                                onClick={() => setActiveKey(item.key)}
                            >
                                <Link href={item.href}>
                                    {item.icon}
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="mb-2">
                            <p>{item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
                </nav>
            </TooltipProvider>
            <ThemeToggleButton />
        </div>

      </div>
    </motion.header>
  );
}
