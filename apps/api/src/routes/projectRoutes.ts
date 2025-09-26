import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { createProject, deleteProject, getProject, listProjects, updateProject } from '../controllers/projectController';

const router = Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', requireAdmin, createProject);
router.put('/:id', requireAdmin, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
