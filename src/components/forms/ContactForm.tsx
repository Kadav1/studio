"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, User, Mail as MailIcon, MessageCircle } from "lucide-react"; // Renamed Mail to MailIcon to avoid conflict
import { contactAction } from "@/app/actions/contactAction"; // Assuming you'll create this

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, {message: "Message must be at most 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    startTransition(async () => {
      try {
        const result = await contactAction(data); // Call server action
        if (result.success) {
          toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
          });
          form.reset();
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to send message. Please try again.",
            variant: "destructive",
          });
        }
      } catch (e) {
         toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="name"
            placeholder="Your Name"
            {...form.register("name")}
            className={`pl-10 ${form.formState.errors.name ? "border-destructive" : ""}`}
            disabled={isPending}
          />
        </div>
        {form.formState.errors.name && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...form.register("email")}
            className={`pl-10 ${form.formState.errors.email ? "border-destructive" : ""}`}
            disabled={isPending}
          />
        </div>
        {form.formState.errors.email && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
         <div className="relative">
          <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Textarea
            id="message"
            placeholder="Your message..."
            {...form.register("message")}
            className={`min-h-[120px] pl-10 ${form.formState.errors.message ? "border-destructive" : ""}`}
            disabled={isPending}
          />
        </div>
        {form.formState.errors.message && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
