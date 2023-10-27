import express from 'express';

import JWT from '../middleware/JWT';

import { 
        SignUpController, 
        LoginController,
        QrCodeAuthController, 
        VerifyAccountController, 
        ActiveUserDataController,
        LogoutController 
    } 

from '../controllers/AuthControllers';

import { SignUpValidate, LoginValidate } from '../controllers/validator/auth_validator';


const router = express.Router();


router.post('/auth/signup', SignUpValidate, SignUpController);


router.post('/auth/login', LoginValidate, LoginController);


router.get('/auth/qrcode', JWT.ValidateVerificationToken, QrCodeAuthController);


router.post('/account/verify', JWT.ValidateVerificationToken, VerifyAccountController);


router.get('/ActiveUserData', JWT.ValidateToken, ActiveUserDataController);


router.get('/logout', LogoutController);


export default router;