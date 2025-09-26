import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { createExperience, deleteExperience, listExperiences, updateExperience } from '../controllers/experienceController';

const router = Router();

router.get('/', listExperiences);
router.post('/', requireAdmin, createExperience);
router.put('/:id', requireAdmin, updateExperience);
router.delete('/:id', requireAdmin, deleteExperience);

export default router;
