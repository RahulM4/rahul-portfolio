import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { getSettings, upsertSettings } from '../controllers/settingController';

const router = Router();

router.get('/', getSettings);
router.put('/', requireAdmin, upsertSettings);

export default router;
