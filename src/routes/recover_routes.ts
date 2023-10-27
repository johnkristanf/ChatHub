import express from 'express';

import { 
        AccountIndentifyUIController,
        RecoverCodeUIController, 
        SearchUsernameRecoverController,
        RecoveryCodeInputController,
        PasswordRestUIController,
        PasswordResetController
    }   

from '../controllers/RecoverController';

import { NewPasswordValidate } from '../controllers/validator/recover_validator';

import JWT from '../middleware/JWT';

const router = express.Router();


router.get('/account/indentify', AccountIndentifyUIController);


router.post('/searchRecover/username', SearchUsernameRecoverController);


router.get('/recover/code', JWT.ValidateRecoveryToken, RecoverCodeUIController);

router.post('/input/code', RecoveryCodeInputController)


router.get('/password/reset', PasswordRestUIController);

router.post('/password/reset', NewPasswordValidate, PasswordResetController);



export default router;