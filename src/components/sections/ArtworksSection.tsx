"use client";

import { useRef } from "react";
import type { Artwork } from "@/types";
import ArtworkCard from "@/components/cards/ArtworkCard";
import { Palette } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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

export default function ArtworksSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of `targetRef` as it moves through the viewport.
  // The animation starts when the top of the target hits the top of the viewport,
  // and ends when the bottom of the target hits the bottom of the viewport.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // We map the vertical scroll progress (0 to 1) to a horizontal translation.
  // The hardcoded '-75%' value depends on the number of cards and their width.
  // A more dynamic calculation could be used for varying content.
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section id="artworks" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-24">
        <div className="flex items-center mb-12">
          <Palette className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">My Artworks</h2>
        </div>
      </div>
      
      {/* This tall div is the target for our useScroll hook. Its height determines the scroll "distance" for the animation. */}
      <div ref={targetRef} className="relative h-[300vh]">
        {/* This div becomes sticky, pinning the horizontal scroller to the screen. */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* This is the motion component that will scroll horizontally. */}
          <motion.div style={{ x }} className="flex gap-8">
            {artworksData.map((artwork, index) => (
              <div key={artwork.id} className="w-[80vw] max-w-sm md:w-[45vw] md:max-w-md shrink-0">
                <ArtworkCard artwork={artwork} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
       <div className="h-24 bg-secondary" /> {/* Spacer at the bottom to prevent content overlap */}
    </section>
  );
}
