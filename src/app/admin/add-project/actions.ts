'use server';

import type { Project } from '@/types';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'public', 'projects.json');

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(200, "Short description must be less than 200 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  thumbnailUrl: z.string().url("Thumbnail URL must be a valid URL").startsWith("https://placehold.co/", "Thumbnail URL must be a placehold.co image for now"),
  imageUrl: z.string().url("Image URL must be a valid URL").startsWith("https://placehold.co/", "Image URL must be a placehold.co image for now"),
  technologiesString: z.string().min(1, "Technologies must be a comma-separated list of at least one technology"),
});


export async function addProjectAction(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    shortDescription: formData.get('shortDescription'),
    description: formData.get('description'),
    thumbnailUrl: formData.get('thumbnailUrl'),
    imageUrl: formData.get('imageUrl'),
    technologiesString: formData.get('technologiesString'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation Error.',
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      resetKey: prevState.resetKey, // Keep same resetKey on validation error
    };
  }

  const { slug, title, shortDescription, description, thumbnailUrl, imageUrl, technologiesString } = validatedFields.data;
  const technologies = technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);

  const newProject: Project = {
    slug,
    title,
    shortDescription,
    description,
    thumbnailUrl,
    imageUrl,
    technologies,
  };

  try {
    let projects: Project[] = [];
    try {
      const fileContents = await fs.readFile(projectsFilePath, 'utf-8');
      if (fileContents.trim() !== "") {
        projects = JSON.parse(fileContents);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error("Error reading projects.json, starting fresh:", error);
      }
      // If file doesn't exist or is empty/invalid JSON, start with an empty array
      projects = [];
    }

    if (projects.some(p => p.slug === newProject.slug)) {
      return {
        message: 'Error: Project slug already exists.',
        type: 'error',
        errors: { slug: ['Slug already exists.'] },
        resetKey: prevState.resetKey,
      };
    }

    projects.push(newProject);
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), 'utf-8');

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${newProject.slug}`);

    return {
      message: 'Project added successfully!',
      type: 'success',
      errors: null,
      resetKey: Date.now().toString(), // Change resetKey on success to clear form
    };
  } catch (error) {
    console.error('Failed to add project:', error);
    return {
      message: 'Failed to add project. Check server logs.',
      type: 'error',
      errors: null,
      resetKey: prevState.resetKey,
    };
  }
}
