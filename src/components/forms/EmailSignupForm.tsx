"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

const emailSignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type EmailSignupFormValues = z.infer<typeof emailSignupSchema>;

export default function EmailSignupForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<EmailSignupFormValues>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<EmailSignupFormValues> = (data) => {
    startTransition(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Email submitted:", data.email);
      toast({
        title: "Successfully Subscribed!",
        description: "Thanks for joining the newsletter. You'll hear from me soon.",
      });
      setIsSuccess(true);
      form.reset();
    });
  };

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-accent/10 border border-accent/20 rounded-lg">
        <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
        <p className="text-lg font-medium text-primary">Thanks for subscribing!</p>
        <p className="text-sm text-muted-foreground">You&apos;re all set. Keep an eye on your inbox.</p>
      </div>
    );
  }


  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-start">
        <div className="relative flex-grow w-full">
           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...form.register("email")}
            className={`pl-10 ${form.formState.errors.email ? "border-destructive" : ""}`}
            aria-invalid={form.formState.errors.email ? "true" : "false"}
            aria-describedby="email-error"
            disabled={isPending}
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      {form.formState.errors.email && (
        <p id="email-error" className="text-sm text-destructive">
          {form.formState.errors.email.message}
        </p>
      )}
    </form>
  );
}
