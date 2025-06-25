
"use client";

import type { WorkExperience } from "@/types";
import WorkHistoryCard from "@/components/cards/WorkHistoryCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Briefcase } from "lucide-react";

const workExperiences: WorkExperience[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    startDate: "Jan 2021",
    endDate: "Present",
    description: [
      "Led the development of a new client-facing dashboard using React, TypeScript, and Tailwind CSS, improving user engagement by 25%.",
      "Implemented complex animations and interactions using Framer Motion (Motion-primitives) to enhance user experience.",
      "Mentored junior developers and conducted code reviews to maintain high code quality standards.",
    ],
    skills: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Next.js"],
  },
  {
    id: "2",
    jobTitle: "Full-Stack Developer",
    company: "Innovate Hub",
    startDate: "Jun 2018",
    endDate: "Dec 2020",
    description: [
      "Developed and maintained web applications using Node.js, Express, and React.",
      "Contributed to the design and implementation of RESTful APIs.",
      "Collaborated with cross-functional teams to deliver high-quality software products.",
    ],
    skills: ["Node.js", "Express", "React", "MongoDB", "REST APIs"],
  },
  {
    id: "3",
    jobTitle: "Junior Web Developer",
    company: "Web Creators Co.",
    startDate: "Aug 2016",
    endDate: "May 2018",
    description: [
      "Assisted in building and maintaining client websites using HTML, CSS, and JavaScript.",
      "Gained experience with responsive design principles and front-end frameworks like Bootstrap.",
      "Participated in daily stand-ups and sprint planning sessions.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
  },
];

export default function WorkHistorySection() {
  return (
    <AnimatedSection id="work-history" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-16 flex-col text-center">
           <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
            <Briefcase className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-3">Career Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A timeline of my professional experience, highlighting key roles and accomplishments that have shaped my skills.
          </p>
        </div>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-1 before:bg-primary/20 before:-translate-x-px md:before:mx-auto md:before:translate-x-0">
          {workExperiences.map((exp, index) => (
            <WorkHistoryCard key={exp.id} experience={exp} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
