import mongoose, { Document, Schema } from 'mongoose';

export interface ISetting extends Document {
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

const SettingSchema = new Schema<ISetting>(
  {
    siteName: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      keywords: [{ type: String }]
    },
    social: {
      twitter: String,
      github: String,
      linkedin: String
    },
    contactEmail: String
  },
  { timestamps: true }
);

export const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
