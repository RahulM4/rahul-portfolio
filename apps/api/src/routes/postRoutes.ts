import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { createPost, deletePost, getPost, listPosts, updatePost } from '../controllers/postController';

const router = Router();

router.get('/', listPosts);
router.get('/:id', getPost);
router.post('/', requireAdmin, createPost);
router.put('/:id', requireAdmin, updatePost);
router.delete('/:id', requireAdmin, deletePost);

export default router;
