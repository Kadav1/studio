
import type { Project } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'public', 'projects.json');

async function readProjectsFile(): Promise<Project[]> {
  try {
    const jsonData = await fs.readFile(projectsFilePath, 'utf-8');
    if (jsonData.trim() === "") {
        // If the file is empty, return an empty array
        return [];
    }
    try {
      return JSON.parse(jsonData) as Project[];
    } catch (parseError) {
      console.error('Failed to parse projects.json:', parseError);
      return []; // Return empty array if JSON is malformed
    }
  } catch (error) {
    console.error('Failed to read projects.json:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // If the file doesn't exist, create it with an empty array
      try {
        await fs.writeFile(projectsFilePath, JSON.stringify([], null, 2), 'utf-8');
        return [];
      } catch (writeError) {
        console.error('Failed to create projects.json:', writeError);
        return []; // Still return empty array if write fails
      }
    }
    // For other errors, return an empty array
    return [];
  }
}

export const getProjects = async (): Promise<Project[]> => {
  const projects = await readProjectsFile();
  if (!Array.isArray(projects)) {
    console.error("projects.json did not parse to an array. Returning empty array.");
    return [];
  }
  return projects;
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const allProjects = await getProjects();
   if (!Array.isArray(allProjects)) { // Defensive check
    return undefined;
  }
  return allProjects.find(project => project.slug === slug);
};
