import { sign } from "jsonwebtoken";
import { RecoverCodeUserType } from "../../types/UserTypes";

export const RecoveryCode = async (user: RecoverCodeUserType) => {
    
    try {

        const RecoveryCode = sign(
            { 
              userId: user._id, 
              username: user.username,  
              email: user.email
          
            }, '38d26ca1d2', {  expiresIn: '5m' });

             
          return RecoveryCode;
  
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}