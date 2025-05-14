
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState: ContactFormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="btn-brutalist w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "success" && state.message) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
    } else if (state.status === "error" && state.message) {
      toast({
        title: "Error!",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-8 max-w-2xl mx-auto p-6 md:p-10 border-2 border-foreground bg-card shadow-[8px_8px_0px_0px_hsl(var(--accent))]">
      <div>
        <Label htmlFor="name" className="block text-lg font-bold uppercase tracking-wider mb-2">Name</Label>
        <Input type="text" id="name" name="name" required className="input-brutalist" />
        {state.errors?.name && <p className="text-destructive text-sm mt-1 font-mono">{state.errors.name.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="block text-lg font-bold uppercase tracking-wider mb-2">Email</Label>
        <Input type="email" id="email" name="email" required className="input-brutalist" />
        {state.errors?.email && <p className="text-destructive text-sm mt-1 font-mono">{state.errors.email.join(', ')}</p>}
      </div>
      <div>
        <Label htmlFor="message" className="block text-lg font-bold uppercase tracking-wider mb-2">Message</Label>
        <Textarea id="message" name="message" rows={6} required className="input-brutalist" />
        {state.errors?.message && <p className="text-destructive text-sm mt-1 font-mono">{state.errors.message.join(', ')}</p>}
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
