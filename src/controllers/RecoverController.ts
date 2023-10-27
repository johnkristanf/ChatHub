import { verify } from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { AccountModel } from "../model/Accounts";
import { transporter } from "./nodemailer/MailerConfig";
import { RecoveryCode } from "./nodemailer/RecoverCode";

import { validationResult } from 'express-validator/src/validation-result';


export const AccountIndentifyUIController = (request: any, response: any) => {

    try {
        response.status(200).render('Forms/UsernameRecover');
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }

}


export const SearchUsernameRecoverController = async (request: any, response: any) => {

    try {

        const { username } = request.body;

        const searchResult = await AccountModel.find({ username: username }).select('username email');

        if(searchResult.length > 0){

            for(const data of searchResult){

                const code = await RecoveryCode(data);

                response.cookie('RecoverCode', code, {
                    maxAge: 5 * 60 * 1000, 
                    httpOnly: true,
                });
                  
                const recievedCode =  await transporter.sendMail({
                    from: 'ChatHub@gmail.com',
                    to: data.email,
                    subject: 'ChatHub Recovery Code',
                    text: `Your Account Recovery Code is: ${code}`,

                });


                if(recievedCode){
                    response.status(200).send({
                        AccountExist: true 
                    });

                }      
                
            }
                

           

        } else {

            response.status(200).send({
                AccountDontExist: true
            });
 
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error SearchUsername')
    }
    
}


export const RecoverCodeUIController = async (request: any, response: any) => {

    try {

        response.status(200).render('Forms/EmailRecoveryCode', { user_email: request.user.email });
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error getting RecoverCode');
    }
    
}



export const RecoveryCodeInputController = async (request: any, response: any) => {

    try {

        const { recoverCode } = request.body;

        const validCode = verify(recoverCode, '38d26ca1d2');

        if(validCode){

            response.status(200).send({
                validCode: true
            });

        } else {

            response.status(200).send({
                InvalidCode: true
            });
        }

        
    } catch (error) {
        console.error(error);
        response.send('Error Verifying Recovery Code')
    }
    
}


export const PasswordRestUIController = (request: any, response: any) => {

    try {
        response.status(200).render('Forms/PasswordReset');
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }
    
}


export const PasswordResetController = async (request: any, response: any) => {

    try {

        const { newPassword } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);

            return response.json({
                Errors: errorMessages,
            });

        }    
        
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        const recoverCode = request.cookies['RecoverCode'];

        const validCode: any = verify(recoverCode, '38d26ca1d2');


        const passwordReset = await AccountModel.updateOne({ _id: validCode.userId }, 
            { 
                $set: { 
                    password: hashedNewPassword
                } 

            }
        );
        

        if(passwordReset){
            response.clearCookie('RecoverCode');
            response.status(200).send({ PaswordResetSuccessfully: true });
        }
    


       
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Reseting Password');
    }
    
}