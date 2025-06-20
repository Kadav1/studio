
"use client";

import type { Artwork } from "@/types";
import ArtworkCard from "@/components/cards/ArtworkCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Palette } from "lucide-react"; // Or Paintbrush, ImageSquare etc.

const artworksData: Artwork[] = [
  {
    id: "art1",
    title: "Cosmic Dreamscape",
    description: "A vibrant digital painting exploring the depths of an alien nebula.",
    imageUrl: "/images/artworks/cosmic-dreamscape.png",
    imageHint: "nebula space",
    medium: "Digital Painting",
  },
  {
    id: "art2",
    title: "Cybernetic Portrait",
    description: "A futuristic character concept with intricate mechanical details.",
    imageUrl: "/images/artworks/cybernetic-portrait.png",
    imageHint: "cyborg portrait",
    medium: "3D Render / Photobash",
  },
  {
    id: "art3",
    title: "Serene Landscape",
    description: "A tranquil scene capturing the essence of a misty morning.",
    imageUrl: "/images/artworks/serene-landscape.png",
    imageHint: "misty forest",
    medium: "Matte Painting",
  },
   {
    id: "art4",
    title: "Abstract Flow",
    description: "Dynamic abstract shapes and colors representing energy.",
    imageUrl: "/images/artworks/abstract-flow.png",
    imageHint: "abstract energy",
    medium: "Generative Art",
  },
  {
    id: "art5",
    title: "Character Study: Warrior",
    description: "Concept art for a fantasy warrior character.",
    imageUrl: "/images/artworks/character-study.png",
    imageHint: "fantasy warrior",
    medium: "Digital Sketch",
  },
  {
    id: "art6",
    title: "Still Life Reimagined",
    description: "A modern take on classic still life, rendered with surreal elements.",
    imageUrl: "/images/artworks/still-life-reimagined.png",
    imageHint: "surreal still life",
    medium: "Digital Illustration",
  },
];

export default function ArtworksSection() {
  return (
    <AnimatedSection id="artworks" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12">
          <Palette className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">My Artworks</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworksData.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

