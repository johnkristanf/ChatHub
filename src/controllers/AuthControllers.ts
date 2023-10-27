import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { validationResult } from 'express-validator/src/validation-result';

import Accounts from '../model/Accounts';

import { secretKey } from '../tokenSecret/secret';
import JWT from '../middleware/JWT';

import { UserType } from '../types/UserTypes';


export const SignUpController  = async (request: any, response: any) => {

    try {

        const { fullname, username, email, password, birthday, gender } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);

            return response.json({
                Errors: errorMessages,
            });

        }    
        
        const birthdayDate = new Date(birthday);

        const formattedBirthDate = birthdayDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        });
        
        const HashedPassword = await bcrypt.hash(password, 10);

        const SignUpData: UserType = {
            fullname: fullname,
            username: username,
            email: email,
            password: HashedPassword,
            birthday: formattedBirthDate,
            gender: gender,
        }


        const SignUpSuccess = await Accounts.SignUp(SignUpData);


        if(SignUpSuccess){
            response.status(200).send({
                Success: true,
                SuccessMessage: 'Account Created SuccessFully'
            });

        }

        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Signing Up User');
    }
    
}


export const LoginController = async (request: any, response: any) => {

    try {
        const { username, password } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);

            return response.json({
                Errors: errorMessages,
            });

        }    
        

        const UserData = await Accounts.Find(username);

        if(UserData){

            const match = await bcrypt.compare(password, UserData[0].password);

            if(match) {

                if(UserData[0].verified_token === "undefined"){

                    for(const data of UserData){
    
                        const AccessToken = await JWT.AccessToken(data);
    
                        response.cookie('VerificationToken', AccessToken, {
                            maxAge: 30 * 60 * 1000,
                            httpOnly: true,
    
                        });
    
    
                    }

                    return response.status(200).send({
                        NeedVerification: true
                    });

                }

                
                for(const data of UserData){
    
                    const AccessToken = await JWT.AccessToken(data);

                    response.cookie('AccessToken', AccessToken, {
                        maxAge:  7 * 24 * 60 * 60 * 1000,
                        httpOnly: true,

                    });


                }

               
                const VerifiedTokenMatch: boolean = await bcrypt.compare("6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f", UserData[0].verified_token);

                if(VerifiedTokenMatch){
                    
                    response.status(200).send({
                        LoginSuccess: true
                    });

                }


                
            } else {
                response.send({
                    InvalidLoginCredentials: 'Username or Password Incorrect'
                });
    
            }

        } else {
            response.send({
                InvalidLoginCredentials: 'Username or Password Incorrect'
            });

        }
       
        
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Login User');
    }
    
}


export const QrCodeAuthController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const otpauth = `otpauth://totp/ChatHub:${request.user.email}?secret=${secretKey}&issuer=ChatHub`;


            const GenerateQRCode = await QRCode.toDataURL(otpauth);

            if(GenerateQRCode){
                response.status(200).send({
                    qrCode: GenerateQRCode
                
                });

            }

        }    

        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Getting QrCode');
    }
    
}


export const VerifyAccountController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { VerificationCode } = request.body;
          

            const ValidToken = speakeasy.totp.verify({     
                secret: secretKey,
                encoding: 'base32',
                token: VerificationCode

            });
                 
                

                if(!ValidToken){
                    response.status(500).send('Invalid Token');
                
                } else {

                    const VerifyAccount = await Accounts.VerifyAccount(request.user.id);

                  
                    if(VerifyAccount){
                      
                       const AccessToken = await JWT.AccessToken(VerifyAccount);

                        response.cookie('AccessToken', AccessToken, {
                            maxAge:  7 * 24 * 60 * 60 * 1000,
                            httpOnly: true,
    
                        });

                        response.clearCookie('VerificationToken');

                        response.status(200).send({
                            VerifiedSuccess: true

                        });

                    }

                }
        }

    } catch (error) {
        console.error(error);
        response.status(500).send('Error Verifying User');

    }
    
}


export const ActiveUserDataController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

           const { id, username } = request.user;

            response.status(200).send({
               user_id: id,
               username: username
            })

        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Retreiving Active User Data');

    }
    
    
}

export const LogoutController = (request: any, response: any) => {

    try {
        response.clearCookie('AccessToken');
   
        response.redirect('/'); 
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Logging Out the User');

    }
    
}