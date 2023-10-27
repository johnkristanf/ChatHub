
import express from 'express';

import JWT from '../middleware/JWT';

import { 
    SearchFriendController, 
    GetProfileController,
    GetFriendRequestListController,
    GetFriendsListIDController,
    GetFriendsListController

    } 
    
from '../controllers/SearchControllers';

const router = express.Router();


router.get('/search/friend/:fullname', JWT.ValidateToken,  SearchFriendController);


router.get('/get/profile/:user_id', JWT.ValidateToken, GetProfileController);


router.get('/FriendRequestList/:SenderId',  JWT.ValidateToken, GetFriendRequestListController);


router.get('/get/friendsID',  JWT.ValidateToken, GetFriendsListIDController);


router.post('/get/friends/list',  JWT.ValidateToken, GetFriendsListController);





export default router;