import express from 'express';

import JWT from '../middleware/JWT';
import { getMessagesController } from '../controllers/MessagesController';

const router = express.Router();


router.get('/get/messages', JWT.ValidateToken, getMessagesController);



export default router;