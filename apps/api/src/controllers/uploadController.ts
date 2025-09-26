import { Request, Response } from 'express';

export function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ data: { url } });
}
