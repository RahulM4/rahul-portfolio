import { Request, Response } from 'express';
import { z } from 'zod';
import { Post } from '../models/Post';
import { buildPagination } from '../utils/pagination';

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(['draft', 'published']).default('draft')
});

export async function listPosts(req: Request, res: Response) {
  const { skip, limit, page } = buildPagination(req.query);
  const query: Record<string, unknown> = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.tag) {
    query.tags = req.query.tag;
  }
  if (req.query.search) {
    query.$text = { $search: String(req.query.search) };
  }
  const sortField = typeof req.query.sort === 'string' ? req.query.sort : 'createdAt';
  const sortOrder = req.query.order === 'asc' ? 1 : -1;

  const [items, total] = await Promise.all([
    Post.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(query)
  ]);
  res.json({ data: items, pagination: { total, page, pageSize: limit } });
}

export async function getPost(req: Request, res: Response) {
  const identifier = req.params.id;
  const post = await Post.findOne({ $or: [{ _id: identifier }, { slug: identifier }] });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json({ data: post });
}

export async function createPost(req: Request, res: Response) {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const existing = await Post.findOne({ slug: parsed.data.slug });
  if (existing) {
    return res.status(409).json({ message: 'Slug already exists' });
  }
  const post = await Post.create(parsed.data);
  res.status(201).json({ data: post });
}

export async function updatePost(req: Request, res: Response) {
  const parsed = postSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const post = await Post.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json({ data: post });
}

export async function deletePost(req: Request, res: Response) {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json({ message: 'Post deleted' });
}
