import { Router } from 'express';

import { sendMessage, getAllMessages } from '../controllers/message';

const router = Router();

router.post('/', sendMessage);

router.get('/:chatId', getAllMessages);

export default router;
