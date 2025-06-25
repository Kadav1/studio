
"use client";

import { Linkedin, Github, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary-foreground hover:text-accent transition-all duration-200 hover:scale-110">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-secondary-foreground hover:text-accent transition-all duration-200 hover:scale-110">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secondary-foreground hover:text-accent transition-all duration-200 hover:scale-110">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secondary-foreground hover:text-accent transition-all duration-200 hover:scale-110">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="mailto:alex.zewebrand@example.com" aria-label="Email" className="text-secondary-foreground hover:text-accent transition-all duration-200 hover:scale-110">
            <Mail className="h-6 w-6" />
          </Link>
        </div>
        <div className="text-sm space-x-4 mb-2">
          <span>&copy; {currentYear} Alex Zewebrand. All rights reserved.</span>
          <span className="text-muted-foreground">|</span>
          <Link href="/privacy-policy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p className="text-xs mt-2 text-muted-foreground">
          Designed with passion and coded with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
