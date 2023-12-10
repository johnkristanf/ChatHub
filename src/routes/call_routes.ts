import express from 'express';

import JWT from '../middleware/JWT';

import { StartVideoCallController, VideoCallUIController } from '../controllers/CallControllers';

const router = express.Router();

router.get('/video', JWT.ValidateToken, StartVideoCallController)

router.get('/video/:room', JWT.ValidateToken, VideoCallUIController);





export default router;