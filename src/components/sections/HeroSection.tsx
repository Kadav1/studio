
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const coreTechnologies = ["Next.js", "TypeScript", "Tailwind CSS", "Genkit", "Framer Motion", "Firebase"];

export default function HeroSection() {
  return (
    <AnimatedSection id="home" className="bg-background text-foreground py-24 md:py-32 flex items-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I&apos;m <span className="text-primary">Alex Zewebrand</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              A passionate Full-Stack Developer and Digital Artist with a knack for creating elegant and efficient solutions. I specialize in modern web technologies and love bringing ideas to life with clean code, intuitive design, and compelling visuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 group">
                <Link href="#projects">
                  View My Work <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
               <Button size="lg" variant="outline" asChild className="shadow-lg transition-transform hover:scale-105 group">
                <Link href="#contact">
                  Get In Touch <Mail className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
               <p className="text-sm font-medium text-muted-foreground tracking-widest">CORE TECHNOLOGIES</p>
               <div className="flex flex-wrap gap-3">
                {coreTechnologies.map(tech => (
                   <Badge key={tech} variant="secondary" className="text-sm py-1 px-3 bg-primary/10 text-primary border-primary/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-xl opacity-30 group-hover:opacity-70 transition duration-1000 animate-pulse-slow -z-10"></div>
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-2 border-secondary">
                <Image
                  src="/images/hero/Alex-zewebrand-1.png"
                  alt="Alex Zewebrand"
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 320px"
                  data-ai-hint="person portrait"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
