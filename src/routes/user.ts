import { Router } from 'express';

import { search, updateUsername } from '../controllers/user';

const router = Router();

router.get('/', search);

router.post('/username', updateUsername);

export default router;
