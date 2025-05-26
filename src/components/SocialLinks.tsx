
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa'; 
import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: FaGithub, ariaLabel: 'View GitHub profile' },
  { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebook, ariaLabel: 'View Facebook profile' },
  { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram, ariaLabel: 'View Instagram profile' },
];

export default function SocialLinks() {
  return (
    <section aria-labelledby="connect-with-me-heading" className="py-8 md:py-12 mt-12 md:mt-16 text-center">
      <h3 id="connect-with-me-heading" className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">
        Connect With Me
      </h3>
      <div className="flex justify-center items-center space-x-4 md:space-x-6">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="p-2 md:p-3 border-2 border-foreground text-foreground 
                       hover:bg-accent hover:text-accent-foreground hover:border-accent 
                       transition-colors duration-150 
                       shadow-brutalist-sm md:shadow-brutalist-md 
                       hover:shadow-brutalist-accent-sm md:hover:shadow-brutalist-accent-md"
          >
            <social.icon className="h-6 w-6 md:h-8 md:w-8" />
          </Link>
        ))}
      </div>
    </section>
  );
}
