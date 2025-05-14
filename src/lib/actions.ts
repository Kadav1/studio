
"use server";

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Simulate email sending
  console.log("Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // In a real app, you would integrate with an email service here (e.g., SendGrid, Resend)
  // For example:
  // try {
  //   await resend.emails.send({
  //     from: 'onboarding@resend.dev',
  //     to: 'your-email@example.com',
  //     subject: `New contact from ${name}`,
  //     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
  //   });
  //   return { message: "Your message has been sent successfully!", status: "success" };
  // } catch (error) {
  //   console.error("Email sending failed:", error);
  //   return { message: "Failed to send message. Please try again later.", status: "error" };
  // }

  return {
    message: "Your message has been received (simulated). Thank you!",
    status: "success",
  };
}
