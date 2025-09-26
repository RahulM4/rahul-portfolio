import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date
  },
  { timestamps: true }
);

export const Experience =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
