import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { createSkill, deleteSkill, getSkill, listSkills, updateSkill } from '../controllers/skillController';

const router = Router();

router.get('/', listSkills);
router.get('/:id', getSkill);
router.post('/', requireAdmin, createSkill);
router.put('/:id', requireAdmin, updateSkill);
router.delete('/:id', requireAdmin, deleteSkill);

export default router;
