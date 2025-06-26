import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, PostData, DetailedPostFrontmatter } from '@/types';
import { format, parseISO } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getSortedPostsData(): BlogPost[] {
  // Check if the directory exists. If not, return an empty array to prevent crashes.
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Blog posts directory not found at: ${postsDirectory}. Returning empty array.`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx')) // Process only .mdx files
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      try {
        const { data } = matter(fileContents);

        // Validate that essential frontmatter exists and is of the correct type
        if (typeof data.title !== 'string' || typeof data.date !== 'string' || typeof data.summary !== 'string') {
          console.warn(`Skipping post "${fileName}" due to invalid or missing frontmatter (title, date, or summary).`);
          return null;
        }

        // This will throw an error if the date is not a valid ISO string, which is caught below
        const parsedDate = parseISO(data.date);

        const blogPost: BlogPost = {
          id: slug,
          slug,
          title: data.title,
          summary: data.summary,
          date: format(parsedDate, 'MMMM dd, yyyy'),
          imageUrl: data.imageUrl,
          imageHint: data.imageHint,
          quizId: data.quizId,
        };

        // Return a temporary object with raw date for accurate sorting
        return { post: blogPost, rawDate: data.date };

      } catch (e) {
        console.error(`Could not process blog post "${fileName}" due to an error:`, e);
        return null;
      }
    })
    .filter((item): item is { post: BlogPost; rawDate: string } => item !== null) // Filter out any posts that failed to parse
    .sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1)) // Sort by raw date string (newest first)
    .map(item => item.post); // Return just the BlogPost objects

  return allPostsData;
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
      return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate essential frontmatter
    if (typeof data.title !== 'string' || typeof data.date !== 'string' || typeof data.summary !== 'string') {
      console.warn(`Could not load post for slug "${slug}" due to invalid or missing frontmatter.`);
      return null;
    }

    const parsedDate = parseISO(data.date);

    const frontmatter: DetailedPostFrontmatter = {
      title: data.title,
      summary: data.summary,
      imageUrl: data.imageUrl,
      imageHint: data.imageHint,
      quizId: data.quizId,
      date: format(parsedDate, 'MMMM dd, yyyy'),
      rawDate: data.date,
    };

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading post data for slug: ${slug}`, error);
    return null;
  }
}
