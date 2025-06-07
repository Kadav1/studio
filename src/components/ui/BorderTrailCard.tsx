import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BorderTrailCardProps {
  children: ReactNode;
  className?: string;
}

export default function BorderTrailCard({ children, className }: BorderTrailCardProps) {
  return (
    <div
      className={cn(
        // The .animated-border-gradient class is applied via globals.css
        // It relies on the padding: 2px (from globals.css) and its ::before pseudo-element
        // The `rounded-[var(--radius)]` should match the inner content's rounding for consistency.
        'animated-border-gradient rounded-[var(--radius)]', 
        className
      )}
    >
      {/* The direct child should have its own background and be rounded to fit inside the "border" */}
      {children}
    </div>
  );
}
