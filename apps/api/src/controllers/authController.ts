import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User';
import { createAccessToken, createRefreshToken } from '../utils/token';
import { env } from '../config/env';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const accessToken = createAccessToken(user.id, user.role);
  const refreshToken = createRefreshToken(user.id, user.role);
  return res.json({ accessToken, refreshToken });
}

const refreshSchema = z.object({
  refreshToken: z.string()
});

export async function refreshToken(req: Request, res: Response) {
  const parsed = refreshSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  try {
    const payload = jwt.verify(parsed.data.refreshToken, env.refreshSecret) as {
      sub: string;
      role: string;
    };
    const accessToken = createAccessToken(payload.sub, payload.role);
    const refreshTokenValue = createRefreshToken(payload.sub, payload.role);
    res.json({ accessToken, refreshToken: refreshTokenValue });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
