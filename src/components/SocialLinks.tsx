
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github, ariaLabel: 'View GitHub profile' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, ariaLabel: 'View LinkedIn profile' },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter, ariaLabel: 'View Twitter profile' },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, ariaLabel: 'View Instagram profile' },
];

export default function SocialLinks() {
  return (
    <section className="py-8 md:py-12 mt-12 md:mt-16 text-center">
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">
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
            className="p-3 border-2 border-foreground text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-150 shadow-brutalist-sm hover:shadow-brutalist-accent-sm"
          >
            <social.icon className="h-6 w-6 md:h-8 md:w-8" />
          </Link>
        ))}
      </div>
    </section>
  );
}
