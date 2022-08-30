import { Router } from 'express';

import { search, updateUsername, updateImage } from '../controllers/user';

const router = Router();

router.get('/', search);

router.post('/username', updateUsername);

router.post('/image', updateImage);

export default router;
