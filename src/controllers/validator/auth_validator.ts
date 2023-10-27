import { body } from "express-validator";
import { AccountModel } from "../../model/Accounts";

export const SignUpValidate = [

  body('fullname')
    .trim()
    .notEmpty().withMessage('Full Name is required')
    .isLength({ min: 7 }).withMessage('Full Name must be atleast 7 character')
    .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Full Name must only contain letters and numbers'),



  body('username')
    .trim()
    .notEmpty().withMessage('User Name is required')
    .isLength({ min: 7 }).withMessage('User Name must be atleast 7 character')
    .matches(/^[a-zA-Z0-9\s]*$/).withMessage('User Name must only contain letters and numbers')

    .custom(async value => {

        try {
            const usernameTaken = await AccountModel.find({ username: value });

            if (usernameTaken.length > 0) {
               throw new Error('User Name is Already taken');

            }
        
        } catch (error) {
          throw error;
        
        }
     

    }),



  body('email')
      .isEmail().withMessage('Invalid email')
      .notEmpty().withMessage('Email is required')

      .custom(async value => {

        try {
            const email_Existed = await AccountModel.find({ email: value });

            if (email_Existed.length > 0) {
               throw new Error('E-mail address is Already taken');

            }
        
        } catch (error) {
          throw error;
        
        }
     

    }),

  body('birthday')
     .notEmpty().withMessage('Birth Day is required'),
    
    
  body('gender')
     .notEmpty().withMessage('Gender is required'),


  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .notEmpty().withMessage('Password is required')
    .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Password must only contain letters and numbers'),


    
]



export const LoginValidate = [

    body('username')
    .trim()
    .notEmpty().withMessage('User Name is required'),


  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
 

]