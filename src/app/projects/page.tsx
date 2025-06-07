
import { notFound } from 'next/navigation';
// ProjectCard, getProjects, MdGridView, Metadata imports are no longer needed

export default async function ProjectsPage() {
  notFound();
  // This line will not be reached because notFound() throws an error.
  // However, a return statement is often expected by linters or for type checking.
  return null;
}
