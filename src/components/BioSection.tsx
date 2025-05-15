import { generateBio } from '@/ai/flows/generate-bio';
import { MdPsychology } from 'react-icons/md'; // Material Design Icons

export default async function BioSection() {
  // Example keywords, these could be dynamic or from a config
  const keywords = "innovative designer, experienced developer, brutalist enthusiast, creative problem solver";
  let bioText = "Loading bio...";
  let errorOccurred = false;

  try {
    const bioResult = await generateBio({ keywords });
    bioText = bioResult.bio;
  } catch (error) {
    console.error("Failed to generate bio:", error);
    bioText = "Hello! I'm a passionate creator exploring the intersection of design and technology. Welcome to my brutalist-inspired portfolio.";
    errorOccurred = true;
  }

  return (
    <section className="py-16 md:py-24 border-2 border-foreground p-8 md:p-12 bg-card shadow-[8px_8px_0px_0px_hsl(var(--accent))]">
      <div className="flex items-center mb-6">
        <MdPsychology className="h-12 w-12 text-accent mr-4" />
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          About Me
        </h2>
      </div>
      <p className="text-lg md:text-xl leading-relaxed font-mono">
        {bioText}
      </p>
      {errorOccurred && (
        <p className="mt-4 text-sm text-muted-foreground font-mono">
          (AI bio generation failed, showing default.)
        </p>
      )}
      <p className="mt-8 text-lg md:text-xl leading-relaxed font-mono">
        This portfolio showcases my journey and experiments in the world of digital creation, with a strong inclination towards bold, unconventional aesthetics. Explore my projects to see how I blend functionality with a stark, impactful design philosophy.
      </p>
    </section>
  );
}
