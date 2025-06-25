"use client";

import { useRef, useState, useEffect } from "react";
import type { Artwork } from "@/types";
import ArtworkCard from "@/components/cards/ArtworkCard";
import { Palette } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

const artworksData: Artwork[] = [
  {
    id: "art1",
    title: "Cosmic Dreamscape",
    description: "A vibrant digital painting exploring the depths of an alien nebula.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "nebula space",
    medium: "Digital Painting",
  },
  {
    id: "art2",
    title: "Cybernetic Portrait",
    description: "A futuristic character concept with intricate mechanical details.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "cyborg portrait",
    medium: "3D Render / Photobash",
  },
  {
    id: "art3",
    title: "Serene Landscape",
    description: "A tranquil scene capturing the essence of a misty morning.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "misty forest",
    medium: "Matte Painting",
  },
   {
    id: "art4",
    title: "Abstract Flow",
    description: "Dynamic abstract shapes and colors representing energy.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract energy",
    medium: "Generative Art",
  },
  {
    id: "art5",
    title: "Character Study: Warrior",
    description: "Concept art for a fantasy warrior character.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "fantasy warrior",
    medium: "Digital Sketch",
  },
  {
    id: "art6",
    title: "Still Life Reimagined",
    description: "A modern take on classic still life, rendered with surreal elements.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "surreal still life",
    medium: "Digital Illustration",
  },
  {
    id: "art7",
    title: "Mechanical Fauna",
    description: "A detailed 3D model of a robotic fox in a natural environment.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "robotic fox",
    medium: "3D Modeling",
  },
  {
    id: "art8",
    title: "City at Dusk",
    description: "A speed painting of a futuristic cityscape as night falls.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "futuristic cityscape",
    medium: "Digital Painting",
  },
];

// Desktop-specific component for the horizontal scroll effect
function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);

  return (
    <div ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {artworksData.map((artwork, index) => (
            <div key={artwork.id} className="w-[70vw] max-w-xs shrink-0 md:w-[35vw] md:max-w-xs">
              <ArtworkCard artwork={artwork} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Mobile-specific component for the vertical grid
function VerticalGridGallery() {
  return (
    <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {artworksData.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </div>
  );
}

// Skeleton loader to prevent layout shift during hydration
function GallerySkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 pb-16 sm:grid-cols-2 md:px-6 md:pb-24">
      {artworksData.slice(0, 4).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}


export default function ArtworksSection() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="artworks" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-24">
        <div className="mb-12 flex items-center">
          <Palette className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">My Artworks</h2>
        </div>
      </div>

      {!isMounted ? <GallerySkeleton /> : isMobile ? <VerticalGridGallery /> : <HorizontalScrollGallery />}
    </section>
  );
}
