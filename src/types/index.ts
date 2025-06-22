
export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo?: string; // URL to logo image
  startDate: string;
  endDate: string; // Or "Present"
  description: string[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  projectUrl?: string;
  repoUrl?: string;
  usesMotionPrimitives?: boolean;
}

export interface BlogPost {
  id:string;
  title: string;
  date: string;
  summary: string;
  slug: string; // For linking to a full post (not implemented in this version)
  imageUrl?: string;
  imageHint?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  medium?: string;
}

export interface PortfolioEnhancementOutput {
  feedback: string;
  rewrittenDescription: string;
  suggestedKeywords: string[];
}
