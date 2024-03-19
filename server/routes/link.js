import express from 'express';
import { links, postLink, viewCount } from '../controllers/link.js';

const router = express.Router();

router.post('/post-link', postLink);
router.get('/links', links);
router.put('/view-count/:linkId', viewCount);

export default router;
