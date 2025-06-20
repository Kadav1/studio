
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Alex Zewebrand',
  description: 'Privacy Policy for the portfolio website of Alex Zewebrand.',
};

export default function PrivacyPolicyPage() {
  return (
    <AnimatedSection id="privacy-policy" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="font-headline text-2xl md:text-3xl text-primary text-center">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6 md:py-8 space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-sm text-muted-foreground text-center">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">1. Introduction</h2>
              <p>
                Welcome to Alex Zewebrand's portfolio website ("Site"). I am committed to protecting your privacy. This Privacy Policy explains how I collect, use, disclose, and safeguard your information when you visit my Site. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">2. Information I Collect</h2>
              <p>
                I may collect information about you in a variety of ways. The information I may collect on the Site includes:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                <li>
                  <strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to me when you use the contact form on the Site. You are under no obligation to provide me with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
                </li>
                <li>
                  <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. If you are using a mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies to a post, and other interactions with the application and other users via server log files, as well as any other information you choose to provide.
                </li>
                <li>
                  <strong>Analytics Data:</strong> I may use third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the Site through the use of first-party cookies and third-party cookies, to, among other things, analyze and track users’ use of the Site, determine the popularity of certain content, and better understand online activity. By accessing the Site, you consent to the collection and use of your information by these third-party vendors. You are encouraged to review their privacy policy and contact them directly for responses to your questions. I do not transfer personal information to these third-party vendors.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits me to provide you with a smooth, efficient, and customized experience. Specifically, I may use information collected about you via the Site to:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                <li>Respond to your comments, inquiries, and provide customer service.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Maintain the security and operation of the Site.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">4. Disclosure of Your Information</h2>
              <p>
                I will not share your information with any third parties except in the following situations or as otherwise described in this Privacy Policy:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                <li>
                  <strong>By Law or to Protect Rights:</strong> If I believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, I may share your information as permitted or required by any applicable law, rule, or regulation.
                </li>
                <li>
                  <strong>Third-Party Service Providers:</strong> I may share your information with third parties that perform services for me or on my behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">5. Security of Your Information</h2>
              <p>
                I use administrative, technical, and physical security measures to help protect your personal information. While I have taken reasonable steps to secure the personal information you provide to me, please be aware that despite my efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">6. Cookies and Web Beacons</h2>
              <p>
                I may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">7. Policy for Children</h2>
              <p>
                I do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data I have collected from children under age 13, please contact me using the contact information provided below.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">8. Changes to This Privacy Policy</h2>
              <p>
                I reserve the right to make changes to this Privacy Policy at any time and for any reason. I will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.
              </p>
              <p className="mt-2">
                You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-xl font-semibold text-primary mb-2">9. Contact Me</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact me at:
                <br />
                Alex Zewebrand
                <br />
                [Your Email Address - e.g., alex.zewebrand@example.com]
                <br />
                [Your Location, if applicable - e.g., New York, USA]
              </p>
              <p className="mt-2">
                <em>Please replace the bracketed information above with your actual contact details.</em>
              </p>
            </section>
            
            <p className="text-sm text-muted-foreground mt-8">
              <strong>Disclaimer:</strong> This is a template Privacy Policy and may not be suitable for all situations. It is recommended to consult with a legal professional to ensure compliance with all applicable laws and regulations.
            </p>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
