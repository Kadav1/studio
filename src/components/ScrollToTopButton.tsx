
'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-300 ease-in-out print:hidden',
        'border-2 border-foreground bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent',
        'h-12 w-12 md:h-14 md:w-14 rounded-none', // Brutalist: no radius, slightly larger
        'shadow-[3px_3px_0px_0px_hsl(var(--foreground))] hover:shadow-[3px_3px_0px_0px_hsl(var(--accent))]', // Adjusted shadow
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp className="h-6 w-6 md:h-7 md:w-7" />
    </Button>
  );
}
