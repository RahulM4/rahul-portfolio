import mongoose from 'mongoose';
import { env } from './env';

function redactConnectionString(uri: string) {
  try {
    const url = new URL(uri);
    if (url.password) {
      url.password = '***';
    }
    return url.toString();
  } catch (_) {
    return uri;
  }
}

export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5_000
    });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Connected to MongoDB @ ${redactConnectionString(env.mongoUri)}`);
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
