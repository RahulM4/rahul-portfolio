import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function createAccessToken(userId: string, role: string) {
  return jwt.sign({ role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn, subject: userId });
}

export function createRefreshToken(userId: string, role: string) {
  return jwt.sign({ role }, env.refreshSecret, { expiresIn: env.refreshExpiresIn, subject: userId });
}
