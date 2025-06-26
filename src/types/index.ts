
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
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  projectUrl?: string;
  repoUrl?: string;
  usesMotionPrimitives?: boolean;
  caseStudy?: {
    problem: string;
    solution: string;
    outcome: string;
    gallery?: { url: string; hint: string; caption?: string }[];
  };
}

export interface BlogPost {
  id:string;
  title: string; 
  date: string;
  summary: string;
  slug: string; // For linking to a full post (not implemented in this version)
  imageUrl?: string;
  imageHint?: string;
  quizId?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageHint: string;
  medium?: string;
}

export interface GranularFeedback {
  clarity: string;
  actionVerbs: string;
  quantifiableResults: string;
  roleTargeting: string;
}

export interface RewrittenDescriptions {
  standard: string;
  technical: string;
  business: string;
}

export interface SkillsAnalysis {
  extracted: string[];
  suggested: string[];
}

export interface KeywordAnalysis {
  feedback: string;
  suggestedKeywords: string[];
}

export interface PortfolioEnhancementOutput {
  granularFeedback: GranularFeedback;
  rewrittenDescriptions: RewrittenDescriptions;
  skillsAnalysis: SkillsAnalysis;
  keywordAnalysis: KeywordAnalysis;
}

export interface QuizQuestionOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizQuestionOption[];
  correctOptionId: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface DetailedPostFrontmatter {
  title: string;
  date: string; // The formatted date string for display
  rawDate: string; // The original date string (e.g., YYYY-MM-DD) for machine reading
  summary: string;
  imageUrl?: string;
  imageHint?: string;
  quizId?: string;
}

export interface PostData {
  slug: string;
  frontmatter: DetailedPostFrontmatter;
  content: string;
}
