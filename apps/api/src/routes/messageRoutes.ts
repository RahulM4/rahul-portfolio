import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAdmin } from '../middleware/auth';
import { listMessages, markMessageRead, submitMessage } from '../controllers/messageController';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/', contactLimiter, submitMessage);
router.get('/', requireAdmin, listMessages);
router.patch('/:id/read', requireAdmin, markMessageRead);

export default router;
