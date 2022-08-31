import { Router } from 'express';

import {
  search,
  updateUsername,
  updateImage,
  updateOnline,
} from '../controllers/user';

const router = Router();

router.get('/', search);

router.patch('/username', updateUsername);

router.patch('/image', updateImage);

router.patch('/online', updateOnline);

export default router;
