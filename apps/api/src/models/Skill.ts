import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: string;
  category: string;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
