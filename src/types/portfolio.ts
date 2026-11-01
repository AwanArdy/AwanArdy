export interface Metric {
  label: string;
  value: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  metrics: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  architectureNote: string;
  highlights: string[];
  tech: string[];
  hasInteractiveDemo?: boolean;
}

export type ProjectVisualType = 'ecommerce' | 'chat' | 'analytics' | 'gateway';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  visualType: ProjectVisualType;
  stack: string[];
  metrics: Metric[];
  points: string[];
}

export interface ArticleCodeBlock {
  language?: string;
  filename?: string;
  code: string;
  description?: string;
}

export interface ArticleSubsection {
  title: string;
  lead?: string;
  paragraphs?: string[];
  codeBlocks?: ArticleCodeBlock[];
  callout?: {
    type: 'note' | 'tip' | 'warning';
    text: string;
  };
  list?: string[];
}

export interface ArticleContentSection {
  id: string;
  title: string;
  iconName?: string;
  subsections: ArticleSubsection[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  summary: string;
  sections: ArticleContentSection[];
}

export interface CvData {
  name: string;
  role: string;
  location: string;
  coordinates: string;
  email: string;
  github: string;
  githubHandle: string;
  experienceYears: string;
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

export type TransitionMode = 'STAGGER_GRID' | 'SWISS_SHUTTER';
