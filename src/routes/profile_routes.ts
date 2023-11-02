import express from 'express';
import multer from 'multer';


import JWT from '../middleware/JWT';

import { 
    UpdateProfilePictureController,
    UpdateFullNameController, 
    UpdateUserNameController,
    UpdateEmailController,
    UpdatePasswordController,
    UpdateBday_GenderController

} from '../controllers/ProfileController';



const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, 'public/img/userImages/'); 

    },

    filename: (req: any, file, cb) => {

        const filename = file.originalname.split('.');
        const getFileExtension = filename[filename.length - 1];
       
        cb(null, `${req.user.fullname}ProfilePicture.${getFileExtension}`);
    },

});
  
const profileUpload = multer({ storage });

const router = express.Router();


router.put('/update/profile_picture', JWT.ValidateToken, profileUpload.single('ProfilePicture'), UpdateProfilePictureController);


router.put('/update/fullname', JWT.ValidateToken, UpdateFullNameController);


router.put('/update/username', JWT.ValidateToken, UpdateUserNameController);


router.put('/update/email', JWT.ValidateToken, UpdateEmailController);


router.put('/update/password', JWT.ValidateToken, UpdatePasswordController);


router.put('/update/bday_gender', JWT.ValidateToken, UpdateBday_GenderController);





export default router;