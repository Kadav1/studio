
import { generateBio } from '@/ai/flows/generate-bio';
import { MdCodeOff } from 'react-icons/md'; // Material Design Icons
import componentsConfig from '@/../components.json';

export default async function BioSection() {
  const keywords = componentsConfig.bioSection?.keywords || "innovative designer, brutalist enthusiast, graffiti connoisseur";
  let bioText = "Loading bio...";
  let errorOccurred = false;
  let userVisibleErrorHint: string | null = null;

  try {
    const bioResult = await generateBio({ keywords });
    if (!bioResult || !bioResult.bio) {
      throw new Error('AI response did not contain a bio.');
    }
    bioText = bioResult.bio;
  } catch (error: unknown) {
    let consoleErrorMessage = "An unknown error occurred during bio generation.";

    if (error instanceof Error) {
      consoleErrorMessage = error.message;
      if (error.message.includes("503") || error.message.toLowerCase().includes("service unavailable") || error.message.toLowerCase().includes("model is overloaded")) {
        userVisibleErrorHint = "(AI bio generation failed as the service is temporarily overloaded. A default bio is shown. Please try again later.)";
      } else if (error.message.toLowerCase().includes("api key") || error.message.toLowerCase().includes("permission denied")) {
         userVisibleErrorHint = "(AI bio generation failed, showing default. **IMPORTANT FOR LIVE SITE:** The `GEMINI_API_KEY` environment variable is likely missing or incorrect in your hosting provider's settings. This must be configured on your deployment platform. For local testing, check your `.env` file. You may need to restart your development server or redeploy after setting the API key.)";
      } else {
        userVisibleErrorHint = "(AI bio generation failed due to an unexpected issue. A default bio is shown.)";
      }
    } else if (typeof error === 'string') {
      consoleErrorMessage = error;
      userVisibleErrorHint = "(AI bio generation failed due to an unexpected issue. A default bio is shown.)";
    } else if (error && typeof error === 'object' && Object.keys(error).length > 0) {
      try {
        const errorString = JSON.stringify(error);
        consoleErrorMessage = `Object: ${errorString}`;
      } catch (_ignored) {
        consoleErrorMessage = "Could not stringify the error object."
      }
      userVisibleErrorHint = "(AI bio generation failed due to an unexpected issue. A default bio is shown.)";
    } else if (error && typeof error === 'object' && error.toString && error.toString() !== '[object Object]') {
        consoleErrorMessage = `Error: ${error.toString()}`;
        userVisibleErrorHint = "(AI bio generation failed due to an unexpected issue. A default bio is shown.)";
    } else {
      userVisibleErrorHint = "(AI bio generation failed due to an unknown issue. A default bio is shown.)";
    }

    console.error("Failed to generate bio. Details:", consoleErrorMessage, "Raw error object:", error);
    bioText = "Hello! I'm a passionate creator exploring the intersection of design and technology. Welcome to my brutalist-inspired portfolio.";
    errorOccurred = true;
  }

  return (
    <section
      aria-labelledby="about-me-heading"
      className="py-16 md:py-24 border-2 border-foreground p-8 md:p-12 bg-card 
                 shadow-[4px_4px_0px_0px_hsl(var(--accent))] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] 
                 md:shadow-[8px_8px_0px_0px_hsl(var(--accent))] md:hover:shadow-[10px_10px_0px_0px_hsl(var(--accent))] 
                 sm:shadow-[6px_6px_0px_0px_hsl(var(--accent))] sm:hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))]
                 transition-shadow duration-200"
    >
      <div className="flex items-center mb-6">
        <MdCodeOff className="h-12 w-12 text-accent mr-4" aria-hidden="true" />
        <h2 id="about-me-heading" className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Ab<span className="text-accent">Ø</span>ut Me
        </h2>
      </div>
      <p className="text-lg md:text-xl leading-relaxed font-mono">
        {bioText}
      </p>
      {errorOccurred && userVisibleErrorHint && (
        <p className="mt-4 text-sm text-muted-foreground font-mono">
          {userVisibleErrorHint}
        </p>
      )}
      <p className="mt-8 text-lg md:text-xl leading-relaxed font-mono">
        This portfolio showcases my journey and experiments in the world of digital creation, with a strong inclination towards bold, unconventional aesthetics. Explore my projects to see how I blend functionality with a stark, impactful design philosophy.
      </p>
    </section>
  );
}
