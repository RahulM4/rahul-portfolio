import { Request, Response } from 'express';
import { z } from 'zod';
import { Experience } from '../models/Experience';

const experienceSchema = z.object({
  role: z.string().min(2),
  company: z.string().min(2),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string().optional()
});

export async function listExperiences(_: Request, res: Response) {
  const experiences = await Experience.find().sort({ startDate: -1 });
  res.json({ data: experiences });
}

export async function createExperience(req: Request, res: Response) {
  const parsed = experienceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const experience = await Experience.create({
    ...parsed.data,
    startDate: new Date(parsed.data.startDate),
    endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined
  });
  res.status(201).json({ data: experience });
}

export async function updateExperience(req: Request, res: Response) {
  const parsed = experienceSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const update = {
    ...parsed.data,
    startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
    endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined
  };
  const experience = await Experience.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json({ data: experience });
}

export async function deleteExperience(req: Request, res: Response) {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json({ message: 'Experience deleted' });
}
