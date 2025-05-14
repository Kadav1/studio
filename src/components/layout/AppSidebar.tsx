
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Blocks } from 'lucide-react'; // Changed CodeXml to Blocks
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: Briefcase },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground border-r-2 border-border flex flex-col shadow-2xl">
      <div className="p-6 border-b-2 border-border">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Using Blocks icon as a thematic logo */}
          <Blocks className="h-10 w-10 text-accent group-hover:animate-pulse" />
          <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">
            BruteFolio
          </h1>
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 p-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-150 group',
                  'text-lg font-bold uppercase tracking-wider',
                  pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-sidebar-foreground'
                )}
              >
                <item.icon className={cn(
                  'h-6 w-6 transition-transform duration-150',
                   pathname === item.href ? 'text-accent-foreground' : 'text-accent group-hover:text-sidebar-accent-foreground'
                )} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t-2 border-border text-center">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} BruteFolio</p>
      </div>
    </aside>
  );
}
