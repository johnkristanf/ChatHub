import express from 'express';

import JWT from '../middleware/JWT';

import { 
    UpdateProfilePictureController,
    UpdateFullNameController, 
    UpdateUserNameController,
    UpdateEmailController,
    UpdatePasswordController,
    UpdateBday_GenderController

} from '../controllers/ProfileController';


const router = express.Router();


router.put('/update/profile_picture', JWT.ValidateToken, UpdateProfilePictureController);


router.put('/update/fullname', JWT.ValidateToken, UpdateFullNameController);


router.put('/update/username', JWT.ValidateToken, UpdateUserNameController);


router.put('/update/email', JWT.ValidateToken, UpdateEmailController);


router.put('/update/password', JWT.ValidateToken, UpdatePasswordController);


router.put('/update/bday_gender', JWT.ValidateToken, UpdateBday_GenderController);






export default router;