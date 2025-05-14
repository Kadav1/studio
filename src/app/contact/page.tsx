import ContactForm from '@/components/ContactForm';
import { MailWarning } from 'lucide-react';

export const metadata = {
  title: 'Contact - BruteFolio',
  description: 'Get in touch through the contact form.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <header className="border-b-2 border-foreground pb-6 mb-12">
        <div className="flex items-center">
          <MailWarning className="h-12 w-12 text-accent mr-4" />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Contact
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground font-mono">
          Have a project in mind, a question, or just want to say hi? Drop me a line.
        </p>
      </header>
      
      <ContactForm />
    </div>
  );
}
