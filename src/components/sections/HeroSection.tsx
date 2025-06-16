
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <AnimatedSection id="home" className="bg-background text-foreground min-h-[calc(100vh-5rem)] flex items-center">
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
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="#projects">
                  View My Work <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
              <Image
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8Q2F0fGVufDB8fHx8MTc1MDA1MzI4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Alex Zewebrand"
                fill
                priority
                sizes="(min-width: 1024px) 384px, 320px"
                data-ai-hint="cat face"
                className="object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
