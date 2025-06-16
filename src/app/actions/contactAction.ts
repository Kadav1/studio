"use server";

import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
});

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function contactAction(
  input: z.infer<typeof ContactFormSchema>
): Promise<ActionResult> {
  try {
    const validatedData = ContactFormSchema.parse(input);

    // In a real application, you would process the data here:
    // - Send an email
    // - Save to a database
    // - etc.
    console.log("Contact form submitted:", validatedData);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For this example, we'll always return success.
    return { success: true };

  } catch (error) {
    console.error("Error in contactAction:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input: " + error.errors.map(e => e.message).join(", ") };
    }
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
