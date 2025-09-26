import { Router } from 'express';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import postRoutes from './postRoutes';
import skillRoutes from './skillRoutes';
import experienceRoutes from './experienceRoutes';
import messageRoutes from './messageRoutes';
import settingRoutes from './settingRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/posts', postRoutes);
router.use('/skills', skillRoutes);
router.use('/about/experience', experienceRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingRoutes);
router.use('/uploads', uploadRoutes);

export default router;
