import { Request, Response } from 'express';
import { z } from 'zod';
import { Message } from '../models/Message';
import { buildPagination } from '../utils/pagination';
import { sendContactEmail, sendContactConfirmation, sendMessageAcknowledgement } from '../services/emailService';

const messageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function submitMessage(req: Request, res: Response) {
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const created = await Message.create(parsed.data);
  try {
    await sendContactEmail(parsed.data);
    await sendContactConfirmation({ name: parsed.data.name, email: parsed.data.email });
  } catch (error) {
    console.error('Failed to send email', error);
  }
  res.status(201).json({ data: created });
}

export async function listMessages(req: Request, res: Response) {
  const { skip, limit, page } = buildPagination(req.query);
  const [items, total] = await Promise.all([
    Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Message.countDocuments()
  ]);
  res.json({ data: items, pagination: { total, page, pageSize: limit } });
}

export async function markMessageRead(req: Request, res: Response) {
  const existing = await Message.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: 'Message not found' });
  }

  if (existing.status !== 'read') {
    existing.status = 'read';
    await existing.save();
    try {
      await sendMessageAcknowledgement({ name: existing.name, email: existing.email });
    } catch (error) {
      console.error('Failed to send acknowledgement email', error);
    }
  }

  const message = await Message.findById(req.params.id);
  res.json({ data: message });
}
