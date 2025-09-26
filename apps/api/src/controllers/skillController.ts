import { Request, Response } from 'express';
import { z } from 'zod';
import { Skill } from '../models/Skill';
import { buildPagination } from '../utils/pagination';

const skillSchema = z.object({
  name: z.string().min(2),
  level: z.string().min(2),
  category: z.string().min(2)
});

export async function listSkills(req: Request, res: Response) {
  const { skip, limit, page } = buildPagination(req.query);
  const query: Record<string, unknown> = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  const [items, total] = await Promise.all([
    Skill.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Skill.countDocuments(query)
  ]);
  res.json({ data: items, pagination: { total, page, pageSize: limit } });
}

export async function getSkill(req: Request, res: Response) {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json({ data: skill });
}

export async function createSkill(req: Request, res: Response) {
  const parsed = skillSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const skill = await Skill.create(parsed.data);
  res.status(201).json({ data: skill });
}

export async function updateSkill(req: Request, res: Response) {
  const parsed = skillSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const skill = await Skill.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json({ data: skill });
}

export async function deleteSkill(req: Request, res: Response) {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  res.json({ message: 'Skill deleted' });
}
