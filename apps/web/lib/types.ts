export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;
  coverImage?: string;
  status: 'draft' | 'published';
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  status: 'draft' | 'published';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Setting {
  _id: string;
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  theme: 'light' | 'dark' | 'system';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  contactEmail?: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read';
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
  };
}
