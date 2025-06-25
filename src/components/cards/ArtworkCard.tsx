"use client";

import type { Artwork } from "@/types";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription as DialogDesc } from "@/components/ui/dialog";
import { Maximize } from "lucide-react";

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
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -8, boxShadow: "0 10px 20px -5px hsl(var(--accent) / 0.2)" }}
          className="h-full cursor-pointer"
        >
          <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 rounded-xl border-primary/20 hover:border-primary/40 group">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={artwork.imageHint}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize className="h-10 w-10 text-white" />
              </div>
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
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0">
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
            <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="100vw"
                data-ai-hint={artwork.imageHint}
                className="object-contain"
            />
        </div>
        <div className="p-6">
            <DialogHeader className="p-0 text-left items-start mb-2">
                <DialogTitle className="font-headline text-2xl text-primary">{artwork.title}</DialogTitle>
                {artwork.description && <DialogDesc className="text-muted-foreground pt-2 text-left">{artwork.description}</DialogDesc>}
            </DialogHeader>
            {artwork.medium && (
                <Badge variant="secondary" className="my-2 bg-accent/10 text-accent-foreground">{artwork.medium}</Badge>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
