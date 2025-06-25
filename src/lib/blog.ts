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
      const { data } = matter(fileContents);

      return {
        id: slug,
        slug,
        ...(data as { title: string; date: string; summary: string; imageUrl?: string; imageHint?: string; quizId?: string }),
        date: format(parseISO(data.date), 'MMMM dd, yyyy'),
      };
    });

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
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
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter: DetailedPostFrontmatter = {
      title: data.title,
      summary: data.summary,
      imageUrl: data.imageUrl,
      imageHint: data.imageHint,
      quizId: data.quizId,
      date: format(parseISO(data.date), 'MMMM dd, yyyy'),
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
