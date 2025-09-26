import { NextFunction, Request, Response } from 'express';

export function errorHandler(error: unknown, _: Request, res: Response, __: NextFunction) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
