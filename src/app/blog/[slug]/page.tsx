
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getPostData(params.slug);
  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  const { frontmatter } = postData;
  const pageTitle = `${frontmatter.title} - Blog`;
  const pageDescription = frontmatter.summary;
  // Using a placeholder base URL. In a real project, this should come from an environment variable.
  const baseUrl = 'https://alexzewebrand.com';
  
  const openGraphImages = frontmatter.imageUrl ? [
    {
      url: `${baseUrl}${frontmatter.imageUrl}`,
      width: 1200,
      height: 630,
      alt: `Preview image for the blog post: ${frontmatter.title}`,
    },
  ] : [];

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${baseUrl}/blog/${postData.slug}`,
      images: openGraphImages,
      type: 'article',
      publishedTime: frontmatter.rawDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: openGraphImages.length > 0 ? [openGraphImages[0].url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData) {
    notFound();
  }

  const { frontmatter, content } = postData;

  return (
    <AnimatedSection className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
            <Button variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent">
                <Link href="/?tab=blog#showcase">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
                </Link>
            </Button>
        </div>
        <main className="max-w-3xl mx-auto">
          <article>
            <header className="mb-8 text-center">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{frontmatter.title}</h1>
              <div className="flex items-center justify-center text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2" />
                <time dateTime={frontmatter.rawDate}>{frontmatter.date}</time>
              </div>
            </header>

            {frontmatter.imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg border">
                    <Image
                    src={frontmatter.imageUrl}
                    alt={`Blog post image for ${frontmatter.title}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                    />
                </div>
            )}

            <Card className="shadow-lg">
              <CardContent className="prose prose-lg dark:prose-invert max-w-none p-6 md:p-8 
                prose-headings:font-headline prose-headings:text-primary prose-a:text-accent 
                hover:prose-a:text-accent/80 prose-strong:text-foreground/90 prose-blockquote:border-accent
                prose-code:bg-secondary prose-code:p-1 prose-code:rounded-md prose-code:font-code
                prose-code:before:content-[''] prose-code:after:content-['']">
                <MDXRemote source={content} />
              </CardContent>
            </Card>
          </article>
        </main>
      </div>
    </AnimatedSection>
  );
}
