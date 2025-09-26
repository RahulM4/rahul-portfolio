import axios from 'axios';
import { ApiResponse, Post, Project, Setting, Skill, Experience, Message } from './types';

const baseURL =
  typeof window === 'undefined'
    ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const client = axios.create({
  baseURL
});

function logFetchError(path: string, error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[api] Falling back for ${path}:`, error);
  }
}

async function safeGet<T>(
  path: string,
  options: Record<string, unknown> | undefined,
  fallback: ApiResponse<T>
): Promise<ApiResponse<T>> {
  try {
    const { data } = await client.get<ApiResponse<T>>(path, options);
    return data;
  } catch (error) {
    logFetchError(path, error);
    return fallback;
  }
}

export async function fetchSettings() {
  const fallback: ApiResponse<Setting | null> = {
    data: {
      _id: 'placeholder',
      siteName: 'Portfolio CMS',
      heroTitle: 'Welcome to your new portfolio.',
      heroSubtitle: 'Use the admin panel to personalise this site.',
      theme: 'system',
      seo: {
        title: 'Portfolio CMS',
        description: 'A modern portfolio experience.',
        keywords: []
      },
      social: {},
      contactEmail: 'admin@example.com'
    }
  };

  const response = await safeGet<Setting | null>('/settings', undefined, fallback);
  return (response.data ?? fallback.data) as Setting;
}

export async function fetchFeaturedProjects() {
  const response = await safeGet<Project[]>(
    '/projects',
    { params: { featured: true, status: 'published', limit: 4 } },
    { data: [] }
  );
  return response.data;
}

export async function fetchLatestPosts() {
  const response = await safeGet<Post[]>(
    '/posts',
    { params: { status: 'published', limit: 3 } },
    { data: [] }
  );
  return response.data;
}

export async function fetchSkills(params?: Record<string, unknown>) {
  const response = await safeGet<Skill[]>(
    '/skills',
    { params },
    { data: [] }
  );
  return response.data;
}

export async function fetchSkillsAdmin(params?: Record<string, unknown>) {
  return safeGet<Skill[]>(
    '/skills',
    { params },
    { data: [], pagination: { total: 0, page: 1, pageSize: Number(params?.limit) || 10 } }
  );
}

export async function fetchSkill(id: string) {
  const response = await safeGet<Skill>(
    `/skills/${id}`,
    undefined,
    {
      data: {
        _id: id,
        name: 'Skill',
        level: 'Intermediate',
        category: 'General',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  );
  return response.data;
}

export async function fetchProjects(params?: Record<string, unknown>) {
  return safeGet<Project[]>(
    '/projects',
    { params },
    { data: [], pagination: { total: 0, page: 1, pageSize: Number(params?.limit) || 10 } }
  );
}

export async function fetchProject(identifier: string) {
  const response = await safeGet<Project>(
    `/projects/${identifier}`,
    undefined,
    {
      data: {
        _id: identifier,
        title: 'Project unavailable',
        slug: identifier,
        summary: 'Content will appear once the API is running.',
        content: 'Start the API server to load project details.',
        tech: [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  );
  return response.data;
}

export async function fetchPosts(params?: Record<string, unknown>) {
  return safeGet<Post[]>(
    '/posts',
    { params },
    { data: [], pagination: { total: 0, page: 1, pageSize: Number(params?.limit) || 10 } }
  );
}

export async function fetchPost(identifier: string) {
  const response = await safeGet<Post>(
    `/posts/${identifier}`,
    undefined,
    {
      data: {
        _id: identifier,
        title: 'Post unavailable',
        slug: identifier,
        excerpt: 'Start the API server to view this post.',
        content: 'Connect the API to load blog content.',
        tags: [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  );
  return response.data;
}

export async function fetchExperiences() {
  const response = await safeGet<Experience[]>(
    '/about/experience',
    undefined,
    { data: [] }
  );
  return response.data;
}

export async function fetchMessages(params?: Record<string, unknown>) {
  return safeGet<Message[]>(
    '/messages',
    { params },
    { data: [], pagination: { total: 0, page: 1, pageSize: Number(params?.limit) || 10 } }
  );
}

export async function submitContact(form: { name: string; email: string; message: string }) {
  const { data } = await client.post<ApiResponse<Message>>('/messages', form);
  return data.data;
}
