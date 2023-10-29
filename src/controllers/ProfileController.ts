import { AccountModel } from "../model/Accounts";

import bcrypt from 'bcrypt';


export const UpdateProfilePictureController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            console.log('request.body:', request.body)

            const { ProfilePicture } = request.body;
            const { id } = request.user;

            console.log('ProfilePicture:', ProfilePicture)

            const updated = await AccountModel.findByIdAndUpdate(id, { image: ProfilePicture });

            if(updated){
                response.status(200).send({
                    ProfilePictureUpdated: 'Profile Picture Updated Successfully'
                });

            } 

        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Profile Picture')
    }

}


export const UpdateFullNameController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { UpdatedFullName } = request.body;
            const { id } = request.user;

            const updated = await AccountModel.findByIdAndUpdate(id, { fullname: UpdatedFullName });

            if(updated){
                response.status(200).send({
                    FullNameUpdated: 'Full Name Updated Successfully'
                });

            } 

        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Full Name')
    }

}


export const UpdateUserNameController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { UpdatedUserName } = request.body;
            const { id } = request.user;

            const updated = await AccountModel.findByIdAndUpdate(id, { username: UpdatedUserName });

            if(updated){
                response.status(200).send({
                    UserNameUpdated: 'User Name Updated Successfully'
                });
                
            } 

        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating User Name')
    }

}



export const UpdateEmailController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { UpdatedEmail } = request.body;
            const { id } = request.user;

            const updated = await AccountModel.findByIdAndUpdate(id, { 
                email: UpdatedEmail,
                account_status: 'Not Verified',
                verified_token: 'undefined' 
            });

            if(updated){
                response.status(200).send({
                    EmailUpdated: 'Email Updated Successfully'
                });
                
            } 

        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Email')
    }

}



export const UpdatePasswordController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { CurrentPassword, NewPassword } = request.body;
            const { id } = request.user;

            const user = await AccountModel.findById(id).select('password');


            if(user){

                const CurrentPasswordMatch = await bcrypt.compare(CurrentPassword, user.password);


                if(CurrentPasswordMatch){

                    const hashedNewPassword = await bcrypt.hash(NewPassword, 10);
                    const updated = await AccountModel.findByIdAndUpdate(id, { password: hashedNewPassword});

                    
                    if(updated){
                        response.status(200).send({
                            PasswordUpdated: 'Password Updated Successfully'
                        });
                
                    } 

                } else {
                    response.status(200).send({
                        CurrentPassNotMatch: 'Current Password Not Match'
                    });
                }

                
           
            }


            


        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Password')
    }

}



export const UpdateBday_GenderController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { gender, birthday } = request.body;
            const { id } = request.user;

            const birthdayDate = new Date(birthday);

            const formattedBirthDate = birthdayDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',

            });
        

            const update = await AccountModel.findByIdAndUpdate(id, { 
                gender: gender,
                birthday: formattedBirthDate 
            });
            

            if(update) response.status(200).send({
                Bday_GenderUpdated: 'Birth Day and Gender Updated Successfully'
            })

        }


        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Birthday and Gender')
    }

}