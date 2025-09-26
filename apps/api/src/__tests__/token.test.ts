import { createAccessToken } from '../utils/token';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

describe('token utils', () => {
  it('creates access token with role claim', () => {
    const token = createAccessToken('123', 'admin');
    const decoded = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
    expect(decoded.role).toBe('admin');
    expect(decoded.sub).toBe('123');
  });
});
