import { Router } from 'express';

const router = Router();

import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroupChat,
  addToGroupChat,
  renameGroupChat,
} from '../controllers/chat';

router.get('/', fetchChats);

router.post('/', accessChat);

router.post('/group', createGroupChat);

router.patch('/rename', renameGroupChat);

router.patch('/group/remove', removeFromGroupChat);

router.patch('/group/add', addToGroupChat);

export default router;
