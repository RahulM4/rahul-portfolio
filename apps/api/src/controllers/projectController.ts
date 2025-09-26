import { Request, Response } from 'express';
import { z } from 'zod';
import { Project } from '../models/Project';
import { buildPagination } from '../utils/pagination';

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(10),
  content: z.string().min(20),
  tech: z.array(z.string()).min(1),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().optional()
});

export async function listProjects(req: Request, res: Response) {
  const { skip, limit, page } = buildPagination(req.query);
  const query: Record<string, unknown> = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.featured) {
    query.featured = req.query.featured === 'true';
  }
  if (req.query.tech) {
    query.tech = req.query.tech;
  }
  if (req.query.search) {
    query.$text = { $search: String(req.query.search) };
  }
  const sortField = typeof req.query.sort === 'string' ? req.query.sort : 'createdAt';
  const sortOrder = req.query.order === 'asc' ? 1 : -1;

  const [items, total] = await Promise.all([
    Project.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Project.countDocuments(query)
  ]);
  res.json({ data: items, pagination: { total, page, pageSize: limit } });
}

export async function getProject(req: Request, res: Response) {
  const identifier = req.params.id;
  const project = await Project.findOne({ $or: [{ _id: identifier }, { slug: identifier }] });
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json({ data: project });
}

export async function createProject(req: Request, res: Response) {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const existing = await Project.findOne({ slug: parsed.data.slug });
  if (existing) {
    return res.status(409).json({ message: 'Slug already exists' });
  }
  const project = await Project.create(parsed.data);
  res.status(201).json({ data: project });
}

export async function updateProject(req: Request, res: Response) {
  const parsed = projectSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const project = await Project.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json({ data: project });
}

export async function deleteProject(req: Request, res: Response) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json({ message: 'Project deleted' });
}
