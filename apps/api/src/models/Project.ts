import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
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
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    tech: [{ type: String }],
    repoUrl: String,
    demoUrl: String,
    coverImage: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

ProjectSchema.index({ title: 'text', summary: 'text', content: 'text' });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
