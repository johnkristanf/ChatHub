"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetController = exports.PasswordRestUIController = exports.RecoveryCodeInputController = exports.RecoverCodeUIController = exports.SearchUsernameRecoverController = exports.AccountIndentifyUIController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Accounts_1 = require("../model/Accounts");
const MailerConfig_1 = require("./nodemailer/MailerConfig");
const RecoverCode_1 = require("./nodemailer/RecoverCode");
const validation_result_1 = require("express-validator/src/validation-result");
const AccountIndentifyUIController = (request, response) => {
    try {
        response.status(200).render('Forms/UsernameRecover');
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }
};
exports.AccountIndentifyUIController = AccountIndentifyUIController;
const SearchUsernameRecoverController = async (request, response) => {
    try {
        const { username } = request.body;
        const searchResult = await Accounts_1.AccountModel.find({ username: username }).select('username email');
        if (searchResult.length > 0) {
            for (const data of searchResult) {
                const code = await (0, RecoverCode_1.RecoveryCode)(data);
                response.cookie('RecoverCode', code, {
                    maxAge: 5 * 60 * 1000,
                    httpOnly: true,
                });
                const recievedCode = await MailerConfig_1.transporter.sendMail({
                    from: 'ChatHub@gmail.com',
                    to: data.email,
                    subject: 'ChatHub Recovery Code',
                    text: `Your Account Recovery Code is: ${code}`,
                });
                if (recievedCode) {
                    response.status(200).send({
                        AccountExist: true
                    });
                }
            }
        }
        else {
            response.status(200).send({
                AccountDontExist: true
            });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error SearchUsername');
    }
};
exports.SearchUsernameRecoverController = SearchUsernameRecoverController;
const RecoverCodeUIController = async (request, response) => {
    try {
        response.status(200).render('Forms/EmailRecoveryCode', { user_email: request.user.email });
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error getting RecoverCode');
    }
};
exports.RecoverCodeUIController = RecoverCodeUIController;
const RecoveryCodeInputController = async (request, response) => {
    try {
        const { recoverCode } = request.body;
        const validCode = (0, jsonwebtoken_1.verify)(recoverCode, '38d26ca1d2');
        if (validCode) {
            response.status(200).send({
                validCode: true
            });
        }
        else {
            response.status(200).send({
                InvalidCode: true
            });
        }
    }
    catch (error) {
        console.error(error);
        response.send('Error Verifying Recovery Code');
    }
};
exports.RecoveryCodeInputController = RecoveryCodeInputController;
const PasswordRestUIController = (request, response) => {
    try {
        response.status(200).render('Forms/PasswordReset');
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }
};
exports.PasswordRestUIController = PasswordRestUIController;
const PasswordResetController = async (request, response) => {
    try {
        const { newPassword } = request.body;
        const errors = (0, validation_result_1.validationResult)(request);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return response.json({
                Errors: errorMessages,
            });
        }
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        const recoverCode = request.cookies['RecoverCode'];
        const validCode = (0, jsonwebtoken_1.verify)(recoverCode, '38d26ca1d2');
        const passwordReset = await Accounts_1.AccountModel.updateOne({ _id: validCode.userId }, {
            $set: {
                password: hashedNewPassword
            }
        });
        if (passwordReset) {
            response.clearCookie('RecoverCode');
            response.status(200).send({ PaswordResetSuccessfully: true });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Reseting Password');
    }
};
exports.PasswordResetController = PasswordResetController;
//# sourceMappingURL=RecoverController.js.map