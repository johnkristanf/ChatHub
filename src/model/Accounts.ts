import dotenv from 'dotenv';
dotenv.config();

import brcypt from 'bcrypt';

import { Schema, model } from "mongoose";

import { UserType } from '../types/UserTypes';
import dbConn from "../config/dbConn";

dbConn();

const AccountSchema = new Schema({

    image: {
        type: String,
        required: true,
        default: 'NoImgProvided'
    },

    fullname: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    account_status: {
        type: String,
        required: true,
        default: 'Not Verified'
    },

    verified_token: {
        type: String,
        required: true,
        default: 'undefined'
    },

    birthday: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    friendRequests: [{
        senderId: String,
        senderName: String,
        senderImage: String,
        status: { type: String, default: 'pending' }, // 'pending', 'accepted', or 'rejected'
    }],

    friends: [String],

});


AccountSchema.index({
    _id: 1,
    fullname: 1,
    username: 1,
    email: 1

}, { name: "User Data Index" });


export const AccountModel = model('Accounts', AccountSchema);



export default {

    SignUp: async (SignUpData: UserType) => {

        try {

            const UserData: UserType = {
                
                fullname: SignUpData.fullname,
                username: SignUpData.username,
                email: SignUpData.email,
                password: SignUpData.password,
                birthday: SignUpData.birthday,
                gender: SignUpData.gender
    
            }

            const SignedUp = await AccountModel.insertMany(UserData);

            if(SignedUp.length > 0) return true;

            
            
        } catch (error) {
            console.error(error);
            throw error;
            
        }

    },

    Find: async (username: string) => {

        try {
            
            const data = await AccountModel.find({ username: username });

            if(data.length > 0) return data;
            
            
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    },

    VerifyAccount: async (user_id: string) => {

        try {

            const VERIFIED_TOKEN : string = '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f';

            if(VERIFIED_TOKEN){

                const hashedVerifiedToken = await brcypt.hash(VERIFIED_TOKEN, 10);
            
                const UpdateToVerifyAccount = await AccountModel.findByIdAndUpdate(user_id, {
                    $set: {
                        account_status: 'Account Verified',
                        verified_token: hashedVerifiedToken
                    }
                });
    
                console.log('UpdateToVerifyAccount:', UpdateToVerifyAccount);
    
                if(UpdateToVerifyAccount) return UpdateToVerifyAccount;

            }
           
            
            
        } catch (error) {
            console.error(error);
            throw error;
        }
        
        
    },

    Search: async (fullname: string) => {

        try {
            
            const partialName = new RegExp(fullname, 'i');

            const SearchedFriend = await AccountModel.find({ fullname: partialName })
            .select('image fullname email').limit(2); 


            if(SearchedFriend.length > 0) return SearchedFriend;
            
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    },

    Profile: async (user_id: string) => {

        try {

            const Profile = await AccountModel.find({ _id: user_id })
            .select('image username fullname email birthday gender');

            if(Profile.length > 0) return Profile;
            
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    }
}



