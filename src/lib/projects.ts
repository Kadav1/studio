import type { Project } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'public', 'projects.json');

async function readProjectsFile(): Promise<Project[]> {
  try {
    const jsonData = await fs.readFile(projectsFilePath, 'utf-8');
    return JSON.parse(jsonData) as Project[];
  } catch (error) {
    console.error('Failed to read projects.json:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // If the file doesn't exist, create it with an empty array
      await fs.writeFile(projectsFilePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    // For other errors, re-throw or handle as appropriate
    // For simplicity, we'll return an empty array for other read errors too,
    // but in a real app, you might want more robust error handling.
    return [];
  }
}

export const getProjects = async (): Promise<Project[]> => {
  return await readProjectsFile();
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const allProjects = await getProjects();
  return allProjects.find(project => project.slug === slug);
};
