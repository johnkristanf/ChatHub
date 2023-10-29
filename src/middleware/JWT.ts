import dotenv from 'dotenv';
dotenv.config();

import { sign, verify } from "jsonwebtoken";
import { LoginCredentials } from '../types/UserTypes';


export default  {
    
    AccessToken: async (user: LoginCredentials) => {
       
        try {

            const AccessToken =  sign(
              { 
                userId: user._id, 
                username: user.username,  
                email: user.email,
                fullname: user.fullname
            
              }, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');

               
            return AccessToken;
    
            
        } catch (error) {
            console.error(error);
            throw error
            
        }
        
    },

    ValidateToken: async (request: any, response: any, next: any) => {

        try {

          const AccessToken = request.cookies['AccessToken'];
    
          if (!AccessToken) {
            return response.status(403).send('User Not Authenticated');
            
          }
    
          const ValidToken = verify(AccessToken, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');
    
          if (typeof ValidToken === 'object' && 'userId' in ValidToken) {

                request.user = {
                    id: ValidToken.userId, 
                    username: ValidToken.username,
                    email: ValidToken.email,
                    fullname: ValidToken.fullname,
                    Authenticated: (): boolean => { return true }
                };
           
                return next();

          } else {
            return response.status(403).send('Invalid Token');

          }
          

        } catch (error) {
          console.error(error);
          response.status(500).send('Error Validating Token');
        }
        
      },


      ValidateVerificationToken: async (request: any, response: any, next: any) => {

        try {

          const VerificationToken = request.cookies['VerificationToken'];
    
          if (!VerificationToken) {
            return response.status(403).send('User Not Authenticated');
            
          }
    
          const ValidToken = verify(VerificationToken, '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f');
    
          if (typeof ValidToken === 'object' && 'userId' in ValidToken) {

                request.user = {
                    id: ValidToken.userId, 
                    username: ValidToken.username,
                    email: ValidToken.email,
                    Authenticated: (): boolean => { return true }
                };
           
                return next();

          } else {
            return response.status(403).send('Invalid Token');

          }
          

        } catch (error) {
          console.error(error);
          response.status(500).send('Error Validating Token');
        }
      },
      

      ValidateRecoveryToken: async (request: any, response: any, next: any) => {

        try {

          const RecoverCode = request.cookies['RecoverCode'];
    
          if (!RecoverCode) {
            return response.status(403).send('User Not Authenticated');
            
          }
    
          const ValidToken = verify(RecoverCode, '38d26ca1d2');
    
          if (typeof ValidToken === 'object' && 'userId' in ValidToken) {

                request.user = {
                    id: ValidToken.userId, 
                    username: ValidToken.username,
                    email: ValidToken.email,
                    Authenticated: (): boolean => { return true }
                };
           
                return next();

          } else {
            return response.status(403).send('Invalid Token');

          }
          

        } catch (error) {
          console.error(error);
          response.status(500).send('Error Validating Token');
        }
      },

}