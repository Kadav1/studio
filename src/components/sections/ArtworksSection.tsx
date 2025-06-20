
"use client";

import type { Artwork } from "@/types";
import ArtworkCard from "@/components/cards/ArtworkCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Palette } from "lucide-react"; // Or Paintbrush, ImageSquare etc.

const artworksData: Artwork[] = [
  {
    id: "art1",
    title: "Cosmic Dreamscape",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1704587645178-0ef80a093dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuZWJ1bGEgc3BhY2V8ZW58MHx8fHwxNzUwNTI2NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "nebula space",
    medium: "Digital Painting",
  },
  {
    id: "art2",
    title: "Cybernetic Portrait",
    description: "A futuristic character concept with intricate mechanical details.",
    imageUrl: "https://placehold.co/600x450.png",
    imageHint: "cyborg portrait",
    medium: "3D Render / Photobash",
  },
  {
    id: "art3",
    title: "Serene Landscape",
    description: "A tranquil scene capturing the essence of a misty morning.",
    imageUrl: "https://placehold.co/600x450.png",
    imageHint: "misty forest",
    medium: "Matte Painting",
  },
   {
    id: "art4",
    title: "Abstract Flow",
    description: "Dynamic abstract shapes and colors representing energy.",
    imageUrl: "https://placehold.co/600x450.png",
    imageHint: "abstract energy",
    medium: "Generative Art",
  },
  {
    id: "art5",
    title: "Character Study: Warrior",
    description: "Concept art for a fantasy warrior character.",
    imageUrl: "https://placehold.co/600x450.png",
    imageHint: "fantasy warrior",
    medium: "Digital Sketch",
  },
  {
    id: "art6",
    title: "Still Life Reimagined",
    description: "A modern take on classic still life, rendered with surreal elements.",
    imageUrl: "https://placehold.co/600x450.png",
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
