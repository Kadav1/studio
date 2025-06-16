"use client";

import type { WorkExperience } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface WorkHistoryCardProps {
  experience: WorkExperience;
  isLeft: boolean;
}

export default function WorkHistoryCard({ experience, isLeft }: WorkHistoryCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative md:flex md:items-center md:justify-between"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`md:w-1/2 ${isLeft ? 'md:pr-8' : 'md:pl-8 md:order-1'}`}>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-xl md:text-2xl text-primary">{experience.jobTitle}</CardTitle>
                <CardDescription className="text-muted-foreground text-base flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> {experience.company}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground flex items-center whitespace-nowrap">
                <CalendarDays className="h-4 w-4 mr-2" />
                {experience.startDate} - {experience.endDate}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
              {experience.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 transform md:relative md:left-auto md:top-auto md:translate-y-0 md:mx-auto">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <BriefcaseIcon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
