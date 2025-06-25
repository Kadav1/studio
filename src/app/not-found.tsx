
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <AnimatedSection className="flex items-center justify-center min-h-[calc(100vh-20rem)] bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-md mx-auto text-center shadow-lg border-primary/20">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Frown className="h-16 w-16 text-primary" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <h1 className="font-headline text-4xl font-bold text-primary">404 - Page Not Found</h1>
                <p className="text-muted-foreground text-lg">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Homepage
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
