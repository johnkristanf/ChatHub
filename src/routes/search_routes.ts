
import express from 'express';

import JWT from '../middleware/JWT';

import { 
    SearchFriendController, 
    GetProfileController,
    GetFriendRequestListController,
    
    } 
    
from '../controllers/SearchControllers';

const router = express.Router();


router.get('/search/friend/:fullname', JWT.ValidateToken,  SearchFriendController);


router.get('/get/profile/:user_id', JWT.ValidateToken, GetProfileController);


router.get('/FriendRequestList/:SenderId',  JWT.ValidateToken, GetFriendRequestListController);



export default router;