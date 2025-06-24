
"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode, type SVGProps } from "react";
import { AppWindow, FileText, MessageSquare, Palette, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems: { href: string; label: string; icon: ReactNode }[] = [
  { href: "#home", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
  { href: "#projects", label: "Projects", icon: <AppWindow className="h-4 w-4" /> },
  { href: "#artworks", label: "Artworks", icon: <Palette className="h-4 w-4" /> },
  { href: "#blog", label: "Blog", icon: <FileText className="h-4 w-4" /> },
  { href: "#ai-enhancer", label: "AI Review", icon: <Sparkles className="h-4 w-4" /> },
  { href: "#contact", label: "Contact", icon: <MessageSquare className="h-4 w-4" /> },
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(navItems[0]?.href || "#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll(); // Set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  useEffect(() => {
    const getActiveHash = () => {
      let currentHash = typeof window !== 'undefined' ? window.location.hash : '';
      if (!currentHash || currentHash === "#") {
        currentHash = "#home";
      }
      const itemExists = navItems.some(item => item.href === currentHash);
      return itemExists ? currentHash : (navItems[0]?.href || "#home");
    };

    setActiveTab(getActiveHash());

    const handleHashChange = () => {
      setActiveTab(getActiveHash());
    };

    window.addEventListener("hashchange", handleHashChange, false);
    return () => {
      window.removeEventListener("hashchange", handleHashChange, false);
    };
  }, []);

  const handleNavLinkClick = (href: string) => {
    setActiveTab(href);
  };
  
  const handleNavMouseLeave = () => {
    let currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!currentHash || currentHash === "#") {
        currentHash = "#home";
    }
    const activeItemByHash = navItems.find(nav => nav.href === currentHash) || navItems.find(nav => nav.href === "#home") || navItems[0];
    if (activeItemByHash) {
      setActiveTab(activeItemByHash.href);
    }
  };


  return (
    <header className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-500 ease-in-out",
        isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
    )}>
      <div className="container mx-auto flex h-auto items-center justify-center rounded-full bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md border border-border/20 md:px-4">
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          <nav 
            className="flex items-center space-x-1 relative"
            onMouseLeave={handleNavMouseLeave}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavLinkClick(item.href)}
                onMouseEnter={() => setActiveTab(item.href)}
                className="relative px-3 py-1.5 rounded-full text-xs font-medium text-foreground hover:text-primary transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center space-x-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {activeTab === item.href && (
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
                    <Tooltip key={item.label} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className={cn(
                                    "rounded-full w-10 h-10 transition-colors",
                                    activeTab === item.href ? 'bg-primary/10 text-primary' : 'text-foreground'
                                )}
                                onClick={() => handleNavLinkClick(item.href)}
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
    </header>
  );
}
