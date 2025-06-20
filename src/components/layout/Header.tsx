
"use client";

import Link from "next/link";
import { useState, useEffect, type ReactNode, type SVGProps } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, AppWindow, FileText, MessageSquare, X, Palette } from "lucide-react";
import { motion } from "framer-motion";

const navItems: { href: string; label: string; icon: ReactNode }[] = [
  { href: "#home", label: "Home", icon: <HomeIcon className="h-5 w-5" /> },
  { href: "#projects", label: "Projects", icon: <AppWindow className="h-5 w-5" /> },
  { href: "#artworks", label: "Artworks", icon: <Palette className="h-5 w-5" /> },
  { href: "#blog", label: "Blog", icon: <FileText className="h-5 w-5" /> },
  { href: "#contact", label: "Contact", icon: <MessageSquare className="h-5 w-5" /> },
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(navItems[0]?.href || "#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setIsMobileMenuOpen(false); 
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="text-2xl font-headline font-bold text-primary hover:text-accent transition-colors" onClick={() => handleNavLinkClick("#home")}>
          Alex Zewebrand
        </Link>

        <nav 
          className="hidden md:flex items-center space-x-1 relative"
          onMouseLeave={handleNavMouseLeave}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => handleNavLinkClick(item.href)}
              onMouseEnter={() => setActiveTab(item.href)}
              className="relative px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-accent transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
              {activeTab === item.href && (
                <motion.div
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                  layoutId="desktop-nav-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="#home" className="text-xl font-headline font-bold text-primary" onClick={() => handleNavLinkClick("#home")}>
                  Alex Zewebrand
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-primary" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    asChild
                    className={`w-full justify-start text-foreground hover:bg-accent/10 hover:text-accent ${activeTab === item.href ? 'bg-accent/10 text-accent' : ''}`}
                    onClick={() => handleNavLinkClick(item.href)}
                  >
                    <Link href={item.href} className="flex items-center space-x-3 py-3 text-lg">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
