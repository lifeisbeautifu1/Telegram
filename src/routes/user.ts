import { Router } from 'express';

import { search } from '../controllers/user';

const router = Router();

router.get('/', search);

export default router;
