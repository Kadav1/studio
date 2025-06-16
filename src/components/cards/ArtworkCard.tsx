
"use client";

import type { Artwork } from "@/types";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" } 
    },
  };

  return (
    <motion.div 
      variants={cardVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-primary/20 hover:border-primary/40 group">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={artwork.imageHint}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-headline text-lg text-primary group-hover:text-accent transition-colors">
            {artwork.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          {artwork.medium && (
            <Badge variant="secondary" className="mb-2 bg-accent/10 text-accent-foreground">{artwork.medium}</Badge>
          )}
          {artwork.description && (
            <CardDescription className="text-sm text-foreground/80 leading-relaxed">
              {artwork.description}
            </CardDescription>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
