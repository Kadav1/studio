'use server';

import type { Project } from '@/types';
// import { z } from 'zod'; // Unused since form validation logic was removed
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'public', 'projects.json');

// projectSchema and addProjectAction were removed as the admin UI is no longer present.
// If you re-introduce an admin form, this logic would need to be restored or re-implemented.

// Placeholder for the type, actual schema validation is not active.
// const projectSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens"),
//   shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(200, "Short description must be less than 200 characters"),
//   description: z.string().min(20, "Description must be at least 20 characters"),
//   thumbnailUrl: z.string().url("Thumbnail URL must be a valid URL").startsWith("https://placehold.co/", "Thumbnail URL must be a placehold.co image for now"),
//   imageUrl: z.string().url("Image URL must be a valid URL").startsWith("https://placehold.co/", "Image URL must be a placehold.co image for now"),
//   technologiesString: z.string().min(1, "Technologies must be a comma-separated list of at least one technology"),
// });


export async function addProjectAction(prevState: any, formData: FormData) {
  // This function is no longer called by any active UI.
  // If re-enabled, ensure proper validation and error handling.
  // For now, it's a no-op to prevent errors if somehow triggered.
  console.warn("addProjectAction called, but admin UI is disabled.");
  return {
    message: 'Admin functionality is currently disabled.',
    type: 'error',
    errors: null,
    resetKey: prevState?.resetKey || Date.now().toString(),
  };
}
