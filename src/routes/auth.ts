import { Router } from 'express';

import { login, logout, register, me } from '../controllers/auth';

import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/me', auth, me);

export default router;
