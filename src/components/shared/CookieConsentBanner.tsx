
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'cookieConsentAccepted';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    const consent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (consent !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <Card className="bg-secondary text-secondary-foreground shadow-2xl border-primary/30">
        <CardContent className="pt-6 pb-0">
          <div className="flex items-start space-x-3">
            <Cookie className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary">Cookie & Privacy Notice</h3>
              <p className="text-sm text-secondary-foreground/90 mt-1 leading-relaxed">
                This website uses cookies to enhance your experience and ensure essential functionalities. By continuing to use this site, you agree to our use of cookies and our{' '}
                <Link href="/privacy-policy" className="underline hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end pt-4">
          <Button onClick={handleAccept} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Accept & Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
