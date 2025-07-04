
"use client";

import ContactForm from "@/components/forms/ContactForm";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare, Linkedin, Github, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <AnimatedSection id="contact" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12 flex-col text-center">
           <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
            <MessageSquare className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-3">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-accent mr-4" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a href="mailto:blndsft@proton.me" className="text-muted-foreground hover:text-accent transition-colors">
                      blndsft@proton.me
                    </a>
                  </div>
                </div>
                 <div className="flex items-center">
                  <Phone className="h-6 w-6 text-accent mr-4" />
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                      +1 (234) 567-890 {/* Placeholder */}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-accent mr-4" />
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground">Sweden (Remote)</p> {/* Placeholder */}
                  </div>
                </div>
                <div className="flex space-x-4 pt-4 border-t">
                   <Link href="https://www.linkedin.com/in/alexzewebrand" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110">
                      <Linkedin className="h-7 w-7" />
                  </Link>
                  <Link href="https://github.com/alexzewebrand" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110">
                      <Github className="h-7 w-7" />
                  </Link>
                  <Link href="https://www.instagram.com/alexzewebrand" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110">
                      <Instagram className="h-7 w-7" />
                  </Link>
                  <Link href="https://www.facebook.com/alexzewebrand" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:scale-110">
                      <Facebook className="h-7 w-7" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
