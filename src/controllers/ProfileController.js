"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBday_GenderController = exports.UpdatePasswordController = exports.UpdateEmailController = exports.UpdateUserNameController = exports.UpdateFullNameController = exports.UpdateProfilePictureController = void 0;
const Accounts_1 = require("../model/Accounts");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UpdateProfilePictureController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { filename, size } = request.file;
            const { id } = request.user;
            const updated = await Accounts_1.AccountModel.findByIdAndUpdate(id, { image: filename, imageSize: size });
            if (updated) {
                response.status(200).send({
                    ProfilePictureUpdated: 'Profile Picture Updated Successfully'
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Profile Picture');
    }
};
exports.UpdateProfilePictureController = UpdateProfilePictureController;
const UpdateFullNameController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { UpdatedFullName } = request.body;
            const { id } = request.user;
            const updated = await Accounts_1.AccountModel.findByIdAndUpdate(id, { fullname: UpdatedFullName });
            if (updated) {
                response.status(200).send({
                    FullNameUpdated: 'Full Name Updated Successfully'
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Full Name');
    }
};
exports.UpdateFullNameController = UpdateFullNameController;
const UpdateUserNameController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { UpdatedUserName } = request.body;
            const { id } = request.user;
            const updated = await Accounts_1.AccountModel.findByIdAndUpdate(id, { username: UpdatedUserName });
            if (updated) {
                response.status(200).send({
                    UserNameUpdated: 'User Name Updated Successfully'
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating User Name');
    }
};
exports.UpdateUserNameController = UpdateUserNameController;
const UpdateEmailController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { UpdatedEmail } = request.body;
            const { id } = request.user;
            const updated = await Accounts_1.AccountModel.findByIdAndUpdate(id, {
                email: UpdatedEmail,
                account_status: 'Not Verified',
                verified_token: 'undefined'
            });
            if (updated) {
                response.status(200).send({
                    EmailUpdated: 'Email Updated Successfully'
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Email');
    }
};
exports.UpdateEmailController = UpdateEmailController;
const UpdatePasswordController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { CurrentPassword, NewPassword } = request.body;
            const { id } = request.user;
            const user = await Accounts_1.AccountModel.findById(id).select('password');
            if (user) {
                const CurrentPasswordMatch = await bcrypt_1.default.compare(CurrentPassword, user.password);
                if (CurrentPasswordMatch) {
                    const hashedNewPassword = await bcrypt_1.default.hash(NewPassword, 10);
                    const updated = await Accounts_1.AccountModel.findByIdAndUpdate(id, { password: hashedNewPassword });
                    if (updated) {
                        response.status(200).send({
                            PasswordUpdated: 'Password Updated Successfully'
                        });
                    }
                }
                else {
                    response.status(200).send({
                        CurrentPassNotMatch: 'Current Password Not Match'
                    });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Password');
    }
};
exports.UpdatePasswordController = UpdatePasswordController;
const UpdateBday_GenderController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { gender, birthday } = request.body;
            const { id } = request.user;
            const birthdayDate = new Date(birthday);
            const formattedBirthDate = birthdayDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const update = await Accounts_1.AccountModel.findByIdAndUpdate(id, {
                gender: gender,
                birthday: formattedBirthDate
            });
            if (update)
                response.status(200).send({
                    Bday_GenderUpdated: 'Birth Day and Gender Updated Successfully'
                });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Updating Birthday and Gender');
    }
};
exports.UpdateBday_GenderController = UpdateBday_GenderController;
//# sourceMappingURL=ProfileController.js.map