
import { body } from "express-validator";

export const NewPasswordValidate = [


  body('newPassword')
    .trim()
    .isLength({ min: 8 }).withMessage('Password must have atleast 8 character')
    .notEmpty().withMessage('Password is required')
 

]