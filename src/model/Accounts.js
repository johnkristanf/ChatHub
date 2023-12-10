"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const dbConn_1 = __importDefault(require("../config/dbConn"));
(0, dbConn_1.default)();
const AccountSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
        default: 'NoImgProvided'
    },
    imageSize: {
        type: Number,
        required: true,
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
            status: { type: String, default: 'pending' },
            UserAdded: String
        }],
    friends: [String],
    activity: {
        type: String,
        required: true,
        default: 'Offline'
    },
});
AccountSchema.index({
    _id: 1,
    fullname: 1,
    username: 1,
    email: 1
}, { name: "User Data Index" });
exports.AccountModel = (0, mongoose_1.model)('Accounts', AccountSchema);
exports.default = {
    SignUp: async (SignUpData) => {
        try {
            const UserData = {
                fullname: SignUpData.fullname,
                username: SignUpData.username,
                email: SignUpData.email,
                password: SignUpData.password,
                birthday: SignUpData.birthday,
                gender: SignUpData.gender
            };
            const SignedUp = await exports.AccountModel.insertMany(UserData);
            if (SignedUp.length > 0)
                return true;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    Find: async (username) => {
        try {
            const data = await exports.AccountModel.find({ username: username });
            if (data.length > 0)
                return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    VerifyAccount: async (user_id) => {
        try {
            const VERIFIED_TOKEN = '6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f6541f70099bd40020c92e770cbb8b553e9a3797fe0bebbe292c3e8493450dcd2d1fe19f182e62dcf34b3f8f534a9889ec470c8d2fe3cd1d2e567cfa583e34b4f';
            if (VERIFIED_TOKEN) {
                const hashedVerifiedToken = await bcrypt_1.default.hash(VERIFIED_TOKEN, 10);
                const UpdateToVerifyAccount = await exports.AccountModel.findByIdAndUpdate(user_id, {
                    $set: {
                        account_status: 'Account Verified',
                        verified_token: hashedVerifiedToken
                    }
                });
                console.log('UpdateToVerifyAccount:', UpdateToVerifyAccount);
                if (UpdateToVerifyAccount)
                    return UpdateToVerifyAccount;
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    Search: async (fullname) => {
        try {
            const partialName = new RegExp(fullname, 'i');
            const SearchedFriend = await exports.AccountModel.find({ fullname: partialName })
                .select('image fullname email').limit(2);
            if (SearchedFriend.length > 0)
                return SearchedFriend;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    Profile: async (user_id) => {
        try {
            const Profile = await exports.AccountModel.find({ _id: user_id })
                .select('image username fullname email birthday gender friends');
            if (Profile.length > 0)
                return Profile;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
//# sourceMappingURL=Accounts.js.map