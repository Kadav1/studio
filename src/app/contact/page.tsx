import { notFound } from 'next/navigation';

export default function ContactPage() {
  notFound();
  // This line will not be reached because notFound() throws an error.
  // However, a return statement is often expected by linters or for type checking.
  return null;
}
