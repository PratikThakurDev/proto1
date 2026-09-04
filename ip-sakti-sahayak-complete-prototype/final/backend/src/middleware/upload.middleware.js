import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
fs.mkdirSync('uploads', { recursive: true });
const storage = multer.diskStorage({ destination: 'uploads/', filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`) });
export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
