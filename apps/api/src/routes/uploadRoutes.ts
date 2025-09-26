import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import { requireAdmin } from '../middleware/auth';
import { uploadImage } from '../controllers/uploadController';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = 'uploads';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, unique);
  }
});

const upload = multer({ storage });

const router = Router();

router.post('/', requireAdmin, upload.single('file'), uploadImage);

export default router;
