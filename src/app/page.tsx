
import BioSection from '@/components/BioSection';
import SocialLinks from '@/components/SocialLinks';

export default function HomePage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <BioSection />
      <SocialLinks />
    </div>
  );
}
