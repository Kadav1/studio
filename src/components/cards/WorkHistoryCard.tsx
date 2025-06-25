
"use client";

import type { WorkExperience } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface WorkHistoryCardProps {
  experience: WorkExperience;
  isLeft: boolean;
}

export default function WorkHistoryCard({ experience, isLeft }: WorkHistoryCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative md:flex md:items-start md:justify-between"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:order-0' : 'md:order-2'}`}>
        <Card className="shadow-lg transition-shadow duration-300 border-l-4 border-primary/50 hover:border-primary w-full">
          <CardHeader>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <CardTitle className="font-headline text-xl md:text-2xl text-primary">{experience.jobTitle}</CardTitle>
                <CardDescription className="text-muted-foreground text-base flex items-center pt-1">
                  <Briefcase className="h-4 w-4 mr-2" /> {experience.company}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground flex items-center whitespace-nowrap bg-secondary px-2 py-1 rounded-md">
                <CalendarDays className="h-4 w-4 mr-2" />
                {experience.startDate} - {experience.endDate}
              </div>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.ul variants={itemVariants} className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
              {experience.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </motion.ul>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
      <div className="absolute left-5 top-8 -translate-y-1/2 transform md:relative md:left-auto md:top-8 md:translate-y-0 md:mx-auto">
        <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-8 ring-secondary">
          <MapPin className="h-5 w-5" />
        </div>
      </div>
       <div className={`hidden md:block md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:order-2' : 'md:order-0'}`}></div>
    </motion.div>
  );
}
