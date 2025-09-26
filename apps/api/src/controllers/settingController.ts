import { Request, Response } from 'express';
import { z } from 'zod';
import { Setting } from '../models/Setting';

const seoSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  keywords: z.array(z.string()).optional().default([])
});

const socialSchema = z.object({
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional()
});

const settingSchema = z.object({
  siteName: z.string().min(2),
  heroTitle: z.string().min(5),
  heroSubtitle: z.string().min(10),
  theme: z.enum(['light', 'dark', 'system']),
  seo: seoSchema,
  social: socialSchema,
  contactEmail: z.string().email().optional()
});

export async function getSettings(_: Request, res: Response) {
  const settings = await Setting.findOne();
  res.json({ data: settings });
}

export async function upsertSettings(req: Request, res: Response) {
  const parsed = settingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const settings = await Setting.findOneAndUpdate({}, parsed.data, { new: true, upsert: true });
  res.json({ data: settings });
}
